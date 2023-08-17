import React, { useCallback, useState } from 'react';
import { UIAvatar, UIBox, UIButton, UIDropzone, UIInput } from '@/components';
import styles from './styles.module.scss';
import { IAuthTypes, IPost } from '@/common/interfaces';
import { useForm } from 'react-hook-form';
import { useUploadPhoto } from '@/hooks';
import { BiImage } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import clsx from 'clsx';
import { useAddPostMutation } from '@/store/api/posts.api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useMediaQuery from '@/hooks/useMediaQuery';

interface AddPostProps {
	user: IAuthTypes | null;
}

export const AddPost: React.FC<AddPostProps> = ({ user }) => {
	const admin = useSelector((state: RootState) => state.auth.user);
	const {
		uploadLoading,
		removeLoading,
		picture,
		setPicture,
		file,
		setFile,
		setUserImage,
		pictureLoaded,
	} = useUploadPhoto();
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [addPost] = useAddPostMutation();
	const mobile = useMediaQuery('(max-width: 576px)');

	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IPost>();
	const inputValue = watch('description', '');

	const onSubmit = useCallback(
		async (data: any) => {
			await addPost({ ...data, userId: admin?._id, picturePath: picture.replace('/uploads', '') })
				.unwrap()
				.then((data) => {
					reset({
						description: '',
						location: '',
					});
					setFile({ file: null, imagePreviewUrl: '' });
					setShowOptions(false);
					setPicture('');
				})
				.catch((err) => {
					console.log(err.data.message || err.data[0].msg);
				});
		},
		[picture],
	);

	return (
		<UIBox>
			<div className={styles.root}>
				{!mobile && <UIAvatar src={user?.picturePath} alt={user?.email} />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.addText}>
						<UIInput
							placeholder="What's on your mind..."
							type="text"
							bottomSpaceOff
							rounded
							required
							borderOff
							{...register('description', { required: 'Please enter post text.' })}
							error={errors.description && errors.description.message}
						/>
						<UIButton type="submit" disabled={uploadLoading || removeLoading || !inputValue}>
							Add Post
						</UIButton>
					</div>
					{showOptions && (
						<UIInput
							placeholder="Location"
							type="text"
							bottomSpaceOff
							rounded
							borderOff
							bg
							{...register('location', { required: 'Please enter location.' })}
							error={errors.location && errors.location.message}
						/>
					)}
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
							onClick={() => setShowOptions(!showOptions)}
						>
							<BiImage size="20" />
							<span>{!showOptions ? 'Add Image' : 'Hide Dropzone'}</span>
						</div>
					</div>
				</div>
			</div>
		</UIBox>
	);
};
