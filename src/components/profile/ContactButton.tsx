'use client';

import React, { useCallback, useState } from 'react';
import { ContactModal } from './ContactModal';

/**
 * Call-to-action that opens the same contact popup as the sidebar's Contact
 * button, for pages (like case studies) where the sidebar form isn't in reach.
 */
export const ContactButton = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="cta-solid hover-lift group relative inline-flex overflow-hidden rounded-lg bg-accent px-4 py-2.5 text-[16px] font-medium text-background"
      >
        <span className="relative z-10">{children}</span>
      </button>
      {open && <ContactModal onClose={close} />}
    </>
  );
};
