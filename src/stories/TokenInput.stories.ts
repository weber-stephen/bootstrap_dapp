import { Meta, StoryObj } from '@storybook/react';
import Balance from '../components/Balance/Index';
import {MockWagmiDecorator} from "../../.storybook/decorators";
import { Wallet } from 'ethers';
import TokenInput from '@/components/TokenSwap/TokenInput/Index';

// 👇 Components within this story will act as though they are connected to this wallet
const demoWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TokenInput> = {
  title: 'App/TokenInput',
  component: TokenInput,
  decorators: [MockWagmiDecorator(demoWallet)],
};

export default meta;
type Story = StoryObj<typeof TokenInput>;

export const Primary: Story = {
  args: {
    selectedTokenAddress: "0x0000000000000000000000000000000000000000",
  },
};