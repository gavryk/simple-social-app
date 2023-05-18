import { IAuthTypes } from '../../common';
import { api } from './api';

export const usersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllUser: builder.query<IAuthTypes[], void>({
			query: () => `/users`,
			providesTags: ['Users'],
		}),
		getUser: builder.query({
			query: (id) => `/users/${id}`,
		}),
		updateUser: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Auth', 'Users'],
		}),
		updateFriends: builder.mutation({
			query: ({ id, friendId }) => ({
				url: `/users/${id}/${friendId}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['Auth', 'Users'],
		}),
	}),
});

export const {
	useGetAllUserQuery,
	useGetUserQuery,
	useUpdateUserMutation,
	useUpdateFriendsMutation,
} = usersApi;
