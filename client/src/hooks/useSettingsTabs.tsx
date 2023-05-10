import { UpdateUserInfo, UpdateUserPhoto } from '@/features';

export const useSettingsTabs = () => {
	const tabs = [
		{ title: 'User Photo', content: <UpdateUserPhoto /> },
		{ title: 'User Information', content: <UpdateUserInfo /> },
		{ title: 'Social Media', content: <h1>Hello 3</h1> },
	];
	return [tabs];
};
