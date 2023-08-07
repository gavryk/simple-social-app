import React, { useEffect } from 'react';
import { UIGrid, UILoader } from '@/components';
import { FriendsBox, ProfileBox } from '@/widgets';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useGetWorldNewsQuery } from '@/store/api/news.api';
import { NewsBox } from '@/widgets/news-box';
import { useGetGeoLocationQuery } from '@/store/api/geo.api';
import { AddPost } from '@/features/add-post';
import { useGetAllPostsQuery } from '@/store/api/posts.api';
import { PostsBox } from '@/widgets/posts-box';

export const Home: React.FC = () => {
	const { user } = useSelector(authSelector);
	const { data: geoData, error: geoErr, isLoading: geoLoad } = useGetGeoLocationQuery('');
	const { data: postsData, error: postsError, isLoading: postsLoading } = useGetAllPostsQuery();
	const { data, error, isLoading } = useGetWorldNewsQuery(
		`/top-headlines?country=${geoData ? geoData.country_code2.toLowerCase() : 'us'}&pageSize=10`,
	);

	return (
		<UIGrid columns={3} centerBig="md" gridGap={4}>
			<div className="col">
				<ProfileBox user={user} />
				<FriendsBox userId={user?._id} />
			</div>
			<div className="col">
				<AddPost user={user} />
				{postsLoading ? <UILoader /> : postsData !== undefined && <PostsBox posts={postsData} />}
			</div>
			<div className="col">{isLoading ? <UILoader /> : <NewsBox articles={data.articles} />}</div>
		</UIGrid>
	);
};
