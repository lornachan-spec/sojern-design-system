import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icons';

const allIcons = [
  'Dashboard', 'Reporting', 'Billing', 'Admin', 'Contracts', 'Campaigns',
  'Programs', 'Travelers', 'Creatives', 'Testing', 'Account', 'Guest Experience',
  'Bookings', 'Stays', 'User', 'Help', 'Copy Clipboard', 'Search', 'Settings',
  'Calendar', 'Edit', 'Locked', 'Unlocked', 'Kebab Horizontal', 'Kebab Vertical',
  'Chevron Down', 'Chevron Up', 'Chevron Left', 'Chevron Right',
  'Double Chevron Left', 'Double Chevron Right', 'Close', 'Delete', 'Checkmark',
  'Subtract Filled', 'Add', 'Add Filled', 'Subtract', 'Subtract Filled',
  'Draggable', 'Warning', 'Pause', 'Warning Filled', 'Info', 'Info Filled',
  'Checkbox Inactive', 'Checkbox Active', 'Checkbox Indeterminate',
  'Radio Inactive', 'Radio Active', 'Filters', 'Attachment', 'List View',
  'Location', 'Location Filled', 'Tile View', 'Tile View Filled', 'Reputation',
  'Home', 'Sign Out', 'Inbox', 'Messages', 'Outbox', 'Download', 'AI Concierge',
  'Chat', 'Data Cleansing', 'History', 'Critical', 'Alert', 'Stop', 'Check',
  'AI', 'Bookmark', 'Language', 'Google', 'Show', 'Hide', 'Arrow Unsorted',
  'Arrows Ascending', 'Arrows Descending', 'Clock', 'Mail', 'Radio error',
  'Checkbox Error', 'Variant90', 'Table Empty',
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Components/Icons',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: allIcons },
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Single: Story = {
  args: { name: 'Dashboard', size: 24 },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
      <h2>All Icons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}>
        {allIcons.map(name => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid #eee', borderRadius: '8px' }}>
            <Icon name={name} size={24} />
            <span style={{ fontSize: '11px', textAlign: 'center', color: '#666' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
      {[12, 16, 20, 24, 32, 40].map(size => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon name="Dashboard" size={size} />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>{size}px</div>
        </div>
      ))}
    </div>
  ),
};
