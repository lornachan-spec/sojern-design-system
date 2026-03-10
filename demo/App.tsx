import React, { useState } from 'react';
import { Button, ButtonVariant, ButtonSize } from '../src/components/Button';
import { Chip, ChipVariant } from '../src/components/Chip';
import { Tooltip, TooltipPosition } from '../src/components/Tooltip';
import { Breadcrumbs } from '../src/components/Breadcrumbs';
import { Toast, ToastVariant, ToastProvider, useToast } from '../src/components/Toast';
import { Table, TableColumn, SortDirection } from '../src/components/Table';
import { DropdownListItem, DropdownRow } from '../src/components/DropdownList';
import { Pagination } from '../src/components/Pagination';
import { MetricCard } from '../src/components/MetricCard';
import { Toggle } from '../src/components/Toggle';
import { Checkbox, CheckboxGroup } from '../src/components/Checkbox';
import { Radio, RadioGroup } from '../src/components/Radio';
import { Modal, ModalSize } from '../src/components/Modal';
import { TextInput } from '../src/components/TextInput';
import { Dropdown } from '../src/components/Dropdown';
import { SelectField } from '../src/components/SelectField';
import { NavItem } from '../src/components/NavItem';
import { SideNav } from '../src/components/SideNav';
import type { SideNavItem } from '../src/components/SideNav';
import { Icon, IconName } from '../src/components/Icons';
import { Badge, BadgeStage } from '../src/components/Badge';
import { surface, text, neutrals } from '../src/tokens';

const VARIANTS: ButtonVariant[] = ['special', 'primary', 'secondary', 'ghost', 'link', 'destructive'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lrg'];

const VARIANT_DESCRIPTIONS: Record<ButtonVariant, string> = {
  special:     'High-impact actions — Submit Campaign, Launch, Finalize',
  primary:     'Main action on a page — Save, Continue, Create',
  secondary:   'Supporting actions — Cancel, Edit, View Details',
  ghost:       'Minimal weight — Learn more, View logs',
  link:        'Navigational actions — behaves like a text link',
  destructive: 'Irreversible actions — Delete, Remove access, Archive',
};

// Placeholder icon

const sectionStyle: React.CSSProperties = {
  background: surface.container,
  borderRadius: 10,
  padding: 32,
  marginBottom: 24,
  boxShadow: '3px 3px 20px 0px rgba(0,0,0,0.08)',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: neutrals[500],
  marginBottom: 8,
};

const descStyle: React.CSSProperties = {
  fontSize: '12px',
  color: neutrals[700],
  marginBottom: 20,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 12,
};

export function App() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 8, height: 32, background: '#E35F3E', borderRadius: 4 }} />
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 500, fontFamily: 'Lato', color: text.header }}>
            Sojern Design System
          </h1>
        </div>
        <p style={{ margin: 0, color: text.body, fontSize: 14 }}>Button component — all variants, sizes and states</p>
      </div>

      {/* All Variants */}
      {VARIANTS.map(variant => (
        <div key={variant} style={sectionStyle}>
          <div style={labelStyle}>{variant}</div>
          <div style={descStyle}>{VARIANT_DESCRIPTIONS[variant]}</div>

          {/* Sizes */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 12 }}>Sizes</div>
            <div style={rowStyle}>
              {SIZES.map(size => (
                <Button key={size} variant={variant} size={size}>
                  {size.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* States */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 12 }}>States</div>
            <div style={rowStyle}>
              <Button variant={variant}>Enabled</Button>
              <Button variant={variant} disabled>Disabled</Button>
            </div>
          </div>

          {/* Icon configs */}
          <div>
            <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 12 }}>Icon configurations</div>
            <div style={rowStyle}>
              <Button variant={variant}>No icon</Button>
              <Button variant={variant} iconLeft={<Icon name="Add" size={16} />}>Icon left</Button>
              <Button variant={variant} iconRight={<Icon name="Chevron Right" size={16} />}>Icon right</Button>
              <Button variant={variant} iconLeft={<Icon name="Add" size={16} />} iconRight={<Icon name="Chevron Right" size={16} />}>Both icons</Button>
            </div>
          </div>
        </div>
      ))}

      {/* Chips */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Chips</div>
        <div style={descStyle}>Status labels — with and without dismiss</div>

        {(['warning', 'success', 'error', 'active', 'information'] as ChipVariant[]).map(variant => (
          <div key={variant} style={{ ...rowStyle, marginBottom: 12 }}>
            <span style={{ ...labelStyle, fontSize: '10px', width: 90, marginBottom: 0 }}>{variant}</span>
            <Chip label="Invoice" variant={variant} />
            <Chip label="Invoice" variant={variant} dismissible onDismiss={() => {}} />
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Badges</div>
        <div style={descStyle}>Release stage labels — Alpha, Beta, and New. Two placement contexts: on-page (coloured fills) and navigation (transparent with border for dark backgrounds).</div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 12 }}>On-page</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {(['alpha', 'beta', 'new'] as BadgeStage[]).map(stage => (
              <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Badge stage={stage} />
                <span style={{ fontSize: 10, color: '#999' }}>{stage}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 12 }}>Navigation (dark background)</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', background: '#26374E', padding: '12px 16px', borderRadius: 8 }}>
            {(['alpha', 'beta', 'new'] as BadgeStage[]).map(stage => (
              <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Badge stage={stage} placement="navigation" />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Tooltips</div>
        <div style={descStyle}>Hover over each button to see the tooltip. All 4 positions supported.</div>
        <div style={{ ...rowStyle, padding: '40px 0' }}>
          {(['top', 'bottom', 'left', 'right'] as TooltipPosition[]).map(pos => (
            <Tooltip key={pos} content={`ID: 217049886\nUUs: 100,000,000`} position={pos}>
              <Button variant="secondary" size="md">{pos}</Button>
            </Tooltip>
          ))}
        </div>
        <div style={{ ...rowStyle, padding: '20px 0 0' }}>
          <Tooltip content="Short tip" position="top">
            <Button variant="primary" size="md">Short text</Button>
          </Tooltip>
          <Tooltip content="This is a longer tooltip that wraps onto multiple lines" position="top">
            <Button variant="primary" size="md">Long text</Button>
          </Tooltip>
          <Tooltip content="Disabled — no action available" position="top">
            <span style={{ display: 'inline-flex' }}>
              <Button variant="primary" size="md" disabled>On disabled</Button>
            </span>
          </Tooltip>
        </div>
      </div>

      {/* Full Width */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Full Width</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="special" fullWidth iconLeft={<Icon name="Add" size={16} />}>Create Campaign</Button>
          <Button variant="primary" fullWidth>Save Changes</Button>
          <Button variant="secondary" fullWidth>Cancel</Button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div style={sectionStyle}>
        <div style={labelStyle}>Breadcrumbs</div>
        <div style={descStyle}>Navigation path — last item is the current page (bold), previous items are clickable links.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 10 }}>Two levels</div>
            <Breadcrumbs items={[
              { label: 'Campaigns', href: '#' },
              { label: 'Campaign Details' },
            ]} />
          </div>
          <div>
            <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 10 }}>Three levels</div>
            <Breadcrumbs items={[
              { label: 'Home', href: '#' },
              { label: 'Campaigns', href: '#' },
              { label: 'Campaign Details' },
            ]} />
          </div>
          <div>
            <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 10 }}>Four levels</div>
            <Breadcrumbs items={[
              { label: 'Home', href: '#' },
              { label: 'Advertising', href: '#' },
              { label: 'Campaigns', href: '#' },
              { label: 'Q1 Display Campaign' },
            ]} />
          </div>

          <div>
            <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 10 }}>Truncated labels — hover to see full name</div>
            <Breadcrumbs items={[
              { label: 'Home', href: '#' },
              { label: 'Q1 2025 North America Display Campaigns', href: '#', maxWidth: 160 },
              { label: 'Programmatic Video — Tier 1 Markets Retargeting Strategy' },
            ]} />
          </div>
        </div>
      </div>

      {/* Toasts — static */}
      <div style={{ ...sectionStyle, padding: 0, background: 'transparent', boxShadow: 'none' }}>
        <div style={{ ...labelStyle, paddingLeft: 0 }}>Toasts</div>
        <div style={{ ...descStyle, paddingLeft: 0 }}>All 4 variants — icon, message, optional action, and close button.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['success', 'critical', 'alert', 'informational'] as ToastVariant[]).map(variant => (
            <Toast
              key={variant}
              variant={variant}
              message="Campaign saved successfully."
              action={{ label: 'View', onClick: () => {} }}
              onClose={() => {}}
            />
          ))}
        </div>

        <div style={{ ...labelStyle, paddingLeft: 0, marginTop: 24 }}>Multi-line</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['success', 'critical', 'alert', 'informational'] as ToastVariant[]).map(variant => (
            <Toast
              key={variant}
              variant={variant}
              message="Any Exception Code must be documented in Salesforce as agreed upon between Sojern & the customer. Please ensure all relevant details are captured before the end of the billing cycle."
              action={{ label: 'Unlock', onClick: () => {} }}
              onClose={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Toasts — interactive trigger */}
      <ToastTriggerDemo />

      {/* Table */}
      <TableDemo />

      {/* Table — responsive (constrained width) */}
      <TableResponsiveDemo />

      {/* Pagination */}
      <PaginationDemo />

      {/* Metric Cards */}
      <MetricCardDemo />

      {/* Toggles */}
      <ToggleDemo />

      {/* Checkboxes */}
      <CheckboxDemo />

      {/* Radio buttons */}
      <RadioDemo />

      {/* Dropdown Rows */}
      <DropdownRowDemo />

      {/* Text Input */}
      <TextInputDemo />

      {/* Select Field */}
      <SelectFieldDemo />

      {/* Dropdown */}
      <DropdownDemo />

      {/* Form Field */}
      <FormFieldDemo />

      {/* Nav Item */}
      <NavItemDemo />

      {/* Side Nav */}
      <SideNavDemo />

      {/* Modals */}
      <ModalDemo />

      {/* Icon Gallery */}
      <IconGalleryDemo />

    </div>
  );
}

interface HotelRow {
  accountName: string;
  accountOwner: string;
  transactionDate: string;
  documentNumber: string;
  status: string;
}

const TABLE_DATA: HotelRow[] = [
  { accountName: 'Sunny Beach Resort & Spa Grand Deluxe Collection', accountOwner: 'Michael Smith',      transactionDate: 'February 5, 2024', documentNumber: '10370027', status: 'Active' },
  { accountName: 'Mountain Peak Lodge',     accountOwner: 'Sophia Brown',       transactionDate: 'February 5, 2024', documentNumber: '10370027', status: 'Active' },
  { accountName: 'Cityscape Suites',        accountOwner: 'Liam Williams',      transactionDate: 'February 5, 2024', documentNumber: '10370027', status: 'Warning' },
  { accountName: 'Ocean View Inn',          accountOwner: 'Olivia Jones',       transactionDate: 'February 5, 2024', documentNumber: '10370027', status: 'Active' },
  { accountName: 'Rustic Retreat Cabins',   accountOwner: 'Noah Garcia',        transactionDate: 'February 5, 2024', documentNumber: '10370027', status: 'Error' },
  { accountName: 'Luxury Urban Hotel',      accountOwner: 'Ava Martinez',       transactionDate: 'February 5, 2024', documentNumber: '10370027', status: 'Active' },
  { accountName: 'Tranquil Waters Hotel',   accountOwner: 'William Rodriguez',  transactionDate: 'February 5, 2024', documentNumber: '10370028', status: 'Active' },
  { accountName: 'Heritage House B&B',      accountOwner: 'Isabella Hernandez', transactionDate: 'February 5, 2024', documentNumber: '10370029', status: 'Active' },
  { accountName: 'Gatsby\'s Grand Hotel',   accountOwner: 'James Lee',          transactionDate: 'February 5, 2024', documentNumber: '10370029', status: 'Warning' },
  { accountName: 'Starlight Hotel & Casino',accountOwner: 'Mia Kim',            transactionDate: 'February 5, 2024', documentNumber: '10370029', status: 'Active' },
];

const STATUS_CHIP_VARIANT: Record<string, ChipVariant> = {
  Active:  'success',
  Warning: 'warning',
  Error:   'error',
};

const STATUS_FILTER_OPTIONS: DropdownListItem[] = [
  { label: 'Active',  value: 'Active' },
  { label: 'Warning', value: 'Warning' },
  { label: 'Error',   value: 'Error' },
];

function TableDemo() {
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>('none');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [filterValues, setFilterValues] = useState<Record<string, string | null>>({});

  const handleFilter = (key: string, value: string | null) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const columns: TableColumn<HotelRow>[] = [
    { key: 'accountName',     header: 'Account Name',     type: 'link',   align: 'left',  sortable: true },
    { key: 'accountOwner',    header: 'Account Owner',    type: 'text',   align: 'left',  sortable: true },
    { key: 'transactionDate', header: 'Transaction Date', type: 'date',   align: 'left',  sortable: true, width: 160 },
    { key: 'documentNumber',  header: 'Document Number',  type: 'number', align: 'right', sortable: true, width: 160 },
    {
      key: 'status', header: 'Status', type: 'chip', align: 'left', width: 120,
      filterable: true, filterOptions: STATUS_FILTER_OPTIONS,
      chipVariant: (v) => STATUS_CHIP_VARIANT[v as string] ?? 'information',
    },
    { key: '_actions', header: '', type: 'action', width: 48 },
  ];

  const handleSort = (key: string, dir: SortDirection) => {
    setSortKey(key);
    setSortDir(dir);
  };

  const filteredSortedData = React.useMemo(() => {
    let rows = TABLE_DATA;
    // Apply active filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) rows = rows.filter(r => String(r[key as keyof HotelRow]) === value);
    });
    // Apply sort
    if (sortKey && sortDir !== 'none') {
      rows = [...rows].sort((a, b) => {
        const av = String(a[sortKey as keyof HotelRow]);
        const bv = String(b[sortKey as keyof HotelRow]);
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return rows;
  }, [sortKey, sortDir, filterValues]);

  return (
    <>
      <div style={sectionStyle}>
        <div style={labelStyle}>Table</div>
        <div style={descStyle}>Sortable columns, row selection, link cells, chip cells, action menu, and pagination.</div>
        <Table
          columns={columns}
          data={filteredSortedData}
          selectable
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={handleSort}
          totalItems={filteredSortedData.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          filterValues={filterValues}
          onFilter={handleFilter}
        />
      </div>

    </>
  );
}

function TableResponsiveDemo() {
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>('none');
  const [filterValues, setFilterValues] = useState<Record<string, string | null>>({});

  const columns: TableColumn<HotelRow>[] = [
    { key: 'accountName',     header: 'Account Name',     type: 'link',   align: 'left',  sortable: true, width: 220 },
    { key: 'accountOwner',    header: 'Account Owner',    type: 'text',   align: 'left',  sortable: true, width: 180 },
    { key: 'transactionDate', header: 'Transaction Date', type: 'date',   align: 'left',  sortable: true, width: 160 },
    { key: 'documentNumber',  header: 'Document Number',  type: 'number', align: 'right', sortable: true, width: 160 },
    {
      key: 'status', header: 'Status', type: 'chip', align: 'left', width: 120,
      filterable: true, filterOptions: STATUS_FILTER_OPTIONS,
      chipVariant: (v) => STATUS_CHIP_VARIANT[v as string] ?? 'information',
    },
    { key: '_actions', header: '', type: 'action', width: 48 },
  ];

  const filteredSorted = React.useMemo(() => {
    let rows = TABLE_DATA;
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) rows = rows.filter(r => String(r[key as keyof HotelRow]) === value);
    });
    if (sortKey && sortDir !== 'none') {
      rows = [...rows].sort((a, b) => {
        const av = String(a[sortKey as keyof HotelRow] ?? '');
        const bv = String(b[sortKey as keyof HotelRow] ?? '');
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return rows;
  }, [sortKey, sortDir, filterValues]);

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Table — Responsive (horizontal scroll)</div>
      <div style={descStyle}>Container is constrained to 500 px to demonstrate horizontal scrolling.</div>
      <div style={{ maxWidth: 500 }}>
        <Table
          columns={columns}
          data={filteredSorted}
          selectable
          stickyFirstColumn
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
          filterValues={filterValues}
          onFilter={(key, value) => setFilterValues(prev => ({ ...prev, [key]: value }))}
        />
      </div>
    </div>
  );
}

function PaginationDemo() {
  // Example 1 — first page
  const [page1, setPage1] = useState(1);
  const [size1, setSize1] = useState(25);

  // Example 2 — middle page (5 of 10)
  const [page2, setPage2] = useState(5);
  const [size2, setSize2] = useState(25);

  // Example 3 — last page
  const [page3, setPage3] = useState(10);
  const [size3, setSize3] = useState(25);

  // Example 4 — small dataset (fits on one page, no ellipsis)
  const [page4, setPage4] = useState(3);
  const [size4, setSize4] = useState(10);

  const boxStyle: React.CSSProperties = {
    background: surface.container,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '3px 3px 20px 0px rgba(0,0,0,0.15)',
  };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Pagination</div>
      <div style={descStyle}>Interactive pagination — try navigating pages and changing page size.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        <div>
          <div style={{ ...descStyle, marginBottom: 8 }}>First page (1 of 10) — previous arrow disabled</div>
          <div style={boxStyle}>
            <Pagination
              page={page1}
              totalItems={243}
              pageSize={size1}
              pageSizeOptions={[10, 25, 50, 100]}
              onPageChange={setPage1}
              onPageSizeChange={s => { setSize1(s); setPage1(1); }}
            />
          </div>
        </div>

        <div>
          <div style={{ ...descStyle, marginBottom: 8 }}>Middle page (5 of 10) — ellipsis on both sides</div>
          <div style={boxStyle}>
            <Pagination
              page={page2}
              totalItems={243}
              pageSize={size2}
              pageSizeOptions={[10, 25, 50, 100]}
              onPageChange={setPage2}
              onPageSizeChange={s => { setSize2(s); setPage2(1); }}
            />
          </div>
        </div>

        <div>
          <div style={{ ...descStyle, marginBottom: 8 }}>Last page (10 of 10) — next arrow disabled</div>
          <div style={boxStyle}>
            <Pagination
              page={page3}
              totalItems={243}
              pageSize={size3}
              pageSizeOptions={[10, 25, 50, 100]}
              onPageChange={setPage3}
              onPageSizeChange={s => { setSize3(s); setPage3(1); }}
            />
          </div>
        </div>

        <div>
          <div style={{ ...descStyle, marginBottom: 8 }}>Small dataset (63 items, 10 per page) — no ellipsis needed</div>
          <div style={boxStyle}>
            <Pagination
              page={page4}
              totalItems={63}
              pageSize={size4}
              pageSizeOptions={[10, 25, 50]}
              onPageChange={setPage4}
              onPageSizeChange={s => { setSize4(s); setPage4(1); }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCardDemo() {
  const campaignCallouts = [
    { description: 'Impressions',   metric: '1,248,500', tooltip: 'Total ad impressions served' },
    { description: 'Clicks',        metric: '34,210',    tooltip: 'Total clicks on your ads' },
    { description: 'CTR',           metric: '2.74%',     tooltip: 'Click-through rate' },
    { description: 'Conversions',   metric: '1,830',     tooltip: 'Total attributed conversions' },
    { description: 'Revenue',       metric: '$92,400',   tooltip: 'Total attributed revenue' },
  ];

  const expandedCallouts = [
    { description: 'Impressions',  metric: '1,248,500', tooltip: 'Total ad impressions' },
    { description: 'Clicks',       metric: '34,210',    tooltip: 'Total clicks' },
    { description: 'CTR',          metric: '2.74%',     tooltip: 'Click-through rate' },
    { description: 'Conversions',  metric: '1,830',     tooltip: 'Attributed conversions' },
    { description: 'Revenue',      metric: '$92,400',   tooltip: 'Attributed revenue' },
    { description: 'ROAS',         metric: '4.2x',      tooltip: 'Return on ad spend' },
  ];

  const listCallouts = [
    {
      header: 'Search',
      headerTooltip: 'Search campaign performance',
      items: [
        { description: 'Impressions', metric: '480,200', tooltip: 'Search impressions' },
        { description: 'Clicks',      metric: '12,800',  tooltip: 'Search clicks' },
      ],
    },
    {
      header: 'Display',
      headerTooltip: 'Display campaign performance',
      items: [
        { description: 'Impressions', metric: '620,100', tooltip: 'Display impressions' },
        { description: 'Clicks',      metric: '9,440',   tooltip: 'Display clicks' },
      ],
    },
    {
      header: 'Video',
      headerTooltip: 'Video campaign performance',
      items: [
        { description: 'Impressions', metric: '148,200', tooltip: 'Video impressions' },
        { description: 'Clicks',      metric: '11,970',  tooltip: 'Video clicks' },
      ],
    },
    {
      header: 'Native',
      headerTooltip: 'Native campaign performance',
      items: [
        { description: 'Impressions', metric: '62,400', tooltip: 'Native impressions' },
        { description: 'Clicks',      metric: '5,320',  tooltip: 'Native clicks' },
      ],
    },
  ];

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Metric Cards</div>
      <div style={descStyle}>Three layout variants — Standard (single row), Expanded (multiple rows), and List (grouped tiles with headers).</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        <div>
          <div style={{ ...descStyle, marginBottom: 8 }}>Standard — all metrics in a single row</div>
          <MetricCard
            title="Campaign Performance"
            titleTooltip="Aggregated metrics for the selected date range"
            subtitle="Overview of campaign between August 1, 2025 and August 31, 2025"
            variant="standard"
            callouts={campaignCallouts}
          />
        </div>

        <div>
          <div style={{ ...descStyle, marginBottom: 8 }}>Expanded (Standard Two Rows) — split across two rows, 3 per row</div>
          <MetricCard
            title="Campaign Performance"
            titleTooltip="Aggregated metrics for the selected date range"
            subtitle="Overview of campaign between August 1, 2025 and August 31, 2025"
            variant="expanded"
            callouts={expandedCallouts}
            calloutsPerRow={3}
          />
        </div>

        <div>
          <div style={{ ...descStyle, marginBottom: 8 }}>List — grouped tiles with bold header and multiple metric rows</div>
          <MetricCard
            title="Performance by Channel"
            titleTooltip="Breakdown by ad channel type"
            subtitle="Overview of campaign between August 1, 2025 and August 31, 2025"
            variant="list"
            listCallouts={listCallouts}
          />
        </div>

      </div>
    </div>
  );
}

function ToggleDemo() {
  const [states, setStates] = useState<Record<string, boolean>>({
    default: false,
    withLabel: true,
    labelOff: false,
    disabled: false,
    disabledOn: true,
  });

  const toggle = (key: string) =>
    setStates(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Toggles</div>
      <div style={descStyle}>On/Off control — four states: off, on, off (focused), on (focused). Click to toggle.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Off / On */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 16 }}>Default states</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <Toggle checked={states.default} onChange={() => toggle('default')} />
              <span style={{ fontSize: 11, color: neutrals[500] }}>{states.default ? 'On' : 'Off'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <Toggle checked={states.withLabel} onChange={() => toggle('withLabel')} label="Show advanced options" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>With label</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <Toggle checked={states.labelOff} onChange={() => toggle('labelOff')} label="Enable notifications" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>With label (off)</span>
            </div>
          </div>
        </div>

        {/* Disabled */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 16 }}>Disabled states</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <Toggle checked={false} disabled />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Disabled off</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <Toggle checked={true} disabled />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Disabled on</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <Toggle checked={false} disabled label="Archived campaigns" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Disabled with label</span>
            </div>
          </div>
        </div>

        {/* Focus hint */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Focus state</div>
          <div style={{ fontSize: 12, color: neutrals[600], marginBottom: 12 }}>
            Tab to the toggle below — the blue focus ring appears automatically.
          </div>
          <Toggle checked={states.default} onChange={() => toggle('default')} label="Tab to me to see focus ring" />
        </div>

      </div>
    </div>
  );
}

function CheckboxDemo() {
  const [states, setStates] = useState<Record<string, boolean>>({
    unchecked: false,
    checked: true,
    withLabel: false,
    indeterminate: false,
    errorUnchecked: false,
    groupA: true,
    groupB: false,
    groupC: true,
  });

  const toggle = (key: string) =>
    setStates(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Checkboxes</div>
      <div style={descStyle}>Selection control — seven states: unselected, selected, focus, disabled, error, indeterminate.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Basic states */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 16 }}>Basic states</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Checkbox checked={states.unchecked} onChange={() => toggle('unchecked')} label="Unselected" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Unselected</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Checkbox checked={states.checked} onChange={() => toggle('checked')} label="Selected" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Selected</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Checkbox checked={false} disabled label="Disabled off" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Disabled off</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Checkbox checked={true} disabled label="Disabled on" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Disabled on</span>
            </div>
          </div>
        </div>

        {/* Indeterminate */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 16 }}>Indeterminate (partial selection)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Checkbox
                checked={states.indeterminate}
                indeterminate={!states.indeterminate}
                onChange={() => toggle('indeterminate')}
                label="Select all"
              />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Click to toggle</span>
            </div>
          </div>
        </div>

        {/* Error states */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 16 }}>Error states</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Checkbox
                checked={states.errorUnchecked}
                onChange={() => toggle('errorUnchecked')}
                label="I accept the terms and conditions"
                error="You must accept the terms to proceed."
              />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Single error</span>
            </div>
          </div>
        </div>

        {/* CheckboxGroup */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>CheckboxGroup — 8px spacing between items</div>
          <div style={{ fontSize: 12, color: neutrals[600], marginBottom: 12 }}>
            Wrap checkboxes in <code>&lt;CheckboxGroup&gt;</code> for consistent 8px list spacing. Tab between items to see focus rings.
          </div>
          <CheckboxGroup>
            <Checkbox checked={states.groupA} onChange={() => toggle('groupA')} label="Display advertising" />
            <Checkbox checked={states.groupB} onChange={() => toggle('groupB')} label="Programmatic video" />
            <Checkbox checked={states.groupC} onChange={() => toggle('groupC')} label="Connected TV" />
          </CheckboxGroup>
        </div>

        {/* CheckboxGroup — with validation error */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>CheckboxGroup — with validation error</div>
          <CheckboxGroup
            error={!states.groupA && !states.groupB && !states.groupC ? 'Please select at least one channel to continue.' : undefined}
          >
            <Checkbox checked={states.groupA} onChange={() => toggle('groupA')} label="Display advertising" />
            <Checkbox checked={states.groupB} onChange={() => toggle('groupB')} label="Programmatic video" />
            <Checkbox checked={states.groupC} onChange={() => toggle('groupC')} label="Connected TV" />
          </CheckboxGroup>
        </div>

      </div>
    </div>
  );
}

function RadioDemo() {
  const [selected, setSelected] = useState<string>('display');
  const [errorSelected, setErrorSelected] = useState<string>('');

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Radio Buttons</div>
      <div style={descStyle}>Single-selection control — six states: unselected, selected, focus, disabled, error. Icons from the centralised icon library.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Basic states */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 16 }}>Basic states</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Radio checked={false} label="Unselected" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Unselected</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Radio checked={true} label="Selected" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Selected</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Radio checked={false} disabled label="Disabled off" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Disabled off</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Radio checked={true} disabled label="Disabled on" />
              <span style={{ fontSize: 11, color: neutrals[500] }}>Disabled on</span>
            </div>
          </div>
        </div>

        {/* Error state */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 16 }}>Error state</div>
          <Radio
            checked={false}
            label="I accept the terms and conditions"
            error="You must accept the terms to proceed."
          />
        </div>

        {/* RadioGroup — interactive */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>RadioGroup — 8px spacing, single-select</div>
          <div style={{ fontSize: 12, color: neutrals[600], marginBottom: 12 }}>
            One option at a time. Tab between items to see focus rings.
          </div>
          <RadioGroup name="channel">
            {(['display', 'video', 'ctv', 'audio'] as const).map(val => (
              <Radio
                key={val}
                name="channel"
                value={val}
                checked={selected === val}
                onChange={() => setSelected(val)}
                label={
                  val === 'display' ? 'Display advertising' :
                  val === 'video'   ? 'Programmatic video'  :
                  val === 'ctv'     ? 'Connected TV'         :
                                      'Audio'
                }
              />
            ))}
          </RadioGroup>
        </div>

        {/* RadioGroup — with error */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>RadioGroup — with validation error</div>
          <RadioGroup
            name="budget"
            error={errorSelected === '' ? 'Please select a budget type to continue.' : undefined}
          >
            {(['daily', 'weekly', 'monthly'] as const).map(val => (
              <Radio
                key={val}
                name="budget"
                value={val}
                checked={errorSelected === val}
                onChange={() => setErrorSelected(val)}
                label={val === 'daily' ? 'Daily budget' : val === 'weekly' ? 'Weekly budget' : 'Monthly budget'}
              />
            ))}
          </RadioGroup>
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal Demo
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Text Input Demo
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Dropdown Row Demo
// ---------------------------------------------------------------------------

function DropdownRowDemo() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState<string[]>([]);
  const [allSelected, setAllSelected] = React.useState(false);

  const options = ['Commission', 'CPC', 'CPA', 'CPM', 'Flat fee'];

  const toggleCheck = (opt: string) => {
    setChecked(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) { setChecked([]); setAllSelected(false); }
    else { setChecked(options); setAllSelected(true); }
  };

  const panelStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    minWidth: 320,
  };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Dropdown Rows</div>
      <div style={descStyle}>
        Row building blocks used inside dropdown panels. Single-select, multi-select (checkbox), and utility rows.
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>

        {/* Single-select rows */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Single select</div>
          <div style={panelStyle}>
            {options.map(opt => (
              <DropdownRow
                key={opt}
                label={opt}
                selected={selected === opt}
                onClick={() => setSelected(prev => prev === opt ? null : opt)}
              />
            ))}
          </div>
        </div>

        {/* Multi-select checkbox rows */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Multi select (checkbox)</div>
          <div style={panelStyle}>
            <DropdownRow
              variant="select-all"
              label="Select all"
              selected={allSelected}
              onClick={handleSelectAll}
            />
            {options.map(opt => (
              <DropdownRow
                key={opt}
                variant="checkbox"
                label={opt}
                selected={checked.includes(opt)}
                onClick={() => toggleCheck(opt)}
              />
            ))}
            <DropdownRow
              variant="count-clear"
              count={`${checked.length} selected`}
              clearLabel="Clear all"
              onClearAll={() => { setChecked([]); setAllSelected(false); }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function TextInputDemo() {
  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Text Input</div>
      <div style={descStyle}>
        Single-line text input with Default, Short, Long, and Numeric size variants. States: default (empty), active (has value), focused, disabled, and error.
      </div>

      {/* States */}
      <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>States</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Default</span>
          <TextInput placeholder="Placeholder text" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Active</span>
          <TextInput defaultValue="Text" wrapperStyle={{ border: `1px solid ${text.body}` }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Filled</span>
          <TextInput defaultValue="Text entered" placeholder="Placeholder text" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Disabled</span>
          <TextInput value="Placeholder text" disabled />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Error</span>
          <TextInput defaultValue="Text" error />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>With icon</span>
          <TextInput defaultValue="Text" trailingIcon="Chevron Down" />
        </div>

      </div>

      {/* Sizes */}
      <div style={{ ...labelStyle, fontSize: '10px', marginTop: 24, marginBottom: 8 }}>Sizes</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Default</span>
          <TextInput size="default" placeholder="Default (max 360px)" trailingIcon="Chevron Down" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Short</span>
          <TextInput size="short" placeholder="Short" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Long</span>
          <TextInput size="long" placeholder="Long — can fill container width" trailingIcon="Chevron Down" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 80, fontSize: 12, color: neutrals[700] }}>Numeric</span>
          <TextInput size="numeric" placeholder="0" type="number" />
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Select Field Demo
// ---------------------------------------------------------------------------

const SELECT_OPTIONS = [
  { value: 'commission', label: 'Commission' },
  { value: 'cpc',        label: 'CPC' },
  { value: 'cpa',        label: 'CPA' },
  { value: 'cpm',        label: 'CPM' },
  { value: 'flat',       label: 'Flat fee' },
  { value: 'rev',        label: 'Revenue share' },
  { value: 'hybrid',     label: 'Hybrid' },
];

// 8-row height = 8 × 36px
const ROW_HEIGHT = 36;
const MAX_VISIBLE_ROWS = 8;
const SCROLL_MAX_HEIGHT = ROW_HEIGHT * MAX_VISIBLE_ROWS;

const SELECT_OPTIONS_LONG = [
  { value: 'display',    label: 'Display' },
  { value: 'video',      label: 'Video' },
  { value: 'native',     label: 'Native' },
  { value: 'search',     label: 'Search' },
  { value: 'social',     label: 'Social' },
  { value: 'email',      label: 'Email' },
  { value: 'push',       label: 'Push notification' },
  { value: 'affiliate',  label: 'Affiliate' },
  { value: 'influencer', label: 'Influencer' },
  { value: 'podcast',    label: 'Podcast' },
  { value: 'ott',        label: 'OTT / CTV' },
  { value: 'dooh',       label: 'DOOH' },
];

function SelectFieldDemo() {
  const [singleVal, setSingleVal] = React.useState<string | null>(null);
  const [multiVals, setMultiVals] = React.useState<string[]>([]);
  const [singleErrorVal, setSingleErrorVal] = React.useState<string | null>(null);
  const [multiErrorVals, setMultiErrorVals] = React.useState<string[]>([]);
  const [scrollSingleVal, setScrollSingleVal] = React.useState<string | null>(null);
  const [scrollMultiVals, setScrollMultiVals] = React.useState<string[]>([]);

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 32,
    alignItems: 'flex-start',
  };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Select Field</div>
      <div style={descStyle}>
        Form field with integrated dropdown. Type to search and filter options. Single-select closes on pick; multi-select stays open and adds chips. Chevron flips when open.
      </div>

      {/* Single select */}
      <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Single select</div>
      <div style={rowStyle}>
        <SelectField
          label="Campaign Name"
          infoTooltip="Select your campaign type"
          placeholder="Search or select…"
          helperText="Helper text"
          items={SELECT_OPTIONS}
          mode="single"
          value={singleVal}
          onChange={setSingleVal}
        />
        <SelectField
          label="Campaign Name"
          infoTooltip="Select your campaign type"
          placeholder="Search or select…"
          error="Please select an option"
          items={SELECT_OPTIONS}
          mode="single"
          value={singleErrorVal}
          onChange={setSingleErrorVal}
        />
        <SelectField
          label="Campaign Name"
          showInfoIcon={false}
          placeholder="Placeholder text"
          helperText="This field is disabled"
          items={SELECT_OPTIONS}
          mode="single"
          disabled
        />
      </div>

      {/* Multi select */}
      <div style={{ ...labelStyle, fontSize: '10px', marginTop: 24, marginBottom: 8 }}>Multi select</div>
      <div style={rowStyle}>
        <SelectField
          label="Campaign Type"
          infoTooltip="Select one or more types"
          placeholder="Search or select…"
          helperText="Helper text"
          items={SELECT_OPTIONS}
          mode="multi"
          values={multiVals}
          onMultiChange={setMultiVals}
        />
        <SelectField
          label="Campaign Type"
          infoTooltip="Select one or more types"
          placeholder="Search or select…"
          error="Please select at least one option"
          items={SELECT_OPTIONS}
          mode="multi"
          values={multiErrorVals}
          onMultiChange={setMultiErrorVals}
        />
        <SelectField
          label="Campaign Type"
          showInfoIcon={false}
          placeholder="Placeholder text"
          helperText="This field is disabled"
          items={SELECT_OPTIONS}
          mode="multi"
          disabled
        />
      </div>

      {/* Scrollable list — more than 8 options */}
      <div style={{ ...labelStyle, fontSize: '10px', marginTop: 24, marginBottom: 8 }}>
        Scrollable list (12 options — shows 8, scrolls behind fixed Clear all)
      </div>
      <div style={rowStyle}>
        <SelectField
          label="Channel"
          infoTooltip="Select a channel"
          placeholder="Search or select…"
          helperText="Scrolls after 8 rows"
          items={SELECT_OPTIONS_LONG}
          maxHeight={SCROLL_MAX_HEIGHT}
          mode="single"
          value={scrollSingleVal}
          onChange={setScrollSingleVal}
        />
        <SelectField
          label="Channel"
          infoTooltip="Select one or more channels"
          placeholder="Search or select…"
          helperText="Scrolls after 8 rows"
          items={SELECT_OPTIONS_LONG}
          maxHeight={SCROLL_MAX_HEIGHT}
          mode="multi"
          values={scrollMultiVals}
          onMultiChange={setScrollMultiVals}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dropdown Demo
// ---------------------------------------------------------------------------

const DROPDOWN_OPTIONS = [
  { value: 'commission', label: 'Commission' },
  { value: 'cpc',        label: 'CPC' },
  { value: 'cpa',        label: 'CPA' },
  { value: 'cpm',        label: 'CPM' },
  { value: 'flat',       label: 'Flat fee' },
  { value: 'rev',        label: 'Revenue share' },
  { value: 'hybrid',     label: 'Hybrid' },
];

function DropdownTrigger({
  label,
  onClick,
}: {
  label: string;
  onClick: (rect: DOMRect) => void;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      onClick={() => ref.current && onClick(ref.current.getBoundingClientRect())}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 34,
        padding: '0 8px',
        border: `1px solid ${neutrals[300]}`,
        borderRadius: 5,
        background: '#fff',
        cursor: 'pointer',
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        color: neutrals[800],
        minWidth: 200,
        justifyContent: 'space-between',
      }}
    >
      <span>{label}</span>
      <Icon name="Chevron Down" size={16} color={neutrals[800]} />
    </button>
  );
}

function DropdownDemo() {
  const [singleOpen, setSingleOpen] = React.useState(false);
  const [singleRect, setSingleRect] = React.useState<DOMRect | null>(null);
  const [singleVal, setSingleVal] = React.useState<string | null>(null);

  const [multiOpen, setMultiOpen] = React.useState(false);
  const [multiRect, setMultiRect] = React.useState<DOMRect | null>(null);
  const [multiVals, setMultiVals] = React.useState<string[]>([]);

  const singleLabel = singleVal
    ? DROPDOWN_OPTIONS.find(o => o.value === singleVal)?.label ?? 'Select…'
    : 'Select…';

  const multiLabel = multiVals.length === 0
    ? 'Select…'
    : multiVals.length === 1
      ? DROPDOWN_OPTIONS.find(o => o.value === multiVals[0])?.label ?? 'Select…'
      : `${multiVals.length} selected`;

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Dropdown</div>
      <div style={descStyle}>
        Single-select and multi-select (checkbox) dropdown panels. Click a trigger to open, click outside or press Escape to close.
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>

        {/* Single select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ ...labelStyle, fontSize: '10px' }}>Single select</div>
          <DropdownTrigger
            label={singleLabel}
            onClick={rect => { setSingleRect(rect); setSingleOpen(true); }}
          />
          {singleOpen && singleRect && (
            <Dropdown
              mode="single"
              items={DROPDOWN_OPTIONS}
              anchorRect={singleRect}
              selectedValue={singleVal}
              onSelect={v => { setSingleVal(v); setSingleOpen(false); }}
              onClose={() => setSingleOpen(false)}
            />
          )}
        </div>

        {/* Multi select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ ...labelStyle, fontSize: '10px' }}>Multi select</div>
          <DropdownTrigger
            label={multiLabel}
            onClick={rect => { setMultiRect(rect); setMultiOpen(true); }}
          />
          {multiOpen && multiRect && (
            <Dropdown
              mode="multi"
              items={DROPDOWN_OPTIONS}
              anchorRect={multiRect}
              selectedValues={multiVals}
              onMultiSelect={setMultiVals}
              onClose={() => setMultiOpen(false)}
            />
          )}
        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Form Field Demo
// ---------------------------------------------------------------------------

function FormFieldDemo() {
  const [singleVal, setSingleVal] = React.useState<string | null>(null);
  const [singleErrorVal, setSingleErrorVal] = React.useState<string | null>(null);
  const [multiVals, setMultiVals] = React.useState<string[]>([]);
  const [multiErrorVals, setMultiErrorVals] = React.useState<string[]>([]);

  const rowStyle: React.CSSProperties = { display: 'flex', flexWrap: 'wrap' as const, gap: 32, alignItems: 'flex-start' };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Form Field</div>
      <div style={descStyle}>
        Dropdown form field — combines a label, optional info icon, searchable select input, and helper/error message.
        Supports single-select and multi-select (checkbox) modes.
      </div>

      {/* Single select */}
      <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Single select</div>
      <div style={rowStyle}>
        <SelectField
          label="Campaign Name"
          infoTooltip="Select your campaign type"
          placeholder="Search or select…"
          helperText="Helper text"
          items={SELECT_OPTIONS}
          mode="single"
          value={singleVal}
          onChange={setSingleVal}
        />
        <SelectField
          label="Campaign Name"
          infoTooltip="Select your campaign type"
          placeholder="Search or select…"
          error="Please select an option"
          items={SELECT_OPTIONS}
          mode="single"
          value={singleErrorVal}
          onChange={setSingleErrorVal}
        />
        <SelectField
          label="Campaign Name"
          showInfoIcon={false}
          placeholder="Placeholder text"
          helperText="This field is disabled"
          items={SELECT_OPTIONS}
          mode="single"
          disabled
        />
      </div>

      {/* Multi select */}
      <div style={{ ...labelStyle, fontSize: '10px', marginTop: 24, marginBottom: 8 }}>Multi select</div>
      <div style={rowStyle}>
        <SelectField
          label="Campaign Type"
          infoTooltip="Select one or more campaign types"
          placeholder="Search or select…"
          helperText="Helper text"
          items={SELECT_OPTIONS}
          mode="multi"
          values={multiVals}
          onMultiChange={setMultiVals}
        />
        <SelectField
          label="Campaign Type"
          infoTooltip="Select one or more campaign types"
          placeholder="Search or select…"
          error="Please select at least one option"
          items={SELECT_OPTIONS}
          mode="multi"
          values={multiErrorVals}
          onMultiChange={setMultiErrorVals}
        />
        <SelectField
          label="Campaign Type"
          showInfoIcon={false}
          placeholder="Placeholder text"
          helperText="This field is disabled"
          items={SELECT_OPTIONS}
          mode="multi"
          disabled
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Side Nav Demo
// -----------------------------------------------------------------------------

const SIDE_NAV_TOP: SideNavItem[] = [
  { id: 'accounts',  label: 'Accounts',  icon: 'Account' },
  { id: 'contracts', label: 'Contracts', icon: 'Contracts' },
  {
    id: 'campaigns', label: 'Campaigns', icon: 'Campaigns',
    subItems: [
      { id: 'campaigns-campaigns',       label: 'Campaigns' },
      { id: 'campaigns-setup-modules',   label: 'Setup Modules' },
      { id: 'campaigns-bulk-updater',    label: 'Bulk Updater' },
      { id: 'campaigns-bulk-duplicator', label: 'Bulk Duplicator' },
    ],
  },
  {
    id: 'travelers', label: 'Travelers', icon: 'Travelers',
    subItems: [
      { id: 'travelers-ml-audience',          label: 'ML Audience' },
      { id: 'travelers-rule-based-audiences', label: 'Rule-Based Audiences' },
      { id: 'travelers-audience-distribution',label: 'Audience Distribution' },
    ],
  },
  { id: 'creatives', label: 'Creatives', icon: 'Creatives' },
  {
    id: 'dashboards', label: 'Dashboards', icon: 'Dashboard',
    subItems: [
      { id: 'dashboards-commission', label: 'Commission' },
      { id: 'dashboards-co-op',      label: 'Co-Op' },
    ],
  },
  {
    id: 'programs', label: 'Programs', icon: 'Programs',
    subItems: [
      { id: 'programs-host',         label: 'Host' },
      { id: 'programs-participant',  label: 'Participant' },
      { id: 'programs-join-program', label: 'Join Program' },
    ],
  },
  { id: 'testing', label: 'Testing', icon: 'Testing' },
  {
    id: 'reporting', label: 'Reporting', icon: 'Reporting',
    subItems: [
      { id: 'reporting-commission-campaign-summary', label: 'Commission Campaign Summary' },
      { id: 'reporting-campaign-performance',        label: 'Campaign Performance' },
      { id: 'reporting-destination-insights',        label: 'Destination Insights' },
      { id: 'reporting-business-value-review',       label: 'Business Value Review' },
    ],
  },
  {
    id: 'billing', label: 'Billing', icon: 'Billing',
    subItems: [
      { id: 'billing-invoices',         label: 'Invoices' },
      { id: 'billing-bookings-reports', label: 'Bookings Reports' },
    ],
  },
  { id: 'users', label: 'Users', icon: 'User' },
  {
    id: 'admin', label: 'Admin', icon: 'Admin',
    subItems: [
      { id: 'admin-containers',          label: 'Containers' },
      { id: 'admin-roles',               label: 'Roles' },
      { id: 'admin-bulk-reconciliation', label: 'Bulk Reconciliation' },
    ],
  },
];

const SIDE_NAV_BOTTOM: SideNavItem[] = [
  { id: 'guest-experience', label: 'Guest Experience', icon: 'Guest Experience' },
  {
    id: 'help', label: 'Help', icon: 'Help',
    subItems: [
      { id: 'help-submit-ticket',    label: 'Submit Ticket' },
      { id: 'help-submit-feedback',  label: 'Submit Feedback' },
      { id: 'help-announcements',    label: 'Announcements' },
      { id: 'help-support-articles', label: 'Support Articles' },
      { id: 'help-release-notes',    label: 'Release Notes' },
    ],
  },
  {
    id: 'account', label: 'Account', icon: 'Account',
    subItems: [
      { id: 'account-user-profile', label: 'User Profile' },
      { id: 'account-log-out',      label: 'Log Out' },
    ],
  },
];

const SIDE_NAV_BADGES_TOP: SideNavItem[] = [
  { id: 'b-dashboards', label: 'Dashboards', icon: 'Dashboard' },
  {
    id: 'b-campaigns', label: 'Campaigns', icon: 'Campaigns',
    subItems: [
      { id: 'b-campaigns-all',    label: 'All Campaigns' },
      { id: 'b-campaigns-email',  label: 'Email Templates', badge: 'beta' },
      { id: 'b-campaigns-survey', label: 'Survey Campaigns' },
      { id: 'b-campaigns-merge',  label: 'Merge Tags' },
    ],
  },
  { id: 'b-messages',  label: 'Messages',   icon: 'Mail',       badge: 'new' },
  { id: 'b-outbox',    label: 'Outbox',      icon: 'Outbox' },
  { id: 'b-reputation',label: 'Reputation',  icon: 'Reputation', badge: 'alpha',
    subItems: [
      { id: 'b-reputation-reviews',  label: 'Reviews' },
      { id: 'b-reputation-listings', label: 'Listings' },
    ],
  },
  { id: 'b-ai',        label: 'AI Concierge',icon: 'AI Concierge' },
];

function SideNavDemo() {
  const [activeId, setActiveId] = React.useState('campaigns-overview');
  const [badgeActiveId, setBadgeActiveId] = React.useState('b-campaigns-email');

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Side Nav</div>
      <div style={descStyle}>
        Primary navigation sidebar. Expanded (205px) shows icons + labels with expandable groups.
        Collapsed (52px) shows icons only with tooltips. Click the chevron icons to toggle.
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Expanded */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Expanded</div>
          <div style={{ height: 600, display: 'flex' }}>
            <SideNav
              topItems={SIDE_NAV_TOP}
              bottomItems={SIDE_NAV_BOTTOM}
              activeId={activeId}
              onNavigate={setActiveId}
            />
          </div>
        </div>

        {/* Collapsed */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Collapsed</div>
          <div style={{ height: 600, display: 'flex' }}>
            <SideNav
              topItems={SIDE_NAV_TOP}
              bottomItems={SIDE_NAV_BOTTOM}
              activeId={activeId}
              onNavigate={setActiveId}
              collapsed
            />
          </div>
        </div>

        {/* With badges */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>With release badges</div>
          <div style={{ height: 600, display: 'flex' }}>
            <SideNav
              topItems={SIDE_NAV_BADGES_TOP}
              bottomItems={SIDE_NAV_BOTTOM}
              activeId={badgeActiveId}
              onNavigate={setBadgeActiveId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Nav Item Demo
// -----------------------------------------------------------------------------

function NavItemDemo() {
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard');
  const [expandedGroup, setExpandedGroup] = React.useState<string | null>('Travelers');

  const navBg: React.CSSProperties = {
    background: '#242452',
    borderRadius: 0,
    width: 232,
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  };

  const collapsedBg: React.CSSProperties = {
    background: '#242452',
    borderRadius: 0,
    width: 52,
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  };

  const travelersSubItems = [
    { id: 'ml-audiences', label: 'ML Audience' },
    { id: 'rule-based', label: 'Rule-Based Audiences' },
    { id: 'audience-dist', label: 'Audience Distribution' },
  ];

  const handleToggle = (id: string) => setExpandedGroup(g => g === id ? null : id);

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Nav Item</div>
      <div style={descStyle}>
        Primary navigation item with 7 states — Default, Hover, Active (orange border), Active Dropdown,
        Sub Item Default, Sub Item Hover, Sub Item Active. Icons are always in a 16×16 container.
        Long sub-item labels wrap rather than truncate. No focus outline on click.
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>

        {/* All states — static */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>All states</div>
          <div style={navBg}>
            <NavItem label="Default" icon="Dashboard" />
            <NavItem label="Hover" icon="Campaigns" style={{ background: '#17212F' }} />
            <NavItem label="Active" icon="Travelers" active />
            <NavItem label="Active Dropdown" icon="Programs" hasSubItems expanded active={false}
              style={{ background: '#17212F' }}
            />
            <NavItem label="Sub Item Default" isSubItem />
            <NavItem label="Sub Item Hover" isSubItem style={{ background: '#17212F' }} />
            <NavItem label="Sub Item Active" isSubItem active />
            <NavItem label="Long label that wraps onto a second line" isSubItem />
          </div>
        </div>

        {/* Collapsed (icon-only) */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Collapsed (icon-only)</div>
          <div style={collapsedBg}>
            <NavItem label="Dashboard" icon="Dashboard" collapsed />
            <NavItem label="Travelers" icon="Travelers" collapsed active />
            <NavItem label="Campaigns" icon="Campaigns" collapsed />
            <NavItem label="Reporting" icon="Reporting" collapsed />
            <NavItem label="Programs" icon="Programs" collapsed />
          </div>
        </div>

        {/* Interactive */}
        <div>
          <div style={{ ...labelStyle, fontSize: '10px', marginBottom: 8 }}>Interactive (accordion + wrapping sub-items)</div>
          <div style={navBg}>
            <NavItem
              label="Dashboard"
              icon="Dashboard"
              active={activeItem === 'Dashboard'}
              onClick={() => { setActiveItem('Dashboard'); setExpandedGroup(null); }}
            />
            <NavItem
              label="Travelers"
              icon="Travelers"
              active={activeItem !== 'Dashboard' && travelersSubItems.some(s => s.id === activeItem) && expandedGroup !== 'Travelers'}
              hasSubItems
              expanded={expandedGroup === 'Travelers'}
              onClick={() => handleToggle('Travelers')}
            />
            {expandedGroup === 'Travelers' && travelersSubItems.map(sub => (
              <NavItem
                key={sub.id}
                label={sub.label}
                isSubItem
                active={activeItem === sub.id}
                onClick={() => setActiveItem(sub.id)}
              />
            ))}
            <NavItem
              label="Campaigns"
              icon="Campaigns"
              active={activeItem === 'Campaigns'}
              onClick={() => { setActiveItem('Campaigns'); setExpandedGroup(null); }}
            />
            <NavItem
              label="Reporting"
              icon="Reporting"
              active={activeItem === 'Reporting'}
              onClick={() => { setActiveItem('Reporting'); setExpandedGroup(null); }}
            />
            <NavItem
              label="Programs"
              icon="Programs"
              active={activeItem === 'Programs'}
              onClick={() => { setActiveItem('Programs'); setExpandedGroup(null); }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function ModalDemo() {
  const [openModal, setOpenModal] = React.useState<string | null>(null);
  const [dontShow, setDontShow] = React.useState(false);
  const [showCheckbox, setShowCheckbox] = React.useState(true);

  const close = () => setOpenModal(null);

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Modal</div>
      <div style={descStyle}>
        Three sizes — Small (480px), Medium (720px), Large (1040px). Closes on backdrop click, Escape key, or Cancel. Toggle the checkbox option below to preview modals with or without "Don't show again".
      </div>

      {/* Design controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20, padding: '12px 16px', background: neutrals[200], borderRadius: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: neutrals[700] }}>Preview options</span>
        <Checkbox
          checked={showCheckbox}
          onChange={setShowCheckbox}
          label={`Show "Don't show again" checkbox`}
        />
      </div>

      {/* Trigger buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div style={{ width: '100%', ...labelStyle, fontSize: '10px', marginBottom: 4 }}>Sizes</div>
        <Button variant="secondary" size="md" onClick={() => setOpenModal('sm')}>Small (480px)</Button>
        <Button variant="secondary" size="md" onClick={() => setOpenModal('md')}>Medium (720px)</Button>
        <Button variant="secondary" size="md" onClick={() => setOpenModal('lg')}>Large (1040px)</Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ width: '100%', ...labelStyle, fontSize: '10px', marginBottom: 4 }}>Action variants</div>
        <Button variant="secondary" size="md" onClick={() => setOpenModal('two-actions')}>
          2 actions — Cancel + Confirm
        </Button>
        <Button variant="secondary" size="md" onClick={() => setOpenModal('three-actions')}>
          3 actions — Cancel + Secondary + Primary
        </Button>
      </div>

      {/* Small */}
      <Modal
        open={openModal === 'sm'}
        onClose={close}
        size="sm"
        title="Modal Header Title"
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Save draft', onClick: close }}
        showDontShowAgain={showCheckbox}
        dontShowAgainChecked={dontShow}
        onDontShowAgainChange={setDontShow}
      >
        A dialog is a type of modal window that appears in front of platform content to provide critical information, or prompt for a decision to be made.
      </Modal>

      {/* Medium */}
      <Modal
        open={openModal === 'md'}
        onClose={close}
        size="md"
        title="Modal Header Title"
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Save draft', onClick: close }}
        showDontShowAgain={showCheckbox}
        dontShowAgainChecked={dontShow}
        onDontShowAgainChange={setDontShow}
      >
        A dialog is a type of modal window that appears in front of platform content to provide critical information, or prompt for a decision to be made.
      </Modal>

      {/* Large */}
      <Modal
        open={openModal === 'lg'}
        onClose={close}
        size="lg"
        title="Modal Header Title"
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Save draft', onClick: close }}
        showDontShowAgain={showCheckbox}
        dontShowAgainChecked={dontShow}
        onDontShowAgainChange={setDontShow}
      >
        A dialog is a type of modal window that appears in front of platform content to provide critical information, or prompt for a decision to be made.
      </Modal>

      {/* 2 actions — ghost Cancel + primary Confirm only */}
      <Modal
        open={openModal === 'two-actions'}
        onClose={close}
        size="sm"
        title="Modal Header Title"
        primaryAction={{ label: 'Confirm', onClick: close }}
        showDontShowAgain={showCheckbox}
        dontShowAgainChecked={dontShow}
        onDontShowAgainChange={setDontShow}
      >
        A dialog is a type of modal window that appears in front of platform content to provide critical information, or prompt for a decision to be made.
      </Modal>

      {/* 3 actions — ghost + secondary + primary */}
      <Modal
        open={openModal === 'three-actions'}
        onClose={close}
        size="sm"
        title="Modal Header Title"
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Save draft', onClick: close }}
        showDontShowAgain={showCheckbox}
        dontShowAgainChecked={dontShow}
        onDontShowAgainChange={setDontShow}
      >
        A dialog is a type of modal window that appears in front of platform content to provide critical information, or prompt for a decision to be made.
      </Modal>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Icon Gallery
// ---------------------------------------------------------------------------

const ICON_GROUPS: { label: string; icons: IconName[] }[] = [
  {
    label: 'Navigation',
    icons: ['Dashboard', 'Reporting', 'Billing', 'Admin', 'Contracts', 'Campaigns', 'Programs', 'Travelers', 'Creatives', 'Testing'],
  },
  {
    label: 'Account & Places',
    icons: ['Account', 'User', 'Guest Experience', 'Bookings', 'Stays', 'Home', 'Sign Out'],
  },
  {
    label: 'Actions',
    icons: ['Search', 'Edit', 'Delete', 'Copy Clipboard', 'Add', 'Add Filled', 'Subtract', 'Subtract Filled', 'Download', 'Filters', 'Attachment', 'Draggable'],
  },
  {
    label: 'UI Controls',
    icons: ['Settings', 'Help', 'Calendar', 'Clock', 'History', 'Locked', 'Unlocked', 'Bookmark', 'Show', 'Hide', 'Language', 'Google'],
  },
  {
    label: 'Chevrons & Arrows',
    icons: ['Chevron Down', 'Chevron Up', 'Chevron Left', 'Chevron Right', 'Double Chevron Left', 'Double Chevron Right', 'Arrow Unsorted', 'Arrows Ascending', 'Arrows Descending'],
  },
  {
    label: 'Menus & Views',
    icons: ['Kebab Horizontal', 'Kebab Vertical', 'List View', 'Tile View', 'Tile View Filled'],
  },
  {
    label: 'Status',
    icons: ['Checkmark', 'Check', 'Checkmark Filled', 'Close', 'Warning', 'Warning Filled', 'Info', 'Info Filled', 'Critical', 'Alert', 'Stop', 'Pause', 'AI'],
  },
  {
    label: 'Form Controls',
    icons: ['Checkbox Inactive', 'Checkbox Active', 'Checkbox Indeterminate', 'Checkbox Error', 'Radio Inactive', 'Radio Active', 'Radio error'],
  },
  {
    label: 'Communication',
    icons: ['Mail', 'Inbox', 'Messages', 'Outbox', 'Chat', 'AI Concierge', 'Data Cleansing'],
  },
  {
    label: 'Location & Misc',
    icons: ['Location', 'Location Filled', 'Reputation'],
  },
];

function IconGalleryDemo() {
  const [hoveredIcon, setHoveredIcon] = useState<IconName | null>(null);

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Icon Library</div>
      <div style={descStyle}>All icons from the Sojern icon set. Hover an icon to see its name.</div>

      {ICON_GROUPS.map(group => (
        <div key={group.label} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: neutrals[500], textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
            {group.label}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {group.icons.map(name => (
              <div
                key={name}
                onMouseEnter={() => setHoveredIcon(name)}
                onMouseLeave={() => setHoveredIcon(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  padding: '12px 10px',
                  borderRadius: 8,
                  border: `1px solid ${hoveredIcon === name ? neutrals[400] : neutrals[200]}`,
                  background: hoveredIcon === name ? neutrals[100] : surface.container,
                  minWidth: 72,
                  cursor: 'default',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon name={name} size={20} color={text.body} />
                <span style={{ fontSize: 9, color: neutrals[600], textAlign: 'center', lineHeight: 1.3, maxWidth: 68 }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ToastTriggerDemo() {
  const { show } = useToast();

  const VARIANTS: { variant: ToastVariant; label: string }[] = [
    { variant: 'success',       label: 'Success' },
    { variant: 'critical',      label: 'Critical' },
    { variant: 'alert',         label: 'Alert' },
    { variant: 'informational', label: 'Informational' },
  ];

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>Live Toast trigger</div>
      <div style={descStyle}>Click a button to fire a toast notification — auto-dismisses after 5 seconds.</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {VARIANTS.map(({ variant, label }) => (
          <Button
            key={variant}
            variant="secondary"
            size="md"
            onClick={() => show({
              variant,
              message: `This is a ${label.toLowerCase()} notification message.`,
              action: { label: 'View', onClick: () => {} },
              autoDismiss: 5000,
            })}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

