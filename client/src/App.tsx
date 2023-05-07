import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { PrivateRoute } from './features/auth/PrivateRoute';
import { useGetAuthUserQuery } from './store/api/auth.api';
import { useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { setAuth } from './store/slices/auth/slice';
import { UILoader } from './components';
import { Users } from './pages/Users';

const App = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { isLoading, data } = useGetAuthUserQuery();

	useEffect(() => {
		if (!isLoading && data) dispatch(setAuth({ ...data }));
	}, [dispatch, isLoading, data]);

	if (isLoading) return <UILoader />;

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<MainLayout />}>
				<Route element={<PrivateRoute />}>
					<Route path="" element={<Home />} />
					<Route path="/profile/:userId" element={<Profile />} />
					<Route path="/users" element={<Users />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>
		</Routes>
	);
};

export default App;
