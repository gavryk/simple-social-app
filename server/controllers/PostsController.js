import Post from '../models/Post.js';
import User from '../models/User.js';

/*Create new post*/
export const createPost = async (req, res) => {
	try {
		const { userId, description, picturePath, location } = req.body;
		const user = await User.findById(userId);
		console.log(user.picturePath);
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location,
			description,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			coments: [],
		});
		await newPost.save();
		const post = await Post.find();
		res.status(201).json(post);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const removePost = async (req, res) => {
	const postId = req.params.id;
	try {
		const deletedPost = await Post.findByIdAndDelete({ _id: postId });
		if (!deletedPost) {
			return res.status(404).json({ message: 'Post not found!' });
		}
		res.status(200).json({ message: 'Post deleted!' });
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

/*Get All Posts*/
export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

/*Update*/
export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.boyd;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);

		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}
		const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
