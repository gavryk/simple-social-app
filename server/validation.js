import { body } from 'express-validator';

export const loginValidator = [
	body('email', 'Email format is incorrect!').isEmail(),
	body('password', 'The password must be at least 5 characters long!').isLength({ min: 5 }),
];

export const registerValidator = [
	body('firstName', 'Name format is incorrect!').isLength({ min: 3 }),
	body('lastName', 'Name format is incorrect!').isLength({ min: 3 }),
	body('email', 'Email format is incorrect!').isEmail(),
	body('password', 'The password must be at least 5 characters long!').isLength({ min: 5 }),
	body('picturePath', 'The avatar link is incorrect!').optional().isString(),
	body('location', 'Location mast be string').isString(),
	body('occupation', 'Occupation mast be string').isString(),
];
