import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithTrigger = ({ size, title, children, showDontShowAgain }: any) => {
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  return (
    <>
      <Button variant="primary" size="md" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        size={size}
        primaryAction={{ label: 'Confirm', onClick: () => setOpen(false) }}
        secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
        showDontShowAgain={showDontShowAgain}
        dontShowAgain={dontShow}
        onDontShowAgainChange={setDontShow}
      >
        {children}
      </Modal>
    </>
  );
};

export const Small: Story = {
  render: () => (
    <ModalWithTrigger size="sm" title="Small Modal">
      <p>This is a small modal (400-480px). Use for simple confirmations.</p>
    </ModalWithTrigger>
  ),
};

export const Medium: Story = {
  render: () => (
    <ModalWithTrigger size="md" title="Medium Modal">
      <p>This is a medium modal (600-720px). Use for forms or more detailed content.</p>
    </ModalWithTrigger>
  ),
};

export const Large: Story = {
  render: () => (
    <ModalWithTrigger size="lg" title="Large Modal">
      <p>This is a large modal (900-1040px). Use for complex workflows or detailed views.</p>
    </ModalWithTrigger>
  ),
};

export const WithDontShowAgain: Story = {
  render: () => (
    <ModalWithTrigger size="md" title="Modal with Don't Show Again" showDontShowAgain={true}>
      <p>This modal includes the "Don't show again" checkbox in the footer.</p>
    </ModalWithTrigger>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <ModalWithTrigger size="md" title="Modal with Long Content">
      <p>This modal contains a lot of content to demonstrate scrolling behaviour.</p>
      {Array.from({ length: 10 }).map((_, i) => (
        <p key={i}>Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      ))}
    </ModalWithTrigger>
  ),
};

export const ConfirmCancel: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="md" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          size="sm"
          primaryAction={{ label: 'Confirm', onClick: () => setOpen(false) }}
          secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Modal>
      </>
    );
  },
};
