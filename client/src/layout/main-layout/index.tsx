import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Notifications } from '../../widgets';
import { useEffect } from 'react';
import { useSocket } from '@/context';
import { useAppDispatch } from '@/store/store';
import { setNotification } from '@/store/slices/auth/slice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showFollowNotification, showUnfollowNotification } from '@/hooks';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { settingsSelector } from '@/store/slices/settings/selector';

export const MainLayout: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useSelector(authSelector);
	const { visibleNotification } = useSelector(settingsSelector);
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
				showFollowNotification(data.sender.name);
			} else if (data.type === 'unfollow') {
				showUnfollowNotification(data.sender.name);
			}
		};

		socket?.on('getNotification', handleGetNotification);

		return () => {
			socket?.off('getNotification', handleGetNotification);
		};
	}, [socket]);

	return (
		<div className={clsx(styles.layout, { [styles.notificationActive]: visibleNotification })}>
			<Header />
			<div className={clsx({ container: isProfilePage, 'container-md': !isProfilePage }, 'space')}>
				<Notifications list={user?.notifications} />
				<ToastContainer />
				<Outlet />
			</div>
		</div>
	);
};
