import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../widgets';
import { useEffect } from 'react';
import { useSocket } from '@/context';

export const MainLayout: React.FC = () => {
	const location = useLocation();
	const isProfilePage = location.pathname.includes('/profile/');
	const { socket } = useSocket();

	useEffect(() => {
		const handleGetNotification = (data: any) => {
			console.log(data);
		};

		socket?.on('getNotification', handleGetNotification);

		return () => {
			socket?.off('getNotification', handleGetNotification);
		};
	}, [socket]);

	return (
		<div className={clsx(styles.layout)}>
			<Header />
			<div className={clsx({ container: isProfilePage, 'container-md': !isProfilePage }, 'space')}>
				<Outlet />
			</div>
		</div>
	);
};
