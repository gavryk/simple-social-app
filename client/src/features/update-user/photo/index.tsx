import { UIDropzone, UITypography } from '@/components';
import { useUploadUserPhoto } from '@/hooks';
import { authSelector } from '@/store/slices/auth/selector';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

export const UpdateUserPhoto: React.FC = () => {
	const { user } = useSelector(authSelector);
	const { uploadLoading, removeLoading, avatar, file, setFile, setUserImage, avatarLoaded } =
		useUploadUserPhoto();
	const [uploadMode, setUploadMode] = useState(false);

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
		</div>
	);
};
