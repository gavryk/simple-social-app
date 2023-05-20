import mongoose from 'mongoose';

const UserShema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		picturePath: {
			type: String,
			default: '',
		},
		following: {
			type: Array,
			default: [],
		},
		followers: {
			type: Array,
			default: [],
		},
		social: [
			{
				name: {
					type: String,
					required: true,
					enum: ['Facebook', 'Twitter', 'Instagram', 'Linkedin', 'Github'],
				},
				link: {
					type: String,
					required: true,
					max: 100,
				},
			},
		],
		location: String,
		occupation: String,
		viewedProfile: Number,
		impressions: Number,
	},
	{ timestamps: true },
);

const User = mongoose.model('User', UserShema);
export default User;
