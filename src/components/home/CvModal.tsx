'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function CvModal({ open, onClose, url }: { open: boolean; onClose: () => void; url: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.button aria-label="Close" className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" className="relative z-[201] flex h-[min(90vh,52rem)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900" initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 12 }}>
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
              <h2 className="text-lg font-serif font-semibold text-primary">Curriculum Vitae</h2>
              <div className="flex gap-1">
                <a href={url} download target="_blank" rel="noreferrer" className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-accent dark:hover:bg-neutral-800" aria-label="Download CV"><Download className="h-5 w-5" /></a>
                <button onClick={onClose} className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-accent dark:hover:bg-neutral-800" aria-label="Close"><X className="h-5 w-5" /></button>
              </div>
            </div>
            <iframe title="Curriculum Vitae" src={url} className="min-h-0 flex-1 bg-neutral-100" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
