import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import settings from './slices/settings/slice';

export const store = configureStore({
	reducer: {
		settings,
	},
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
