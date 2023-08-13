import { UIButton, UIDropzone, UILoader, UITypography } from '@/components';

import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useUpdateUserMutation } from '@/store/api/users.api';
import { RootState } from '@/store/store';
import { useUploadPhoto } from '@/hooks';

export const UpdateUserPhoto: React.FC = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const {
		uploadLoading,
		removeImageAPI,
		removeLoading,
		picture,
		file,
		setFile,
		setUserImage,
		pictureLoaded,
	} = useUploadPhoto();
	const [updateUser] = useUpdateUserMutation();
	const [uploadMode, setUploadMode] = useState(false);

	const handlePhoto = useCallback(
		async (type?: 'remove' | 'update') => {
			const userData = { ...user, picturePath: picture };
			if (type === 'remove' && user) {
				if (window.confirm('Are you sure you want to delete the photo?')) {
					const fileUrl = user.picturePath.replace('/uploads/', '');
					await removeImageAPI(fileUrl);
					await updateUser({ id: user?._id, ...userData });
				}
			} else if (type === 'update') {
				await updateUser({ id: user?._id, ...userData })
					.unwrap()
					.then(() => {
						setFile({ file: null, imagePreviewUrl: '' });
						setUploadMode(false);
					});
			}
		},
		[user, picture],
	);

	return (
		<div className={styles.root}>
			<UITypography variant="h3" fontWeight="medium">
				Your Photo
			</UITypography>
			{!uploadLoading || !removeLoading ? (
				<>
					{user?.picturePath !== '' && (
						<div className={styles.currentPhoto}>
							<img src={`${import.meta.env.VITE_BASE_URL}${user?.picturePath}`} alt="" />
							<button className={styles.removeButton} onClick={() => handlePhoto('remove')}>
								X
							</button>
						</div>
					)}
					{uploadMode && (
						<div className={styles.uploadZone}>
							<UIDropzone setImage={setUserImage} imageLoad={pictureLoaded} file={file} fullWidth />
						</div>
					)}
					<div className={styles.buttonsWrapper}>
						{uploadMode && (
							<UIButton onClick={() => handlePhoto('update')} color="orange">
								Save Photo
							</UIButton>
						)}
						<UIButton fluid={!uploadMode ? true : false} onClick={() => setUploadMode(!uploadMode)}>
							{!uploadMode ? 'New Photo' : 'Cancel'}
						</UIButton>
					</div>
				</>
			) : (
				<UILoader />
			)}
		</div>
	);
};
