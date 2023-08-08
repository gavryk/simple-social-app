import { IPost } from '@/common/interfaces/postsTypes';
import React, { useMemo } from 'react';
import { UIBox } from '@/components/ui-box';
import imgHolder from '@/assets/img/noimg.png';
import { UIAvatar } from '@/components/ui-avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSocket } from '@/context';
import { BiUserMinus, BiUserPlus } from 'react-icons/bi';
import styles from './styles.module.scss';

export const PostCard: React.FC<IPost> = ({
	userPicturePath,
	userId,
	lastName,
	firstName,
	picturePath,
	location,
	description,
}) => {
	const admin = useSelector((state: RootState) => state.auth.user);
	const isFollow = useMemo(() => admin?.following.some((u) => u === userId), [admin, userId]);
	const { toggleUpdateFriends } = useSocket();

	const handleUpdateFriends = () => {
		const receiver = { _id: userId, firstName, lastName };
		toggleUpdateFriends({ sender: admin, receiver, isFollow });
	};

	return (
		<UIBox>
			<div className={styles.post}>
				<div className={styles.author}>
					<Link to={`/profile/${userId}`} className={styles.left}>
						<UIAvatar src={`/uploads/${userPicturePath}`} alt={`${firstName}_${lastName}`} />
						<div className={styles.info}>
							<span className={styles.name}>
								{firstName} {lastName}
							</span>
							<span className={styles.location}>{location}</span>
						</div>
					</Link>
					<div className={styles.right}>
						<div className={styles.icon} onClick={handleUpdateFriends}>
							{isFollow ? <BiUserMinus size="18" /> : <BiUserPlus size="18" />}
						</div>
					</div>
				</div>
				<div className={styles.description}>
					<p>{description}</p>
				</div>
				<div className={styles.thumbnail}>
					<img
						src={
							picturePath ? `${import.meta.env.VITE_BASE_URL}/uploads/${picturePath}` : imgHolder
						}
						alt=""
					/>
				</div>
			</div>
		</UIBox>
	);
};
