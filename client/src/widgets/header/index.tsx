import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import { Logo, UIBurger } from '../../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../../store/slices/auth/selector';
import { AdditionalIcons, AuthInfo } from './ui';
import useMediaQuery from '../../hooks/useMediaQuery';

export const Header: React.FC = () => {
	const { user } = useSelector(authSelector);
	const mobile = useMediaQuery('(max-width: 768px)');
	return (
		<header className={clsx(styles.root)}>
			<div className={`container-md ${styles.headerWrapper}`}>
				<Logo link="/" size="lg" />
				{user && (
					<>
						<AdditionalIcons />
						{mobile ? <UIBurger /> : <AuthInfo user={user} />}
					</>
				)}
			</div>
		</header>
	);
};
