import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { surface, text, neutrals, shadows, radius, typography } from '../../tokens';
import { Icon } from '../Icons';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ModalProps {
  /** Controls whether the modal is visible */
  open: boolean;
  /** Called when the user dismisses the modal (close button, backdrop click, Escape) */
  onClose: () => void;
  /** Modal heading text */
  title: string;
  /** Body content */
  children: ReactNode;
  /**
   * Size variant:
   * - sm  400–480px  (default)
   * - md  600–720px
   * - lg  900–1040px
   */
  size?: ModalSize;
  /** Primary (confirm) action button */
  primaryAction?: ModalAction;
  /** Secondary action button — rendered to the left of the primary */
  secondaryAction?: ModalAction;
  /** When true, the "Don't show again" checkbox is visible in the footer */
  showDontShowAgain?: boolean;
  /** Controlled value for the "Don't show again" checkbox */
  dontShowAgainChecked?: boolean;
  /** Called when the "Don't show again" checkbox changes */
  onDontShowAgainChange?: (checked: boolean) => void;
}

// -----------------------------------------------------------------------------
// Size config
// -----------------------------------------------------------------------------

const SIZE_STYLES: Record<ModalSize, CSSProperties> = {
  sm: { width: 480, minWidth: 400, maxWidth: 480 },
  md: { width: 720, minWidth: 600, maxWidth: 720 },
  lg: { width: 1040, minWidth: 900, maxWidth: 1040 },
};

// -----------------------------------------------------------------------------
// Modal
// -----------------------------------------------------------------------------

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'sm',
  primaryAction,
  secondaryAction,
  showDontShowAgain = false,
  dontShowAgainChecked = false,
  onDontShowAgainChange,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Move focus into modal when it opens
  useEffect(() => {
    if (open) {
      // Small delay so the portal has rendered
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  // -------------------------------------------------------------------------
  // Styles
  // -------------------------------------------------------------------------

  const backdropStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(92, 103, 120, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 24,
  };

  const dialogStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: surface.modal,
    borderRadius: radius.container,
    boxShadow: shadows.light,
    ...SIZE_STYLES[size],
    maxHeight: 'calc(100vh - 48px)',
    overflow: 'hidden',
    outline: 'none',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 28px 0 28px',
    flexShrink: 0,
  };

  const titleStyle: CSSProperties = {
    fontFamily: typography.title3.fontFamily,
    fontSize: typography.title3.fontSize,
    fontWeight: typography.title3.fontWeight,
    lineHeight: typography.title3.lineHeight,
    color: text.header,
    margin: 0,
  };

  const closeButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: radius.button,
    color: text.body,
    flexShrink: 0,
    padding: 0,
    marginLeft: 8,
  };

  const bodyStyle: CSSProperties = {
    padding: '24px 28px',
    overflowY: 'auto',
    flex: 1,
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: text.body,
  };

  const footerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: showDontShowAgain ? 'space-between' : 'flex-end',
    padding: '20px 28px',
    borderTop: `1px solid ${neutrals[200]}`,
    flexShrink: 0,
    gap: 8,
  };

  const buttonGroupStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return createPortal(
    <div
      style={backdropStyle}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        ref={dialogRef}
        style={dialogStyle}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={headerStyle}>
          <h3 id="modal-title" style={titleStyle}>{title}</h3>
          <button
            type="button"
            aria-label="Close modal"
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={e => (e.currentTarget.style.background = neutrals[200])}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <Icon name="Close" size={20} color={text.body} />
          </button>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          {children}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          {showDontShowAgain && (
            <Checkbox
              checked={dontShowAgainChecked}
              onChange={onDontShowAgainChange}
              label="Don't show again"
            />
          )}
          <div style={buttonGroupStyle}>
            <Button variant="ghost" size="md" onClick={onClose}>
              Cancel
            </Button>
            {secondaryAction && (
              <Button
                variant="secondary"
                size="md"
                disabled={secondaryAction.disabled}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant="primary"
                size="md"
                disabled={primaryAction.disabled}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
