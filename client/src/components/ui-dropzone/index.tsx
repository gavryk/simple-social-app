import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type DropZoneType = {
	setImage: (file: any) => void;
	imageLoad: boolean;
};

export const UIDropzone: React.FC<DropZoneType> = ({ setImage, imageLoad }) => {
	const [files, setFiles] = useState<any[]>([]);
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		minSize: 0,
		maxSize: 2097152,
		multiple: false,
		onDrop: async (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					}),
				),
			);
			setImage({
				file: acceptedFiles[0],
				imagePreviewUrl: URL.createObjectURL(acceptedFiles[0]),
				fileLoaded: true,
			});
		},
	});

	useEffect(() => {
		return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
	}, []);

	const handleRemoveImage = () => {
		setFiles([]);
		setImage({
			file: null,
			imagePreviewUrl: '',
			fileLoaded: false,
		});
	};

	return (
		<section className="container">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
				<em>(Only *.jpeg and *.png images will be accepted)</em>
			</div>
			{!imageLoad ? (
				<div>Loading...</div>
			) : (
				<div>
					{files.map((file) => (
						<div key={file.name}>
							<div>
								<img
									src={file.preview}
									onLoad={() => {
										URL.revokeObjectURL(file.preview);
									}}
								/>
							</div>
							<button onClick={handleRemoveImage}>X</button>
						</div>
					))}
				</div>
			)}
		</section>
	);
};
