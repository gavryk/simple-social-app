import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import { Logo, UITypography } from '../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/slices/auth/selector';

export const Header: React.FC = () => {
	const { user } = useSelector(authSelector);
	return (
		<header className={clsx(styles.root)}>
			<div className={`container-md ${styles.headerWrapper}`}>
				<Logo link="/" size="lg" />
				<div className={styles.rightHeader}>
					<div className={styles.userInfo}>
						<UITypography variant="span" bottomSpace="none">
							{user?.firstName} {user?.lastName}
						</UITypography>
					</div>
				</div>
			</div>
		</header>
	);
};
