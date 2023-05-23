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
import { useSocket } from '@/context';

interface MenuList {
	menu: MenuItem[];
	mobile?: boolean;
}

export const MenuList: React.FC<MenuList> = ({ menu, mobile = false }) => {
	const dispatch = useAppDispatch();
	const [userLogOut] = useUserLogOutMutation();
	const { mobileMenuActive } = useSelector(settingsSelector);
	const { socket } = useSocket();

	const logOut = async () => {
		if (window.confirm('Are you sure you want to log out?')) {
			await userLogOut();
			dispatch(setLogout());
			socket?.emit('disconnect');
		}
	};

	if (!mobile) {
		return (
			<>
				{menu.map((item) => (
					<React.Fragment key={item.id}>
						{item.title !== 'Logout' ? (
							<li>
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
							<li onClick={logOut}>
								{item.title} {item.icon && <UIIcon name={item.icon} />}
							</li>
						)}
					</React.Fragment>
				))}
			</>
		);
	} else {
		return (
			<ul className={clsx(styles.mobileMenu, { [styles.active]: mobileMenuActive })}>
				<li>
					<Link to="/users">Users</Link>
				</li>
				{menu.map((item, index) => (
					<React.Fragment key={item.id}>
						{item.title !== 'Logout' ? (
							<li>{item.link ? <Link to={item.link}>{item.title}</Link> : <>{item.title}</>}</li>
						) : (
							<li onClick={logOut}>{item.title}</li>
						)}
					</React.Fragment>
				))}
			</ul>
		);
	}
};
