# Sojern Design System

React + TypeScript component library built from the [Sojern Product Design Library](https://www.figma.com/design/s9PsJsCsM01ybRzRng49o7) in Figma.

## Getting started

```bash
npm install
npm run dev     # Component demo at http://localhost:5173
npm run build   # Compile to dist/
```

---

## Components

### Button

```tsx
import { Button } from '@sojern/design-system';

<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="special" iconLeft={<Icon name="Add" size={16} />}>Create Campaign</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="link">View details</Button>
<Button variant="primary" disabled>Disabled</Button>
<Button variant="primary" fullWidth>Full width</Button>
```

**Props:** `variant` (`special` | `primary` | `secondary` | `ghost` | `link` | `destructive`), `size` (`sm` | `md` | `lrg`), `iconLeft`, `iconRight`, `disabled`, `fullWidth`, `onClick`, `children`

---

### Badge

```tsx
import { Badge } from '@sojern/design-system';

// On light surfaces
<Badge stage="alpha" />
<Badge stage="beta" />
<Badge stage="new" />

// On dark nav backgrounds
<Badge stage="new" placement="navigation" />
```

**Props:** `stage` (`alpha` | `beta` | `new`), `placement` (`on-page` | `navigation`, default: `on-page`)

---

### Chip

```tsx
import { Chip } from '@sojern/design-system';

<Chip label="Active"      variant="success" />
<Chip label="Warning"     variant="warning" />
<Chip label="Error"       variant="error" />
<Chip label="Info"        variant="information" />
<Chip label="Dismissible" variant="active" dismissible onDismiss={() => {}} />
```

**Props:** `label`, `variant` (`active` | `success` | `warning` | `error` | `information` | `inactive`), `dismissible`, `onDismiss`

---

### Icon

```tsx
import { Icon } from '@sojern/design-system';

<Icon name="Add" size={16} />
<Icon name="Chevron Down" size={16} color="#333" />
<Icon name="Checkmark Filled" size={20} />
```

60+ icons available. See `src/components/Icons/Icons.tsx` for the full `IconName` union type.

**Props:** `name` (`IconName`), `size` (default: `16`), `color` (default: `currentColor`), `aria-label`, `aria-hidden`

---

### Toggle

```tsx
import { Toggle } from '@sojern/design-system';

const [on, setOn] = useState(false);

<Toggle checked={on} onChange={setOn} />
<Toggle checked={on} onChange={setOn} label="Enable notifications" />
<Toggle checked={on} onChange={setOn} disabled />
```

**Props:** `checked`, `onChange`, `disabled`, `label`

---

### Checkbox / CheckboxGroup

```tsx
import { Checkbox, CheckboxGroup } from '@sojern/design-system';

<Checkbox checked={checked} onChange={setChecked} label="Remember me" />
<Checkbox checked={false} onChange={() => {}} label="Error state" error />
<Checkbox checked={true}  onChange={() => {}} disabled label="Disabled" />

<CheckboxGroup
  label="Permissions"
  options={[
    { value: 'read',  label: 'Read' },
    { value: 'write', label: 'Write' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

---

### Radio / RadioGroup

```tsx
import { Radio, RadioGroup } from '@sojern/design-system';

<RadioGroup
  label="Notification frequency"
  options={[
    { value: 'daily',   label: 'Daily' },
    { value: 'weekly',  label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

---

### TextInput

```tsx
import { TextInput } from '@sojern/design-system';

<TextInput placeholder="Default" />
<TextInput size="short" placeholder="Short" />
<TextInput size="long"  placeholder="Fills container width" />
<TextInput size="numeric" value="42" onChange={v => setVal(v)} />
<TextInput placeholder="With icon" trailingIcon="Search" />
<TextInput placeholder="Error state" error />
<TextInput placeholder="Disabled" disabled />
```

**Props:** `size` (`default` | `short` | `long` | `numeric`), `value`, `onChange`, `placeholder`, `disabled`, `error`, `trailingIcon`

---

### FormField

```tsx
import { FormField, TextInput } from '@sojern/design-system';

<FormField label="Campaign name" helperText="Max 80 characters">
  <TextInput placeholder="Enter name" />
</FormField>

<FormField label="Budget" error="Amount must be greater than 0">
  <TextInput placeholder="0.00" error />
</FormField>

<FormField label="Amount" layout="inline" prefixText="$" suffixText="USD">
  <TextInput size="short" placeholder="0.00" />
</FormField>
```

**Props:** `label`, `showInfoIcon`, `infoTooltip`, `helperText`, `error`, `layout` (`stacked` | `inline`), `prefixText`, `suffixText`

---

### Dropdown

```tsx
import { Dropdown } from '@sojern/design-system';

// Single select
<Dropdown
  mode="single"
  items={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]}
  selectedValue={selected}
  anchorRect={triggerRef.current?.getBoundingClientRect()}
  onSelect={value => setSelected(value)}
  onClose={() => setOpen(false)}
/>

// Multi select
<Dropdown
  mode="multi"
  items={items}
  selectedValues={selected}
  onMultiSelect={values => setSelected(values)}
  onClose={() => setOpen(false)}
/>
```

---

### SelectField

```tsx
import { SelectField } from '@sojern/design-system';

// Single select
<SelectField
  label="Status"
  mode="single"
  options={[
    { label: 'Active', value: 'active' },
    { label: 'Paused', value: 'paused' },
  ]}
  value={val}
  onChange={setVal}
/>

// Multi select with search
<SelectField
  label="Channels"
  mode="multi"
  options={options}
  value={vals}
  onChange={setVals}
/>

// With scroll limit
<SelectField
  label="Region"
  mode="single"
  options={longOptionsList}
  value={val}
  onChange={setVal}
  maxHeight={280}
/>
```

**Props:** `label`, `mode` (`single` | `multi`), `options`, `value`, `onChange`, `placeholder`, `disabled`, `error`, `maxHeight`

---

### DropdownRow

```tsx
import { DropdownRow } from '@sojern/design-system';

<DropdownRow label="Option A" selected={false} onClick={() => {}} />
<DropdownRow label="Option B" type="checkbox" checked={true} onClick={() => {}} />
<DropdownRow type="select-all" checked={allSelected} onClick={toggleAll} />
<DropdownRow type="count-clear" count={3} onClear={clearAll} />
```

**Props:** `label`, `type` (`default` | `checkbox` | `select-all` | `count-clear`), `selected`, `checked`, `disabled`, `count`, `onClear`, `onClick`

---

### Modal

```tsx
import { Modal } from '@sojern/design-system';

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  size="md"
  primaryAction={{ label: 'Delete', onClick: handleDelete, variant: 'destructive' }}
  secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
>
  Are you sure you want to delete this campaign?
</Modal>
```

**Props:** `isOpen`, `onClose`, `title`, `size` (`sm` | `md` | `lg`), `primaryAction`, `secondaryAction`, `tertiaryAction`, `showDontShowAgain`, `onDontShowAgainChange`, `children`

---

### Tooltip

```tsx
import { Tooltip } from '@sojern/design-system';

<Tooltip content="Helpful hint" position="top">
  <button>Hover me</button>
</Tooltip>
```

**Props:** `content`, `position` (`top` | `bottom` | `left` | `right`), `delay`

---

### Breadcrumbs

```tsx
import { Breadcrumbs } from '@sojern/design-system';

<Breadcrumbs
  items={[
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Summer 2024' },
  ]}
/>
```

---

### Toast / ToastProvider

```tsx
import { ToastProvider, useToast } from '@sojern/design-system';

// Wrap your app
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Trigger from anywhere
const { show } = useToast();
show({ variant: 'success', message: 'Saved.', autoDismiss: 5000 });
```

**Toast variants:** `success` | `critical` | `alert` | `informational`

---

### Table

```tsx
import { Table, TableColumn } from '@sojern/design-system';

const columns: TableColumn<Row>[] = [
  { key: 'name',   header: 'Name',   type: 'link',  sortable: true, width: 220 },
  { key: 'status', header: 'Status', type: 'chip',  width: 120,
    filterable: true,
    filterOptions: [{ label: 'Active', value: 'Active' }],
    chipVariant: v => v === 'Active' ? 'success' : 'warning',
  },
];

<Table
  columns={columns}
  data={rows}
  selectable
  totalItems={rows.length}
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={size => { setPageSize(size); setPage(1); }}
/>
```

---

### Pagination

```tsx
import { Pagination } from '@sojern/design-system';

<Pagination
  page={page}
  totalItems={199}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>
```

---

### MetricCard

```tsx
import { MetricCard } from '@sojern/design-system';

<MetricCard label="Total Campaigns" value="1,284" trend="+12%" trendUp />
```

---

### NavItem

```tsx
import { NavItem } from '@sojern/design-system';

<NavItem label="Campaigns" icon="Campaigns" />
<NavItem label="Campaigns" icon="Campaigns" active />
<NavItem label="Travelers"  icon="Travelers"  hasSubItems expanded />
<NavItem label="ML Audience" isSubItem active />
<NavItem label="Messages"   icon="Mail" badge="new" />
<NavItem label="Campaigns" icon="Campaigns" collapsed />
```

**Props:** `label`, `icon`, `active`, `isSubItem`, `hasSubItems`, `expanded`, `collapsed`, `badge` (`alpha` | `beta` | `new`), `onClick`

---

### SideNav

```tsx
import { SideNav } from '@sojern/design-system';
import type { SideNavItem } from '@sojern/design-system';

const topItems: SideNavItem[] = [
  { id: 'campaigns', label: 'Campaigns', icon: 'Campaigns',
    subItems: [
      { id: 'all-campaigns',    label: 'All Campaigns' },
      { id: 'email-templates',  label: 'Email Templates', badge: 'beta' },
    ],
  },
  { id: 'messages',  label: 'Messages',  icon: 'Mail', badge: 'new' },
];

const bottomItems: SideNavItem[] = [
  { id: 'help',    label: 'Help',    icon: 'Help' },
  { id: 'account', label: 'Account', icon: 'Account' },
];

<SideNav
  topItems={topItems}
  bottomItems={bottomItems}
  activeId={activeId}
  onNavigate={setActiveId}
/>

// Controlled collapsed state
<SideNav
  topItems={topItems}
  bottomItems={bottomItems}
  activeId={activeId}
  onNavigate={setActiveId}
  collapsed={isCollapsed}
  onCollapseToggle={() => setIsCollapsed(c => !c)}
/>
```

**`SideNavItem` shape:** `id`, `label`, `icon` (`IconName`), `badge?` (`alpha` | `beta` | `new`), `subItems?` (`SideNavSubItem[]`)

**`SideNavSubItem` shape:** `id`, `label`, `badge?`

---

## Design Tokens

All tokens are exported as typed TypeScript constants:

```tsx
import {
  text, surface, border, neutrals,
  blue, special, secondary,
  buttons, navPrimary,
  badges, chips, toggle,
  typography, spacing, radius, shadows,
} from '@sojern/design-system';

// Colors
text.body              // '#333333'
text.header            // '#242452'
surface.container      // '#FFFFFF'
surface.page           // '#F8F8F8'
special.fire500        // '#E35F3E'

// Spacing (px values)
spacing.XS   // 4
spacing.SM   // 8
spacing.MD   // 16
spacing.LRG  // 24
spacing.XL   // 32

// Typography
typography.bodyRegular      // { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }
typography.bodyBold
typography.bodySmall
typography.title3
typography.tooltipMedium    // 10px Inter Medium

// Radius
radius.button   // 5
radius.card     // 10

// Shadows
shadows.light   // '3px 3px 20px 0px rgba(0,0,0,0.15)'
```

---

## Project Structure

```
src/
  tokens/             # Design tokens (colors, spacing, typography, radius, shadows)
  components/
    Badge/
    Breadcrumbs/
    Button/
    Checkbox/
    Chip/
    Dropdown/
    DropdownList/
    FormField/
    Icons/
    MetricCard/
    Modal/
    NavItem/
    Pagination/
    Radio/
    SelectField/
    SideNav/
    Table/
    TextInput/
    Toast/
    Toggle/
    Tooltip/
  index.ts            # Main barrel — re-exports all components and tokens
demo/
  App.tsx             # Interactive component showcase (npm run dev)
```

---

## Figma

This library is built from the [Sojern Product Design Library](https://www.figma.com/design/s9PsJsCsM01ybRzRng49o7) in Figma.
