import { IAuthTypes, IRegisterFormTypes } from '@/common';
import { api } from './api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAuthUser: builder.query<IAuthTypes, void>({
			query: () => `/auth/profile`,
			providesTags: ['Auth'],
		}),
		registerUser: builder.mutation<void, IRegisterFormTypes>({
			query: (user) => ({
				body: user,
				url: '/auth/register',
				method: 'POST',
			}),
		}),
		loginUser: builder.mutation({
			query: (user) => ({
				body: user,
				url: '/auth/login',
				method: 'POST',
				credentials: 'include',
			}),
			invalidatesTags: () => ['Auth', 'Users'],
		}),
		userLogOut: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: () => ['Auth', 'Users'],
		}),
	}),
});

export const {
	useGetAuthUserQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useUserLogOutMutation,
} = authApi;
