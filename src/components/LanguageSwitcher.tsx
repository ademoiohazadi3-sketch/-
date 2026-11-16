import React from 'react';
import { Globe } from 'lucide-react';
import { AppLanguage } from '../types/logo';

interface LanguageSwitcherProps {
  language: AppLanguage;
  onChange: (lang: AppLanguage) => void;
}

const LANGS: { id: AppLanguage; label: string }[] = [
  { id: 'ar', label: 'العربية' },
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
  { id: 'es', label: 'ES' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onChange }) => {
  return (
    <div
      className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0"
      role="group"
      aria-label="Language selector"
    >
      <Globe className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" aria-hidden="true" />
      {LANGS.map((item) => {
        const active = language === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              active
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
