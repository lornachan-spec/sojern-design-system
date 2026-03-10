import React, { CSSProperties, useState } from 'react';
import { surface, text, blue, border, secondary, typography, buttons } from '../../tokens';
import { Icon } from '../Icons';
import { Checkbox } from '../Checkbox';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type DropdownRowVariant =
  | 'default'       // plain text row — single-select
  | 'checkbox'      // checkbox + text row — multi-select
  | 'count-clear'   // "N selected  Clear all" utility row — shown at top of multi-select
  | 'select-all';   // checkbox + "Select all" row — shown at bottom of multi-select header

export interface DropdownRowProps {
  /** Primary label text */
  label?: string;
  /** Whether this row is currently selected */
  selected?: boolean;
  /** Row variant — controls layout and background */
  variant?: DropdownRowVariant;
  /** Count string shown in the count-clear variant e.g. "3 selected" */
  count?: string;
  /** Label for the clear action in the count-clear variant */
  clearLabel?: string;
  /** Click handler for the row */
  onClick?: () => void;
  /** Click handler for the "Clear all" action (count-clear variant only) */
  onClearAll?: () => void;
  /** Disables the row */
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DropdownRow({
  label = 'Option',
  selected = false,
  variant = 'default',
  count = '0 selected',
  clearLabel = 'Clear all',
  onClick,
  onClearAll,
  disabled = false,
  className,
  style,
}: DropdownRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isCountClear = variant === 'count-clear';
  const isSelectAll  = variant === 'select-all';
  const hasCheckbox  = variant === 'checkbox' || isSelectAll;

  // Background priority: selected > hovered > default
  let background: string;
  if (isCountClear) {
    background = secondary.offWhite;
  } else if (selected) {
    background = surface.selected;
  } else if (isHovered && !disabled) {
    background = blue[100];
  } else {
    background = 'transparent';
  }

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCountClear ? 'space-between' : 'flex-start',
    gap: hasCheckbox || isSelectAll ? 4 : 0,
    height: 36,
    paddingLeft: 16,
    paddingRight: 16,
    background,
    borderTop:    isCountClear ? `1px solid ${border.secondary}` : undefined,
    borderBottom: isSelectAll  ? `1px solid ${border.secondary}` : undefined,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
    boxSizing: 'border-box',
    width: '100%',
    transition: 'background 0.12s ease',
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const countStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
  };

  const clearStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: buttons.linkEnabled,
    whiteSpace: 'nowrap',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  };

  const handleClick = () => {
    if (!disabled) onClick?.();
  };

  if (isCountClear) {
    return (
      <div style={rowStyle} className={className}>
        <span style={countStyle}>{count}</span>
        <button
          style={clearStyle}
          onClick={e => { e.stopPropagation(); onClearAll?.(); }}
          type="button"
        >
          {clearLabel}
        </button>
      </div>
    );
  }

  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      style={rowStyle}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasCheckbox && (
        <Checkbox
          checked={selected}
          onChange={() => {}}
          style={{ pointerEvents: 'none', flexShrink: 0 }}
        />
      )}
      <span style={labelStyle}>{label}</span>
    </div>
  );
}
