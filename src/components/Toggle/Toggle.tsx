import React, { CSSProperties, useId } from 'react';
import { toggle as toggleTokens, focus, typography, text } from '../../tokens';
import { Icon } from '../Icons';
import { useKeyboardFocus } from '../../hooks';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ToggleProps {
  /** Whether the toggle is on */
  checked?: boolean;
  /** Called when the toggle is clicked */
  onChange?: (checked: boolean) => void;
  /** Disables interaction */
  disabled?: boolean;
  /** Label displayed to the right of the toggle */
  label?: string;
  /** Accessible id — auto-generated if omitted */
  id?: string;
  style?: CSSProperties;
  className?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  id: propId,
  style,
  className,
}: ToggleProps) {
  const autoId = useId();
  const inputId = propId ?? autoId;
  const { isFocused, onFocus, onBlur } = useKeyboardFocus();

  // Visual tokens
  const barColor    = checked ? toggleTokens.offBar    : toggleTokens.onBar;
  const circleColor = checked ? toggleTokens.offCircle : toggleTokens.onCircle;

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  };

  const trackWrapperStyle: CSSProperties = {
    position: 'relative',
    width: 32,
    height: 16,
    flexShrink: 0,
    borderRadius: 10,
    outline: isFocused ? `2px solid ${focus.default}` : 'none',
    outlineOffset: 3,
  };

  // The bar sits behind the thumb, offset so the thumb overhangs both sides
  const barStyle: CSSProperties = {
    position: 'absolute',
    top: 4,
    left: checked ? 0 : 7,
    width: 25,
    height: 8,
    borderRadius: 10,
    background: barColor,
    transition: 'left 0.2s ease, background 0.2s ease',
  };

  // Circular thumb
  const thumbStyle: CSSProperties = {
    position: 'absolute',
    top: 1,
    left: checked ? 18 : 0,
    width: 14,
    height: 14,
    borderRadius: '50%',
    background: circleColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'left 0.2s ease, background 0.2s ease',
    boxSizing: 'border-box',
  };

  const labelStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: disabled ? text.disabled : text.body,
    userSelect: 'none',
  };

  return (
    <label htmlFor={inputId} className={className} style={containerStyle}>
      {/* Hidden native checkbox for accessibility */}
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
        aria-checked={checked}
      />

      {/* Visual track */}
      <div style={trackWrapperStyle}>
        <div style={barStyle} />
        <div style={thumbStyle}>
          <Icon
            name={checked ? 'Checkmark' : 'Close'}
            size={6}
            color={toggleTokens.icon}
            aria-hidden
          />
        </div>
      </div>

      {/* Label */}
      {label && <span style={labelStyle}>{label}</span>}
    </label>
  );
}
