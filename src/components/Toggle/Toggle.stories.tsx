import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  args: { checked: false, children: 'Toggle label' },
};

export const On: Story = {
  args: { checked: true, children: 'Toggle label' },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, children: 'Disabled toggle' },
};

export const DisabledOn: Story = {
  args: { checked: true, disabled: true, children: 'Disabled on toggle' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
      <Toggle checked={false}>Off</Toggle>
      <Toggle checked={true}>On</Toggle>
      <Toggle checked={false} disabled>Disabled off</Toggle>
      <Toggle checked={true} disabled>Disabled on</Toggle>
    </div>
  ),
};
