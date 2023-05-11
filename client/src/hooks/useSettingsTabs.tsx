import { UpdateUserInfo, UpdateUserPhoto, UpdateUserSC } from '@/features';

export const useSettingsTabs = () => {
	const tabs = [
		{ title: 'User Photo', content: <UpdateUserPhoto /> },
		{ title: 'User Information', content: <UpdateUserInfo /> },
		{ title: 'Social Media', content: <UpdateUserSC /> },
	];
	return [tabs];
};
