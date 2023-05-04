export const getTheme = () => {
	const theme = `${window?.localStorage?.getItem('mode')}`;
	if (['light', 'dark'].includes(theme)) return theme as 'light' | 'dark';

	const userMedia = window.matchMedia('(prefers-color-scheme: light)');
	if (userMedia.matches) return 'light';

	return 'light';
};
