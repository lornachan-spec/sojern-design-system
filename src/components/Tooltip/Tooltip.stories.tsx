import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    children: <Button variant="secondary" size="md">Hover me</Button>,
  },
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '80px', justifyContent: 'center' }}>
      <Tooltip content="Top tooltip" position="top">
        <Button variant="secondary" size="md">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="secondary" size="md">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="secondary" size="md">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="secondary" size="md">Right</Button>
      </Tooltip>
    </div>
  ),
};
