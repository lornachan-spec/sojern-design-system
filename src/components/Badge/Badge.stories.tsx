import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    stage: {
      control: 'select',
      options: ['alpha', 'beta', 'new'],
    },
    placement: {
      control: 'select',
      options: ['on-page', 'navigation'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Alpha: Story = {
  args: { stage: 'alpha', placement: 'on-page' },
};

export const Beta: Story = {
  args: { stage: 'beta', placement: 'on-page' },
};

export const New: Story = {
  args: { stage: 'new', placement: 'on-page' },
};

export const NavigationAlpha: Story = {
  args: { stage: 'alpha', placement: 'navigation' },
};

export const NavigationBeta: Story = {
  args: { stage: 'beta', placement: 'navigation' },
};

export const NavigationNew: Story = {
  args: { stage: 'new', placement: 'navigation' },
};
