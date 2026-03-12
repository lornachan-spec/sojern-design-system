import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SecondaryNav } from './SecondaryNav';

const meta: Meta<typeof SecondaryNav> = {
  title: 'Components/SecondaryNav',
  component: SecondaryNav,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SecondaryNav>;

const SecondaryNavWithState = ({ tabs }: { tabs: { id: string; label: string }[] }) => {
  const [activeId, setActiveId] = useState(tabs[0].id);
  return (
    <SecondaryNav
      tabs={tabs}
      activeId={activeId}
      onTabChange={setActiveId}
    />
  );
};

export const Default: Story = {
  render: () => (
    <SecondaryNavWithState
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'performance', label: 'Performance' },
        { id: 'audience', label: 'Audience' },
        { id: 'settings', label: 'Settings' },
      ]}
    />
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <SecondaryNavWithState
      tabs={[
        { id: 'active', label: 'Active' },
        { id: 'archived', label: 'Archived' },
      ]}
    />
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <SecondaryNavWithState
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'performance', label: 'Performance' },
        { id: 'audience', label: 'Audience' },
        { id: 'creatives', label: 'Creatives' },
        { id: 'placements', label: 'Placements' },
        { id: 'budget', label: 'Budget' },
        { id: 'settings', label: 'Settings' },
      ]}
    />
  ),
};

export const WithContent: Story = {
  render: () => {
    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'performance', label: 'Performance' },
      { id: 'audience', label: 'Audience' },
      { id: 'settings', label: 'Settings' },
    ];
    const [activeId, setActiveId] = useState('overview');
    return (
      <div>
        <SecondaryNav tabs={tabs} activeId={activeId} onTabChange={setActiveId} />
        <div style={{ padding: 24 }}>
          <p>Active tab: <strong>{activeId}</strong></p>
        </div>
      </div>
    );
  },
};
