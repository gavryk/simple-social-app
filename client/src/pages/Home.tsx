import React, { useEffect } from 'react';
import { UIGrid, UILoader } from '@/components';
import { FriendsBox, ProfileBox } from '@/widgets';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useGetWorldNewsQuery } from '@/store/api/news.api';
import { NewsBox } from '@/widgets/news-box';
import { useGetGeoLocationQuery } from '@/store/api/geo.api';
import { AddPostBox } from '@/widgets/add-post-box';

export const Home: React.FC = () => {
	const { user } = useSelector(authSelector);
	const { data: geoData, error: geoErr, isLoading: geoLoad } = useGetGeoLocationQuery('');
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
				<AddPostBox user={user} />
			</div>
			<div className="col">{isLoading ? <UILoader /> : <NewsBox articles={data.articles} />}</div>
		</UIGrid>
	);
};
