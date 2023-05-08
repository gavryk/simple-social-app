import { UpdateUserPhoto } from '@/features';

export const useSettingsTabs = () => {
	const tabs = [
		{ title: 'User Photo', content: <UpdateUserPhoto /> },
		{ title: 'User Information', content: <h1>Hello 2</h1> },
		{ title: 'Social Media', content: <h1>Hello 3</h1> },
	];
	return [tabs];
};
