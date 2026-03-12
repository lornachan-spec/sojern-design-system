import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { checked: false, children: 'Radio label' },
};

export const Checked: Story = {
  args: { checked: true, children: 'Selected option' },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, children: 'Disabled option' },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, children: 'Disabled selected option' },
};

export const Group: Story = {
  render: () => (
    <RadioGroup>
      <Radio checked={true}>Option one</Radio>
      <Radio checked={false}>Option two</Radio>
      <Radio checked={false}>Option three</Radio>
    </RadioGroup>
  ),
};

export const GroupWithError: Story = {
  render: () => (
    <RadioGroup error="Please select an option">
      <Radio checked={false}>Option one</Radio>
      <Radio checked={false}>Option two</Radio>
      <Radio checked={false}>Option three</Radio>
    </RadioGroup>
  ),
};
