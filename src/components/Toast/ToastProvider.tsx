import React, { CSSProperties, createContext, useCallback, useContext, useRef, useState } from 'react';
import { Toast, ToastVariant } from './Toast';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ToastOptions {
  variant: ToastVariant;
  message: string;
  action?: { label: string; onClick: () => void };
  /** Auto-dismiss after ms. Defaults to 5000. Set to 0 to disable. */
  autoDismiss?: number;
}

interface ToastEntry extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

const ToastContext = createContext<ToastContextValue | null>(null);

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Where toasts stack on screen */
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  /** Max toasts shown at once */
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const counter = useRef(0);

  const show = useCallback((options: ToastOptions): string => {
    const id = `toast-${++counter.current}`;
    setToasts(prev => {
      const next = [...prev, { ...options, id }];
      return next.slice(-maxToasts);
    });
    return id;
  }, [maxToasts]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const containerStyle = getContainerStyle(position);

  return (
    <ToastContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      <div style={containerStyle} aria-live="polite" aria-atomic="false">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            message={toast.message}
            action={toast.action}
            autoDismiss={toast.autoDismiss ?? 5000}
            onClose={() => dismiss(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
}

// -----------------------------------------------------------------------------
// Position helper
// -----------------------------------------------------------------------------

function getContainerStyle(position: ToastProviderProps['position']): CSSProperties {
  const base: CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    pointerEvents: 'none',
    width: '420px',
    maxWidth: 'calc(100vw - 32px)',
  };

  switch (position) {
    case 'top-right':    return { ...base, top: 16, right: 16 };
    case 'top-left':     return { ...base, top: 16, left: 16 };
    case 'top-center':   return { ...base, top: 16, left: '50%', transform: 'translateX(-50%)' };
    case 'bottom-right': return { ...base, bottom: 16, right: 16, flexDirection: 'column-reverse' };
    case 'bottom-left':  return { ...base, bottom: 16, left: 16, flexDirection: 'column-reverse' };
    case 'bottom-center':return { ...base, bottom: 16, left: '50%', transform: 'translateX(-50%)', flexDirection: 'column-reverse' };
    default:             return { ...base, top: 16, right: 16 };
  }
}
