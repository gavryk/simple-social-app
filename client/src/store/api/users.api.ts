import { IAuthTypes } from '../../common';
import { api } from './api';

export const usersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllUser: builder.query({
			query: () => `/users`,
		}),
	}),
});
