import { useEffect } from 'react';

type OnPaste = (value?: string) => unknown;
type Copy = (value: string) => unknown;

export const useClipboard = (onPaste?: OnPaste): Copy => {
  useEffect(() => {
    if (!onPaste) {
      return;
    }

    function handler(event: Event) {
      const clipboardEvent = event as ClipboardEvent;
      const text = clipboardEvent.clipboardData?.getData('text'); // or window.clipboardData
      onPaste?.(text);
    }

    window.addEventListener('paste', handler);
    return () => window.removeEventListener('paste', handler);
  }, [onPaste]);

  return text => window.navigator.clipboard.writeText(text);
};
