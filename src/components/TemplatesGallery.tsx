import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../data/presets';
import { Translations } from '../i18n/translations';
import { AppLanguage, LogoConfig, TemplateCategory } from '../types/logo';
import { LogoSvg } from './LogoSvg';

interface TemplatesGalleryProps {
  onSelectTemplate: (config: LogoConfig) => void;
  language: AppLanguage;
  t: Translations;
}

export const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({
  onSelectTemplate,
  language,
  t,
}) => {
  const [category, setCategory] = useState<TemplateCategory>('all');
  const [query, setQuery] = useState('');

  const categories: { id: TemplateCategory; label: string }[] = [
    { id: 'all', label: t.templates.categories.all },
    { id: 'characters', label: t.templates.categories.characters },
    { id: 'anime', label: t.templates.categories.anime },
    { id: 'cartoon', label: t.templates.categories.cartoon },
    { id: 'celebrities', label: t.templates.categories.celebrities },
    { id: 'sports', label: t.templates.categories.sports },
    { id: 'business', label: t.templates.categories.business },
    { id: 'creators', label: t.templates.categories.creators },
    { id: 'gaming', label: t.templates.categories.gaming },
    { id: 'art', label: t.templates.categories.art },
    { id: 'minimal', label: t.templates.categories.minimal },
  ];

  const categoryLabels: Record<Exclude<TemplateCategory, 'all'>, string> = {
    characters: t.templates.categories.characters,
    anime: t.templates.categories.anime,
    cartoon: t.templates.categories.cartoon,
    celebrities: t.templates.categories.celebrities,
    sports: t.templates.categories.sports,
    business: t.templates.categories.business,
    creators: t.templates.categories.creators,
    gaming: t.templates.categories.gaming,
    art: t.templates.categories.art,
    minimal: t.templates.categories.minimal,
  };

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesCat = category === 'all' || tpl.category === category;
    const q = query.trim().toLowerCase();
    const localized = t.templateText[tpl.id];
    const title = localized?.title ?? tpl.titleAr;
    const desc = localized?.desc ?? tpl.descriptionAr;
    const matchesQuery =
      !q ||
      title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      tpl.titleAr.toLowerCase().includes(q) ||
      tpl.config.title.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const isRtl = language === 'ar';

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.templates.heading}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.templates.subheading}
          </p>
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search
            className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'right-3.5' : 'left-3.5'
            }`}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.templates.searchPlaceholder}
            className={`w-full py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 transition-colors ${
              isRtl ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                active
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <p className="text-base font-bold text-slate-900">{t.templates.emptyTitle}</p>
          <p className="text-sm text-slate-500">{t.templates.emptyDesc}</p>
          <button
            type="button"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            {t.templates.showAllBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((tpl) => {
            const localized = t.templateText[tpl.id];
            return (
              <article
                key={tpl.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300"
              >
                <div>
                  <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-center">
                    <div className="w-36 h-36">
                      <LogoSvg config={tpl.config} />
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>{categoryLabels[tpl.category]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-code" dir="ltr">
                        {t.inspector.shapes[tpl.config.maskShape]}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900">
                      {localized?.title ?? tpl.titleAr}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {localized?.desc ?? tpl.descriptionAr}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectTemplate({ ...tpl.config })}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <span>{t.templates.customizeBtn}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
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
