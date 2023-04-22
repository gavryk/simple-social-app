import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { useRegisterMutation } from '../../store/api/auth.api';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [register] = useRegisterMutation();

	useEffect(() => {
		// register({
		// 	firstName: 'Bepko',
		// 	lastName: 'Bepko Test',
		// 	email: 'bepko@gmail.com',
		// 	password: '1456300emu',
		// 	picturePath: '',
		// 	friends: [],
		// 	location: 'Pekin',
		// 	occupation: '',
		// });
	}, []);

	return <div></div>;
};
