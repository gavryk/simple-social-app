import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import settings from './slices/settings/slice';
import auth from './slices/auth/slice';
import { api } from './api/api';
import { newsApi } from './api/news.api';
import { geoApi } from './api/geo.api';

export const store = configureStore({
	reducer: {
		settings,
		auth,
		[api.reducerPath]: api.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		[geoApi.reducerPath]: geoApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware, newsApi.middleware, geoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
