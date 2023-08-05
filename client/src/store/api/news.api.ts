import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
	reducerPath: 'newsApi',
	tagTypes: ['News'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://newsapi.org/v2/',
		prepareHeaders: (headers, { getState }) => {
			headers.set('X-Api-Key', import.meta.env.VITE_NEWS_API_KEY);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getWorldNews: builder.query({
			query: (url) => url,
			providesTags: ['News'],
		}),
	}),
});

export const { useGetWorldNewsQuery } = newsApi;
