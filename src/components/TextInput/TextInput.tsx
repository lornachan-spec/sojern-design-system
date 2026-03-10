import React, { CSSProperties, useState, useEffect, useRef, InputHTMLAttributes } from 'react';
import { surface, text, border as borderTokens, focus, semantic, typography, radius } from '../../tokens';
import { Icon } from '../Icons';
import type { IconName } from '../Icons/Icons';
import { useKeyboardFocus } from '../../hooks';

// Inject global styles once per page load
if (typeof document !== 'undefined' && !document.getElementById('sds-text-input-styles')) {
  const el = document.createElement('style');
  el.id = 'sds-text-input-styles';
  el.textContent = [
    `.sds-input::placeholder { color: ${text.disabled}; opacity: 1; }`,
    `.sds-input:disabled { cursor: not-allowed; }`,
    `.sds-input[type="number"]::-webkit-inner-spin-button, .sds-input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }`,
    `.sds-input[type="number"] { -moz-appearance: textfield; }`,
  ].join('\n');
  document.head.appendChild(el);
}

// Measures pixel width of a string using the input's own font settings.
function measureTextWidth(str: string): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 32;
  ctx.font = `${typography.bodyRegular.fontWeight} ${typography.bodyRegular.fontSize}/${typography.bodyRegular.lineHeight} ${typography.bodyRegular.fontFamily}`;
  return ctx.measureText(str).width;
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type TextInputSize = 'default' | 'short' | 'long' | 'numeric';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Controls the recommended max-width of the input */
  size?: TextInputSize;
  /** Puts the input in an error state — red 2px border */
  error?: boolean;
  /** Optional icon rendered at the trailing (right) end */
  trailingIcon?: IconName;
  /** Style overrides applied to the outer wrapper div */
  wrapperStyle?: CSSProperties;
  /** ClassName applied to the outer wrapper div */
  wrapperClassName?: string;
}

const sizeStyles: Record<TextInputSize, CSSProperties> = {
  default: { width: '100%', maxWidth: 360 },
  short:   { width: 120, maxWidth: 200 },
  long:    { width: '100%' },
  numeric: {},
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function TextInput({
  size = 'default',
  error = false,
  trailingIcon,
  disabled,
  value,
  defaultValue,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  style,
  className,
  wrapperStyle,
  wrapperClassName,
  ...rest
}: TextInputProps) {
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue !== undefined ? String(defaultValue) : ''
  );
  const [isMouseFocused, setIsMouseFocused] = useState(false);
  const [numericWidth, setNumericWidth] = useState<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isFocused: isKeyboardFocused, onFocus: onKeyboardFocus, onBlur: onKeyboardBlur } = useKeyboardFocus();

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;

  // Measure and update width whenever the numeric input's content changes
  useEffect(() => {
    if (size !== 'numeric') return;
    const displayText = currentValue || placeholder || '';
    // Add a small buffer (4px) for the text cursor
    const w = Math.ceil(measureTextWidth(displayText)) + 4;
    setNumericWidth(Math.max(w, 24));
  }, [size, currentValue, placeholder]);

  // Determine border colour based on state priority:
  // error > keyboard-focused (blue) > mouse-focused/active (dark) > default
  let borderColor: string;
  let borderWidth: number;

  if (error) {
    borderColor = semantic.error;
    borderWidth = 2;
  } else if (isKeyboardFocused) {
    borderColor = focus.default;
    borderWidth = 2;
  } else if (isMouseFocused) {
    borderColor = text.body;
    borderWidth = 1;
  } else {
    borderColor = borderTokens.input;
    borderWidth = 1;
  }

  // Compensate padding so the inner content area stays stable
  // when border width switches between 1px and 2px.
  const padV = 7 - (borderWidth - 1);
  const padH = 8 - (borderWidth - 1);

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    height: 34,
    paddingTop: padV,
    paddingBottom: padV,
    paddingLeft: padH,
    paddingRight: padH,
    borderRadius: radius.button,
    border: `${borderWidth}px solid ${borderColor}`,
    background: disabled ? surface.inputDisabled : surface.inputDefault,
    boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color 0.15s ease, border-width 0s',
    ...sizeStyles[size],
    ...wrapperStyle,
  };

  const inputStyle: CSSProperties = {
    flex: size === 'numeric' ? '0 0 auto' : 1,
    width: size === 'numeric' ? numericWidth : undefined,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: disabled ? text.disabled : text.body,
    minWidth: 0,
    padding: 0,
    margin: 0,
    ...style,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsMouseFocused(true);
    onKeyboardFocus();
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsMouseFocused(false);
    onKeyboardBlur();
    onBlur?.(e);
  };

  return (
    <div style={containerStyle} className={wrapperClassName}>
      <input
        {...rest}
        ref={inputRef}
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={inputStyle}
        className={`sds-input${className ? ` ${className}` : ''}`}
      />
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={16}
          color={disabled ? text.disabled : text.body}
          aria-hidden
        />
      )}
    </div>
  );
}
