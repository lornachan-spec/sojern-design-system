import React, { CSSProperties, ReactNode, useId } from 'react';
import { text, focus, buttons, semantic, toggle, typography, spacing } from '../../tokens';
import { Icon } from '../Icons';
import { useKeyboardFocus } from '../../hooks';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface RadioProps {
  /** Whether this option is selected */
  checked?: boolean;
  /** Called when the user selects this option */
  onChange?: () => void;
  /** Disables interaction */
  disabled?: boolean;
  /** Label text displayed to the right of the circle */
  label?: string;
  /** Validation error message shown below (shown when truthy) */
  error?: string;
  /** Value used when this radio is part of a RadioGroup */
  value?: string;
  /** Name attribute — links radios into a native group for keyboard nav */
  name?: string;
  /** Accessible id — auto-generated when omitted */
  id?: string;
  style?: CSSProperties;
  className?: string;
}

// -----------------------------------------------------------------------------
// Resolve icon name + colour from current state
// -----------------------------------------------------------------------------

function resolveIcon(checked: boolean, hasError: boolean) {
  if (checked)  return { name: 'Radio Active'  as const, color: toggle.offCircle };
  if (hasError) return { name: 'Radio error'   as const, color: buttons.destructiveEnabled };
  return         { name: 'Radio Inactive'       as const, color: text.body };
}

// -----------------------------------------------------------------------------
// RadioGroup — stacks radio buttons with 8px between each item
// -----------------------------------------------------------------------------

export interface RadioGroupProps {
  children: ReactNode;
  /** Validation error shown below the last item */
  error?: string;
  /** Override the default 8px gap between items */
  gap?: number;
  style?: CSSProperties;
  className?: string;
}

export function RadioGroup({ children, error, gap = 8, style, className }: RadioGroupProps) {
  const errorRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    paddingLeft: 4,
  };

  const errorTextStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: semantic.error,
  };

  return (
    <div
      role="radiogroup"
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap, ...style }}
    >
      {children}
      {error && (
        <div style={errorRowStyle}>
          <Icon name="Warning Filled" size={16} color={semantic.error} aria-hidden />
          <span style={errorTextStyle}>{error}</span>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Radio
// -----------------------------------------------------------------------------

export function Radio({
  checked = false,
  onChange,
  disabled = false,
  label,
  error,
  value,
  name,
  id: propId,
  style,
  className,
}: RadioProps) {
  const autoId = useId();
  const inputId = propId ?? autoId;
  const { isFocused, onFocus, onBlur } = useKeyboardFocus();

  const hasError = Boolean(error);
  const { name: iconName, color: iconColor } = resolveIcon(checked, hasError);

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 4,
    ...style,
  };

  const rowStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 4px',
    borderRadius: 5,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    outline: isFocused ? `2px solid ${focus.default}` : 'none',
    outlineOffset: 0,
    position: 'relative',
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

  const errorRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    paddingLeft: 4,
  };

  const errorTextStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: semantic.error,
  };

  return (
    <div className={className} style={wrapperStyle}>
      <label htmlFor={inputId} style={rowStyle}>
        {/* Hidden native radio for accessibility + keyboard navigation */}
        <input
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onChange?.()}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
            pointerEvents: 'none',
          }}
        />

        <Icon name={iconName} size={16} color={iconColor} aria-hidden />

        {label && <span style={labelStyle}>{label}</span>}
      </label>

      {/* Error message */}
      {hasError && !disabled && (
        <div style={errorRowStyle}>
          <Icon name="Warning Filled" size={16} color={semantic.error} aria-hidden />
          <span style={errorTextStyle}>{error}</span>
        </div>
      )}
    </div>
  );
}
