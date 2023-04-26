import React from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './styles.module.scss';
import { ImageUpload } from '../../common';
import clsx from 'clsx';
import { UIAvatarLoader } from '../ui-avatar-loader';

type DropZoneType = {
	setImage: (file: any) => void;
	imageLoad: boolean;
	file: ImageUpload;
	fullWidth?: boolean;
};

export const UIDropzone: React.FC<DropZoneType> = ({ setImage, imageLoad, file, fullWidth }) => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		minSize: 0,
		maxSize: 2097152,
		multiple: false,
		onDrop: (acceptedFiles) => {
			let formData = new FormData();
			formData.append('image', acceptedFiles[0]);
			setImage({
				file: formData,
				imagePreviewUrl: URL.createObjectURL(acceptedFiles[0]),
			});
		},
	});

	const handleRemoveImage = () => {
		setImage({
			file: null,
			imagePreviewUrl: '',
		});
	};

	if (!imageLoad) return <UIAvatarLoader />;

	return (
		<section
			className={clsx(styles.root, {
				[styles.fullWidth]: fullWidth,
				[styles.active]: file.file,
			})}>
			{file.file === null && (
				<div {...getRootProps({ className: styles.dropzone })}>
					<input {...getInputProps()} />
					<AiOutlinePlusCircle size="30" />
				</div>
			)}
			<div className={styles.preview}>
				{file.file && (
					<div key={file.imagePreviewUrl} className={styles.image}>
						<img
							src={file.imagePreviewUrl}
							onLoad={() => {
								URL.revokeObjectURL(file.imagePreviewUrl);
							}}
						/>
						<button className={styles.removeButton} onClick={handleRemoveImage}>
							X
						</button>
					</div>
				)}
			</div>
		</section>
	);
};
