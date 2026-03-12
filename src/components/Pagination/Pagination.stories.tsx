import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithState = ({ totalItems, pageSize, pageSizeOptions }: any) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  return (
    <Pagination
      page={page}
      totalItems={totalItems}
      pageSize={size}
      pageSizeOptions={pageSizeOptions}
      onPageChange={setPage}
      onPageSizeChange={setSize}
    />
  );
};

export const Default: Story = {
  render: () => <PaginationWithState totalItems={100} pageSize={10} pageSizeOptions={[10, 25, 50]} />,
};

export const FewPages: Story = {
  render: () => <PaginationWithState totalItems={30} pageSize={10} pageSizeOptions={[10, 25, 50]} />,
};

export const ManyPages: Story = {
  render: () => <PaginationWithState totalItems={500} pageSize={10} pageSizeOptions={[10, 25, 50, 100]} />,
};

export const LargePageSize: Story = {
  render: () => <PaginationWithState totalItems={200} pageSize={50} pageSizeOptions={[10, 25, 50, 100]} />,
};
