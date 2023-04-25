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
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/AuthController.js';
import { createPost } from './controllers/PostsController.js';
import { handleValidationErrors, verifyToken } from './middleware/index.js';

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
app.post('/upload', upload.single('image'), (req, res) => {
	const { file } = req;
	if (file) {
		res.json({
			url: `/uploads/${req.file.filename}`,
		});
	}
});
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

/*Routes*/
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 4040;
mongoose
	.connect(process.env.MONGO_DB)
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
	})
	.catch((err) => console.log(`${err} did not connect!`));
