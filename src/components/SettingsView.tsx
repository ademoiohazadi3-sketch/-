import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  RotateCcw,
  Settings,
  Trash2,
  Upload,
  UserCheck,
} from 'lucide-react';
import { Translations } from '../i18n/translations';
import {
  AppBackdrop,
  AppLanguage,
  AppSettings,
  ArtworkFit,
  StageBg,
  UserProfile,
} from '../types/logo';
import { BackdropSwitcher } from './BackdropSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SettingsViewProps {
  language: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
  backdrop: AppBackdrop;
  onChangeBackdrop: (backdrop: AppBackdrop) => void;
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onResetSettings: () => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  savedCount: number;
  onExportBackup: () => void;
  onImportBackup: (file: File) => Promise<void>;
  onClearSaved: () => void;
  onBackToStudio: () => void;
  t: Translations;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onChangeLanguage,
  backdrop,
  onChangeBackdrop,
  settings,
  onUpdateSettings,
  onResetSettings,
  userProfile,
  onOpenProfile,
  savedCount,
  onExportBackup,
  onImportBackup,
  onClearSaved,
  onBackToStudio,
  t,
}) => {
  const [confirmClear, setConfirmClear] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isRtl = language === 'ar';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onImportBackup(file);
    e.target.value = '';
  };

  const toggleRows: {
    key: 'autoPersonalizeTemplates' | 'autoApplyArtworkPalette' | 'defaultShowSafeZone';
    label: string;
    desc: string;
    checked: boolean;
  }[] = [
    {
      key: 'autoPersonalizeTemplates',
      label: t.settings.autoPersonalizeLabel,
      desc: t.settings.autoPersonalizeDesc,
      checked: settings.autoPersonalizeTemplates,
    },
    {
      key: 'autoApplyArtworkPalette',
      label: t.settings.autoPaletteLabel,
      desc: t.settings.autoPaletteDesc,
      checked: settings.autoApplyArtworkPalette,
    },
    {
      key: 'defaultShowSafeZone',
      label: t.settings.defaultSafeZoneLabel,
      desc: t.settings.defaultSafeZoneDesc,
      checked: settings.defaultShowSafeZone,
    },
  ];

  return (
    <section className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.settings.heading}
            </h1>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            {t.settings.subheading}
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToStudio}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <span>{t.settings.backToStudio}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* 1. Appearance & Language */}
        <article className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">{t.settings.appearanceHeading}</h2>
            <p className="text-xs text-slate-600">{t.settings.appearanceDesc}</p>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-semibold text-slate-700">{t.languageLabel}</span>
            <LanguageSwitcher language={language} onChange={onChangeLanguage} />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="block text-xs font-semibold text-slate-700">{t.appBackdropLabel}</span>
            <BackdropSwitcher backdrop={backdrop} onChange={onChangeBackdrop} t={t} />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="block text-xs font-semibold text-slate-700">
              {t.settings.defaultStageLabel}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'checker', label: t.studio.backdropChecker },
                  { id: 'light', label: t.studio.backdropLight },
                  { id: 'dark', label: t.studio.backdropDark },
                ] as { id: StageBg; label: string }[]
              ).map((bg) => {
                const active = settings.defaultStageBg === bg.id;
                return (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => onUpdateSettings({ defaultStageBg: bg.id })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {bg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </article>

        {/* 2. Studio & Export Preferences */}
        <article className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">{t.settings.studioHeading}</h2>
            <p className="text-xs text-slate-600">{t.settings.studioDesc}</p>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-semibold text-slate-700">
              {t.settings.defaultExportSizeLabel}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {([512, 1024, 2048] as const).map((sz) => {
                const active = settings.defaultExportSize === sz;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => onUpdateSettings({ defaultExportSize: sz })}
                    className={`py-2 px-3 text-xs font-bold font-mono-code tabular-nums rounded-lg border transition-colors cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                    dir="ltr"
                  >
                    {sz}×{sz}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="block text-xs font-semibold text-slate-700">
              {t.settings.defaultArtworkFitLabel}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'cover', label: t.inspector.artworkFitCover },
                  { id: 'badge', label: t.inspector.artworkFitBadge },
                ] as { id: ArtworkFit; label: string }[]
              ).map((fit) => {
                const active = settings.defaultArtworkFit === fit.id;
                return (
                  <button
                    key={fit.id}
                    type="button"
                    onClick={() => onUpdateSettings({ defaultArtworkFit: fit.id })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {fit.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            {toggleRows.map((row) => (
              <div
                key={row.key}
                className="flex items-start justify-between gap-4 py-1.5"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-slate-900">{row.label}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">{row.desc}</div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={row.checked}
                  aria-label={row.label}
                  onClick={() => onUpdateSettings({ [row.key]: !row.checked })}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    row.checked ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                  dir="ltr"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      row.checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </article>

        {/* 3. Personal Profile Summary */}
        <article className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">{t.settings.profileHeading}</h2>
            <p className="text-xs text-slate-600">{t.settings.profileDesc}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">
                  {userProfile.firstName} {userProfile.lastName}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{userProfile.gender === 'male' ? t.entry.male : t.entry.female}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {t.settings.savedLogosCount}: {savedCount}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenProfile}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.settings.editProfileBtn}
            </button>
          </div>
        </article>

        {/* 4. Data & Backup */}
        <article className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">{t.settings.dataHeading}</h2>
            <p className="text-xs text-slate-600">{t.settings.dataDesc}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onExportBackup}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.settings.exportBackupBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.settings.importBackupBtn}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={onResetSettings}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.settings.resetSettingsBtn}</span>
            </button>

            {savedCount > 0 && (
              !confirmClear ? (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.settings.clearSavedBtn}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClearSaved();
                      setConfirmClear(false);
                    }}
                    className="px-3 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {t.settings.confirmClearBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {t.settings.cancelBtn}
                  </button>
                </div>
              )
            )}
          </div>
        </article>
      </div>
    </section>
  );
};
