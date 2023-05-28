import React from 'react';

interface FriendProp {
	id: string;
}

export const FriendRow: React.FC<FriendProp> = ({ id }) => {
	return <div>{id}</div>;
};
