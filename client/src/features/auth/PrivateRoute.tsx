import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IAuthTypes } from '../../common';
import { authSelector } from '../../store/slices/auth/selector';

export const PrivateRoute: React.FC = () => {
	const [userState, setUserState] = useState<IAuthTypes>({} as IAuthTypes);
	const { user } = useSelector(authSelector);
	const location = useLocation();

	useEffect(() => {
		setUserState(user as IAuthTypes);
	}, [user]);

	return userState ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
