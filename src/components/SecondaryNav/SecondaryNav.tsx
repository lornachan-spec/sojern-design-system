import React, { CSSProperties, useState } from 'react';
import { navSecondary, border, typography, spacing } from '../../tokens';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SecondaryNavTab {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
}

export interface SecondaryNavProps {
  /** Array of tabs to render */
  tabs: SecondaryNavTab[];
  /** ID of the currently active tab */
  activeId?: string;
  /** Called when a tab is clicked */
  onTabChange?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// SecondaryNavTab (internal)
// -----------------------------------------------------------------------------

interface TabItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabItem({ label, active, onClick }: TabItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const color = active
    ? navSecondary.active
    : isHovered
    ? navSecondary.hover
    : navSecondary.default;

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.XS,
    paddingBottom: spacing.MD,
    paddingLeft: spacing.none,
    paddingRight: spacing.none,
    borderBottom: active ? `2px solid ${navSecondary.active}` : '2px solid transparent',
    cursor: 'pointer',
    userSelect: 'none',
    flexShrink: 0,
    transition: 'color 0.15s ease, border-color 0.15s ease',
    marginBottom: -1,
  };

  const labelStyle: CSSProperties = {
    fontFamily: typography.bodyBold.fontFamily,
    fontSize: typography.bodyBold.fontSize,
    fontWeight: typography.bodyBold.fontWeight,
    lineHeight: typography.bodyBold.lineHeight,
    letterSpacing: typography.bodyBold.letterSpacing,
    color,
    whiteSpace: 'nowrap',
  };

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="tab"
      tabIndex={0}
      aria-selected={active}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SecondaryNav
// -----------------------------------------------------------------------------

/**
 * A horizontal secondary navigation bar with tab-style items.
 * Renders a bottom-bordered row of tabs; the active tab is highlighted
 * in orange with a matching bottom border.
 */
export function SecondaryNav({
  tabs,
  activeId,
  onTabChange,
  className,
  style,
}: SecondaryNavProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: spacing.MD,
    borderBottom: `1px solid ${border.primary}`,
    width: '100%',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div
      style={containerStyle}
      className={className}
      role="tablist"
      aria-label="Secondary navigation"
    >
      {tabs.map(tab => (
        <TabItem
          key={tab.id}
          label={tab.label}
          active={tab.id === activeId}
          onClick={() => onTabChange?.(tab.id)}
        />
      ))}
    </div>
  );
}
