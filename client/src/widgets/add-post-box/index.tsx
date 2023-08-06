import React from 'react';
import { UIAvatar, UIBox, UIInput } from '@/components';
import styles from './styles.module.scss';
import { IAuthTypes } from '@/common/interfaces';

interface AddPostBoxProps {
	user: IAuthTypes | null;
}

export const AddPostBox: React.FC<AddPostBoxProps> = ({ user }) => {
	return (
		<UIBox>
			<div className={styles.root}>
				<UIAvatar src={user?.picturePath} alt={user?.email} />
				<UIInput placeholder="What's on your mind..." type="text" bottomSpaceOff required />
			</div>
		</UIBox>
	);
};
