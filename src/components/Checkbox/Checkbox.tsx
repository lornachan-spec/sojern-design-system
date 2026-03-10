import React, { CSSProperties, ReactNode, useId } from 'react';
import { text, focus, buttons, semantic, toggle, typography } from '../../tokens';
import { Icon } from '../Icons';
import { useKeyboardFocus } from '../../hooks';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Indeterminate state — shows a dash instead of a checkmark */
  indeterminate?: boolean;
  /** Called when the user toggles the checkbox */
  onChange?: (checked: boolean) => void;
  /** Disables all interaction */
  disabled?: boolean;
  /** Label text displayed to the right of the box */
  label?: string;
  /** Validation error message shown below the checkbox */
  error?: string;
  /** Accessible id — auto-generated when omitted */
  id?: string;
  style?: CSSProperties;
  className?: string;
}

// -----------------------------------------------------------------------------
// Resolve which Icon name and color to use for the current state
// -----------------------------------------------------------------------------

function resolveBoxIcon(checked: boolean, indeterminate: boolean, hasError: boolean) {
  if (checked)       return { name: 'Checkbox Active'        as const, color: toggle.offCircle };
  if (indeterminate) return { name: 'Checkbox Indeterminate' as const, color: toggle.offCircle };
  if (hasError)      return { name: 'Checkbox Error'         as const, color: buttons.destructiveEnabled };
  return             { name: 'Checkbox Inactive'             as const, color: text.body };
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// CheckboxGroup — stacks checkboxes in a list with 8px between each item
// -----------------------------------------------------------------------------

export interface CheckboxGroupProps {
  children: ReactNode;
  /** Validation error shown below the last item */
  error?: string;
  /** Override the default 8px gap between items */
  gap?: number;
  style?: CSSProperties;
  className?: string;
}

export function CheckboxGroup({ children, error, gap = 8, style, className }: CheckboxGroupProps) {
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
// Checkbox
// -----------------------------------------------------------------------------

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  error,
  id: propId,
  style,
  className,
}: CheckboxProps) {
  const autoId = useId();
  const inputId = propId ?? autoId;
  const { isFocused, onFocus, onBlur } = useKeyboardFocus();

  const hasError = Boolean(error);
  const { name: iconName, color: iconColor } = resolveBoxIcon(checked, indeterminate && !checked, hasError);

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
        {/* Hidden native input for a11y */}
        <input
          type="checkbox"
          id={inputId}
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={el => {
            if (el) el.indeterminate = indeterminate && !checked;
          }}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
            pointerEvents: 'none',
          }}
          aria-checked={indeterminate && !checked ? 'mixed' : checked}
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
