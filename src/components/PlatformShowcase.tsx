import React from 'react';
import { Download } from 'lucide-react';
import { Translations } from '../i18n/translations';
import { LogoConfig, UserProfile } from '../types/logo';
import { LogoSvg } from './LogoSvg';

interface PlatformShowcaseProps {
  config: LogoConfig;
  userProfile?: UserProfile | null;
  onQuickExport: (size: 512 | 1024 | 2048) => void;
  onBackToStudio: () => void;
  t: Translations;
}

export const PlatformShowcase: React.FC<PlatformShowcaseProps> = ({
  config,
  userProfile,
  onQuickExport,
  onBackToStudio,
  t,
}) => {
  const fullName = userProfile
    ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
    : '';
  const displayName = fullName || config.title.trim() || config.name || t.brandName;
  const handle = config.subtitle
    ? config.subtitle.toLowerCase().replace(/[^a-z0-9_]/gi, '') || 'studio_mark'
    : 'studio_mark';

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.platforms.heading}
          </h1>
          <p className="text-sm sm:text-base text-slate-600">{t.platforms.subheading}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onBackToStudio}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer whitespace-nowrap"
          >
            {t.platforms.backToStudio}
          </button>
          <button
            type="button"
            onClick={() => onQuickExport(1024)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.platforms.download1024}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2.5">
            <span className="font-bold text-slate-900">Instagram</span>
            <span className="font-mono-code" dir="ltr">
              320 × 320 px
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
              <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden">
                <LogoSvg config={{ ...config, maskShape: 'circle' }} />
              </div>
            </div>
            <div className="space-y-1 min-w-0">
              <div className="text-base font-bold text-slate-900 truncate">{displayName}</div>
              <div className="text-xs font-mono-code text-slate-500 truncate" dir="ltr">
                @{handle}
              </div>
              <p className="text-xs text-slate-600">{t.platforms.igBio}</p>
            </div>
          </div>
        </article>

        <article className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4 text-white">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2.5">
            <span className="font-bold text-white">YouTube</span>
            <span className="font-mono-code" dir="ltr">
              800 × 800 px
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10">
              <LogoSvg config={{ ...config, maskShape: 'circle' }} />
            </div>
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="text-base font-bold text-white truncate">{displayName}</div>
              <div className="text-xs text-slate-400 truncate">
                @{handle} · {t.platforms.ytMeta}
              </div>
              <span className="inline-block px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-md">
                {t.platforms.subscribe}
              </span>
            </div>
          </div>
        </article>

        <article className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
            <span className="font-bold text-slate-900">X / Twitter</span>
            <span className="font-mono-code" dir="ltr">
              400 × 400 px
            </span>
          </div>
          <div
            className="h-16 w-full"
            style={{
              background: `linear-gradient(135deg, ${config.bgColor1}, ${config.bgColor2})`,
            }}
          />
          <div className="px-5 pb-5">
            <div className="-mt-9 w-18 h-18 rounded-full border-4 border-white overflow-hidden bg-white">
              <LogoSvg config={{ ...config, maskShape: 'circle' }} />
            </div>
            <div className="mt-2 text-base font-bold text-slate-900 truncate">{displayName}</div>
            <div className="text-xs text-slate-500 font-mono-code" dir="ltr">
              @{handle}
            </div>
          </div>
        </article>

        <article className="bg-[#1E1F22] border border-slate-800 rounded-xl p-5 space-y-4 text-white">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-2.5">
            <span className="font-bold text-white">Discord</span>
            <span className="font-mono-code" dir="ltr">
              512 × 512 px
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
              <LogoSvg config={{ ...config, maskShape: 'squircle' }} />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">
                {t.platforms.discordTitlePrefix} {displayName}
              </div>
              <div className="text-xs text-slate-400 tabular-nums">{t.platforms.discordMeta}</div>
            </div>
          </div>
        </article>

        <article className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2.5">
            <span className="font-bold text-slate-900">LinkedIn</span>
            <span className="font-mono-code" dir="ltr">
              400 × 400 px
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 rounded-xl overflow-hidden border border-slate-200 shrink-0">
              <LogoSvg config={{ ...config, maskShape: 'square' }} />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="text-base font-bold text-slate-900 truncate">{displayName}</div>
              <div className="text-xs text-slate-600">{t.platforms.linkedinSector}</div>
              <div className="text-xs text-blue-600 font-semibold">{t.platforms.follow}</div>
            </div>
          </div>
        </article>

        <article className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-white">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2.5">
            <span className="font-bold text-white">TikTok</span>
            <span className="font-mono-code" dir="ltr">
              200 × 200 px
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 rounded-full overflow-hidden ring-2 ring-rose-500/70 shrink-0">
              <LogoSvg config={{ ...config, maskShape: 'circle' }} />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="text-base font-bold text-white truncate">{displayName}</div>
              <div className="text-xs text-slate-400 font-mono-code truncate" dir="ltr">
                @{handle}
              </div>
              <div className="text-xs text-slate-300 tabular-nums">{t.platforms.tiktokMeta}</div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
