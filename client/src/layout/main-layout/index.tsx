import clsx from 'clsx';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets';

export const MainLayout: React.FC = () => {
	return (
		<div className={clsx(styles.layout)}>
			<Header />
			<div className="container-md space">
				<Outlet />
			</div>
		</div>
	);
};
