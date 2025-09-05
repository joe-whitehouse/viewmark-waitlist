'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Font loading detection and fallback
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('500 16px neueSingular-D-Medium'),
        document.fonts.load('400 16px Inter_18pt-Regular')
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      }).catch(() => {
        document.documentElement.classList.add('fonts-failed');
      });
    }
  }, []);

  return null; // This component doesn't render anything
}
