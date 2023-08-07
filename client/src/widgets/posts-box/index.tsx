import { PostApiTypes } from '@/common/interfaces/postsApiTypes';
import { UIBox } from '@/components';
import React from 'react';
import styles from './styles.module.scss';

export const PostsBox: React.FC<PostApiTypes> = ({ posts }) => {
	return (
		<div className={styles.root}>
			{posts &&
				posts.map((post) => (
					<UIBox key={post._id}>
						<div className={styles.thumbnail}>
							<img src={`${import.meta.env.VITE_BASE_URL}/uploads/${post.picturePath}`} alt="" />
						</div>
						<span>{post.description}</span>
					</UIBox>
				))}
		</div>
	);
};
