import React, { CSSProperties, useState } from 'react';
import { Button } from '../../../src/components/Button';
import { Breadcrumbs } from '../../../src/components/Breadcrumbs';
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';
import { Chip } from '../../../src/components/Chip';
import { Icon } from '../../../src/components/Icons';
import { SideNav } from '../../../src/components/SideNav';
import { Table, TableColumn } from '../../../src/components/Table';
import { Tooltip } from '../../../src/components/Tooltip';
import { surface, text, border, shadows, neutrals } from '../../../src/tokens';
import type { SideNavItem } from '../../../src/components/SideNav';

// -----------------------------------------------------------------------------
// Side nav configuration (matches the Figma vertical nav bar)
// -----------------------------------------------------------------------------

const NAV_TOP: SideNavItem[] = [
  { id: 'dashboard',  label: 'Dashboard',  icon: 'Dashboard' },
  { id: 'reporting',  label: 'Reporting',  icon: 'Reporting' },
  { id: 'campaigns',  label: 'Campaigns',  icon: 'Campaigns' },
  { id: 'billing',    label: 'Billing',    icon: 'Billing' },
  { id: 'programs',   label: 'Programs',   icon: 'Programs' },
  { id: 'travelers',  label: 'Travelers',  icon: 'Travelers' },
  { id: 'creatives',  label: 'Creatives',  icon: 'Creatives' },
];

const NAV_BOTTOM: SideNavItem[] = [
  { id: 'guest-experience', label: 'Guest Experience', icon: 'Guest Experience' },
  { id: 'help',             label: 'Help',             icon: 'Help' },
  { id: 'account',          label: 'Account',          icon: 'Account' },
];

// -----------------------------------------------------------------------------
// Settings checkboxes — product optimization settings
// -----------------------------------------------------------------------------

const SETTINGS: Array<{ id: string; label: string; info: string }> = [
  { id: 'status',                label: 'Status',                    info: 'Toggle the active/paused state of a campaign.' },
  { id: 'sojern-goal-rate',      label: 'Sojern Goal Rate',          info: 'Target goal rate for Sojern optimization.' },
  { id: 'minimum-margin',        label: 'Minimum Margin',            info: 'Minimum margin percentage to maintain.' },
  { id: 'max-ecpm-cost',         label: 'Maximum eCPM Cost',         info: 'Maximum effective CPM cost allowed.' },
  { id: 'min-partner-data',      label: 'Minimum Partner Data Usage', info: 'Minimum usage threshold for partner data.' },
  { id: 'daily-pacing',          label: 'Daily Pacing Allocation',   info: 'How budget is allocated across the day.' },
  { id: 'days-early-complete',   label: 'Days Early to Complete',    info: 'Target days before campaign end date to complete.' },
  { id: 'min-daily-volume',      label: 'Min Daily Volume',          info: 'Minimum daily impression volume.' },
  { id: 'budget-spreading',      label: 'Budget Spreading',          info: 'Strategy for spreading budget over time.' },
  { id: '3p-impressions-credit', label: '3P Impressions Credit',     info: 'Credit for third-party impression tracking.' },
  { id: '3p-click-credit',       label: '3P Click Credit',           info: 'Credit for third-party click tracking.' },
  { id: '3p-action-credit',      label: '3P Action Credit',          info: 'Credit for third-party action tracking.' },
  { id: 'booking-value',         label: 'Booking Value',             info: 'Target booking value for optimization.' },
  { id: 'constraint-priority',   label: 'Constraint Priority',       info: 'Priority order for applying budget constraints.' },
  { id: 'bid-change-frequency',  label: 'Bid Change Frequency',      info: 'How often bid prices are adjusted.' },
  { id: 'max-bid-change',        label: 'Max Bid Change',            info: 'Maximum allowed change per bid adjustment.' },
  { id: 'creative-sub-alloc',    label: 'Creative Sub Allocation',   info: 'Budget sub-allocation per creative.' },
];

// -----------------------------------------------------------------------------
// Table data — previously uploaded CSVs
// -----------------------------------------------------------------------------

interface CsvRow {
  fileName: string;
  dsp: string;
  uploadedBy: string;
  uploadTime: string;
  successRate: string;
  _actions: string;
}

const CSV_DATA: CsvRow[] = [
  { fileName: 'File1.csv', dsp: 'The Trade Desk', uploadedBy: 'Catherine Johnson', uploadTime: 'February 5, 2024, 4:56 AM', successRate: '99.67%', _actions: '' },
  { fileName: 'File2.csv', dsp: 'The Trade Desk', uploadedBy: 'David Brown',       uploadTime: 'February 5, 2024, 4:56 AM', successRate: '99.67%', _actions: '' },
  { fileName: 'File3.csv', dsp: 'The Trade Desk', uploadedBy: 'Emma Davis',        uploadTime: 'February 5, 2024, 4:56 AM', successRate: '99.67%', _actions: '' },
  { fileName: 'File4.csv', dsp: 'The Trade Desk', uploadedBy: 'Frank Wilson',      uploadTime: 'February 5, 2024, 4:56 AM', successRate: '99.67%', _actions: '' },
];

const CSV_COLUMNS: TableColumn<CsvRow>[] = [
  { key: 'fileName',    header: 'File Name',    type: 'link',  align: 'left',  width: 262 },
  { key: 'dsp',         header: 'DSP',          type: 'chip',  align: 'left',  width: 168, chipVariant: () => 'information' },
  { key: 'uploadedBy',  header: 'Uploaded By',  type: 'text',  align: 'left',  width: 203 },
  { key: 'uploadTime',  header: 'Upload Time',  type: 'text',  align: 'left',  width: 245 },
  { key: 'successRate', header: 'Success Rate', type: 'text',  align: 'left',  width: 145 },
  {
    key: '_actions',
    header: '',
    width: 139,
    render: () => (
      <Button variant="secondary" size="sm">
        Download
      </Button>
    ),
  },
];

// -----------------------------------------------------------------------------
// Shared style tokens
// -----------------------------------------------------------------------------

const pageBackground: CSSProperties = {
  background: surface.page,
  minHeight: '100vh',
  display: 'flex',
};

const contentArea: CSSProperties = {
  flex: 1,
  padding: '16px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  background: surface.page,
  minHeight: '100vh',
  boxSizing: 'border-box',
};

const card: CSSProperties = {
  background: surface.container,
  borderRadius: 10,
  padding: 32,
  boxShadow: shadows.light,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};

const h1Style: CSSProperties = {
  fontFamily: 'Lato, sans-serif',
  fontSize: 32,
  fontWeight: 500,
  lineHeight: 1.3,
  color: '#26374e',
  margin: 0,
};

const h2Style: CSSProperties = {
  fontFamily: 'Lato, sans-serif',
  fontSize: 26,
  fontWeight: 400,
  lineHeight: 1.2,
  color: '#26374e',
  margin: 0,
  whiteSpace: 'nowrap' as const,
};

const h3Style: CSSProperties = {
  fontFamily: 'Lato, sans-serif',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1.2,
  color: text.body,
  margin: 0,
};

const bodyStyle: CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.4,
  letterSpacing: '0.2px',
  color: text.body,
  margin: 0,
};

const bodyBoldStyle: CSSProperties = {
  ...bodyStyle,
  fontWeight: 700,
};

const dividerStyle: CSSProperties = {
  height: 1,
  background: border.primary,
  width: '100%',
  flexShrink: 0,
};

// -----------------------------------------------------------------------------
// SettingCheckboxRow — checkbox + info icon in a row
// -----------------------------------------------------------------------------

function SettingCheckboxRow({
  id,
  label,
  info,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  info: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox id={id} label={label} checked={checked} onChange={onChange} />
      <Tooltip content={info} position="right">
        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 2, cursor: 'default' }}>
          <Icon name="Info" size={16} color={neutrals[500]} aria-hidden />
        </span>
      </Tooltip>
    </div>
  );
}

// -----------------------------------------------------------------------------
// DragDropZone — file upload area
// TODO: No dedicated file-upload component exists in src/components/. Using a
//       plain styled div as the closest approximation of the Figma drag-drop UI.
// -----------------------------------------------------------------------------

function DragDropZone() {
  const zoneStyle: CSSProperties = {
    background: surface.containerWithin,
    border: `1px dashed ${border.primary}`,
    borderRadius: 6,
    padding: '32px 56px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div style={zoneStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Icon name="Attachment" size={16} color={text.body} aria-hidden />
        <p style={{ ...bodyStyle, whiteSpace: 'nowrap' }}>
          Drag and drop .CSV file here or{' '}
          <span style={{ color: '#1362f7', cursor: 'pointer' }}>click here to upload</span>
        </p>
      </div>
      <p style={{ ...bodyStyle, fontSize: 12, letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>
        Only .csv files are supported
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BulkEdit page
// -----------------------------------------------------------------------------

export function BulkEdit() {
  const [activeNav, setActiveNav] = useState('campaigns');
  const [checkedSettings, setCheckedSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(SETTINGS.map(s => [s.id, false]))
  );
  const anyChecked = Object.values(checkedSettings).some(Boolean);

  const handleSettingChange = (id: string) => (checked: boolean) => {
    setCheckedSettings(prev => ({ ...prev, [id]: checked }));
  };

  return (
    <div style={pageBackground}>
      {/* Collapsed vertical side nav */}
      <SideNav
        topItems={NAV_TOP}
        bottomItems={NAV_BOTTOM}
        activeId={activeNav}
        onNavigate={setActiveNav}
        collapsed
      />

      {/* Page content */}
      <main style={contentArea}>

        {/* Page header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <h1 style={h1Style}>Bulk Edit</h1>
            <Breadcrumbs
              items={[
                { label: 'All Campaigns', onClick: () => {} },
                { label: 'Bulk Edit' },
              ]}
            />
          </div>
          <Button variant="secondary" size="lrg" onClick={() => {}}>
            Back
          </Button>
        </div>

        {/* Bulk Update card */}
        <div style={card}>

          {/* Card heading */}
          <h2 style={h2Style}>Bulk Update</h2>

          {/* Step 1 — Download Template */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, color: text.body }}>
              <h3 style={h3Style}>1. Download Template</h3>
              <p style={bodyStyle}>
                Select the settings you wish to update below. Then download the CSV template and make
                updates in the file. Save the file as .csv.
              </p>
            </div>
            <p style={bodyBoldStyle}>
              Select the product optimization settings you wish to update
            </p>
          </div>

          {/* Settings checkboxes */}
          <CheckboxGroup gap={8}>
            {SETTINGS.map(setting => (
              <SettingCheckboxRow
                key={setting.id}
                id={setting.id}
                label={setting.label}
                info={setting.info}
                checked={checkedSettings[setting.id]}
                onChange={handleSettingChange(setting.id)}
              />
            ))}
          </CheckboxGroup>

          {/* Download CSV Template button — active (primary) when any setting selected, else primary */}
          <div>
            <Button
              variant="primary"
              size="lrg"
              disabled={!anyChecked}
              onClick={() => {}}
            >
              Download CSV Template
            </Button>
          </div>

          {/* Divider */}
          <div style={dividerStyle} />

          {/* Step 2 — Upload CSV */}
          <h3 style={h3Style}>2. Upload CSV</h3>

          <DragDropZone />

          {/* Submit Updates — disabled until file is uploaded */}
          <div>
            <Button variant="primary" size="lrg" disabled onClick={() => {}}>
              Submit Updates
            </Button>
          </div>
        </div>

        {/* Previously Uploaded CSVs section */}
        <h2 style={h2Style}>Previously Uploaded CSVs</h2>

        {/* Filters row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* TODO: No FilterBar component exists in src/components/. Using Icon + count inline. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="Filters" size={16} color={text.body} />
            <span style={bodyBoldStyle}>1</span>
          </div>
          <Chip label="Last 30 Days" variant="information" dismissible onDismiss={() => {}} />
        </div>

        {/* CSV history table */}
        <Table<CsvRow>
          columns={CSV_COLUMNS}
          data={CSV_DATA}
        />

      </main>
    </div>
  );
}

export default BulkEdit;
