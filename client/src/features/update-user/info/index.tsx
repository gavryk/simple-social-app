import React, { useState } from 'react';
import { UIButton, UIGrid, UIInput, UITypography } from '@/components';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useForm } from 'react-hook-form';
import { IUpdateUserProps } from '@/common';
import { useUpdateUserMutation } from '@/store/api/users.api';
import styles from './styles.module.scss';

export const UpdateUserInfo: React.FC = () => {
	const { user } = useSelector(authSelector);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [updateUser] = useUpdateUserMutation();

	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IUpdateUserProps>({
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			location: user?.location,
			occupation: user?.occupation,
		},
	});

	const onSubmit = async (data: IUpdateUserProps) => {
		await updateUser({ id: user?._id, ...data })
			.unwrap()
			.then(() => {
				setEditMode(false);
			});
	};

	return (
		<div className={styles.root}>
			<UITypography variant="h3" fontWeight="medium">
				Your Information
			</UITypography>
			{!editMode ? (
				<UIGrid columns={2} gridGap={3}>
					<div className={styles.infoField}>
						<span>First Name:</span>
						<h4>{user?.firstName}</h4>
					</div>
					<div className={styles.infoField}>
						<span>Last Name:</span>
						<h4>{user?.lastName}</h4>
					</div>
					<div className={styles.infoField}>
						<span>Email:</span>
						<h4>{user?.email}</h4>
					</div>
					<div className={styles.infoField}>
						<span>Location:</span>
						<h4>{user?.location}</h4>
					</div>
					<div className={styles.infoField}>
						<span>Job/Position:</span>
						<h4>{user?.occupation}</h4>
					</div>
				</UIGrid>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<UIGrid columns={2} gridGap={3}>
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
							placeholder="Job/Position"
							{...register('occupation', { required: 'Please enter your Job/Position.' })}
							error={errors.occupation && errors.occupation.message}
						/>
						<UIInput
							type="email"
							id="emailField"
							placeholder="Email"
							{...register('email', { required: 'Please enter your email.' })}
							error={errors.email && errors.email.message}
						/>
					</UIGrid>
					<div className={styles.buttons}>
						<UIButton type="submit">Update</UIButton>
						<UIButton color="red" onClick={() => setEditMode(false)}>
							Cancel
						</UIButton>
					</div>
				</form>
			)}
			{!editMode && (
				<div className={styles.buttons}>
					<UIButton onClick={() => setEditMode(true)}>Edit</UIButton>
				</div>
			)}
		</div>
	);
};
