import { ImageUpload } from '@/common';
import { useRemoveImageAPIMutation, useUploadImageAPIMutation } from '@/store/api/upload.api';
import { useState, useEffect } from 'react';

export const useUploadPhoto = () => {
	const [uploadImageAPI, { isLoading: uploadLoading }] = useUploadImageAPIMutation();
	const [removeImageAPI, { isLoading: removeLoading }] = useRemoveImageAPIMutation();
	const [picture, setPicture] = useState<string>('');
	const [pictureLoaded, setPictureLoaded] = useState(true);
	const [file, setFile] = useState<ImageUpload>({ file: null, imagePreviewUrl: '' });

	const setUserImage = async (imageFile: ImageUpload) => {
		setFile(imageFile);
		setPictureLoaded(false);
		if (imageFile.file) {
			try {
				const res = await uploadImageAPI(imageFile.file).unwrap();
				setPicture(res.url);
				setPictureLoaded(true);
			} catch (err) {
				console.log(err);
				setPictureLoaded(true);
			}
		} else {
			if (picture !== '') {
				const fileUrl = picture.replace('/uploads/', '');
				await removeImageAPI(fileUrl).then(() => {
					setPicture('');
					setPictureLoaded(true);
				});
			} else {
				setPictureLoaded(true);
			}
		}
	};

	return {
		uploadLoading,
		removeLoading,
		removeImageAPI,
		picture,
		file,
		setFile,
		setUserImage,
		pictureLoaded,
		setPicture,
	};
};
