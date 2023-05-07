import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Register SetUp
export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation,
			social,
		} = req.body;
		const oldUserEmail = await User.findOne({ email });

		if (oldUserEmail) {
			return res.status(400).send({ message: 'User already exists' });
		}
		//hash password
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);
		//Create New User
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			social,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to register!',
		});
	}
};
//Login SetUp
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials. ' });

		const { password: passwordHash, ...userData } = user._doc;
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
		return res
			.cookie('access_token', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
				secureProxy: true,
			})
			.status(200)
			.json({ ...userData });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to login!',
		});
	}
};

export const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({
				message: 'User not found!',
			});
		}
		//Get all data without hash
		const { password, ...userData } = user._doc;
		//Return information
		res.json({ ...userData });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'No Access!',
		});
	}
};

export const logout = (req, res) => {
	res.cookie('access_token', '', { sameSite: 'none', secure: true }).json('ok');
};
