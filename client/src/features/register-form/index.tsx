import React, { useEffect, useState } from 'react';
import { useRegisterUserMutation } from '../../store/api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { UIButton, UIDropzone, UIInput, UITypography } from '../../components';
import { IRegisterFormTypes, ImageUpload } from '../../common';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const RegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const [registerUser] = useRegisterUserMutation();
	const [image, setImage] = useState('');
	const [file, setFile] = useState<ImageUpload>({
		file: null,
		imagePreviewUrl: '',
		fileLoaded: false,
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterFormTypes>();

	const onSubmit = async (data: IRegisterFormTypes) => {
		await registerUser({
			...data,
			picturePath: image,
		});
	};

	useEffect(() => {
		console.log(image);
		// registerUser({
		// 	firstName: 'Bepko',
		// 	lastName: 'Bepko Test',
		// 	email: 'bepko@gmail.com',
		// 	password: '1456300emu',
		// 	picturePath: '',
		// 	friends: [],
		// 	location: 'Pekin',
		// 	occupation: '',
		// });
	}, [image]);

	return (
		<div className={styles.registerForm}>
			<UITypography variant="h2" fontWeight="bold" bottomSpace="sm" textAlign="center">
				Register
			</UITypography>
			<UIDropzone setImage={setImage} imageLoad={true} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.fieldsWrapper}>
					<UIInput
						type="text"
						id="userFirstNameField"
						label="First Name"
						{...register('firstName', { required: 'Please enter your first name.' })}
						error={errors.firstName && errors.firstName.message}
					/>
					<UIInput
						type="text"
						id="userLastNameField"
						label="Last Name"
						{...register('lastName', { required: 'Please enter your last name.' })}
						error={errors.lastName && errors.lastName.message}
					/>
				</div>
				<div className={styles.fieldsWrapper}>
					<UIInput
						type="text"
						id="userLocationField"
						label="Location"
						{...register('location', { required: 'Please enter your location.' })}
						error={errors.location && errors.location.message}
					/>
					<UIInput
						type="text"
						id="userOccupationField"
						label="Occupation"
						{...register('occupation', { required: 'Please enter your occupation.' })}
						error={errors.occupation && errors.occupation.message}
					/>
					<UIInput
						type="email"
						id="emailField"
						label="Email"
						{...register('email', { required: 'Please enter your email.' })}
						error={errors.email && errors.email.message}
					/>
					<UIInput
						type="password"
						id="passwordField"
						label="Password"
						{...register('password', { required: 'Please enter your password.' })}
						error={errors.password && errors.password.message}
					/>
				</div>
				<UIButton fluid type="submit">
					Register
				</UIButton>
				{/* <span className={styles.errorDB}>{errorString as React.ReactNode}</span> */}
				<span className={styles.notice}>
					Do you have an account? <Link to="/login">Login</Link>
				</span>
			</form>
		</div>
	);
};
