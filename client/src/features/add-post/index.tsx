import React, { useState } from 'react';
import { UIAvatar, UIBox, UIDropzone, UIInput } from '@/components';
import styles from './styles.module.scss';
import { IAuthTypes, IPost } from '@/common/interfaces';
import { useForm } from 'react-hook-form';
import { useUploadPhoto } from '@/hooks';
import { BiImage } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import clsx from 'clsx';

interface AddPostProps {
	user: IAuthTypes | null;
}

export const AddPost: React.FC<AddPostProps> = ({ user }) => {
	const { uploadLoading, removeLoading, picture, file, setFile, setUserImage, pictureLoaded } =
		useUploadPhoto();
	const [showOptions, setShowOptions] = useState<string>('');

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IPost>();

	const onSubmit = async (data: IPost) => {};

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
				<div className={styles.options}>
					<div className={styles.optionsItems}>
						{showOptions && (
							<div className={clsx(styles.optionsItem)}>
								<UIDropzone
									setImage={setUserImage}
									imageLoad={pictureLoaded}
									file={file}
									fullWidth
								/>
							</div>
						)}
					</div>
					<div className={styles.handleButtons}>
						<div
							className={clsx(styles.imageHandle, styles.handleBtn)}
							onClick={() => setShowOptions('image')}
						>
							<BiImage size="20" />
							<span>Image</span>
						</div>
						{showOptions !== '' && (
							<div className={clsx(styles.handleClose)} onClick={() => setShowOptions('')}>
								<AiFillCloseCircle size="20" />
							</div>
						)}
					</div>
				</div>
			</div>
		</UIBox>
	);
};
