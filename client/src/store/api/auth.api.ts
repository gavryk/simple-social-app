import { IAuthTypes, IRegisterFormTypes } from '../../common';
import { api } from './api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAuthUser: builder.query<IAuthTypes, void>({
			query: () => `/auth/profile`,
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
			invalidatesTags: () => [
				{
					type: 'Auth',
				},
			],
		}),
	}),
});

export const { useGetAuthUserQuery, useRegisterUserMutation, useLoginUserMutation } = authApi;
