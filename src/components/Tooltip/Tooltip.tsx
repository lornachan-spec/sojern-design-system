import React, { CSSProperties, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { tooltip, typography, spacing, radius } from '../../tokens';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The tooltip text content */
  content: React.ReactNode;
  /** Position of the tooltip relative to the trigger */
  position?: TooltipPosition;
  /** The element that triggers the tooltip on hover/focus */
  children: React.ReactElement;
  /** Delay before showing tooltip in ms */
  delay?: number;
  className?: string;
  /** Extra styles applied to the inner trigger wrapper div */
  wrapperStyle?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Style helpers
// -----------------------------------------------------------------------------

const ARROW_SIZE = 6;
const GAP = 4;

interface BubbleCoords {
  top?: number;
  left: number;
  bottom?: number;
  transform: string;
}

function getBubbleCoords(rect: DOMRect, position: TooltipPosition): BubbleCoords {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  switch (position) {
    case 'top':
      return { top: rect.top - GAP - ARROW_SIZE, left: cx, transform: 'translateX(-50%) translateY(-100%)' };
    case 'bottom':
      return { top: rect.bottom + GAP + ARROW_SIZE, left: cx, transform: 'translateX(-50%)' };
    case 'left':
      return { top: cy, left: rect.left - GAP - ARROW_SIZE, transform: 'translateX(-100%) translateY(-50%)' };
    case 'right':
      return { top: cy, left: rect.right + GAP + ARROW_SIZE, transform: 'translateY(-50%)' };
  }
}

function getArrowStyle(position: TooltipPosition): CSSProperties {
  const base: CSSProperties = { position: 'absolute', width: 0, height: 0, border: 'none' };
  switch (position) {
    case 'top':
      return { ...base, bottom: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)',
        borderLeft: `${ARROW_SIZE}px solid transparent`, borderRight: `${ARROW_SIZE}px solid transparent`,
        borderTop: `${ARROW_SIZE}px solid ${tooltip.default}` };
    case 'bottom':
      return { ...base, top: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)',
        borderLeft: `${ARROW_SIZE}px solid transparent`, borderRight: `${ARROW_SIZE}px solid transparent`,
        borderBottom: `${ARROW_SIZE}px solid ${tooltip.default}` };
    case 'left':
      return { ...base, right: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)',
        borderTop: `${ARROW_SIZE}px solid transparent`, borderBottom: `${ARROW_SIZE}px solid transparent`,
        borderLeft: `${ARROW_SIZE}px solid ${tooltip.default}` };
    case 'right':
      return { ...base, left: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)',
        borderTop: `${ARROW_SIZE}px solid transparent`, borderBottom: `${ARROW_SIZE}px solid transparent`,
        borderRight: `${ARROW_SIZE}px solid ${tooltip.default}` };
  }
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Tooltip({
  content,
  position = 'top',
  children,
  delay = 200,
  className,
  wrapperStyle,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<BubbleCoords>({ top: 0, left: 0, transform: '' });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (content == null || content === '') return;
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords(getBubbleCoords(rect, position));
    }
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  React.useEffect(() => {
    const handleScroll = () => hide();
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const bubbleStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    top: coords.top,
    left: coords.left,
    transform: coords.transform,
    backgroundColor: tooltip.default,
    color: '#FFFFFF',
    fontFamily: typography.tooltip.fontFamily,
    fontSize: typography.tooltip.fontSize,
    fontWeight: typography.tooltip.fontWeight,
    lineHeight: typography.tooltip.lineHeight,
    letterSpacing: '0.3px',
    padding: `${spacing.XS}px 9px`,
    borderRadius: `${radius.button}px`,
    minWidth: '75px',
    maxWidth: '320px',
    width: 'max-content',
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    textAlign: 'center',
    pointerEvents: 'none',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.15s ease',
  };

  const bubble = (
    <div role="tooltip" style={bubbleStyle} aria-hidden={!visible}>
      {content}
      <div style={getArrowStyle(position)} />
    </div>
  );

  return (
    <>
      <div
        ref={wrapperRef}
        className={className}
        style={{ position: 'relative', display: 'inline-flex', ...wrapperStyle }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </div>
      {ReactDOM.createPortal(bubble, document.body)}
    </>
  );
}
