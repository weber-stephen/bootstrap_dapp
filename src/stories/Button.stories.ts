import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/Button/Index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    children: `Button`
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: `Button`
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: `Button`
  },
};
