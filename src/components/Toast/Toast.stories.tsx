import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'critical', 'alert', 'informational'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { variant: 'success', message: 'Changes saved successfully!', onClose: () => {} },
};

export const Critical: Story = {
  args: { variant: 'critical', message: 'Something went wrong. Please try again.', onClose: () => {} },
};

export const Alert: Story = {
  args: { variant: 'alert', message: 'Your session is about to expire.', onClose: () => {} },
};

export const Informational: Story = {
  args: { variant: 'informational', message: 'A new version is available.', onClose: () => {} },
};

export const WithAction: Story = {
  args: {
    variant: 'success',
    message: 'File uploaded successfully.',
    action: { label: 'View file', onClick: () => {} },
    onClose: () => {},
  },
};

export const LongText: Story = {
  args: {
    variant: 'informational',
    message: 'This is a much longer toast message that demonstrates how the component handles text wrapping when the content exceeds a single line and needs to flow onto multiple lines.',
    onClose: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
      <Toast variant="success" message="Changes saved successfully!" onClose={() => {}} />
      <Toast variant="critical" message="Something went wrong. Please try again." onClose={() => {}} />
      <Toast variant="alert" message="Your session is about to expire." onClose={() => {}} />
      <Toast variant="informational" message="A new version is available." onClose={() => {}} />
    </div>
  ),
};
