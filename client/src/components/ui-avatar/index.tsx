import React from 'react';
import avatarHolder from '@/assets/img/avatar-holder.jpg';
import styles from './styles.module.scss';

type AvatarProps = {
	src?: string;
	alt?: string;
};

export const UIAvatar: React.FC<AvatarProps> = ({ src, alt = 'holder' }) => {
	return (
		<div className={styles.root}>
			{src ? (
				<img src={`${import.meta.env.VITE_BASE_URL}${src}`} alt={alt} />
			) : (
				<img src={avatarHolder} alt={alt} />
			)}
		</div>
	);
};
