import React, { CSSProperties, useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useKeyboardFocus } from '../../hooks';
import { Chip } from '../Chip';
import { Tooltip } from '../Tooltip';
import { DropdownList } from '../DropdownList';
import { Pagination } from '../Pagination';
import { Icon } from '../Icons';
import { surface, border, text, buttons, blue, neutrals, focus, typography, spacing, radius, special, shadows } from '../../tokens';
import type { ChipVariant } from '../Chip';
import type { DropdownListItem } from '../DropdownList';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type TableCellType = 'text' | 'link' | 'chip' | 'number' | 'date' | 'action';
export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableColumn<T = Record<string, unknown>> {
  /** Unique key matching the data object */
  key: string;
  /** Column header label */
  header: string;
  /** Cell content type */
  type?: TableCellType;
  /** Text alignment — defaults to 'left' for text/link/chip, 'right' for number */
  align?: 'left' | 'right';
  /** Show sort controls */
  sortable?: boolean;
  /** Fixed column width in px */
  width?: number;
  /** Show info icon next to header */
  showInfo?: boolean;
  /** Show chevron dropdown indicator in header */
  filterable?: boolean;
  /** Options to show in the filter dropdown — required when filterable is true */
  filterOptions?: DropdownListItem[];
  /** For chip cells: map a value to a ChipVariant */
  chipVariant?: (value: unknown) => ChipVariant;
  /** For link cells: called when the link is clicked */
  onLinkClick?: (row: T) => void;
  /** Custom cell renderer — overrides built-in types */
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  /** Show a checkbox column on the left */
  selectable?: boolean;
  /** Controlled selected row indices */
  selectedRows?: Set<number>;
  onSelectionChange?: (selected: Set<number>) => void;
  /** Controlled sort state */
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  onRowClick?: (row: T, index: number) => void;
  /** Pagination — total items across all pages */
  totalItems?: number;
  /** Current page (1-indexed) */
  page?: number;
  onPageChange?: (page: number) => void;
  /** Rows shown per page */
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  /** Empty state */
  emptyMessage?: string;
  emptyDescription?: string;
  /** Controlled filter values — key is column key, value is selected filter value or null */
  filterValues?: Record<string, string | null>;
  onFilter?: (key: string, value: string | null) => void;
  /** Pins the first data column so it stays visible during horizontal scroll */
  stickyFirstColumn?: boolean;
  style?: CSSProperties;
  className?: string;
}

// -----------------------------------------------------------------------------
// Icons
// -----------------------------------------------------------------------------

function CheckboxIcon({ checked, disabled }: { checked: boolean; disabled?: boolean }) {
  const color = disabled ? text.disabled : text.body;
  return <Icon name={checked ? 'Checkbox Active' : 'Checkbox Inactive'} color={color} />;
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === 'asc')  return <Icon name="Arrows Ascending"  size={16} color={text.body} />;
  if (direction === 'desc') return <Icon name="Arrows Descending" size={16} color={text.body} />;
  return <Icon name="Arrow Unsorted" size={16} color={neutrals[500]} />;
}

function InfoIcon() {
  return <Icon name="Info" size={16} color={neutrals[500]} />;
}

function ChevronIcon({ direction = 'down' }: { direction?: 'up' | 'down' }) {
  return (
    <Icon
      name={direction === 'up' ? 'Chevron Up' : 'Chevron Down'}
      size={16}
      color="currentColor"
      style={{ transition: 'transform 0.15s ease' }}
    />
  );
}

function KebabIcon() {
  return <Icon name="Kebab Vertical" size={16} color={text.body} />;
}

// -----------------------------------------------------------------------------
// Style constants
// -----------------------------------------------------------------------------

const CELL_HEIGHT = 52;
const HEADER_HEIGHT = 49;
const CELL_PADDING = spacing.MD;

const cellBase: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${CELL_PADDING}px`,
  borderBottom: `1px solid ${border.secondary}`,
  boxSizing: 'border-box',
  minWidth: 0,
  overflow: 'hidden',
};

// -----------------------------------------------------------------------------
// Header cell
// -----------------------------------------------------------------------------

interface HeaderCellProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: TableColumn<any>;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  isFirst?: boolean;
  isLast?: boolean;
  filterValue?: string | null;
  onFilterClick?: (rect: DOMRect) => void;
  isFilterOpen?: boolean;
  sticky?: boolean;
  stickyLeft?: number;
}

function HeaderCell({ column, sortKey, sortDirection, onSort, isFirst, isLast, filterValue, onFilterClick, isFilterOpen, sticky, stickyLeft = 0 }: HeaderCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const { isFocused, onFocus, onBlur } = useKeyboardFocus();
  const cellRef = useRef<HTMLDivElement>(null);

  const isActive = sortKey === column.key;
  const isDate = column.type === 'date';
  const currentDirection: SortDirection = isActive ? (sortDirection ?? 'none') : 'none';

  // Date columns show ascending icon by default; other columns show unsorted
  const displayDirection: SortDirection = isDate && !isActive
    ? 'asc'
    : currentDirection;

  const handleSort = () => {
    if (!column.sortable || !onSort) return;
    // Date columns cycle: asc → desc → asc (no unsorted state)
    if (isDate) {
      const next: SortDirection = currentDirection === 'asc' ? 'desc' : 'asc';
      onSort(column.key, next);
    } else {
      const next: SortDirection =
        currentDirection === 'none' ? 'asc' :
        currentDirection === 'asc'  ? 'desc' : 'none';
      onSort(column.key, next);
    }
  };

  // Tooltip text for the sort icon
  const getSortTooltip = (): string => {
    if (isDate) {
      // Another column is sorted — date column shows unsorted icon
      if (sortKey && !isActive) return 'Switch to newest';
      // Date column is active
      return currentDirection === 'desc' ? 'Switch to newest' : 'Switch to oldest';
    }
    if (currentDirection === 'asc')  return 'Sort descending';
    if (currentDirection === 'desc') return 'Clear sort';
    return 'Sort ascending';
  };

  const align = column.align ?? (column.type === 'number' ? 'right' : 'left');

  const style: CSSProperties = {
    ...cellBase,
    height: HEADER_HEIGHT,
    gap: spacing.SM,
    justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
    background: isHovered ? blue[100] : surface.container,
    cursor: column.sortable ? 'pointer' : 'default',
    userSelect: 'none',
    flexShrink: 0,
    width: column.width ? column.width : undefined,
    flex: column.width ? undefined : 1,
    borderTopLeftRadius: isFirst ? `${radius.card}px` : undefined,
    borderTopRightRadius: isLast ? `${radius.card}px` : undefined,
    outline: isFocused && column.sortable ? `2px solid ${focus.default}` : 'none',
    outlineOffset: '-2px',
    transition: 'background 0.15s ease',
    ...(sticky ? {
      position: 'sticky',
      left: stickyLeft,
      zIndex: 2,
      boxShadow: '2px 0 4px rgba(0,0,0,0.08)',
    } : {}),
  };

  const labelStyle: CSSProperties = {
    fontFamily: typography.bodySmallBold.fontFamily,
    fontSize: typography.bodySmallBold.fontSize,
    fontWeight: typography.bodySmallBold.fontWeight,
    lineHeight: typography.bodySmallBold.lineHeight,
    letterSpacing: typography.bodySmallBold.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const iconWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
    padding: 1,
    background: isIconHovered ? blue[200] : 'transparent',
    transition: 'background 0.15s ease',
  };

  const sortIcon = column.sortable ? (
    <Tooltip content={getSortTooltip()} position="top">
      <span
        style={iconWrapperStyle}
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
      >
        <SortIcon direction={displayDirection} />
      </span>
    </Tooltip>
  ) : null;

  const inner = (
    <>
      {align === 'right' && sortIcon}
      {align === 'right' && column.showInfo && <InfoIcon />}
      <span style={labelStyle}>{column.header}</span>
      {align === 'left' && column.showInfo && <InfoIcon />}
      {align === 'left' && sortIcon}
      {column.filterable && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            if (cellRef.current) onFilterClick?.(cellRef.current.getBoundingClientRect());
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 3,
            color: text.body,
          }}
          aria-label="Filter column"
        >
          <ChevronIcon direction={isFilterOpen ? 'up' : 'down'} />
        </button>
      )}
    </>
  );

  if (column.sortable) {
    return (
      <div
        ref={cellRef}
        role="columnheader"
        aria-sort={currentDirection === 'asc' ? 'ascending' : currentDirection === 'desc' ? 'descending' : 'none'}
        tabIndex={0}
        style={style}
        onClick={handleSort}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSort(); }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsIconHovered(false); }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {inner}
      </div>
    );
  }

  return (
    <div ref={cellRef} role="columnheader" style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {inner}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Truncated text with tooltip
// -----------------------------------------------------------------------------

function TruncatedText({ value, style, align = 'left' }: { value: string; style: CSSProperties; align?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  // Check after every render so it stays correct if column width changes.
  useLayoutEffect(() => {
    if (ref.current) {
      setIsTruncated(ref.current.scrollWidth > ref.current.offsetWidth);
    }
  });

  return (
    <Tooltip
      content={isTruncated ? value : null}
      position="top"
      wrapperStyle={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
    >
      <div ref={ref} style={{ ...style, width: '100%', textAlign: align }}>
        {value}
      </div>
    </Tooltip>
  );
}

// -----------------------------------------------------------------------------
// Body cell
// -----------------------------------------------------------------------------

interface BodyCellProps<T> {
  column: TableColumn<T>;
  row: T;
  isSelected?: boolean;
  isHovered?: boolean;
  isDisabled?: boolean;
  sticky?: boolean;
  stickyLeft?: number;
  stickyBackground?: string;
}

function BodyCell<T>({ column, row, isSelected, isHovered, isDisabled, sticky, stickyLeft = 0, stickyBackground }: BodyCellProps<T>) {
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const linkRef = useRef<HTMLButtonElement>(null);
  const [isLinkTruncated, setIsLinkTruncated] = useState(false);

  useLayoutEffect(() => {
    if (linkRef.current) {
      setIsLinkTruncated(linkRef.current.scrollWidth > linkRef.current.offsetWidth);
    }
  });

  const value = (row as Record<string, unknown>)[column.key];
  const align = column.align ?? (column.type === 'number' ? 'right' : 'left');

  const style: CSSProperties = {
    ...cellBase,
    height: CELL_HEIGHT,
    gap: spacing.SM,
    justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
    background: sticky ? (stickyBackground ?? surface.container) : 'transparent',
    flexShrink: 0,
    width: column.width ? column.width : undefined,
    flex: column.width ? undefined : 1,
    ...(sticky ? {
      position: 'sticky',
      left: stickyLeft,
      zIndex: 1,
      boxShadow: '2px 0 4px rgba(0,0,0,0.08)',
    } : {}),
  };

  const textStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: isDisabled ? text.disabled : text.body,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
  };

  // Custom render
  if (column.render) {
    return <div style={style}>{column.render(value, row)}</div>;
  }

  // Action cell — kebab icon
  if (column.type === 'action') {
    return (
      <div style={{ ...style, justifyContent: 'center' }}>
        <button
          type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}
          aria-label="Row actions"
        >
          <KebabIcon />
        </button>
      </div>
    );
  }

  // Chip cell
  if (column.type === 'chip') {
    const chipVal = String(value ?? '');
    const chipVariant = column.chipVariant ? column.chipVariant(value) : 'active';
    return (
      <div style={style}>
        <Chip label={chipVal} variant={chipVariant} />
      </div>
    );
  }

  // Link cell
  if (column.type === 'link') {
    const linkText = String(value ?? '');
    return (
      <div style={style}>
        <Tooltip
          content={isLinkTruncated ? linkText : null}
          position="top"
          wrapperStyle={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
        >
          <button
            ref={linkRef}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: textStyle.fontFamily,
              fontSize: textStyle.fontSize,
              fontWeight: textStyle.fontWeight,
              lineHeight: textStyle.lineHeight,
              letterSpacing: textStyle.letterSpacing,
              color: isDisabled ? text.disabled : isLinkHovered ? buttons.linkHover : buttons.linkEnabled,
              textDecoration: isLinkHovered ? 'underline' : 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              display: 'block',
              textAlign: 'left',
            }}
            onClick={() => column.onLinkClick?.(row)}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
          >
            {linkText}
          </button>
        </Tooltip>
      </div>
    );
  }

  // Text / number / date
  return (
    <div style={style}>
      <TruncatedText value={String(value ?? '')} style={textStyle} align={align} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Empty state
// -----------------------------------------------------------------------------

function EmptyState({ message, description }: { message: string; description: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: `${spacing.XL}px`,
      background: surface.container,
      borderBottomLeftRadius: `${radius.card}px`,
      borderBottomRightRadius: `${radius.card}px`,
    }}>
      <Icon name="Table Empty" size={80} />
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: typography.title3.fontFamily,
          fontSize: typography.title3.fontSize,
          fontWeight: typography.title3.fontWeight,
          lineHeight: typography.title3.lineHeight,
          color: text.body,
          margin: '0 0 5px',
        }}>
          {message}
        </p>
        <p style={{
          fontFamily: typography.bodyRegular.fontFamily,
          fontSize: typography.bodyRegular.fontSize,
          fontWeight: typography.bodyRegular.fontWeight,
          lineHeight: typography.bodyRegular.lineHeight,
          letterSpacing: typography.bodyRegular.letterSpacing,
          color: neutrals[700],
          margin: 0,
          maxWidth: 424,
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Pagination row — thin wrapper applying table-bottom border-radius
// -----------------------------------------------------------------------------

function PaginationRow({
  page, totalItems, pageSize, pageSizeOptions, onPageChange, onPageSizeChange,
}: {
  page: number; totalItems: number; pageSize: number; pageSizeOptions: number[];
  onPageChange: (p: number) => void; onPageSizeChange: (s: number) => void;
}) {
  return (
    <Pagination
      page={page}
      totalItems={totalItems}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      style={{
        borderTop: `1px solid ${border.secondary}`,
        borderRadius: 0,
        borderBottomLeftRadius: `${radius.card}px`,
        borderBottomRightRadius: `${radius.card}px`,
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Main Table component
// -----------------------------------------------------------------------------

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  selectedRows,
  onSelectionChange,
  sortKey,
  sortDirection = 'none',
  onSort,
  onRowClick,
  totalItems,
  page: controlledPage,
  onPageChange,
  pageSize: controlledPageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  emptyMessage = 'No Data To Display',
  emptyDescription = "There's currently no data available to display for this view.",
  filterValues,
  onFilter,
  stickyFirstColumn = false,
  style,
  className,
}: TableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(pageSizeOptions[1] ?? 25);
  const [internalSelected, setInternalSelected] = useState<Set<number>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);
  const [filterAnchorRect, setFilterAnchorRect] = useState<DOMRect | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-detect horizontal overflow and enable sticky first column accordingly
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setIsOverflowing(el.scrollWidth > el.clientWidth);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [columns]);

  const page = controlledPage ?? internalPage;
  const pageSize = controlledPageSize ?? internalPageSize;
  const showPagination = totalItems !== undefined;

  const handlePageChange = (p: number) => {
    if (!controlledPage) setInternalPage(p);
    onPageChange?.(p);
  };

  const handlePageSizeChange = (s: number) => {
    if (!controlledPageSize) setInternalPageSize(s);
    if (!controlledPage) setInternalPage(1);
    onPageSizeChange?.(s);
  };

  const selected = selectedRows ?? internalSelected;

  const setSelected = (next: Set<number>) => {
    if (!selectedRows) setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const toggleRow = (index: number) => {
    const next = new Set(selected);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === data.length) setSelected(new Set());
    else setSelected(new Set(data.map((_, i) => i)));
  };

  const allSelected = data.length > 0 && selected.size === data.length;
  const effectiveSticky = stickyFirstColumn || isOverflowing;

  const checkboxColWidth = 48;
  const checkboxHeaderStyle: CSSProperties = {
    ...cellBase,
    width: checkboxColWidth,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    flexShrink: 0,
    background: surface.container,
    borderTopLeftRadius: `${radius.card}px`,
    cursor: 'pointer',
    ...(effectiveSticky ? { position: 'sticky', left: 0, zIndex: 2 } : {}),
  };

  const checkboxCellStyle = (rowIndex: number): CSSProperties => ({
    ...cellBase,
    width: checkboxColWidth,
    height: CELL_HEIGHT,
    justifyContent: 'center',
    flexShrink: 0,
    background: effectiveSticky
      ? (selected.has(rowIndex) ? surface.selected : hoveredRow === rowIndex ? blue[100] : surface.container)
      : 'transparent',
    cursor: 'pointer',
    ...(effectiveSticky ? { position: 'sticky', left: 0, zIndex: 1 } : {}),
  });

  const tableStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: `${radius.card}px`,
    boxShadow: shadows.light,
    overflow: 'hidden',
    width: '100%',
    ...style,
  };

  const isLastRow = (index: number) => !showPagination && index === data.length - 1;

  const rowStyle = (index: number): CSSProperties => ({
    display: 'flex',
    background: selected.has(index) ? surface.selected
              : hoveredRow === index ? blue[100]
              : surface.container,
    cursor: onRowClick ? 'pointer' : 'default',
    transition: 'background 0.15s ease',
    ...(isLastRow(index) ? {
      borderBottomLeftRadius: `${radius.card}px`,
      borderBottomRightRadius: `${radius.card}px`,
    } : {}),
  });

  const isEmpty = data.length === 0;

  return (
    <div role="table" className={className} style={tableStyle}>
      {/* Scrollable header + body */}
      <div ref={scrollRef} style={{ overflowX: 'auto' }}>
        {/* Header row */}
        <div role="row" style={{ display: 'flex', background: surface.container, minWidth: 'max-content' }}>
          {selectable && (
            <div
              role="columnheader"
              style={checkboxHeaderStyle}
              onClick={toggleAll}
              aria-label="Select all rows"
            >
              <CheckboxIcon checked={allSelected} />
            </div>
          )}
          {columns.map((col, i) => {
            const isFirstDataCol = i === 0;
            const stickyLeft = effectiveSticky && isFirstDataCol
              ? (selectable ? checkboxColWidth : 0)
              : undefined;
            return (
              <HeaderCell
                key={col.key}
                column={col}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
                isFirst={!selectable && i === 0}
                isLast={i === columns.length - 1}
                filterValue={filterValues?.[col.key] ?? null}
                isFilterOpen={openFilterKey === col.key}
                onFilterClick={rect => {
                  setFilterAnchorRect(rect);
                  setOpenFilterKey(prev => prev === col.key ? null : col.key);
                }}
                sticky={effectiveSticky && isFirstDataCol}
                stickyLeft={stickyLeft}
              />
            );
          })}
        </div>

        {/* Empty state */}
        {isEmpty && (
          <EmptyState message={emptyMessage} description={emptyDescription} />
        )}

        {/* Data rows */}
        {!isEmpty && data.map((row, rowIndex) => {
          const rowBg = selected.has(rowIndex) ? surface.selected
                      : hoveredRow === rowIndex ? blue[100]
                      : surface.container;
          return (
            <div
              key={rowIndex}
              role="row"
              style={{ ...rowStyle(rowIndex), minWidth: 'max-content' }}
              onClick={() => onRowClick?.(row, rowIndex)}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {selectable && (
                <div
                  role="cell"
                  style={checkboxCellStyle(rowIndex)}
                  onClick={e => { e.stopPropagation(); toggleRow(rowIndex); }}
                  aria-label={`Select row ${rowIndex + 1}`}
                >
                  <CheckboxIcon checked={selected.has(rowIndex)} />
                </div>
              )}
              {columns.map((col, i) => {
                const isFirstDataCol = i === 0;
                const stickyLeft = effectiveSticky && isFirstDataCol
                  ? (selectable ? checkboxColWidth : 0)
                  : undefined;
                return (
                  <BodyCell
                    key={col.key}
                    column={col}
                    row={row}
                    isSelected={selected.has(rowIndex)}
                    isHovered={hoveredRow === rowIndex}
                    sticky={effectiveSticky && isFirstDataCol}
                    stickyLeft={stickyLeft}
                    stickyBackground={rowBg}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Column filter dropdown */}
      {openFilterKey && filterAnchorRect && (() => {
        const col = columns.find(c => c.key === openFilterKey);
        if (!col?.filterOptions) return null;
        return (
          <DropdownList
            items={col.filterOptions}
            selectedValue={filterValues?.[openFilterKey] ?? null}
            anchorRect={filterAnchorRect}
            onSelect={value => onFilter?.(openFilterKey, value)}
            onClose={() => setOpenFilterKey(null)}
          />
        );
      })()}

      {/* Pagination footer — stays full width, outside the scroll area */}
      {showPagination && (
        <PaginationRow
          page={page}
          totalItems={totalItems!}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
