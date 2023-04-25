import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../store/api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { UIButton, UIDropzone, UIInput, UITypography } from '../../components';
import { IRegisterFormTypes, ImageUpload } from '../../common';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useUploadImageAPIMutation } from '../../store/api/upload.api';

export const RegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const [registerUser] = useRegisterUserMutation();
	const [uploadImageAPI, { data: imageData }] = useUploadImageAPIMutation();
	const [avatar, setAvatar] = useState('');
	const [avatarLoaded, setAvatarLoaded] = useState(true);
	const [file, setFile] = useState<ImageUpload>({
		file: null,
		imagePreviewUrl: '',
	});

	const setUserImage = async (imageFile: ImageUpload) => {
		setFile(imageFile);
		setAvatarLoaded(false);
		if (imageFile.file) {
			try {
				const response = await uploadImageAPI(imageFile.file);
				console.log(response);
				setAvatarLoaded(true);
			} catch (err) {
				console.log(err);
				setAvatarLoaded(true);
			}
		}
	};

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterFormTypes>();

	const onSubmit = async (data: IRegisterFormTypes) => {
		console.log(file);
		// await registerUser({
		// 	...data,
		// 	picturePath: image,
		// });
	};

	return (
		<div className={styles.registerForm}>
			<UITypography variant="h2" fontWeight="bold" bottomSpace="sm" textAlign="center">
				Register
			</UITypography>
			<UIDropzone setImage={setUserImage} imageLoad={avatarLoaded} file={file} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={clsx(styles.fieldsWrapper, styles.cols2)}>
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
				<div className={clsx(styles.fieldsWrapper, styles.cols1)}>
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
