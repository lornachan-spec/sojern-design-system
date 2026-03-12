import type { Meta, StoryObj } from '@storybook/react';
import { radius } from '../tokens/radius';

const RadiusPage = () => (
  <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
    <h1>Radius Tokens</h1>
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      {Object.entries(radius).map(([name, value]) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: '#242452', borderRadius: value, marginBottom: '8px' }} />
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ color: '#666', fontSize: '13px' }}>{value}px</div>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta = { title: 'Tokens/Radius', component: RadiusPage };
export default meta;
type Story = StoryObj;
export const AllRadius: Story = { render: () => <RadiusPage /> };
