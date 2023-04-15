import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import morgan from 'morgan';
import { register, login } from './controllers/AuthController.js';
import { verifyToken, handleValidationErrors } from './middleware/index.js';

/* App Config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ debug: true });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* FILE STORAGE */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads');
		}
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname.replaceAll(' ', '_'));
	},
});
const upload = multer({ storage });

/*ROUTES*/
//AUTH ROUTES
app.post('/auth/register', upload.single('picture'), handleValidationErrors, register);
app.post('/auth/login', handleValidationErrors, login);

//Remove Image From Folder
app.delete('/upload/:name', async (req, res) => {
	const name = req.params.name;
	try {
		fs.unlinkSync(`./uploads/${name}`, (err) => {
			if (err) throw err;
		});
		res.json({
			message: 'File Deleted',
		});
	} catch (error) {
		console.log(error);
	}
});

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 4040;
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
	})
	.catch((err) => console.log(`${err} did not connect!`));
