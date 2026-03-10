import React, { CSSProperties, useState } from 'react';
import { buttons, text, focus, radius, typography, spacing } from '../../tokens';
import { useKeyboardFocus } from '../../hooks';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ButtonVariant =
  | 'primary'     // Dark navy — main action
  | 'special'     // Fire orange — high-impact action
  | 'secondary'   // White with dark border — supporting action
  | 'ghost'       // Transparent — minimal weight action
  | 'link'        // Text only — navigational
  | 'destructive'; // Red — irreversible/dangerous action

export type ButtonSize = 'sm' | 'md' | 'lrg';

export type ButtonState = 'enabled' | 'hover' | 'active' | 'focused' | 'disabled';

export interface ButtonProps {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Icon displayed before the label */
  iconLeft?: React.ReactNode;
  /** Icon displayed after the label */
  iconRight?: React.ReactNode;
  /** Button label */
  children: React.ReactNode;
  /** Disables the button */
  disabled?: boolean;
  /** Makes the button fill its container width */
  fullWidth?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Accessible label for icon-only buttons */
  'aria-label'?: string;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Style helpers
// -----------------------------------------------------------------------------

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: {
    height: '25px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: `${spacing.SM}px`,
    paddingRight: `${spacing.SM}px`,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
  },
  md: {
    height: '28px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: `${spacing.MD}px`,
    paddingRight: `${spacing.MD}px`,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyBold.fontWeight,
  },
  lrg: {
    height: '36px',
    paddingTop: `${spacing.SM}px`,
    paddingBottom: `${spacing.SM}px`,
    paddingLeft: `${spacing.MD}px`,
    paddingRight: `${spacing.MD}px`,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyBold.fontWeight,
  },
};

type ButtonColorConfig = {
  background: string;
  color: string;
  border?: string;
  hoverBackground: string;
  hoverColor?: string;
  hoverBorder?: string;
  activeBackground: string;
};

const variantConfig: Record<ButtonVariant, ButtonColorConfig> = {
  special: {
    background: buttons.specialEnabled,
    color: text.buttonColor,
    hoverBackground: buttons.specialHover,
    activeBackground: buttons.specialActive,
  },
  primary: {
    background: buttons.primaryEnabled,
    color: text.buttonColor,
    hoverBackground: buttons.primaryHover,
    activeBackground: buttons.primaryActive,
  },
  secondary: {
    background: buttons.secondaryEnabledFilled,
    color: buttons.secondaryText,
    border: buttons.secondaryEnabledBorder,
    hoverBackground: buttons.secondaryHover,
    hoverColor: text.buttonColor,
    hoverBorder: buttons.secondaryHover,
    activeBackground: buttons.secondaryActive,
  },
  ghost: {
    background: 'transparent',
    color: buttons.secondaryText,
    hoverBackground: buttons.ghostHover,
    activeBackground: buttons.ghostActive,
  },
  link: {
    background: 'transparent',
    color: buttons.linkEnabled,
    hoverBackground: 'transparent',
    hoverColor: buttons.linkHover,
    activeBackground: 'transparent',
  },
  destructive: {
    background: buttons.destructiveEnabled,
    color: text.buttonColor,
    hoverBackground: buttons.destructiveHover,
    activeBackground: buttons.destructiveActive,
  },
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Button({
  variant = 'primary',
  size = 'lrg',
  iconLeft,
  iconRight,
  children,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className,
  style,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { isFocused, onFocus, onBlur: onFocusBlur } = useKeyboardFocus();

  const config = variantConfig[variant];

  const getBackgroundColor = () => {
    if (disabled) return buttons.disabled;
    if (isActive) return config.activeBackground;
    if (isHovered) return config.hoverBackground;
    return config.background;
  };

  const getTextColor = () => {
    if (disabled) return text.disabled;
    if (isHovered && config.hoverColor) return config.hoverColor;
    return config.color;
  };

  const getBorderColor = () => {
    if (!config.border) return undefined;
    if (disabled) return buttons.disabled;
    if (isHovered && config.hoverBorder) return config.hoverBorder;
    return config.border;
  };

  // Link focused state uses a visible border box (matches Figma — adds padding around text)
  const getLinkFocusBorder = () => {
    if (variant === 'link' && isFocused) return `1px solid ${focus.default}`;
    return 'none';
  };

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.XS}px`,
    width: fullWidth ? '100%' : undefined,
    borderRadius: `${radius.button}px`,
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    fontFamily: typography.bodyBold.fontFamily,
    lineHeight: typography.bodyBold.lineHeight,
    letterSpacing: typography.bodyBold.letterSpacing,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : undefined,
    textDecoration: variant === 'link' && isHovered ? 'underline' : 'none',
    transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...style,
    // Focus and border applied last so they cannot be overridden by the style prop
    border: variant === 'link'
      ? getLinkFocusBorder()
      : config.border
        ? `1px solid ${getBorderColor()}`
        : 'none',
    outline: isFocused && variant !== 'link' ? `2px solid ${focus.default}` : 'none',
    outlineOffset: '2px',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) setIsActive(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) setIsActive(false);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
      onMouseDown={() => { if (!disabled) setIsActive(true); }}
      onMouseUp={() => setIsActive(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onFocus={() => { if (!disabled) onFocus(); }}
      onBlur={() => { onFocusBlur(); setIsActive(false); }}
    >
      {iconLeft && (
        <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          {iconRight}
        </span>
      )}
    </button>
  );
}
