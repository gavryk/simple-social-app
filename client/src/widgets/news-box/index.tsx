import { INews } from '@/common/interfaces/newsTypes';
import React from 'react';
import styles from './styles.module.scss';

interface NewsBosProp {
	articles: INews[];
}

export const NewsBox: React.FC<NewsBosProp> = ({ articles }) => {
	console.log(articles);

	return (
		<div className={styles.root}>
			{articles.map((article: INews) => (
				<div className="article" key={article.url}>
					<img src={article.urlToImage} alt="" />
					<span>{article.title}</span>
				</div>
			))}
		</div>
	);
};
