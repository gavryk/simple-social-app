import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IAuthTypes } from '../../common';
import { authSelector } from '../../store/slices/auth/selector';

export const PrivateRoute: React.FC = () => {
	const [user, setUser] = useState<IAuthTypes>({} as IAuthTypes);
	const { auth } = useSelector(authSelector);
	const location = useLocation();

	useEffect(() => {
		setUser(auth as IAuthTypes);
	}, [auth]);

	return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
