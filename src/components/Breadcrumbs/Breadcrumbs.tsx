import React, { CSSProperties, useState } from 'react';
import { Tooltip } from '../Tooltip';
import { text, buttons, focus, typography } from '../../tokens';
import { useKeyboardFocus } from '../../hooks';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface BreadcrumbItem {
  /** Display label for this breadcrumb */
  label: string;
  /** URL — if omitted the item renders as plain text */
  href?: string;
  /** Click handler — alternative to href */
  onClick?: (event: React.MouseEvent) => void;
  /** Truncate the label at this pixel width and show the full label in a tooltip */
  maxWidth?: number;
}

export interface BreadcrumbsProps {
  /** Ordered list of breadcrumb items — last item is always the current page */
  items: BreadcrumbItem[];
  /** Separator character between items */
  separator?: string;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function BreadcrumbLink({ item }: { item: BreadcrumbItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFocused, onFocus, onBlur } = useKeyboardFocus();

  const linkStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: isHovered ? buttons.linkEnabled : text.body,
    textDecoration: isHovered ? 'underline' : 'none',
    textDecorationColor: buttons.linkEnabled,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '1px 3px',
    margin: '-1px -3px',
    borderRadius: '4px',
    outline: isFocused ? `2px solid ${focus.default}` : 'none',
    outlineOffset: '2px',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s ease',
    ...(item.maxWidth ? {
      maxWidth: item.maxWidth,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      verticalAlign: 'bottom',
    } : {}),
  };

  const handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus,
    onBlur,
  };

  const element = item.href ? (
    <a href={item.href} style={linkStyle} {...handlers}>
      {item.label}
    </a>
  ) : (
    <button type="button" style={linkStyle} onClick={item.onClick} {...handlers}>
      {item.label}
    </button>
  );

  if (item.maxWidth) {
    return (
      <Tooltip content={item.label} position="top">
        {element}
      </Tooltip>
    );
  }

  return element;
}

function BreadcrumbCurrentPage({ item }: { item: BreadcrumbItem }) {
  const style: CSSProperties = {
    fontFamily: typography.bodySmallBold.fontFamily,
    fontSize: typography.bodySmallBold.fontSize,
    fontWeight: typography.bodySmallBold.fontWeight,
    lineHeight: typography.bodySmallBold.lineHeight,
    letterSpacing: typography.bodySmallBold.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
    ...(item.maxWidth ? {
      maxWidth: item.maxWidth,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      verticalAlign: 'bottom',
    } : {}),
  };

  const span = <span style={style} aria-current="page">{item.label}</span>;

  if (item.maxWidth) {
    return (
      <Tooltip content={item.label} position="top">
        {span}
      </Tooltip>
    );
  }

  return span;
}

function BreadcrumbSeparator({ separator }: { separator: string }) {
  const style: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    color: text.body,
    userSelect: 'none',
    flexShrink: 0,
  };

  return (
    <span style={style} aria-hidden="true">
      {separator}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Breadcrumbs({
  items,
  separator = '/',
  className,
  style,
}: BreadcrumbsProps) {
  if (!items.length) return null;

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
    ...style,
  };

  return (
    <nav aria-label="Breadcrumb" className={className} style={wrapperStyle}>
      <ol style={{ display: 'contents', listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li style={{ display: 'contents' }}>
                {isLast
                  ? <BreadcrumbCurrentPage item={item} />
                  : <BreadcrumbLink item={item} />
                }
              </li>
              {!isLast && <BreadcrumbSeparator separator={separator} />}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
