import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['warning', 'success', 'error', 'active', 'information'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { label: 'Chip label' },
};

export const Warning: Story = {
  args: { label: 'Warning', variant: 'warning' },
};

export const Success: Story = {
  args: { label: 'Success', variant: 'success' },
};

export const Error: Story = {
  args: { label: 'Error', variant: 'error' },
};

export const Active: Story = {
  args: { label: 'Active', variant: 'active' },
};

export const Information: Story = {
  args: { label: 'Information', variant: 'information' },
};

export const WithDismiss: Story = {
  args: { label: 'Dismissible', variant: 'active', dismissible: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '24px' }}>
      <Chip label="Default" />
      <Chip label="Warning" variant="warning" />
      <Chip label="Success" variant="success" />
      <Chip label="Error" variant="error" />
      <Chip label="Active" variant="active" />
      <Chip label="Information" variant="information" />
    </div>
  ),
};
