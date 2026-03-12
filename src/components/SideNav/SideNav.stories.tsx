import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SideNav } from './SideNav';

const meta: Meta<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

const topItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'Home' as const,
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: 'Megaphone' as const,
    subItems: [
      { id: 'campaigns-all', label: 'All Campaigns' },
      { id: 'campaigns-active', label: 'Active' },
      { id: 'campaigns-draft', label: 'Drafts' },
    ],
  },
  {
    id: 'audiences',
    label: 'Audiences',
    icon: 'Users' as const,
    subItems: [
      { id: 'audiences-segments', label: 'Segments' },
      { id: 'audiences-lists', label: 'Lists' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'Chart' as const,
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'Plug' as const,
    badge: 'beta' as const,
  },
];

const bottomItems = [
  {
    id: 'help',
    label: 'Help',
    icon: 'Help' as const,
  },
  {
    id: 'account',
    label: 'Account',
    icon: 'User' as const,
  },
];

const SideNavWithState = (props: Partial<React.ComponentProps<typeof SideNav>>) => {
  const [activeId, setActiveId] = useState('dashboard');
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideNav
        topItems={topItems}
        bottomItems={bottomItems}
        activeId={activeId}
        onNavigate={setActiveId}
        {...props}
      />
      <div style={{ flex: 1, padding: 32, background: '#f5f5f5' }}>
        <p style={{ color: '#666' }}>Active: <strong>{activeId}</strong></p>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <SideNavWithState />,
};

export const Collapsed: Story = {
  render: () => <SideNavWithState collapsed />,
};

export const WithActiveSubItem: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('campaigns-active');
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <SideNav
          topItems={topItems}
          bottomItems={bottomItems}
          activeId={activeId}
          onNavigate={setActiveId}
        />
        <div style={{ flex: 1, padding: 32, background: '#f5f5f5' }}>
          <p style={{ color: '#666' }}>Active: <strong>{activeId}</strong></p>
        </div>
      </div>
    );
  },
};

export const ControlledCollapse: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <SideNav
          topItems={topItems}
          bottomItems={bottomItems}
          activeId={activeId}
          onNavigate={setActiveId}
          collapsed={collapsed}
          onCollapseToggle={() => setCollapsed(c => !c)}
        />
        <div style={{ flex: 1, padding: 32, background: '#f5f5f5' }}>
          <button onClick={() => setCollapsed(c => !c)}>
            Toggle Nav ({collapsed ? 'collapsed' : 'expanded'})
          </button>
        </div>
      </div>
    );
  },
};
