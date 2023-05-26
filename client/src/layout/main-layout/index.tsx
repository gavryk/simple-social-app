import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../widgets';
import { useEffect } from 'react';
import { useSocket } from '@/context';
import { useAppDispatch } from '@/store/store';
import { setNotification } from '@/store/slices/auth/slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MainLayout: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const isProfilePage = location.pathname.includes('/profile/');
	const { socket } = useSocket();

	useEffect(() => {
		const handleGetNotification = (data: any) => {
			dispatch(
				setNotification(
					`User ${data.sender.name} ${data.type === 'follow' ? 'follow' : 'unfollow'} you!`,
				),
			);
			if (data.type === 'follow') {
				toast.success(`User ${data.sender.name} follow you!`, {
					position: 'bottom-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'dark',
				});
			} else if (data.type === 'unfollow') {
				toast.warn(`User ${data.sender.name} unfollow you!`, {
					position: 'bottom-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'dark',
				});
			}
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
				<ToastContainer />
				<Outlet />
			</div>
		</div>
	);
};
