import { ImageUpload } from '../../common';
import { api } from './api';

export const uploadApi = api.injectEndpoints({
	endpoints: (builder) => ({
		uploadImageAPI: builder.mutation<any, ImageUpload>({
			query: (file) => ({
				body: file,
				url: '/upload',
				method: 'POST',
			}),
		}),
		removeImageAPI: builder.mutation<any, string>({
			query: (id) => ({
				body: id,
				url: `/upload/${id}`,
				method: 'delete',
			}),
		}),
	}),
});

export const { useUploadImageAPIMutation, useRemoveImageAPIMutation } = uploadApi;
