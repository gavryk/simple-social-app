import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import { Logo, UITypography } from '../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/slices/auth/selector';
import { AuthInfo } from './ui';

export const Header: React.FC = () => {
	const { user } = useSelector(authSelector);
	return (
		<header className={clsx(styles.root)}>
			<div className={`container-md ${styles.headerWrapper}`}>
				<Logo link="/" size="lg" />
				<div className={styles.rightHeader}>{user && <AuthInfo user={user} />}</div>
			</div>
		</header>
	);
};
