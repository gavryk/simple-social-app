import React, { useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import avatarHolder from '@/assets/img/avatar-holder.jpg';
import { IAuthTypes } from '../../../../common';
import clsx from 'clsx';
import useClickOutside from '../../../../hooks/useClickOutside';
import { useSelector } from 'react-redux';
import { settingsSelector } from '../../../../store/slices/settings/selector';
import { MenuList } from '../Menu-list';
import styles from './styles.module.scss';

interface AuthInfoProp {
	user: IAuthTypes | null;
}

export const AuthInfo: React.FC<AuthInfoProp> = React.memo(({ user }) => {
	const { menu } = useSelector(settingsSelector);
	const authRef = useRef<HTMLDivElement>(null);
	const [visibleSetting, setVisibleSetting] = useState(false);

	const handleClickOutside = () => {
		setVisibleSetting(false);
	};

	useClickOutside(authRef, handleClickOutside);

	return (
		<div
			ref={authRef}
			className={clsx(styles.root, { [styles.active]: visibleSetting })}
			onClick={() => setVisibleSetting(!visibleSetting)}>
			<div className={styles.userPhoto}>
				<img
					src={
						user?.picturePath
							? `${import.meta.env.VITE_BASE_URL}${user?.picturePath}`
							: avatarHolder
					}
					alt={`${user?.firstName}_${user?.lastName}`}
				/>
			</div>
			<div className={styles.userName}>
				<span>
					{user?.firstName} {user?.lastName}
				</span>
			</div>
			{!visibleSetting ? <AiFillCaretDown size="12" /> : <AiFillCaretUp size="12" />}
			{menu && (
				<ul className={clsx(styles.settingList, { [styles.active]: visibleSetting })}>
					<MenuList menu={menu} />
				</ul>
			)}
		</div>
	);
});
