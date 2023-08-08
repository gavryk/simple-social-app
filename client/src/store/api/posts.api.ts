import { IPost } from '@/common/interfaces/postsTypes';
import { api } from './api';

export const postsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllPosts: builder.query<IPost[], void>({
			query: () => `/posts`,
			providesTags: ['Posts'],
		}),
	}),
});

export const { useGetAllPostsQuery } = postsApi;
