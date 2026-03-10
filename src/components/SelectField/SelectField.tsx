import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { text, typography, chips as chipTokens, neutrals } from '../../tokens';
import { Icon } from '../Icons';
import { Tooltip } from '../Tooltip';
import { Dropdown } from '../Dropdown';
import { semantic, border as borderTokens, surface, radius } from '../../tokens';
import type { DropdownItem } from '../Dropdown';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SelectFieldBaseProps {
  /** Field label */
  label?: string;
  /** Show the ⓘ info icon next to the label */
  showInfoIcon?: boolean;
  /** Tooltip text on the info icon */
  infoTooltip?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message — also puts the input into error state */
  error?: string;
  /** Placeholder shown in the input when nothing is selected */
  placeholder?: string;
  /** Options list */
  items: DropdownItem[];
  /** Max visible height of the scrollable item list in px — defaults to 320 (≈8 rows) */
  maxHeight?: number;
  /** Disable the field */
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface SingleSelectFieldProps extends SelectFieldBaseProps {
  mode?: 'single';
  value?: string | null;
  onChange?: (value: string | null) => void;
  values?: never;
  onMultiChange?: never;
}

export interface MultiSelectFieldProps extends SelectFieldBaseProps {
  mode: 'multi';
  values?: string[];
  onMultiChange?: (values: string[]) => void;
  value?: never;
  onChange?: never;
}

export type SelectFieldProps = SingleSelectFieldProps | MultiSelectFieldProps;

// -----------------------------------------------------------------------------
// Label row sub-component
// -----------------------------------------------------------------------------

function LabelRow({ label, showInfoIcon, infoTooltip }: { label: string; showInfoIcon?: boolean; infoTooltip?: string }) {
  const labelStyle: CSSProperties = {
    fontFamily: typography.bodyBold.fontFamily,
    fontSize: typography.bodyBold.fontSize,
    fontWeight: typography.bodyBold.fontWeight,
    lineHeight: typography.bodyBold.lineHeight,
    letterSpacing: typography.bodyBold.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={labelStyle}>{label}</span>
      {showInfoIcon && (
        infoTooltip ? (
          <Tooltip content={infoTooltip} position="top">
            <Icon name="Info" size={16} color={text.body} aria-label={infoTooltip} />
          </Tooltip>
        ) : (
          <Icon name="Info" size={16} color={text.body} aria-label="More information" />
        )
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Small inline chip used inside the trigger
// -----------------------------------------------------------------------------

function InlineChip({
  label,
  onRemove,
  disabled,
}: {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
}) {
  const chipStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: onRemove ? 4 : 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: onRemove ? 6 : 8,
    borderRadius: 40,
    background: chipTokens.neutral,
    color: chipTokens.text,
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  const btnStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: chipTokens.text,
    flexShrink: 0,
  };

  return (
    <div style={chipStyle}>
      <span>{label}</span>
      {onRemove && !disabled && (
        <button
          type="button"
          style={btnStyle}
          onClick={e => { e.stopPropagation(); onRemove(); }}
          aria-label={`Remove ${label}`}
        >
          <Icon name="Close" size={12} color={chipTokens.text} />
        </button>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Trigger — button when closed, search input (+ chips) when open
// -----------------------------------------------------------------------------

function SelectTrigger({
  displayValue,
  placeholder,
  selectedChips,
  isOpen,
  disabled,
  error,
  searchQuery,
  onSearchChange,
  onOpen,
  onToggle,
  onRemoveChip,
  searchInputRef,
  maxVisibleChips = 3,
}: {
  displayValue: string;
  placeholder: string;
  selectedChips?: Array<{ value: string; label: string }>;
  isOpen: boolean;
  disabled?: boolean;
  error?: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpen: () => void;
  onToggle: () => void;
  onRemoveChip?: (value: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  maxVisibleChips?: number;
}) {
  const borderColor = error ? semantic.error : isOpen ? borderTokens.input : borderTokens.input;
  const borderWidth = error ? 2 : 1;
  const padV = 7 - (borderWidth - 1);
  const padH = 8 - (borderWidth - 1);
  const hasChips = selectedChips && selectedChips.length > 0;
  const hasValue = displayValue.length > 0;

  // Closed: cap chips at maxVisibleChips + "+N more"
  // Open: show all chips individually
  const visibleChips = selectedChips
    ? (isOpen ? selectedChips : selectedChips.slice(0, maxVisibleChips))
    : [];
  const hiddenCount = (!isOpen && selectedChips)
    ? Math.max(0, selectedChips.length - maxVisibleChips)
    : 0;

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    minHeight: 34,
    paddingTop: padV,
    paddingBottom: padV,
    paddingLeft: padH,
    paddingRight: padH,
    borderRadius: radius.button,
    border: `${borderWidth}px solid ${borderColor}`,
    background: disabled ? surface.inputDisabled : surface.inputDefault,
    boxSizing: 'border-box' as const,
    cursor: disabled ? 'not-allowed' : 'text',
    width: '100%',
    outline: 'none',
  };

  const valueStyle: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: hasValue && !disabled ? text.body : text.disabled,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  };

  const searchInputStyle: CSSProperties = {
    flex: 1,
    minWidth: 80,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: text.body,
    padding: 0,
    margin: 0,
  };

  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      style={containerStyle}
      onClick={disabled ? undefined : onToggle}
    >
      {/* Left area */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, flex: 1, alignItems: 'center' }}>
        {/* Chips — always shown when present */}
        {visibleChips.map(chip => (
          <InlineChip
            key={chip.value}
            label={chip.label}
            onRemove={isOpen && onRemoveChip ? () => onRemoveChip(chip.value) : undefined}
            disabled={disabled}
          />
        ))}
        {hiddenCount > 0 && selectedChips && (
          <Tooltip
            content={selectedChips.slice(maxVisibleChips).map(c => c.label).join(', ')}
            position="top"
          >
            <InlineChip label={`+${hiddenCount} more`} />
          </Tooltip>
        )}

        {/* Search input when open, static label when closed */}
        {isOpen ? (
          <input
            ref={searchInputRef}
            style={searchInputStyle}
            value={searchQuery}
            placeholder={!hasChips ? placeholder : 'Search…'}
            onChange={e => onSearchChange(e.target.value)}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => {
              if (e.key === 'Backspace' && searchQuery === '' && selectedChips && selectedChips.length > 0 && onRemoveChip) {
                e.preventDefault();
                onRemoveChip(selectedChips[selectedChips.length - 1].value);
              }
            }}
            autoComplete="off"
            className="sds-input"
          />
        ) : (
          !hasChips && (
            <span style={valueStyle}>{hasValue ? displayValue : placeholder}</span>
          )
        )}
      </div>

      {/* Chevron — clicking always toggles regardless of search input focus */}
      <div
        style={{ display: 'flex', alignItems: 'center', alignSelf: 'center', flexShrink: 0, cursor: disabled ? 'not-allowed' : 'pointer' }}
        onClick={disabled ? undefined : e => { e.stopPropagation(); onToggle(); }}
      >
        <Icon
          name={isOpen ? 'Chevron Up' : 'Chevron Down'}
          size={16}
          color={disabled ? text.disabled : text.body}
          aria-hidden
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SelectField(props: SelectFieldProps) {
  const {
    label,
    showInfoIcon = true,
    infoTooltip,
    helperText,
    error,
    placeholder = 'Search or select…',
    items,
    maxHeight,
    disabled,
    className,
    style,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const openDropdown = () => {
    if (disabled) return;
    if (triggerRef.current) {
      setAnchorRect(triggerRef.current.getBoundingClientRect());
      setIsOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const toggleDropdown = () => {
    if (isOpen) closeDropdown();
    else openDropdown();
  };

  // Keep anchorRect in sync with the trigger's size/position while open
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const el = triggerRef.current;
    const update = () => setAnchorRect(el.getBoundingClientRect());
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isOpen]);

  const isMulti = props.mode === 'multi';

  // Single mode: display the selected label as text
  let displayValue = '';
  if (!isMulti) {
    const sel = (props as SingleSelectFieldProps).value;
    if (sel) displayValue = items.find(i => i.value === sel)?.label ?? '';
  }

  // Multi mode: build chip list from selected values
  const selectedChips = isMulti
    ? ((props as MultiSelectFieldProps).values ?? []).map(v => ({
        value: v,
        label: items.find(i => i.value === v)?.label ?? v,
      }))
    : undefined;

  const handleRemoveChip = isMulti
    ? (value: string) => {
        const current = (props as MultiSelectFieldProps).values ?? [];
        (props as MultiSelectFieldProps).onMultiChange?.(current.filter(v => v !== value));
      }
    : undefined;

  // Filter items by search query
  const filteredItems = searchQuery.trim()
    ? items.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
    maxWidth: 360,
    ...style,
  };

  const errorTextStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: semantic.error,
  };

  const helperTextStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: text.body,
  };

  return (
    <div style={wrapperStyle} className={className}>
      {/* Label */}
      {label && <LabelRow label={label} showInfoIcon={showInfoIcon} infoTooltip={infoTooltip} />}

      {/* Trigger */}
      <div ref={triggerRef} style={{ width: '100%' }}>
        <SelectTrigger
          displayValue={displayValue}
          placeholder={placeholder}
          selectedChips={selectedChips}
          isOpen={isOpen}
          disabled={disabled}
          error={!!error}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpen={openDropdown}
          onToggle={toggleDropdown}
          onRemoveChip={handleRemoveChip}
          searchInputRef={searchInputRef}
        />
      </div>

      {/* Helper / error text */}
      {error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="Warning Filled" size={16} color={semantic.error} aria-hidden />
          <span style={errorTextStyle}>{error}</span>
        </div>
      ) : helperText ? (
        <span style={helperTextStyle}>{helperText}</span>
      ) : null}

      {/* Dropdown panel */}
      {isOpen && anchorRect && (
        (!props.mode || props.mode === 'single') ? (
          <Dropdown
            mode="single"
            items={filteredItems}
            anchorRect={anchorRect}
            ignoreRef={triggerRef}
            maxHeight={maxHeight}
            selectedValue={(props as SingleSelectFieldProps).value ?? null}
            onSelect={v => {
              (props as SingleSelectFieldProps).onChange?.(v);
              closeDropdown();
            }}
            onClose={closeDropdown}
          />
        ) : (
          <Dropdown
            mode="multi"
            items={filteredItems}
            anchorRect={anchorRect}
            ignoreRef={triggerRef}
            maxHeight={maxHeight}
            selectedValues={(props as MultiSelectFieldProps).values ?? []}
            onMultiSelect={v => {
              (props as MultiSelectFieldProps).onMultiChange?.(v);
              setSearchQuery('');
              setTimeout(() => searchInputRef.current?.focus(), 0);
            }}
            onClose={closeDropdown}
          />
        )
      )}
    </div>
  );
}
