import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({ _id: { $ne: req.user.id } });
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

		const isFriend = user.following.some((friendObj) => friendObj._id.equals(friend._id));

		if (isFriend) {
			await user.updateOne({ $pull: { following: friend } });
		} else {
			await user.updateOne({ $push: { following: friend } });
		}

		res.status(200).json('Ok');
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { _id, ...userData } = req.body;
		await User.updateOne(
			{ _id: id },
			{
				firstName: userData.firstName,
				lastName: userData.lastName,
				picturePath: userData.picturePath,
				email: userData.email,
				following: userData.following,
				followers: userData.followers,
				social: userData.social,
				location: userData.location,
				occupation: userData.occupation,
			},
		);
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
