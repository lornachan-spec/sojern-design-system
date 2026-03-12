import type { Meta, StoryObj } from '@storybook/react';
import * as colors from '../tokens/colors';

const ColorSwatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: value, border: '1px solid #eee', flexShrink: 0 }} />
    <div>
      <div style={{ fontWeight: 600, fontSize: '13px' }}>{name}</div>
      <div style={{ color: '#666', fontSize: '12px' }}>{value}</div>
    </div>
  </div>
);

const ColorGroup = ({ title, colorMap }: { title: string; colorMap: Record<string, unknown> }) => {
  const flat: Record<string, string> = {};
  Object.entries(colorMap).forEach(([key, value]) => {
    if (typeof value === 'string') flat[key] = value;
    else if (typeof value === 'object' && value !== null) {
      Object.entries(value as Record<string, string>).forEach(([k, v]) => {
        flat[`${key}-${k}`] = v;
      });
    }
  });
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', textTransform: 'capitalize', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
        {Object.entries(flat).map(([key, value]) => (
          <ColorSwatch key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  );
};

const ColorPalette = () => (
  <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
    <h1>Color Tokens</h1>
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Color Scales</h2>
    <ColorGroup title="Fire" colorMap={colors.fire} />
    <ColorGroup title="Blue" colorMap={colors.blue} />
    <ColorGroup title="Neutrals" colorMap={colors.neutrals} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Brand Semantic Aliases</h2>
    <ColorGroup title="Special" colorMap={colors.special} />
    <ColorGroup title="Secondary" colorMap={colors.secondary} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Text &amp; Icons</h2>
    <ColorGroup title="Text" colorMap={colors.text} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Surfaces &amp; Backgrounds</h2>
    <ColorGroup title="Surface" colorMap={colors.surface} />
    <ColorGroup title="Overlay" colorMap={colors.overlay} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Borders</h2>
    <ColorGroup title="Border" colorMap={colors.border} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Interactive States</h2>
    <ColorGroup title="Focus" colorMap={colors.focus} />
    <ColorGroup title="Buttons" colorMap={colors.buttons} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Status &amp; Semantic</h2>
    <ColorGroup title="Semantic" colorMap={colors.semantic} />
    <ColorGroup title="Status" colorMap={colors.status} />
    <ColorGroup title="Alerts" colorMap={colors.alerts} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Component Specific</h2>
    <ColorGroup title="Tooltip" colorMap={colors.tooltip} />
    <ColorGroup title="Toggle" colorMap={colors.toggle} />
    <ColorGroup title="Badges" colorMap={colors.badges} />
    <ColorGroup title="Chips" colorMap={colors.chips} />
    <ColorGroup title="Calendar" colorMap={colors.calendar} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Navigation</h2>
    <ColorGroup title="Nav Primary" colorMap={colors.navPrimary} />
    <ColorGroup title="Nav Secondary" colorMap={colors.navSecondary} />
    <h2 style={{ color: '#666', marginBottom: '24px' }}>Data Visualization</h2>
    <ColorGroup title="Data Viz" colorMap={colors.dataViz} />
  </div>
);

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorPalette,
};

export default meta;
type Story = StoryObj;

export const AllColors: Story = {
  render: () => <ColorPalette />,
};
