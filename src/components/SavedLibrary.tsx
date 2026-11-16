import React from 'react';
import { Trash2, Copy, ArrowLeft, ArrowRight, FolderOpen } from 'lucide-react';
import { Translations } from '../i18n/translations';
import { AppLanguage, LogoConfig, SavedLogo } from '../types/logo';
import { LogoSvg } from './LogoSvg';

interface SavedLibraryProps {
  items: SavedLogo[];
  onLoad: (config: LogoConfig) => void;
  onDuplicate: (item: SavedLogo) => void;
  onDelete: (id: string) => void;
  onGoToStudio: () => void;
  language: AppLanguage;
  t: Translations;
}

export const SavedLibrary: React.FC<SavedLibraryProps> = ({
  items,
  onLoad,
  onDuplicate,
  onDelete,
  onGoToStudio,
  language,
  t,
}) => {
  const dateLocale =
    language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US';
  const isRtl = language === 'ar';

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.saved.heading}
          </h1>
          <p className="text-sm text-slate-600">{t.saved.subheading}</p>
        </div>

        <button
          type="button"
          onClick={onGoToStudio}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          {t.saved.createNew}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl py-16 px-6 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-slate-900">{t.saved.emptyTitle}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{t.saved.emptyDesc}</p>
          </div>
          <button
            type="button"
            onClick={onGoToStudio}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <span>{t.saved.openStudio}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => {
            const dateLabel = new Date(item.savedAt).toLocaleDateString(dateLocale, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            return (
              <article
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-center">
                    <div className="w-32 h-32">
                      <LogoSvg config={item.config} />
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>{dateLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-code">
                        {t.inspector.shapes[item.config.maskShape]}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900 truncate">
                      {item.config.title || item.config.name || t.saved.untitled}
                    </h2>
                  </div>
                </div>

                <div className="px-4 pb-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onLoad({ ...item.config })}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.saved.editBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDuplicate(item)}
                    title={t.saved.duplicateTitle}
                    aria-label={t.saved.duplicateTitle}
                    className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    title={t.saved.deleteTitle}
                    aria-label={t.saved.deleteTitle}
                    className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
