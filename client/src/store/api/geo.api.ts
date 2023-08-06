import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geoApi = createApi({
	reducerPath: 'geoApi',
	tagTypes: ['Geo'],
	baseQuery: fetchBaseQuery({
		baseUrl: `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_GEO_API_KEY}`,
	}),
	endpoints: (builder) => ({
		getGeoLocation: builder.query({
			query: () => '',
			providesTags: ['Geo'],
		}),
	}),
});

export const { useGetGeoLocationQuery } = geoApi;
