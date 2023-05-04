import React, { useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import styles from './styles.module.scss';
import { IAuthTypes } from '../../../../common';
import clsx from 'clsx';
import { useUserLogOutMutation } from '../../../../store/api/auth.api';
import { useAppDispatch } from '../../../../store/store';
import { setLogout } from '../../../../store/slices/auth/slice';
import useClickOutside from '../../../../hooks/useClickOutside';
import { Link } from 'react-router-dom';

interface AuthInfoProp {
	user: IAuthTypes | null;
}

export const AuthInfo: React.FC<AuthInfoProp> = React.memo(({ user }) => {
	const dispatch = useAppDispatch();
	const authRef = useRef<HTMLDivElement>(null);
	const [visibleSetting, setVisibleSetting] = useState(false);
	const [userLogOut] = useUserLogOutMutation();

	const handleClickOutside = () => {
		setVisibleSetting(false);
	};

	useClickOutside(authRef, handleClickOutside);

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
				<li>
					<Link to={`/profile/${user?._id}`}>
						Profile Page <FiUser size="14" />
					</Link>
				</li>
				<li>
					Settings <FiSettings size="14" />
				</li>
				<li onClick={logOut}>
					Logout <FiLogOut size="14" />
				</li>
			</ul>
		</div>
	);
});
