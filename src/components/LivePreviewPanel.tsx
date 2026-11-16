import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Translations } from '../i18n/translations';
import { LogoConfig, UserProfile } from '../types/logo';
import { LogoSvg } from './LogoSvg';

interface LivePreviewPanelProps {
  config: LogoConfig;
  userProfile?: UserProfile | null;
  onOpenPlatforms: () => void;
  t: Translations;
}

export const LivePreviewPanel: React.FC<LivePreviewPanelProps> = ({
  config,
  userProfile,
  onOpenPlatforms,
  t,
}) => {
  const fullName = userProfile
    ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
    : '';
  const displayName = fullName || config.title.trim() || config.name || t.brandName;

  return (
    <aside className="bg-white border border-slate-200 rounded-xl p-5 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold text-slate-900">{t.preview.title}</h2>
        <button
          type="button"
          onClick={onOpenPlatforms}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
        >
          <span>{t.preview.allPlatforms}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Size Legibility Strip */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 gap-2">
          <span className="truncate">{t.preview.clarityTest}</span>
          <span className="font-mono-code tabular-nums shrink-0" dir="ltr">
            72 · 48 · 32 · 20px
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 py-3 px-4 bg-slate-50 rounded-lg border border-slate-100">
          {[72, 48, 32, 20].map((size) => (
            <div key={size} className="flex flex-col items-center gap-1.5">
              <div
                className="rounded-full overflow-hidden shrink-0"
                style={{ width: size, height: size }}
              >
                <LogoSvg config={config} />
              </div>
              <span className="text-[10px] font-mono-code tabular-nums text-slate-500" dir="ltr">
                {size}px
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Mockup 1: Instagram Light Profile */}
      <div className="border-t border-slate-100 pt-5">
        <div className="text-xs text-slate-500 mb-2.5 flex items-center justify-between">
          <span>{t.preview.igProfile}</span>
          <span>{t.preview.lightMode}</span>
        </div>
        <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 shrink-0">
              <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden">
                <LogoSvg config={{ ...config, maskShape: 'circle' }} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-slate-900 truncate">{displayName}</div>
              <div className="text-xs text-slate-500 font-mono-code truncate" dir="ltr">
                @{config.subtitle ? config.subtitle.toLowerCase().replace(/\s+/g, '') : 'studio.mark'}
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 tabular-nums">
            <span>{t.preview.postsCount}</span>
            <span>{t.preview.followersCount}</span>
            <span>{t.preview.followingCount}</span>
          </div>
        </div>
      </div>

      {/* Social Mockup 2: Discord / YouTube Dark Card */}
      <div className="border-t border-slate-100 pt-5">
        <div className="text-xs text-slate-500 mb-2.5 flex items-center justify-between">
          <span>{t.preview.ytDiscord}</span>
          <span>{t.preview.darkMode}</span>
        </div>
        <div className="p-3.5 rounded-lg bg-[#0F172A] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10">
              <LogoSvg config={{ ...config, maskShape: 'circle' }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-white truncate">{displayName}</div>
              <div className="text-xs text-slate-400 truncate">{t.preview.channelMeta}</div>
            </div>
            <span className="px-2.5 py-1 bg-white text-slate-900 text-[11px] font-bold rounded-md shrink-0">
              {t.preview.subscribe}
            </span>
          </div>
        </div>
      </div>

      {/* Social Mockup 3: X / Header Overlap */}
      <div className="border-t border-slate-100 pt-5">
        <div className="text-xs text-slate-500 mb-2.5">{t.preview.xHeader}</div>
        <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
          <div
            className="h-14 w-full"
            style={{
              background: `linear-gradient(120deg, ${config.bgColor1}, ${config.accentColor})`,
              opacity: 0.88,
            }}
          />
          <div className="px-3.5 pb-3.5">
            <div className="-mt-7 w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-white shadow-xs">
              <LogoSvg config={{ ...config, maskShape: 'circle' }} />
            </div>
            <div className="mt-1.5 text-sm font-bold text-slate-900 truncate">{displayName}</div>
            <div className="text-xs text-slate-500">{t.preview.xBio}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
