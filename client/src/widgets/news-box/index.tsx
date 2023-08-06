import { INews } from '@/common/interfaces/newsTypes';
import React from 'react';
import styles from './styles.module.scss';
import { UIBox, UINewsCard } from '@/components';

interface NewsBosProp {
	articles: INews[];
}

export const NewsBox: React.FC<NewsBosProp> = ({ articles }) => {
	console.log(articles);

	return (
		<UIBox>
			{articles.map((article: INews) => (
				<UINewsCard {...article} key={article.url} />
			))}
		</UIBox>
	);
};
