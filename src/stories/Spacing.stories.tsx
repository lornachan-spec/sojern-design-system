import type { Meta, StoryObj } from '@storybook/react';
import { spacing } from '../tokens/spacing';

const SpacingPage = () => (
  <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
    <h1>Spacing Tokens</h1>
    {Object.entries(spacing).map(([name, value]) => (
      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div style={{ width: '80px', fontWeight: 600 }}>{name}</div>
        <div style={{ width: '40px', color: '#666' }}>{value}px</div>
        <div style={{ width: value, height: '24px', background: '#E35F3E', borderRadius: '2px' }} />
      </div>
    ))}
  </div>
);

const meta: Meta = { title: 'Tokens/Spacing', component: SpacingPage };
export default meta;
type Story = StoryObj;
export const AllSpacing: Story = { render: () => <SpacingPage /> };
