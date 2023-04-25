import React from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './styles.module.scss';
import { ImageUpload } from '../../common';

type DropZoneType = {
	setImage: (file: any) => void;
	imageLoad: boolean;
	file: ImageUpload;
};

export const UIDropzone: React.FC<DropZoneType> = ({ setImage, imageLoad, file }) => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		minSize: 0,
		maxSize: 2097152,
		multiple: false,
		onDrop: (acceptedFiles) => {
			setImage({
				file: acceptedFiles[0],
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

	return (
		<section className={styles.root}>
			{file.file === null && (
				<div {...getRootProps({ className: styles.dropzone })}>
					<input {...getInputProps()} />
					<AiOutlinePlusCircle size="30" />
				</div>
			)}
			{!imageLoad ? (
				<div>Loading...</div>
			) : (
				<div>
					{file.file && (
						<div key={file.imagePreviewUrl}>
							<div>
								<img
									src={file.imagePreviewUrl}
									onLoad={() => {
										URL.revokeObjectURL(file.imagePreviewUrl);
									}}
								/>
							</div>
							<button onClick={handleRemoveImage}>X</button>
						</div>
					)}
				</div>
			)}
		</section>
	);
};
