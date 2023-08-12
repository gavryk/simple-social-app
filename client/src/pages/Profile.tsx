import { UIGrid, UILoader, UITypography } from '@/components';
import { AddPost } from '@/features/add-post';
import { useGetUserPostsQuery } from '@/store/api/posts.api';
import { useGetUserQuery } from '@/store/api/users.api';
import { RootState } from '@/store/store';
import { FriendsBox, PostsList, ProfileBox } from '@/widgets';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Profile: React.FC = () => {
	const { userId } = useParams();
	const admin = useSelector((state: RootState) => state.auth.user);
	const { data, isLoading, isError, refetch } = useGetUserQuery(userId);
	const {
		data: postsData,
		isLoading: postsLoading,
		isError: postsError,
	} = useGetUserPostsQuery(userId);

	useEffect(() => {
		refetch();
		console.log(postsData);
	}, []);

	if (isLoading) return <UILoader />;

	return (
		<UIGrid columns={2} centerBig="sm" gridGap={4}>
			<div className="col">
				<ProfileBox user={data} />
				<FriendsBox userId={userId} />
			</div>
			{postsData.length !== 0 ? (
				<div className="col">
					{postsLoading ? <UILoader /> : postsData && <PostsList posts={postsData} />}
				</div>
			) : (
				<div className="col">
					{userId === admin?._id && <AddPost user={admin} />}
					<UITypography variant="h4" textAlign="center">
						{`${data.firstName} ${data.lastName} has not published any posts yet!`}
					</UITypography>
				</div>
			)}
		</UIGrid>
	);
};
