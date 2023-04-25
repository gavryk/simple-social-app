import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../store/api/auth.api';

export const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		firstName: '',
	});
	const [login, { isLoading, error }] = useLoginUserMutation();

	const fetchLogin = async () => {
		try {
			const userData = await login({
				email: 'bepko@gmail.com',
				password: '1456300emu',
			}).unwrap();
			setUser({ ...userData });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchLogin();
	}, []);

	if (error) return <h1>{(error as any)?.data.msg}</h1>;

	return (
		<div>
			<h1>Login</h1>
			{user?.firstName}
		</div>
	);
};
