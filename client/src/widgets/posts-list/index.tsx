import { IPost } from '@/common/interfaces/postsTypes';
import { UIPostCard } from '@/components';
import React from 'react';
import styles from './styles.module.scss';

interface PostsListProps {
	posts: IPost[];
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
	return (
		<div className={styles.root}>
			{posts.map((post) => (
				<UIPostCard key={post._id} {...post} />
			))}
		</div>
	);
};
