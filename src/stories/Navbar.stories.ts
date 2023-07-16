import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '@/components/Navbar/Index';
import { Wallet } from 'ethers';
import { MockWagmiDecorator } from '../../.storybook/decorators';

// 👇 Components within this story will act as though they are connected to this wallet
const demoWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Navbar> = {
  title: 'App/Navbar',
  component: Navbar,
  decorators: [MockWagmiDecorator(demoWallet)],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};