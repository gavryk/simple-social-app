import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { useRegisterMutation } from '../../store/api/auth.api';
import { useNavigate } from 'react-router-dom';
import { UIDropzone } from '../../components';
import { ImageUpload } from '../../common';

export const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [register] = useRegisterMutation();
	const [image, setImage] = useState();
	const [file, setFile] = useState<ImageUpload>({
		file: null,
		imagePreviewUrl: '',
		fileLoaded: false,
	});

	useEffect(() => {
		console.log(image);
		// register({
		// 	firstName: 'Bepko',
		// 	lastName: 'Bepko Test',
		// 	email: 'bepko@gmail.com',
		// 	password: '1456300emu',
		// 	picturePath: '',
		// 	friends: [],
		// 	location: 'Pekin',
		// 	occupation: '',
		// });
	}, [image]);

	return (
		<div>
			<UIDropzone setImage={setImage} imageLoad={true} />
		</div>
	);
};
