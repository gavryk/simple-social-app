import { IAuthTypes, ILoginTypes, IRegisterTypes } from '../../common';
import { api } from './api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<void, IRegisterTypes>({
			query: (user) => ({
				body: user,
				url: '/auth/register',
				method: 'POST',
			}),
		}),
		login: builder.mutation({
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

export const { useRegisterMutation, useLoginMutation } = authApi;
