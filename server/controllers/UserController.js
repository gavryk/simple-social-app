import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});
		if (!users || users.length === 0) {
			return res.status(404).json({
				message: 'No users found!',
			});
		}
		const userData = users.map((user) => {
			const { password, ...data } = user._doc;
			return data;
		});
		res.status(200).json(userData);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				message: 'User not found!',
			});
		}
		const { password, ...userData } = user._doc;
		res.status(200).json({ ...userData });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			},
		);
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const updateFriends = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			},
		);

		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
