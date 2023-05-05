import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import { Logo } from '../../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/slices/auth/selector';
import { AdditionalIcons, AuthInfo } from './ui';

export const Header: React.FC = () => {
	const { user } = useSelector(authSelector);
	return (
		<header className={clsx(styles.root)}>
			<div className={`container-md ${styles.headerWrapper}`}>
				<Logo link="/" size="lg" />
				{user && (
					<>
						<AdditionalIcons />
						<AuthInfo user={user} />
					</>
				)}
			</div>
		</header>
	);
};
