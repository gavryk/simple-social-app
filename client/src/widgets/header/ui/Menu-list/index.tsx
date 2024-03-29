import React, { useCallback } from 'react';
import { MenuItem } from '../../../../common';
import { Link } from 'react-router-dom';
import { UIIcon } from '../../../../components';
import { useUserLogOutMutation } from '../../../../store/api/auth.api';
import { setLogout } from '../../../../store/slices/auth/slice';
import { useAppDispatch } from '../../../../store/store';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useSocket } from '@/context';

interface MenuList {
	menu: MenuItem[];
	mobile?: boolean;
	mobileMenuActive: boolean;
}

export const MenuList: React.FC<MenuList> = React.memo(
	({ menu, mobile = false, mobileMenuActive }) => {
		const dispatch = useAppDispatch();
		const [userLogOut] = useUserLogOutMutation();
		const { socket } = useSocket();

		const logOut = useCallback(async () => {
			if (window.confirm('Are you sure you want to log out?')) {
				await userLogOut();
				dispatch(setLogout());
				socket?.emit('disconnect');
			}
		}, [userLogOut, dispatch, socket]);

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
	},
);
