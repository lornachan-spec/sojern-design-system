import type { Meta, StoryObj } from '@storybook/react';
import { typography, fontFamily, fontWeight } from '../tokens/typography';

const TypographySample = ({ name, style }: { name: string; style: any }) => (
  <div style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '24px' }}>
    <div style={{ ...style, color: '#242452', marginBottom: '8px' }}>
      The quick brown fox jumps over the lazy dog
    </div>
    <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: '#666' }}>
      <span><strong>Style:</strong> {name}</span>
      <span><strong>Size:</strong> {style.fontSize}</span>
      <span><strong>Weight:</strong> {style.fontWeight}</span>
      <span><strong>Line Height:</strong> {style.lineHeight}</span>
      <span><strong>Letter Spacing:</strong> {style.letterSpacing}</span>
    </div>
  </div>
);

const TypographyPage = () => (
  <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
    <h1>Typography Tokens</h1>

    <div style={{ marginBottom: '32px', padding: '16px', background: '#f8f8f8', borderRadius: '8px' }}>
      <h3>Font Families</h3>
      <p><strong>Lato:</strong> {fontFamily.lato}</p>
      <p><strong>Inter:</strong> {fontFamily.inter}</p>
      <h3>Font Weights</h3>
      <p>
        <strong>Regular:</strong> {fontWeight.regular}&nbsp;
        <strong>Medium:</strong> {fontWeight.medium}&nbsp;
        <strong>Bold:</strong> {fontWeight.bold}
      </p>
    </div>

    <h2>Type Styles</h2>
    {Object.entries(typography).map(([name, style]) => (
      <TypographySample key={name} name={name} style={style} />
    ))}
  </div>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyPage,
};

export default meta;
type Story = StoryObj;

export const AllStyles: Story = {
  render: () => <TypographyPage />,
};
