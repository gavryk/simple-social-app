import { UIButton, UIGrid, UIInput, UITypography } from '@/components';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useSocialIcons } from '@/hooks/useSocialIcon';
import { useForm } from 'react-hook-form';

export const UpdateUserSC: React.FC = () => {
	const { user } = useSelector(authSelector);
	const [editMode, setEditMode] = useState<boolean>(false);

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
		console.log(data);
	};

	return (
		<div className={styles.root}>
			<UITypography variant="h3" fontWeight="medium">
				Your Social Media
			</UITypography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<UIGrid columns={1} gridGap={3}>
					<UIInput
						type="text"
						id="userTwitter"
						placeholder="Twitter"
						disabled
						{...register('Twitter')}
					/>
					<UIInput
						type="text"
						id="userFacebook"
						placeholder="Facebook"
						disabled
						{...register('Facebook', { required: false })}
					/>
					<UIInput
						type="text"
						id="userGithub"
						placeholder="Github"
						disabled
						{...register('Github', { required: false })}
					/>
					<UIInput
						type="text"
						id="userLinkedin"
						placeholder="Linkedin"
						disabled
						{...register('Linkedin', { required: false })}
					/>
					<UIInput
						type="text"
						id="emailInstagram"
						placeholder="Instagram"
						disabled
						{...register('Instagram', { required: false })}
					/>
				</UIGrid>
				<div className={styles.buttons}>
					<UIButton type="submit">Update</UIButton>
				</div>
			</form>
		</div>
	);
};
