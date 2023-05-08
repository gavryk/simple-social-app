import { UIBox, UIGrid } from '@/components';
import React, { useState } from 'react';

export const Settings = () => {
	return (
		<UIGrid columns={2} gridGap={4} centerBig={true}>
			<UIBox>Test</UIBox>
			<UIBox>Test</UIBox>
		</UIGrid>
	);
};
