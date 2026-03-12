import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { checked: false, children: 'Checkbox label' },
};

export const Checked: Story = {
  args: { checked: true, children: 'Checked checkbox' },
};

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true, children: 'Indeterminate checkbox' },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, children: 'Disabled checkbox' },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, children: 'Disabled checked checkbox' },
};

export const Group: Story = {
  render: () => (
    <CheckboxGroup>
      <Checkbox checked={true}>Option one</Checkbox>
      <Checkbox checked={false}>Option two</Checkbox>
      <Checkbox checked={false}>Option three</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupWithError: Story = {
  render: () => (
    <CheckboxGroup error="Please select at least one option">
      <Checkbox checked={false}>Option one</Checkbox>
      <Checkbox checked={false}>Option two</Checkbox>
      <Checkbox checked={false}>Option three</Checkbox>
    </CheckboxGroup>
  ),
};
