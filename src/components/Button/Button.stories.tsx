import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'special', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lrg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'lrg', children: 'Button' },
};

export const Special: Story = {
  args: { variant: 'special', size: 'lrg', children: 'Button' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'lrg', children: 'Button' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'lrg', children: 'Button' },
};

export const Link: Story = {
  args: { variant: 'link', size: 'lrg', children: 'Button' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Button' },
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'lrg', children: 'Button', disabled: true },
};
