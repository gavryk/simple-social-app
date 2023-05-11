import { UIButton, UIGrid, UIInput, UILoader, UITypography } from '@/components';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useSocialIcons } from '@/hooks/useSocialIcon';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/store/api/users.api';
import clsx from 'clsx';

export const UpdateUserSC: React.FC = () => {
	const { user } = useSelector(authSelector);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [updateUser, { isLoading }] = useUpdateUserMutation();

	const socialMedia: { [name: string]: string } = {
		Twitter: '',
		Facebook: '',
		Github: '',
		Linkedin: '',
		Instagram: '',
	};
	user?.social?.forEach((item) => {
		const { name, link } = item;
		if (name in socialMedia) {
			socialMedia[name] = link;
		}
	});

	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: socialMedia,
	});

	const onSubmit = async (data: any) => {
		const newData = Object.keys(data)
			.filter((key) => data[key] !== '')
			.map((key) => ({ name: key, link: data[key] }));
		await updateUser({ id: user?._id, social: newData })
			.unwrap()
			.then(() => {
				setEditMode(false);
			});
	};

	return (
		<div className={styles.root}>
			<UITypography variant="h3" fontWeight="medium">
				Your Social Media
			</UITypography>
			{isLoading && <UILoader />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={clsx(styles.form, { [styles.loading]: isLoading })}>
				<UIGrid columns={1} gridGap={3}>
					<UIInput
						type="text"
						id="userTwitter"
						placeholder="Twitter"
						disabled={editMode ? false : true}
						{...register('Twitter')}
					/>
					<UIInput
						type="text"
						id="userFacebook"
						placeholder="Facebook"
						disabled={editMode ? false : true}
						{...register('Facebook', { required: false })}
					/>
					<UIInput
						type="text"
						id="userGithub"
						placeholder="Github"
						disabled={editMode ? false : true}
						{...register('Github', { required: false })}
					/>
					<UIInput
						type="text"
						id="userLinkedin"
						placeholder="Linkedin"
						disabled={editMode ? false : true}
						{...register('Linkedin', { required: false })}
					/>
					<UIInput
						type="text"
						id="emailInstagram"
						placeholder="Instagram"
						disabled={editMode ? false : true}
						{...register('Instagram', { required: false })}
					/>
				</UIGrid>
				<div className={styles.buttons}>
					<UIButton onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</UIButton>
					<UIButton color="orange" type="submit">
						Update
					</UIButton>
				</div>
			</form>
		</div>
	);
};
