import React, { CSSProperties } from 'react';
import { Tooltip } from '../Tooltip';
import { Icon } from '../Icons';
import { surface, text, typography, spacing, radius, shadows } from '../../tokens';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type MetricCardVariant = 'standard' | 'expanded' | 'list';
export type MetricCalloutSize = 'small' | 'regular';

export interface MetricCalloutItem {
  /** Label shown to the left of the metric value */
  description: string;
  /** The numeric or text metric value displayed prominently */
  metric: string | number;
  /** Optional tooltip shown on the info icon */
  tooltip?: string;
}

export interface MetricListCallout {
  /** Bold header label at the top of the grouped callout tile */
  header: string;
  /** Optional tooltip for the header info icon */
  headerTooltip?: string;
  /** Rows of description + metric pairs within this tile */
  items: MetricCalloutItem[];
}

export interface MetricCardProps {
  /** Card heading */
  title: string;
  /** Optional tooltip on the title info icon */
  titleTooltip?: string;
  /** Smaller descriptive text below the title */
  subtitle?: string;
  /**
   * - `standard`  — all callouts in a single row
   * - `expanded`  — callouts split across multiple rows (use calloutsPerRow)
   * - `list`      — grouped tiles with a bold header and multiple rows each
   */
  variant?: MetricCardVariant;
  /** Flat callout items for `standard` and `expanded` variants */
  callouts?: MetricCalloutItem[];
  /** Description text size — `small` (12px) or `regular` (14px, default) */
  calloutSize?: MetricCalloutSize;
  /** For `expanded`: how many callouts appear in each row */
  calloutsPerRow?: number;
  /** Grouped callout items for the `list` variant */
  listCallouts?: MetricListCallout[];
  style?: CSSProperties;
  className?: string;
}

// -----------------------------------------------------------------------------
// Info icon
// -----------------------------------------------------------------------------

function InfoIcon({ tooltip: tip }: { tooltip?: string }) {
  const icon = <Icon name="Info" size={16} color={text.body} />;
  if (!tip) return icon;
  return <Tooltip content={tip} position="top">{icon}</Tooltip>;
}

// -----------------------------------------------------------------------------
// Individual callout tile — Standard / Expanded
// -----------------------------------------------------------------------------

function CalloutTile({
  item,
  size = 'regular',
}: {
  item: MetricCalloutItem;
  size?: MetricCalloutSize;
}) {
  const descStyle: CSSProperties = {
    fontFamily: size === 'small' ? typography.bodySmall.fontFamily : typography.bodyRegular.fontFamily,
    fontSize:   size === 'small' ? typography.bodySmall.fontSize   : typography.bodyRegular.fontSize,
    fontWeight: size === 'small' ? typography.bodySmall.fontWeight : typography.bodyRegular.fontWeight,
    lineHeight: size === 'small' ? typography.bodySmall.lineHeight : typography.bodyRegular.lineHeight,
    letterSpacing: size === 'small' ? typography.bodySmall.letterSpacing : typography.bodyRegular.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
    margin: 0,
  };

  const metricStyle: CSSProperties = {
    fontFamily: typography.title3.fontFamily,
    fontSize: typography.title3.fontSize,
    fontWeight: typography.title3.fontWeight,
    lineHeight: typography.title3.lineHeight,
    letterSpacing: typography.title3.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
    margin: 0,
    flexShrink: 0,
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: '1 1 160px',
      minWidth: 160,
      height: 54,
      padding: '13px 15px',
      background: surface.containerWithin,
      borderRadius: `${radius.button}px`,
      boxSizing: 'border-box',
      gap: spacing.SM,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
        <p style={descStyle}>{item.description}</p>
        <InfoIcon tooltip={item.tooltip} />
      </div>
      <p style={metricStyle}>{item.metric}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Listed callout tile — List variant
// -----------------------------------------------------------------------------

function ListCalloutTile({ callout }: { callout: MetricListCallout }) {
  const headerStyle: CSSProperties = {
    fontFamily: typography.bodyBold.fontFamily,
    fontSize: typography.bodyBold.fontSize,
    fontWeight: typography.bodyBold.fontWeight,
    lineHeight: typography.bodyBold.lineHeight,
    letterSpacing: typography.bodyBold.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
    margin: 0,
  };

  const descStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
    margin: 0,
  };

  const metricStyle: CSSProperties = {
    fontFamily: typography.title3.fontFamily,
    fontSize: typography.title3.fontSize,
    fontWeight: typography.title3.fontWeight,
    lineHeight: typography.title3.lineHeight,
    color: text.body,
    whiteSpace: 'nowrap',
    margin: 0,
    flexShrink: 0,
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      flex: '1 1 180px',
      minWidth: 180,
      padding: '13px 15px',
      background: surface.containerWithin,
      borderRadius: `${radius.button}px`,
      boxSizing: 'border-box',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <p style={headerStyle}>{callout.header}</p>
        <InfoIcon tooltip={callout.headerTooltip} />
      </div>

      {/* Metric rows */}
      {callout.items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <p style={descStyle}>{item.description}</p>
            <InfoIcon tooltip={item.tooltip} />
          </div>
          <p style={metricStyle}>{item.metric}</p>
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main MetricCard component
// -----------------------------------------------------------------------------

export function MetricCard({
  title,
  titleTooltip,
  subtitle,
  variant = 'standard',
  callouts = [],
  calloutSize = 'regular',
  calloutsPerRow,
  listCallouts = [],
  style,
  className,
}: MetricCardProps) {

  // Split callouts into rows for the 'expanded' variant
  const calloutRows: MetricCalloutItem[][] = (() => {
    if (variant !== 'expanded' || !calloutsPerRow) return [callouts];
    const rows: MetricCalloutItem[][] = [];
    for (let i = 0; i < callouts.length; i += calloutsPerRow) {
      rows.push(callouts.slice(i, i + calloutsPerRow));
    }
    return rows;
  })();

  const cardStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.MD,
    padding: spacing.MD,
    background: surface.container,
    borderRadius: `${radius.card}px`,
    boxShadow: shadows.light,
    width: '100%',
    boxSizing: 'border-box',
    ...style,
  };

  const titleStyle: CSSProperties = {
    fontFamily: typography.title3.fontFamily,
    fontSize: typography.title3.fontSize,
    fontWeight: typography.title3.fontWeight,
    lineHeight: typography.title3.lineHeight,
    letterSpacing: typography.title3.letterSpacing,
    color: text.header,
    margin: 0,
    whiteSpace: 'nowrap',
  };

  const subtitleStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: text.body,
    margin: 0,
  };

  return (
    <div className={className} style={cardStyle}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <p style={titleStyle}>{title}</p>
          <InfoIcon tooltip={titleTooltip} />
        </div>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>

      {/* Standard / Expanded callouts */}
      {variant !== 'list' && calloutRows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.SM, alignItems: 'stretch' }}>
          {row.map((item, i) => (
            <CalloutTile key={i} item={item} size={calloutSize} />
          ))}
        </div>
      ))}

      {/* List callouts */}
      {variant === 'list' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.SM, alignItems: 'stretch' }}>
          {listCallouts.map((callout, i) => (
            <ListCalloutTile key={i} callout={callout} />
          ))}
        </div>
      )}
    </div>
  );
}
