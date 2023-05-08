import { UIButton, UIDropzone, UITypography } from '@/components';
import { useUploadUserPhoto } from '@/hooks';
import { authSelector } from '@/store/slices/auth/selector';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useUpdateUserPhotoMutation } from '@/store/api/users.api';

export const UpdateUserPhoto: React.FC = () => {
	const { user } = useSelector(authSelector);
	const {
		uploadLoading,
		removeLoading,
		avatar,
		file,
		setFile,
		setUserImage,
		avatarLoaded,
		setAvatar,
	} = useUploadUserPhoto();
	const [updateUserPhoto] = useUpdateUserPhotoMutation();
	const [uploadMode, setUploadMode] = useState(false);

	const handleRemovePhoto = async () => {
		await updateUserPhoto({ id: user?._id, picturePath: '' });
	};

	const handleSavePhoto = async () => {
		await updateUserPhoto({ id: user?._id, picturePath: avatar })
			.unwrap()
			.then((data) => {
				setFile({ file: null, imagePreviewUrl: '' });
			});
	};

	return (
		<div>
			<UITypography variant="h3" fontWeight="medium">
				User Photo
			</UITypography>
			{user?.picturePath !== '' && (
				<div className={styles.currentPhoto}>
					<img src={`${import.meta.env.VITE_BASE_URL}${user?.picturePath}`} alt="" />
				</div>
			)}
			<div className={styles.uploadZone}>
				<UIDropzone setImage={setUserImage} imageLoad={avatarLoaded} file={file} fullWidth />
			</div>
			<UIButton color="red" onClick={handleRemovePhoto}>
				Remove Photo
			</UIButton>
			<UIButton onClick={handleSavePhoto}>Save Photo</UIButton>
		</div>
	);
};
