import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import { Logo, UIBurger } from '@/components';
import { useSelector } from 'react-redux';
import { AdditionalIcons, AuthInfo, MenuList } from './ui';
import useMediaQuery from '@/hooks/useMediaQuery';
import { RootState } from '@/store/store';

export const Header: React.FC = React.memo(() => {
	const user = useSelector((state: RootState) => state.auth.user);
	const menu = useSelector((state: RootState) => state.settings.menu);
	const mode = useSelector((state: RootState) => state.settings.mode);
	const mobileMenuActive = useSelector((state: RootState) => state.settings.mobileMenuActive);
	const mobile = useMediaQuery('(max-width: 768px)');

	return (
		<header className={clsx(styles.root)}>
			<div className={`container-md ${styles.headerWrapper}`}>
				<Logo link="/" size="lg" />
				{user && (
					<>
						<AdditionalIcons user={user} mode={mode} />
						{mobile ? <UIBurger /> : <AuthInfo user={user} />}
						{mobile && <MenuList menu={menu} mobile={true} mobileMenuActive={mobileMenuActive} />}
					</>
				)}
			</div>
		</header>
	);
});
