import { IRegisterFormTypes } from '../../common';
import { api } from './api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
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

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
