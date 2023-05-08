import { UIBox, UIGrid } from '@/components';
import { TabContent, TabNavigation } from '@/components/ui-tabs';
import TabProvider from '@/components/ui-tabs/tab-context';

export const Settings = () => {
	const values = [
		{ title: 'Tab 1', content: <h1>Hello 1</h1> },
		{ title: 'Tab 2', content: <h1>Hello 2</h1> },
		{ title: 'Tab 3', content: <h1>Hello 3</h1> },
		{ title: 'Tab 4', content: <h1>Hello 4</h1> },
	];
	return (
		<UIGrid columns={2} gridGap={4} centerBig={true}>
			<TabProvider tabs={values} defaultTab={0}>
				<UIBox verticalSpaceNone>
					<TabNavigation />
				</UIBox>
				<UIBox>
					<TabContent />
				</UIBox>
			</TabProvider>
		</UIGrid>
	);
};
