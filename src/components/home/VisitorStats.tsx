'use client';

import { useEffect, useState } from 'react';

export default function VisitorStats({ code, mapUrl }: { code?: string; mapUrl?: string }) {
  const [views, setViews] = useState('—');

  useEffect(() => {
    if (!code) return;
    fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { count?: string }) => data.count && setViews(data.count))
      .catch(() => setViews('—'));
  }, [code]);

  const statsUrl = code ? `https://${code}.goatcounter.com` : undefined;
  return (
    <div className="mx-auto mt-6 mb-4 w-64">
      <div className="mb-3 flex items-center gap-2"><span className="h-4 w-1 rounded-full bg-blue-600" /><h3 className="text-sm font-semibold text-primary">Visitor Statistics</h3></div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-neutral-200 bg-white px-3 py-3 text-center dark:border-neutral-700 dark:bg-neutral-900"><div className="text-2xl font-bold leading-none text-blue-600">{views}</div><div className="mt-1.5 text-[11px] text-neutral-500">Page views</div></div>
        {statsUrl && <a href={statsUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-3 text-center transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-neutral-700 dark:bg-neutral-900"><div className="text-sm font-semibold text-blue-600">View stats</div><div className="mt-1 text-[11px] text-neutral-500">GoatCounter</div></a>}
      </div>
      {mapUrl && <iframe title="Visitor map" src={mapUrl} loading="lazy" className="h-[220px] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700" />}
    </div>
  );
}
