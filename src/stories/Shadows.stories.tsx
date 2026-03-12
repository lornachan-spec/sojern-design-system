import type { Meta, StoryObj } from '@storybook/react';
import { shadows } from '../tokens/shadows';

const ShadowsPage = () => (
  <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
    <h1>Shadow Tokens</h1>
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '32px' }}>
      {Object.entries(shadows).map(([name, value]) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div style={{ width: '120px', height: '80px', background: '#fff', boxShadow: value, borderRadius: '8px', marginBottom: '16px' }} />
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ color: '#666', fontSize: '11px', maxWidth: '120px' }}>{value}</div>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta = { title: 'Tokens/Shadows', component: ShadowsPage };
export default meta;
type Story = StoryObj;
export const AllShadows: Story = { render: () => <ShadowsPage /> };
