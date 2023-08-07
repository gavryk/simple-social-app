import { PostApiTypes } from '@/common/interfaces/postsApiTypes';
import { UIBox } from '@/components';
import React from 'react';

export const PostsBox: React.FC<PostApiTypes> = ({ posts }) => {
	return (
		<UIBox>{posts && posts.map((post) => <span key={post._id}>{post.description}</span>)}</UIBox>
	);
};
