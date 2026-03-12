import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef } from 'react';
import { DropdownList } from './DropdownList';

const meta: Meta<typeof DropdownList> = {
  title: 'Components/DropdownList',
  component: DropdownList,
  tags: ['autodocs'],
};

export default meta;

const items = [
  { label: 'Option One', value: 'one' },
  { label: 'Option Two', value: 'two' },
  { label: 'Option Three', value: 'three' },
  { label: 'Option Four', value: 'four' },
  { label: 'Option Five', value: 'five' },
];

const DropdownListDemo = ({ preselected }: { preselected?: string }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(preselected ?? null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const handleOpen = () => {
    if (buttonRef.current) setAnchorRect(buttonRef.current.getBoundingClientRect());
    setOpen(true);
  };

  return (
    <div style={{ padding: 40 }}>
      <button ref={buttonRef} onClick={handleOpen} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        {value ? items.find(i => i.value === value)?.label : 'Select'} ▾
      </button>
      {open && anchorRect && (
        <DropdownList
          items={items}
          selectedValue={value}
          anchorRect={anchorRect}
          onSelect={v => { setValue(v); setOpen(false); }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export const Default: StoryObj = {
  render: () => <DropdownListDemo />,
};

export const WithPreselectedValue: StoryObj = {
  render: () => <DropdownListDemo preselected="two" />,
};

export const ManyItems: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
    const manyItems = Array.from({ length: 15 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: String(i + 1),
    }));

    return (
      <div style={{ padding: 40 }}>
        <button ref={buttonRef} onClick={() => {
          if (buttonRef.current) setAnchorRect(buttonRef.current.getBoundingClientRect());
          setOpen(true);
        }} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          {value ? `Option ${value}` : 'Select'} ▾
        </button>
        {open && anchorRect && (
          <DropdownList
            items={manyItems}
            selectedValue={value}
            anchorRect={anchorRect}
            onSelect={v => { setValue(v); setOpen(false); }}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    );
  },
};
