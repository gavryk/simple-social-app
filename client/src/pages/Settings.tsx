import { UIBox, UIGrid } from '@/components';
import { TabContent, TabNavigation } from '@/components/ui-tabs';
import TabProvider from '@/components/ui-tabs/tab-context';
import { useSettingsTabs } from '@/hooks';

export const Settings = () => {
	const [tabs] = useSettingsTabs();
	return (
		<UIGrid columns={2} gridGap={2} centerBig="md" alignItem="flex-start">
			<TabProvider tabs={tabs} defaultTab={0}>
				<UIBox spaceNone>
					<TabNavigation />
				</UIBox>
				<UIBox>
					<TabContent />
				</UIBox>
			</TabProvider>
		</UIGrid>
	);
};
