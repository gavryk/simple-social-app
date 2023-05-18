import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../widgets';

export const MainLayout: React.FC = () => {
	const location = useLocation();
	const isProfilePage = location.pathname.includes('/profile/');

	return (
		<div className={clsx(styles.layout)}>
			<Header />
			<div className={clsx({ container: isProfilePage, 'container-md': !isProfilePage }, 'space')}>
				<Outlet />
			</div>
		</div>
	);
};
