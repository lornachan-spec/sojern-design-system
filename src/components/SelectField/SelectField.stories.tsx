import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SelectField } from './SelectField';

const meta: Meta<typeof SelectField> = {
  title: 'Components/SelectField',
  component: SelectField,
  tags: ['autodocs'],
};

export default meta;

const items = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
];

export const Single: StoryObj = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 320 }}>
        <SelectField
          mode="single"
          label="Country"
          placeholder="Select a country"
          items={items}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const SingleWithHelperText: StoryObj = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 320 }}>
        <SelectField
          mode="single"
          label="Country"
          placeholder="Select a country"
          items={items}
          value={value}
          onChange={setValue}
          helperText="Select the country where your campaign will run."
        />
      </div>
    );
  },
};

export const SingleWithError: StoryObj = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 320 }}>
        <SelectField
          mode="single"
          label="Country"
          placeholder="Select a country"
          items={items}
          value={value}
          onChange={setValue}
          error="Please select a country to continue."
        />
      </div>
    );
  },
};

export const SingleWithInfoTooltip: StoryObj = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 320 }}>
        <SelectField
          mode="single"
          label="Timezone"
          placeholder="Select a timezone"
          showInfoIcon
          infoTooltip="Used to schedule your campaign delivery."
          items={[
            { label: 'UTC', value: 'utc' },
            { label: 'US/Eastern', value: 'est' },
            { label: 'US/Pacific', value: 'pst' },
            { label: 'Europe/London', value: 'gmt' },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Multi: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div style={{ width: 320 }}>
        <SelectField
          mode="multi"
          label="Target Countries"
          placeholder="Select countries"
          items={items}
          values={values}
          onMultiChange={setValues}
        />
      </div>
    );
  },
};

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ width: 320 }}>
      <SelectField
        mode="single"
        label="Country"
        placeholder="Select a country"
        items={items}
        value={null}
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};
