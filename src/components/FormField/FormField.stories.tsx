import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be 3–20 characters, letters and numbers only.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
    defaultValue: 'not-an-email',
    error: 'Please enter a valid email address.',
  },
};

export const WithInfoTooltip: Story = {
  args: {
    label: 'API Key',
    placeholder: 'Paste your API key',
    showInfoIcon: true,
    infoTooltip: 'You can find your API key in account settings.',
  },
};

export const Inline: Story = {
  args: {
    label: 'Amount',
    layout: 'inline',
    prefixText: '$',
    suffixText: 'USD',
    placeholder: '0.00',
    inputSize: 'numeric',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read-only field',
    defaultValue: 'Cannot edit this',
    disabled: true,
  },
};
