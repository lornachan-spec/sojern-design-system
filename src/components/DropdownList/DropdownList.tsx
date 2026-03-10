import React, { CSSProperties, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { surface, radius, shadows } from '../../tokens';
import { DropdownRow } from './DropdownRow';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface DropdownListItem {
  label: string;
  value: string;
}

export interface DropdownListProps {
  /** List of selectable items */
  items: DropdownListItem[];
  /** Currently selected value — null means nothing selected (show all) */
  selectedValue?: string | null;
  /** Fired when a user picks an item. Passes null to clear the selection. */
  onSelect: (value: string | null) => void;
  /** Bounding rect of the trigger element — used to position the panel */
  anchorRect: DOMRect;
  /** Called when the user clicks outside or presses Escape */
  onClose: () => void;
  /** Minimum panel width in px — defaults to anchor width */
  minWidth?: number;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DropdownList({
  items,
  selectedValue,
  onSelect,
  anchorRect,
  onClose,
  minWidth,
}: DropdownListProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click, Escape, or scroll
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    // Capture-phase scroll catches scrolling in any container, not just window
    const handleScroll = () => onClose();
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [onClose]);

  const panelWidth = Math.max(minWidth ?? 0, anchorRect.width, 120);

  const panelStyle: CSSProperties = {
    position: 'fixed',
    top: anchorRect.bottom + 4,
    left: anchorRect.left,
    minWidth: panelWidth,
    background: surface.container,
    borderRadius: radius.card,
    boxShadow: shadows.light,
    overflow: 'hidden',
    zIndex: 9999,
  };

  // "All" clears the filter — shown at top when something is selected
  const allItems: Array<{ label: string; value: string | null }> = [
    { label: 'All', value: null },
    ...items,
  ];

  const panel = (
    <div ref={panelRef} style={panelStyle} role="listbox" aria-label="Filter options">
      {allItems.map(item => {
        const isSelected = item.value === (selectedValue ?? null);
        return (
          <DropdownRow
            key={item.value ?? '__all__'}
            label={item.label}
            selected={isSelected}
            onClick={() => {
              onSelect(item.value);
              onClose();
            }}
          />
        );
      })}
    </div>
  );

  return ReactDOM.createPortal(panel, document.body);
}

