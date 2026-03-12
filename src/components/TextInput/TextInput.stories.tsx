import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello world',
  },
};

export const SizeShort: Story = {
  name: 'Size — Short',
  args: {
    size: 'short',
    placeholder: 'Short',
  },
};

export const SizeLong: Story = {
  name: 'Size — Long',
  args: {
    size: 'long',
    placeholder: 'Long input spanning full width',
  },
};

export const SizeNumeric: Story = {
  name: 'Size — Numeric',
  args: {
    size: 'numeric',
    type: 'number',
    placeholder: '0',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    placeholder: 'Search...',
    trailingIcon: 'Search',
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: 'invalid-value',
    error: true,
    trailingIcon: 'AlertCircle',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Cannot edit this',
    disabled: true,
  },
};

export const DisabledWithPlaceholder: Story = {
  args: {
    placeholder: 'Unavailable',
    disabled: true,
  },
};
