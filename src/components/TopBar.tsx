import React from 'react';
import { Download, Settings } from 'lucide-react';
import { Translations } from '../i18n/translations';
import { AppView } from '../types/logo';
import { PandaMark } from './PandaMark';

interface TopBarProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  savedCount: number;
  onOpenExport: () => void;
  t: Translations;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onSelectView,
  savedCount,
  onOpenExport,
  t,
}) => {
  const navItems: { id: AppView; label: string }[] = [
    { id: 'studio', label: t.nav.studio },
    { id: 'builder', label: t.nav.builder },
    { id: 'templates', label: t.nav.templates },
    { id: 'platforms', label: t.nav.platforms },
    { id: 'saved', label: savedCount > 0 ? `${t.nav.saved} (${savedCount})` : t.nav.saved },
    { id: 'settings', label: t.nav.settings },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Lockup with Panda icon */}
        <button
          type="button"
          onClick={() => onSelectView('studio')}
          className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <PandaMark className="w-7 h-7 shrink-0" />
          <span>{t.brandName}</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`relative inline-flex items-center gap-1.5 py-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.id === 'settings' && <Settings className="w-4 h-4 shrink-0" />}
                <span>{item.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-blue-600"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenExport}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Download className="w-4 h-4" />
            <span>{t.exportBtn}</span>
          </button>
        </div>
      </div>

      {/* Compact mobile navigation row */}
      <nav
        className="flex md:hidden items-center gap-4 px-4 pb-2.5 overflow-x-auto border-t border-slate-100 pt-2"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectView(item.id)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                isActive
                  ? 'text-blue-600 border-blue-600'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              {item.id === 'settings' && <Settings className="w-3.5 h-3.5 shrink-0" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
