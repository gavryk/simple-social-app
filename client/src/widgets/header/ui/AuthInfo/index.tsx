import React, { useEffect, useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import styles from './styles.module.scss';
import { IAuthTypes } from '../../../../common';
import clsx from 'clsx';
import { useUserLogOutMutation } from '../../../../store/api/auth.api';
import { useAppDispatch } from '../../../../store/store';
import { setLogout } from '../../../../store/slices/auth/slice';

interface AuthInfoProp {
	user: IAuthTypes | null;
}

type PopupClick = MouseEvent & {
	path: Node[];
};

export const AuthInfo: React.FC<AuthInfoProp> = React.memo(({ user }) => {
	const dispatch = useAppDispatch();
	const authRef = useRef<HTMLDivElement>(null);
	const [visibleSetting, setVisibleSetting] = useState(false);
	const [userLogOut] = useUserLogOutMutation();

	useEffect(() => {
		const clickOffSetPopup = (event: MouseEvent) => {
			const _event = event as PopupClick;
			if (authRef.current && !authRef.current.contains(_event.target as Node)) {
				setVisibleSetting(false);
			}
		};

		document.body.addEventListener('click', clickOffSetPopup);

		return () => document.body.removeEventListener('click', clickOffSetPopup);
	}, []);

	const logOut = async () => {
		if (window.confirm('Are you sure you want to log out?')) {
			await userLogOut();
			dispatch(setLogout());
		}
	};

	return (
		<div
			ref={authRef}
			className={clsx(styles.root, { [styles.active]: visibleSetting })}
			onClick={() => setVisibleSetting(!visibleSetting)}>
			<div className={styles.userPhoto}>
				<img
					src={`${import.meta.env.VITE_BASE_URL}${user?.picturePath}`}
					alt={`${user?.firstName}_${user?.lastName}`}
				/>
			</div>
			<div className={styles.userName}>
				<span>
					{user?.firstName} {user?.lastName}
				</span>
			</div>
			{!visibleSetting ? <AiFillCaretDown size="12" /> : <AiFillCaretUp size="12" />}
			<ul className={clsx(styles.settingList, { [styles.active]: visibleSetting })}>
				<li onClick={logOut}>Logout</li>
			</ul>
		</div>
	);
});
