import User from '../models/User.js';

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
	} catch (error) {
		res.status(404).json({ message: err.message });
	}
};
