import React, { CSSProperties, useState, useRef } from 'react';
import { DropdownList } from '../DropdownList';
import { Icon } from '../Icons';
import { surface, border, text, neutrals, typography, spacing, radius, special } from '../../tokens';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface PaginationProps {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of items across all pages */
  totalItems: number;
  /** Number of items per page */
  pageSize: number;
  /** Available page size options shown in the "Rows per page" dropdown */
  pageSizeOptions?: number[];
  /** Called when the user navigates to a new page */
  onPageChange: (page: number) => void;
  /** Called when the user picks a new page size */
  onPageSizeChange: (size: number) => void;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Page number button
// -----------------------------------------------------------------------------

function PageNumButton({
  pageNum,
  isActive,
  onClick,
}: {
  pageNum: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const showUnderline = isActive || isHovered;

  return (
    <button
      type="button"
      style={{
        fontFamily: isActive ? typography.bodyBold.fontFamily : typography.bodyRegular.fontFamily,
        fontSize: typography.bodyRegular.fontSize,
        fontWeight: isActive ? typography.bodyBold.fontWeight : typography.bodyRegular.fontWeight,
        lineHeight: typography.bodyRegular.lineHeight,
        letterSpacing: typography.bodyRegular.letterSpacing,
        color: text.body,
        background: 'none',
        border: 'none',
        borderBottom: `2px solid ${showUnderline ? special.fire500 : 'transparent'}`,
        paddingBottom: 2,
        cursor: isActive ? 'default' : 'pointer',
        minWidth: 16,
        textAlign: 'center',
        flexShrink: 0,
        transition: 'border-color 0.12s ease',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Page ${pageNum}`}
    >
      {pageNum}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Pagination({
  page,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  className,
  style,
}: PaginationProps) {
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [sizeAnchorRect, setSizeAnchorRect] = useState<DOMRect | null>(null);
  const sizeButtonRef = useRef<HTMLButtonElement>(null);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const rangeStart = totalItems === 0 ? 0 : Math.min((page - 1) * pageSize + 1, totalItems);
  const rangeEnd = Math.min(page * pageSize, totalItems);

  // Build page list with ellipsis: always show first, last, current ±1
  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const sizeItems = pageSizeOptions.map(s => ({ label: String(s), value: String(s) }));

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.SM}px ${spacing.MD}px`,
    height: 50,
    background: surface.container,
    borderRadius: `${radius.card}px`,
    boxSizing: 'border-box',
    ...style,
  };

  const chevronStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    color: text.body,
  };

  return (
    <div className={className} style={containerStyle} role="navigation" aria-label="Pagination">
      {/* Left: rows per page */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.SM }}>
        <span style={{
          fontFamily: typography.bodySmall.fontFamily,
          fontSize: typography.bodySmall.fontSize,
          color: text.body,
          whiteSpace: 'nowrap',
        }}>
          Rows per page
        </span>

        <button
          ref={sizeButtonRef}
          type="button"
          onClick={() => {
            if (sizeButtonRef.current) setSizeAnchorRect(sizeButtonRef.current.getBoundingClientRect());
            setSizeDropdownOpen(o => !o);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            height: 34,
            padding: '7px 9px',
            background: surface.container,
            border: `1px solid ${border.primary}`,
            borderRadius: `${radius.button}px`,
            cursor: 'pointer',
            fontFamily: typography.bodyRegular.fontFamily,
            fontSize: typography.bodyRegular.fontSize,
            color: text.body,
            whiteSpace: 'nowrap',
          }}
          aria-haspopup="listbox"
          aria-expanded={sizeDropdownOpen}
        >
          {pageSize}
          <Icon
            name={sizeDropdownOpen ? 'Chevron Up' : 'Chevron Down'}
            size={16}
            color="currentColor"
            style={{ transition: 'transform 0.15s ease' }}
          />
        </button>

        {sizeDropdownOpen && sizeAnchorRect && (
          <DropdownList
            items={sizeItems}
            selectedValue={String(pageSize)}
            anchorRect={sizeAnchorRect}
            onSelect={val => { if (val) onPageSizeChange(Number(val)); }}
            onClose={() => setSizeDropdownOpen(false)}
          />
        )}

        <span style={{
          fontFamily: typography.bodyRegular.fontFamily,
          fontSize: typography.bodyRegular.fontSize,
          color: text.body,
          whiteSpace: 'nowrap',
        }}>
          {rangeStart}–{rangeEnd} of {totalItems}
        </span>
      </div>

      {/* Right: page numbers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.MD }}>
        <button
          type="button"
          style={{ ...chevronStyle, opacity: page === 1 ? 0.35 : 1 }}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <Icon name="Chevron Left" size={16} color="currentColor" />
        </button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} style={{
              fontFamily: typography.bodyRegular.fontFamily,
              fontSize: typography.bodyRegular.fontSize,
              color: neutrals[500],
              minWidth: 12,
              textAlign: 'center',
            }}>...</span>
          ) : (
            <PageNumButton
              key={p}
              pageNum={p as number}
              isActive={p === page}
              onClick={() => onPageChange(p as number)}
            />
          )
        )}

        <button
          type="button"
          style={{ ...chevronStyle, opacity: page === totalPages ? 0.35 : 1 }}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <Icon name="Chevron Right" size={16} color="currentColor" />
        </button>
      </div>
    </div>
  );
}
