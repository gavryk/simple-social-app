import React from 'react';
import { UIAvatar, UIBox, UIDropzone, UIInput } from '@/components';
import styles from './styles.module.scss';
import { IAuthTypes, IPost } from '@/common/interfaces';
import { useForm } from 'react-hook-form';
import { useUploadPhoto } from '@/hooks';

interface AddPostProps {
	user: IAuthTypes | null;
}

export const AddPost: React.FC<AddPostProps> = ({ user }) => {
	const { uploadLoading, removeLoading, picture, file, setFile, setUserImage, pictureLoaded } =
		useUploadPhoto();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IPost>();

	const onSubmit = async (data: IPost) => {
		console.log(data);
	};

	return (
		<UIBox>
			<div className={styles.root}>
				<UIAvatar src={user?.picturePath} alt={user?.email} />
				<form onSubmit={handleSubmit(onSubmit)}>
					<UIInput
						placeholder="What's on your mind..."
						type="text"
						bottomSpaceOff
						rounded
						bg
						required
					/>
				</form>
				<div className={styles.uploadPicture}>
					<UIDropzone setImage={setUserImage} imageLoad={pictureLoaded} file={file} fullWidth />
				</div>
			</div>
		</UIBox>
	);
};
