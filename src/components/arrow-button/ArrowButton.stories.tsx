import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { useState } from 'react';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

/* const setOpen = () => {
	return true;
}; */

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton isOpen={true} toggleIsOpen={() => true} />
			</>
		);
	},
};
