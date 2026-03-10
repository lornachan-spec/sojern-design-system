import React, { CSSProperties, useEffect, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icons';
import { alerts, semantic, text, radius, typography, spacing } from '../../tokens';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ToastVariant = 'success' | 'critical' | 'alert' | 'informational';

export interface ToastProps {
  variant: ToastVariant;
  message: string;
  /** Optional action button rendered inline */
  action?: { label: string; onClick: () => void };
  /** Called when the close button is clicked or auto-dismiss fires */
  onClose?: () => void;
  /** Auto-dismiss after ms — set to 0 to disable. Defaults to 0 (no auto-dismiss) */
  autoDismiss?: number;
  /** Control visibility externally */
  visible?: boolean;
}

// -----------------------------------------------------------------------------
// Config per variant
// -----------------------------------------------------------------------------

const variantConfig: Record<ToastVariant, {
  background: string;
  border: string;
  icon: React.ReactNode;
  label: string;
}> = {
  success: {
    background: alerts.successBackground,
    border: alerts.success,
    icon: <Icon name="Checkmark Filled" size={20} color={semantic.success} />,
    label: 'Success',
  },
  critical: {
    background: alerts.criticalBackground,
    border: semantic.error,
    icon: <Icon name="Critical" size={20} color={semantic.error} />,
    label: 'Critical',
  },
  alert: {
    background: alerts.warningBackground,
    border: semantic.warning,
    icon: <Icon name="Alert" size={20} color={semantic.warning} />,
    label: 'Alert',
  },
  informational: {
    background: alerts.infoBackground,
    border: alerts.info,
    icon: <Icon name="Info Filled" size={20} color={semantic.info} />,
    label: 'Informational',
  },
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Toast({
  variant,
  message,
  action,
  onClose,
  autoDismiss = 0,
  visible = true,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const config = variantConfig[variant];

  const dismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 200);
  };

  useEffect(() => {
    if (autoDismiss > 0) {
      const timer = setTimeout(dismiss, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss]);

  useEffect(() => {
    setIsVisible(visible);
    if (visible) setIsFadingOut(false);
  }, [visible]);

  if (!isVisible) return null;

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    padding: `${spacing.MD}px`,
    background: config.background,
    border: `1px solid ${config.border}`,
    borderRadius: `${radius.card}px`,
    width: '100%',
    boxSizing: 'border-box',
    opacity: isFadingOut ? 0 : 1,
    transition: 'opacity 0.2s ease',
  };

  const messageStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: text.body,
    flex: 1,
    minWidth: 0,
    margin: 0,
  };

  return (
    <div role="alert" aria-live="polite" aria-label={config.label} style={wrapperStyle}>
      {/* Icon */}
      <span style={{ display: 'flex', flexShrink: 0 }}>{config.icon}</span>

      {/* Message */}
      <p style={messageStyle}>{message}</p>

      {/* Action button — uses the design system Button with all states */}
      {action && (
        <Button variant="secondary" size="md" onClick={action.onClick} style={{ flexShrink: 0 }}>
          {action.label}
        </Button>
      )}

      {/* Close button — ghost icon-only button with all states */}
      {onClose && (
        <Button
          variant="ghost"
          size="md"
          aria-label="Dismiss notification"
          onClick={dismiss}
          style={{ flexShrink: 0, padding: '4px' }}
        >
          <Icon name="Close" size={16} color={text.body} />
        </Button>
      )}
    </div>
  );
}
