import React, { useEffect } from 'react';
import { UIGrid } from '@/components';
import { FriendsBox, ProfileBox } from '@/widgets';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/slices/auth/selector';
import { useGetWorldNewsQuery } from '@/store/api/news.api';
import { NewsBox } from '@/widgets/news-box';

export const Home: React.FC = () => {
	const { user } = useSelector(authSelector);
	const { data, error, isLoading } = useGetWorldNewsQuery(`/top-headlines?country=us`);

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);

	return (
		<UIGrid columns={3} centerBig="md" gridGap={4}>
			<div className="col">
				<ProfileBox user={user} />
				<FriendsBox userId={user?._id} />
			</div>
			{data && (
				<div className="col">
					<NewsBox articles={data.articles} />
				</div>
			)}
		</UIGrid>
	);
};
