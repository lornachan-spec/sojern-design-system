import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ToastProvider } from '../src/components/Toast';
import { BulkEdit } from '../projects/ControlBoard/pages/BulkEdit';

const NAV_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10000,
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  background: '#242452',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  height: 40,
  padding: '0 16px',
  boxSizing: 'border-box',
};

const TAB_STYLE = (active: boolean): React.CSSProperties => ({
  padding: '0 16px',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  fontWeight: active ? 700 : 400,
  color: active ? '#fff' : 'rgba(255,255,255,0.6)',
  borderBottom: active ? '2px solid #E35F3E' : '2px solid transparent',
  cursor: 'pointer',
  userSelect: 'none',
  background: 'none',
  border: 'none',
  borderBottomColor: active ? '#E35F3E' : 'transparent',
  borderBottomWidth: 2,
  borderBottomStyle: 'solid',
  transition: 'color 0.15s ease',
  whiteSpace: 'nowrap',
});

type View = 'component-library' | 'bulk-edit';

function Root() {
  const [view, setView] = useState<View>('bulk-edit');

  return (
    <ToastProvider position="top-right">
      {/* Dev navigation bar */}
      <nav style={NAV_STYLE}>
        <button style={TAB_STYLE(view === 'bulk-edit')} onClick={() => setView('bulk-edit')}>
          ControlBoard / Bulk Edit
        </button>
        <button style={TAB_STYLE(view === 'component-library')} onClick={() => setView('component-library')}>
          Component Library
        </button>
      </nav>

      {/* Page content — offset by nav height */}
      <div style={{ paddingTop: view === 'component-library' ? 40 : 0 }}>
        {view === 'bulk-edit'      && <BulkEdit />}
        {view === 'component-library' && <App />}
      </div>
    </ToastProvider>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
