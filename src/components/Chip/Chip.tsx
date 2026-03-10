import React, { CSSProperties } from 'react';
import { Icon } from '../Icons';
import { chips, focus, typography, spacing } from '../../tokens';
import { useKeyboardFocus } from '../../hooks';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ChipVariant = 'warning' | 'success' | 'error' | 'active' | 'information';

export interface ChipProps {
  /** Content of the chip label */
  label: string;
  /** Visual variant — maps to status/semantic colors */
  variant?: ChipVariant;
  /** Shows the dismiss (×) button */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Style helpers
// -----------------------------------------------------------------------------

const variantBackgrounds: Record<ChipVariant, string> = {
  warning:     chips.warning,
  success:     chips.success,
  error:       chips.critical,
  active:      chips.active,
  information: chips.neutral,
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Chip({
  label,
  variant = 'information',
  dismissible = false,
  onDismiss,
  className,
  style,
}: ChipProps) {
  const { isFocused, onFocus, onBlur } = useKeyboardFocus();

  const chipStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: dismissible ? `${spacing.SM}px` : undefined,
    paddingTop: `${spacing.XS}px`,
    paddingBottom: `${spacing.XS}px`,
    paddingLeft: `${spacing.MD}px`,
    paddingRight: dismissible ? `${spacing.SM}px` : `${spacing.MD}px`,
    borderRadius: '40px',
    backgroundColor: variantBackgrounds[variant],
    color: chips.text,
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    whiteSpace: 'nowrap',
    ...style,
  };

  const dismissButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: chips.text,
    flexShrink: 0,
    borderRadius: '50%',
    outline: isFocused ? `2px solid ${focus.default}` : 'none',
    outlineOffset: '1px',
  };

  return (
    <div className={className} style={chipStyle}>
      <span>{label}</span>
      {dismissible && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          style={dismissButtonStyle}
          onClick={onDismiss}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <Icon name="Close" size={16} color="currentColor" />
        </button>
      )}
    </div>
  );
}
