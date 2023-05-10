import { ImageUpload } from '@/common';
import { useRemoveImageAPIMutation, useUploadImageAPIMutation } from '@/store/api/upload.api';
import { useState } from 'react';

export const useUploadUserPhoto = () => {
	const [uploadImageAPI, { isLoading: uploadLoading }] = useUploadImageAPIMutation();
	const [removeImageAPI, { isLoading: removeLoading }] = useRemoveImageAPIMutation();
	const [avatar, setAvatar] = useState('');
	const [avatarLoaded, setAvatarLoaded] = useState(true);
	const [file, setFile] = useState<ImageUpload>({ file: null, imagePreviewUrl: '' });

	const setUserImage = async (imageFile: ImageUpload) => {
		setFile(imageFile);
		setAvatarLoaded(false);
		if (imageFile.file) {
			try {
				const res = await uploadImageAPI(imageFile.file).unwrap();
				setAvatar(res.url);
				setAvatarLoaded(true);
			} catch (err) {
				console.log(err);
				setAvatarLoaded(true);
			}
		} else {
			setAvatar('');
			const fileUrl = avatar.replace('/uploads/', '');
			await removeImageAPI(fileUrl).then(() => {
				setAvatarLoaded(true);
			});
		}
	};

	return {
		uploadLoading,
		removeLoading,
		removeImageAPI,
		avatar,
		file,
		setFile,
		setUserImage,
		avatarLoaded,
		setAvatar,
	};
};
