import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'John Smith', email: 'john@sojern.com', status: 'active', date: 'Jan 15, 2026', amount: 1200 },
  { id: 2, name: 'Jane Doe', email: 'jane@sojern.com', status: 'inactive', date: 'Feb 20, 2026', amount: 850 },
  { id: 3, name: 'Bob Johnson', email: 'bob@sojern.com', status: 'active', date: 'Mar 10, 2026', amount: 2400 },
  { id: 4, name: 'Alice Brown', email: 'alice@sojern.com', status: 'active', date: 'Apr 5, 2026', amount: 670 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@sojern.com', status: 'inactive', date: 'May 18, 2026', amount: 3100 },
];

export const Default: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'name', header: 'Name', type: 'text' },
        { key: 'email', header: 'Email', type: 'text' },
        { key: 'status', header: 'Status', type: 'chip', chipVariant: (v) => v === 'active' ? 'success' : 'error' },
        { key: 'date', header: 'Date', type: 'date' },
        { key: 'amount', header: 'Amount', type: 'number' },
      ]}
      data={sampleData}
    />
  ),
};

export const WithHeaderIcons: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'name', header: 'Name', type: 'text', sortable: true, showInfo: true },
        { key: 'email', header: 'Email', type: 'text', showInfo: true },
        { key: 'status', header: 'Status', type: 'chip', chipVariant: (v) => v === 'active' ? 'success' : 'error', filterable: true, filterOptions: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }] },
        { key: 'date', header: 'Date', type: 'date', sortable: true },
        { key: 'amount', header: 'Amount', type: 'number', sortable: true },
      ]}
      data={sampleData}
    />
  ),
};

export const WithLinkCells: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'name', header: 'Name', type: 'link', onLinkClick: (row) => alert(`Clicked: ${row.name}`) },
        { key: 'email', header: 'Email', type: 'text' },
        { key: 'status', header: 'Status', type: 'chip', chipVariant: (v) => v === 'active' ? 'success' : 'error' },
        { key: 'date', header: 'Date', type: 'date' },
        { key: 'amount', header: 'Amount', type: 'number' },
      ]}
      data={sampleData}
    />
  ),
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<number>>(new Set());
    return (
      <Table
        columns={[
          { key: 'name', header: 'Name', type: 'text' },
          { key: 'email', header: 'Email', type: 'text' },
          { key: 'status', header: 'Status', type: 'chip', chipVariant: (v) => v === 'active' ? 'success' : 'error' },
          { key: 'date', header: 'Date', type: 'date' },
          { key: 'amount', header: 'Amount', type: 'number' },
        ]}
        data={sampleData}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
      />
    );
  },
};

export const Empty: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'name', header: 'Name', type: 'text' },
        { key: 'email', header: 'Email', type: 'text' },
        { key: 'status', header: 'Status', type: 'chip' },
        { key: 'date', header: 'Date', type: 'date' },
        { key: 'amount', header: 'Amount', type: 'number' },
      ]}
      data={[]}
    />
  ),
};

export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Table
        columns={[
          { key: 'name', header: 'Name', type: 'text' },
          { key: 'email', header: 'Email', type: 'text' },
          { key: 'status', header: 'Status', type: 'chip', chipVariant: (v) => v === 'active' ? 'success' : 'error' },
          { key: 'date', header: 'Date', type: 'date' },
          { key: 'amount', header: 'Amount', type: 'number' },
        ]}
        data={sampleData}
        totalItems={100}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={[10, 25, 50]}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};
