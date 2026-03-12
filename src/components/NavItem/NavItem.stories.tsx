import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Components/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a2e' }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    label: 'Dashboard',
    icon: 'Home',
  },
};

export const Active: Story = {
  args: {
    label: 'Dashboard',
    icon: 'Home',
    active: true,
  },
};

export const WithSubItems: Story = {
  args: {
    label: 'Campaigns',
    icon: 'Megaphone',
    hasSubItems: true,
    expanded: false,
  },
};

export const WithSubItemsExpanded: Story = {
  args: {
    label: 'Campaigns',
    icon: 'Megaphone',
    hasSubItems: true,
    expanded: true,
  },
};

export const SubItem: Story = {
  args: {
    label: 'All Campaigns',
    isSubItem: true,
  },
};

export const SubItemActive: Story = {
  args: {
    label: 'All Campaigns',
    isSubItem: true,
    active: true,
  },
};

export const Collapsed: Story = {
  args: {
    label: 'Dashboard',
    icon: 'Home',
    collapsed: true,
  },
};

export const CollapsedActive: Story = {
  args: {
    label: 'Dashboard',
    icon: 'Home',
    collapsed: true,
    active: true,
  },
};

export const WithBadge: Story = {
  args: {
    label: 'Integrations',
    icon: 'Plug',
    badge: 'beta',
  },
};
