import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../store/api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { UILoader, UIButton, UIDropzone, UIInput, UITypography } from '../../components';
import { IRegisterFormTypes } from '../../common';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useUploadPhoto } from '@/hooks';

export const RegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const [registerUser, { isLoading: registerLoading }] = useRegisterUserMutation();
	const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
	const { uploadLoading, removeLoading, picture, file, setFile, setUserImage, pictureLoaded } =
		useUploadPhoto();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterFormTypes>();

	const onSubmit = async (data: IRegisterFormTypes) => {
		await registerUser({ ...data, picturePath: picture })
			.unwrap()
			.then((data) => {
				reset({
					firstName: '',
					lastName: '',
					password: '',
					location: '',
					occupation: '',
					email: '',
				});
				setFile({ file: null, imagePreviewUrl: '' });
				setErrorSubmit(null);
				navigate('/login');
			})
			.catch((err) => {
				setErrorSubmit(err.data.message || err.data[0].msg);
			});
	};

	return (
		<div className={styles.registerForm}>
			<UITypography variant="h3" fontWeight="bold" bottomSpace="sm" textAlign="center">
				Register
			</UITypography>
			{!registerLoading ? (
				<>
					<UIDropzone setImage={setUserImage} imageLoad={pictureLoaded} file={file} fullWidth />
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={clsx(styles.fieldsWrapper, styles.cols2)}>
							<UIInput
								type="text"
								id="userFirstNameField"
								placeholder="First Name"
								{...register('firstName', { required: 'Please enter your first name.' })}
								error={errors.firstName && errors.firstName.message}
							/>
							<UIInput
								type="text"
								id="userLastNameField"
								placeholder="Last Name"
								{...register('lastName', { required: 'Please enter your last name.' })}
								error={errors.lastName && errors.lastName.message}
							/>
						</div>
						<div className={clsx(styles.fieldsWrapper, styles.cols1)}>
							<UIInput
								type="text"
								id="userLocationField"
								placeholder="Location"
								{...register('location', { required: 'Please enter your location.' })}
								error={errors.location && errors.location.message}
							/>
							<UIInput
								type="text"
								id="userOccupationField"
								placeholder="Occupation"
								{...register('occupation', { required: 'Please enter your occupation.' })}
								error={errors.occupation && errors.occupation.message}
							/>
							<UIInput
								type="email"
								id="emailField"
								placeholder="Email"
								{...register('email', { required: 'Please enter your email.' })}
								error={errors.email && errors.email.message}
							/>
							<UIInput
								type="password"
								id="passwordField"
								placeholder="Password"
								{...register('password', { required: 'Please enter your password.' })}
								error={errors.password && errors.password.message}
							/>
						</div>
						<UIButton fluid type="submit" disabled={(uploadLoading || removeLoading) && true}>
							Register
						</UIButton>
						{errorSubmit && (
							<span className={styles.errorDB}>{errorSubmit as React.ReactNode}</span>
						)}
						<span className={styles.notice}>
							Already have an account? <Link to="/login">Login here.</Link>
						</span>
					</form>
				</>
			) : (
				<UILoader />
			)}
		</div>
	);
};
