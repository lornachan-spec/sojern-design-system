import { useState } from 'react';

// ---------------------------------------------------------------------------
// Module-level singleton — one set of listeners for the whole app.
// Tracks whether the most recent user interaction was keyboard or pointer.
// This mirrors the browser's own :focus-visible heuristic.
// ---------------------------------------------------------------------------

let isKeyboardUser = false;

if (typeof document !== 'undefined') {
  // Any keydown marks the user as a keyboard user
  document.addEventListener(
    'keydown',
    () => { isKeyboardUser = true; },
    true, // capture — fires before any element-level handler
  );

  // Any pointer interaction immediately clears the keyboard-user flag
  document.addEventListener(
    'pointerdown',
    () => { isKeyboardUser = false; },
    true,
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Returns isFocused = true ONLY when focus arrived via keyboard (Tab,
 * arrow keys, etc.), not from a mouse or touch interaction.
 *
 * Usage:
 *   const { isFocused, onFocus, onBlur } = useKeyboardFocus();
 *   <input onFocus={onFocus} onBlur={onBlur} />
 */
export function useKeyboardFocus() {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    if (isKeyboardUser) setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return { isFocused, onFocus, onBlur };
}
