import React, { CSSProperties, useEffect, useRef, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { surface, radius, shadows } from '../../tokens';
import { DropdownRow } from '../DropdownList/DropdownRow';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownPanelBaseProps {
  /** Items to display in the list */
  items: DropdownItem[];
  /** Bounding rect of the trigger — used to position the panel */
  anchorRect: DOMRect;
  /** Called when the panel should close (outside click, Escape) */
  onClose: () => void;
  /** Element that should not trigger an outside-click close (e.g. the trigger) */
  ignoreRef?: RefObject<HTMLElement>;
  /** Minimum panel width in px — defaults to anchor width */
  minWidth?: number;
  /** Max visible height before the list scrolls — default 320 */
  maxHeight?: number;
}

export interface SingleDropdownProps extends DropdownPanelBaseProps {
  mode?: 'single';
  selectedValue?: string | null;
  onSelect: (value: string | null) => void;
  selectedValues?: never;
  onMultiSelect?: never;
}

export interface MultiDropdownProps extends DropdownPanelBaseProps {
  mode: 'multi';
  selectedValues?: string[];
  onMultiSelect: (values: string[]) => void;
  selectedValue?: never;
  onSelect?: never;
}

export type DropdownProps = SingleDropdownProps | MultiDropdownProps;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Dropdown(props: DropdownProps) {
  const {
    items,
    anchorRect,
    onClose,
    ignoreRef,
    minWidth,
    maxHeight = 320,
  } = props;

  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click, Escape, or ancestor scroll
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        if (ignoreRef?.current && ignoreRef.current.contains(target)) return;
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleScroll = (e: Event) => {
      // Ignore scrolls inside the panel itself
      if (panelRef.current && panelRef.current.contains(e.target as Node)) return;
      onClose();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [onClose]);

  const panelWidth = Math.max(minWidth ?? 0, anchorRect.width, 200);

  const panelStyle: CSSProperties = {
    position: 'fixed',
    top: anchorRect.bottom + 4,
    left: anchorRect.left,
    width: panelWidth,
    background: surface.container,
    borderRadius: radius.card,
    boxShadow: shadows.light,
    overflow: 'hidden',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
  };

  const scrollStyle: CSSProperties = {
    overflowY: 'auto',
    maxHeight,
  };

  // ── Single-select ──────────────────────────────────────────────────────────
  if (!props.mode || props.mode === 'single') {
    const { selectedValue, onSelect } = props as SingleDropdownProps;

    const panel = (
      <div ref={panelRef} style={panelStyle} role="listbox">
        <div style={scrollStyle}>
          {items.map(item => (
            <DropdownRow
              key={item.value}
              label={item.label}
              selected={item.value === selectedValue}
              onClick={() => {
                onSelect(item.value === selectedValue ? null : item.value);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    );

    return ReactDOM.createPortal(panel, document.body);
  }

  // ── Multi-select ───────────────────────────────────────────────────────────
  const { selectedValues = [], onMultiSelect } = props as MultiDropdownProps;

  const allSelected = items.length > 0 && items.every(i => selectedValues.includes(i.value));

  const toggleItem = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onMultiSelect(next);
  };

  const toggleAll = () => {
    onMultiSelect(allSelected ? [] : items.map(i => i.value));
  };

  const panel = (
    <div ref={panelRef} style={panelStyle} role="listbox" aria-multiselectable="true">
      {/* Select all — always visible, with bottom divider */}
      <DropdownRow
        variant="select-all"
        label="Select all"
        selected={allSelected}
        onClick={toggleAll}
      />

      {/* Scrollable item list */}
      <div style={scrollStyle}>
        {items.map(item => (
          <DropdownRow
            key={item.value}
            variant="checkbox"
            label={item.label}
            selected={selectedValues.includes(item.value)}
            onClick={() => toggleItem(item.value)}
          />
        ))}
      </div>

      {/* Count & clear all — always at the bottom */}
      <DropdownRow
        variant="count-clear"
        count={`${selectedValues.length} selected`}
        clearLabel="Clear all"
        onClearAll={() => onMultiSelect([])}
      />
    </div>
  );

  return ReactDOM.createPortal(panel, document.body);
}
