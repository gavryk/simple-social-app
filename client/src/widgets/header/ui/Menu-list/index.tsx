import React from 'react';
import { MenuItem } from '../../../../common';
import { Link } from 'react-router-dom';
import { UIIcon } from '../../../../components';
import { useUserLogOutMutation } from '../../../../store/api/auth.api';
import { setLogout } from '../../../../store/slices/auth/slice';
import { useAppDispatch } from '../../../../store/store';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../../../../store/slices/settings/selector';
import clsx from 'clsx';

interface MenuList {
	menu: MenuItem[];
	mobile?: boolean;
}

export const MenuList: React.FC<MenuList> = ({ menu, mobile = false }) => {
	const dispatch = useAppDispatch();
	const [userLogOut] = useUserLogOutMutation();
	const { mobileMenuActive } = useSelector(settingsSelector);

	const logOut = async () => {
		if (window.confirm('Are you sure you want to log out?')) {
			await userLogOut();
			dispatch(setLogout());
		}
	};

	if (!mobile) {
		return (
			<>
				{menu.map((item) => (
					<>
						{item.title !== 'Logout' ? (
							<li key={item.id}>
								{item.link ? (
									<Link to={item.link}>
										{item.title} {item.icon && <UIIcon name={item.icon} />}
									</Link>
								) : (
									<>
										{item.title} {item.icon && <UIIcon name={item.icon} />}
									</>
								)}
							</li>
						) : (
							<li key={item.id} onClick={logOut}>
								{item.title} {item.icon && <UIIcon name={item.icon} />}
							</li>
						)}
					</>
				))}
			</>
		);
	} else {
		return (
			<ul className={clsx(styles.mobileMenu, { [styles.active]: mobileMenuActive })}>
				{menu.map((item) => (
					<>
						{item.title !== 'Logout' ? (
							<li key={item.id}>
								{item.link ? <Link to={item.link}>{item.title}</Link> : <>{item.title}</>}
							</li>
						) : (
							<li key={item.id} onClick={logOut}>
								{item.title}
							</li>
						)}
					</>
				))}
			</ul>
		);
	}
};
