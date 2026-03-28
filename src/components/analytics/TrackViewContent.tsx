'use client';

import { useEffect } from 'react';

interface ViewContentData {
  content_name: string;
  content_category?: string;
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
}

export default function TrackViewContent({ data }: { data: ViewContentData }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', data);
    }
  }, [data]);

  return null;
}
