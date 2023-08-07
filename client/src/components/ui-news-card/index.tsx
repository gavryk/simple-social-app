import React from 'react';
import { INews } from '@/common/interfaces/newsTypes';
import imgHolder from '@/assets/img/noimg.png';
import styles from './styles.module.scss';
import { UITypography } from '../ui-typography';

export const UINewsCard: React.FC<INews> = ({ urlToImage, title, publishedAt, url }) => {
	const parsedDate = new Date(publishedAt);
	const formattedDate = parsedDate.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
	return (
		<a href={url} target="_blank" className={styles.article}>
			<div className={styles.thumbnail}>
				<img src={urlToImage ? urlToImage : imgHolder} alt={title} />
				<div className={styles.date}>{formattedDate}</div>
			</div>
			<div className={styles.title}>
				<UITypography variant="span" bottomSpace="none">
					{title}
				</UITypography>
			</div>
		</a>
	);
};
