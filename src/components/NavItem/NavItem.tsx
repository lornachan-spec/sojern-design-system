import React, { CSSProperties, useState } from 'react';
import { navPrimary, text, typography } from '../../tokens';
import { Icon } from '../Icons';
import type { IconName } from '../Icons/Icons';
import { Badge } from '../Badge';
import type { BadgeStage } from '../Badge';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface NavItemProps {
  /** Label text */
  label: string;
  /** Icon shown on top-level items (omit for sub-items) */
  icon?: IconName;
  /** Whether this is the currently active/selected item */
  active?: boolean;
  /**
   * Whether this is a sub-item (indented, no icon, shorter height).
   * Defaults to false.
   */
  isSubItem?: boolean;
  /**
   * Whether this item has sub-items. Shows a chevron expand indicator.
   * Combine with `expanded` to control direction.
   */
  hasSubItems?: boolean;
  /**
   * Whether the sub-items are currently visible.
   * When true and not `active`, renders the "Active Dropdown" state
   * (dark background, bold text, chevron up — but no orange right border).
   */
  expanded?: boolean;
  /**
   * Collapsed (icon-only) mode — hides label and chevron, centers the icon.
   * Used by SideNav when the rail is collapsed.
   */
  collapsed?: boolean;
  /**
   * Optional release-stage badge shown inline after the label.
   * Renders using `placement="navigation"` (transparent with border, white text).
   */
  badge?: BadgeStage;
  /** Click handler */
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function NavItem({
  label,
  icon,
  active = false,
  isSubItem = false,
  hasSubItems = false,
  expanded = false,
  collapsed = false,
  badge,
  onClick,
  className,
  style,
}: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isActiveDropdown = !active && expanded && hasSubItems;
  const showActiveStyling = active || isActiveDropdown;
  const showRightBorder = active;

  const height = isSubItem ? 'auto' : 38;
  const minHeight = isSubItem ? 36 : undefined;
  const paddingTop = isSubItem ? 8 : 0;
  const paddingBottom = isSubItem ? 8 : 0;
  const paddingLeft = collapsed ? 0 : isSubItem ? 40 : 16;
  const paddingRight = collapsed ? 0 : 16;

  let background = 'transparent';
  if (showActiveStyling || isHovered) background = navPrimary.activeBackground;

  const fontWeight = showActiveStyling
    ? typography.bodyBold.fontWeight
    : typography.bodyRegular.fontWeight;

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : hasSubItems ? 'space-between' : 'flex-start',
    gap: collapsed ? 0 : 8,
    height,
    minHeight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    background,
    borderRight: showRightBorder ? `3px solid ${navPrimary.activeBorder}` : '3px solid transparent',
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
    width: '100%',
    outline: 'none',
    transition: 'background 0.15s ease',
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight,
    lineHeight: 1.4,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: text.verticalNav,
    ...(isSubItem
      ? { whiteSpace: 'normal', wordBreak: 'break-word' }
      : { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
    flex: 1,
  };

  return (
    <div
      style={containerStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="menuitem"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      aria-current={active ? 'page' : undefined}
    >
      {collapsed ? (
        // Collapsed: icon only, centered
        icon && (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, flexShrink: 0 }}>
            <Icon name={icon} size={16} color={text.verticalNav} aria-hidden />
          </span>
        )
      ) : (
        <>
          {/* Left group: icon + label + optional badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
            {icon && !isSubItem && (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, flexShrink: 0 }}>
                <Icon name={icon} size={16} color={text.verticalNav} aria-hidden />
              </span>
            )}
            <span style={labelStyle}>{label}</span>
            {badge && (
              <Badge stage={badge} placement="navigation" style={{ flexShrink: 0 }} />
            )}
          </div>

          {/* Expand chevron — always shown on items with sub-items */}
          {hasSubItems && (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, flexShrink: 0 }}>
              <Icon
                name={expanded ? 'Chevron Up' : 'Chevron Down'}
                size={16}
                color={text.verticalNav}
                aria-hidden
              />
            </span>
          )}
        </>
      )}
    </div>
  );
}
