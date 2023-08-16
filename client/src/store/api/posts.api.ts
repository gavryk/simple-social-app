import { IPost } from '@/common/interfaces/postsTypes';
import { api } from './api';

export const postsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllPosts: builder.query<IPost[], void>({
			query: () => `/posts`,
			providesTags: ['Posts'],
		}),
		getUserPosts: builder.query({
			query: (id) => `posts/${id}/posts`,
			providesTags: ['Posts'],
		}),
		addPost: builder.mutation({
			query: (post) => ({
				body: post,
				url: '/posts',
				method: 'POST',
				credentials: 'include',
			}),
			invalidatesTags: () => ['Posts', 'Users'],
		}),
	}),
});

export const { useGetAllPostsQuery, useGetUserPostsQuery, useAddPostMutation } = postsApi;
