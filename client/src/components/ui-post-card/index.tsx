import { IPost } from '@/common/interfaces/postsTypes';
import React from 'react';
import { UIBox } from '../ui-box';
import imgHolder from '@/assets/img/noimg.png';
import styles from './styles.module.scss';

export const UIPostCard: React.FC<IPost> = ({
	userPicturePath,
	userId,
	lastName,
	firstName,
	picturePath,
}) => {
	return (
		<UIBox>
			<div className={styles.root}>
				<div className={styles.thumbnail}>
					<img
						src={
							picturePath ? `${import.meta.env.VITE_BASE_URL}/uploads/${picturePath}` : imgHolder
						}
						alt=""
					/>
				</div>
			</div>
		</UIBox>
	);
};
