import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
	try {
		const token = req.cookies?.access_token?.replace(/Bearer\s?/, '');

		if (!token) {
			return res.status(403).send('Access Denied');
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/* Get token like this instead replace(/Bearer\s?/, ''); */
// if (token.startsWith('Bearer ')) {
// 	token = token.slice(7, token.length).trimLeft();
// }
