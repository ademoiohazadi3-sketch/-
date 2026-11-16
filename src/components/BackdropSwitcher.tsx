import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Translations } from '../i18n/translations';
import { AppBackdrop } from '../types/logo';

interface BackdropSwitcherProps {
  backdrop: AppBackdrop;
  onChange: (backdrop: AppBackdrop) => void;
  t: Translations;
}

export const BackdropSwitcher: React.FC<BackdropSwitcherProps> = ({
  backdrop,
  onChange,
  t,
}) => {
  const options: { id: AppBackdrop; label: string }[] = [
    { id: 'studio', label: t.appBackdrops.studio },
    { id: 'grid', label: t.appBackdrops.grid },
    { id: 'mesh', label: t.appBackdrops.mesh },
    { id: 'plain', label: t.appBackdrops.plain },
  ];

  return (
    <div
      className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0"
      role="group"
      aria-label={t.appBackdropLabel}
    >
      <ImageIcon className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" aria-hidden="true" />
      {options.map((opt) => {
        const active = backdrop === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              active
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
