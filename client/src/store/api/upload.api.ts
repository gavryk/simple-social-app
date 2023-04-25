import { ImageUpload } from '../../common';
import { api } from './api';

export const uploadApi = api.injectEndpoints({
	endpoints: (builder) => ({
		uploadImageAPI: builder.mutation<void, ImageUpload>({
			query: ({ file }) => ({
				body: file,
				url: '/upload',
				method: 'POST',
			}),
		}),
	}),
});

export const { useUploadImageAPIMutation } = uploadApi;
