import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { PrivateRoute } from './features/auth/PrivateRoute';
import { useGetAuthUserQuery } from './store/api/auth.api';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from './store/store';
import { setAuth } from './store/slices/auth/slice';
import { UILoader } from './components';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { useSelector } from 'react-redux';
import { useSocket } from './context';

const App = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const user = useSelector((state: RootState) => state.auth.user);
	const { isLoading, data } = useGetAuthUserQuery();
	const { socket } = useSocket();

	useEffect(() => {
		socket?.emit('newUser', `${user?.firstName} ${user?.lastName}`);
	}, [socket, user]);

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
					<Route path="/settings" element={<Settings />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>
		</Routes>
	);
};

export default App;
