import React from 'react';
import styles from './styles.module.scss';

export const UIAvatarLoader: React.FC = () => {
	return (
		<div className={styles.loader}>
			<i className={styles.loaderEl}></i>
			<i className={styles.loaderEl}></i>
		</div>
	);
};
