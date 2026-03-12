import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef } from 'react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
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

const DropdownDemo = ({ mode }: { mode?: 'single' | 'multi' }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [values, setValues] = useState<string[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const handleOpen = () => {
    if (buttonRef.current) setAnchorRect(buttonRef.current.getBoundingClientRect());
    setOpen(true);
  };

  const label = mode === 'multi'
    ? values.length > 0 ? values.join(', ') : 'Select options'
    : value ?? 'Select an option';

  return (
    <div style={{ padding: 40 }}>
      <button ref={buttonRef} onClick={handleOpen} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        {label} ▾
      </button>
      {open && anchorRect && (
        mode === 'multi' ? (
          <Dropdown
            mode="multi"
            items={items}
            selectedValues={values}
            anchorRect={anchorRect}
            onMultiSelect={setValues}
            onClose={() => setOpen(false)}
            ignoreRef={buttonRef}
          />
        ) : (
          <Dropdown
            mode="single"
            items={items}
            selectedValue={value}
            anchorRect={anchorRect}
            onSelect={setValue}
            onClose={() => setOpen(false)}
            ignoreRef={buttonRef}
          />
        )
      )}
    </div>
  );
};

export const Single: StoryObj = {
  render: () => <DropdownDemo mode="single" />,
};

export const Multi: StoryObj = {
  render: () => <DropdownDemo mode="multi" />,
};
