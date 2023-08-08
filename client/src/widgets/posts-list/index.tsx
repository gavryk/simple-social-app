import { IPost } from '@/common/interfaces/postsTypes';
import React from 'react';
import styles from './styles.module.scss';
import { PostCard } from './ui';

interface PostsListProps {
	posts: IPost[];
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
	return (
		<div className={styles.root}>
			{posts.map((post) => (
				<PostCard key={post._id} {...post} />
			))}
		</div>
	);
};
