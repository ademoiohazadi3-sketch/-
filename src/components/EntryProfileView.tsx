import React, { useMemo, useState } from 'react';
import { Check, FolderOpen, RotateCcw, Sparkles, User } from 'lucide-react';
import { DEFAULT_LOGO } from '../data/presets';
import { Translations } from '../i18n/translations';
import {
  AppBackdrop,
  AppLanguage,
  Gender,
  LogoConfig,
  SavedLogo,
  UserProfile,
} from '../types/logo';
import { BackdropSwitcher } from './BackdropSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LogoSvg } from './LogoSvg';
import { PandaMark } from './PandaMark';

interface EntryProfileViewProps {
  initialProfile: UserProfile | null;
  isEntryGate: boolean;
  onSaveProfile: (profile: UserProfile, applyToLogo: boolean) => void;
  onResetProfile?: () => void;
  savedCount?: number;
  savedPreviewItems?: SavedLogo[];
  onEnterSaved?: (draftProfile?: UserProfile) => void;
  language: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
  backdrop: AppBackdrop;
  onChangeBackdrop: (backdrop: AppBackdrop) => void;
  t: Translations;
}

export function buildPersonalizedLogo(
  profile: UserProfile,
  base: LogoConfig = DEFAULT_LOGO
): LogoConfig {
  const first = profile.firstName.trim();
  const last = profile.lastName.trim();
  const isFemale = profile.gender === 'female';

  return {
    ...base,
    name: `${first} ${last}`.trim(),
    title: first || base.title,
    subtitle: last ? last.toUpperCase() : '',
    artworkId: base === DEFAULT_LOGO ? (isFemale ? 'celeb-popicon' : 'cartoon-panda') : base.artworkId,
    artworkFit: base.artworkFit ?? 'cover',
    artworkOpacity: base.artworkOpacity ?? 1,
    emblemId: isFemale ? 'celeb-spotlight' : 'panda-face',
    bgColor1: isFemale ? '#2E083A' : '#3B0764',
    bgColor2: isFemale ? '#12051E' : '#1E1B4B',
    fgColor: '#FFFFFF',
    accentColor: isFemale ? '#E879F9' : '#FACC15',
    fontFamily: 'Cairo',
    fontWeight: 800,
  };
}

export const EntryProfileView: React.FC<EntryProfileViewProps> = ({
  initialProfile,
  isEntryGate,
  onSaveProfile,
  onResetProfile,
  savedCount = 0,
  savedPreviewItems = [],
  onEnterSaved,
  language,
  onChangeLanguage,
  backdrop,
  onChangeBackdrop,
  t,
}) => {
  const [firstName, setFirstName] = useState(initialProfile?.firstName ?? '');
  const [lastName, setLastName] = useState(initialProfile?.lastName ?? '');
  const [gender, setGender] = useState<Gender>(initialProfile?.gender ?? 'male');
  const [error, setError] = useState<string | null>(null);
  const [applyToCurrentLogo, setApplyToCurrentLogo] = useState<boolean>(isEntryGate);

  const previewConfig = useMemo<LogoConfig>(() => {
    const draft: UserProfile = {
      firstName: firstName.trim() || t.entry.defaultFirst,
      lastName: lastName.trim() || t.entry.defaultLast,
      gender,
      updatedAt: new Date().toISOString(),
    };
    return buildPersonalizedLogo(draft);
  }, [firstName, lastName, gender, t.entry.defaultFirst, t.entry.defaultLast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();

    if (!cleanFirst) {
      setError(t.entry.errFirstName);
      return;
    }
    if (!cleanLast) {
      setError(t.entry.errLastName);
      return;
    }

    setError(null);
    onSaveProfile(
      {
        firstName: cleanFirst,
        lastName: cleanLast,
        gender,
        updatedAt: new Date().toISOString(),
      },
      applyToCurrentLogo
    );
  };

  const handleOpenSavedDirect = () => {
    if (!onEnterSaved) return;
    if (isEntryGate) {
      onEnterSaved({
        firstName: firstName.trim() || t.entry.defaultFirst,
        lastName: lastName.trim() || t.entry.defaultLast,
        gender,
        updatedAt: new Date().toISOString(),
      });
      return;
    }
    onEnterSaved();
  };

  const dateLocale =
    language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US';

  return (
    <section
      className={
        isEntryGate
          ? 'relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-10'
          : 'max-w-[1440px] mx-auto px-4 sm:px-6 py-8'
      }
    >
      <div
        className={`w-full ${
          isEntryGate ? 'max-w-5xl shadow-lg' : 'max-w-5xl mx-auto'
        } bg-white/95 backdrop-blur-xs border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-stretch`}
      >
        {/* Form Column */}
        <div className="p-6 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              {isEntryGate ? (
                <div className="inline-flex items-center gap-2.5 text-lg font-extrabold text-slate-900 tracking-tight">
                  <PandaMark className="w-7 h-7 shrink-0" />
                  <span>{t.brandName}</span>
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  {t.languageLabel} · {t.appBackdropLabel}
                </span>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <BackdropSwitcher backdrop={backdrop} onChange={onChangeBackdrop} t={t} />
                <LanguageSwitcher language={language} onChange={onChangeLanguage} />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight pt-2">
              {isEntryGate ? t.entry.gateTitle : t.entry.profileTitle}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isEntryGate ? t.entry.gateSubtitle : t.entry.profileSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="entry-first-name"
                  className="block text-xs font-bold text-slate-800 mb-1.5"
                >
                  {t.entry.firstNameLabel}
                </label>
                <input
                  id="entry-first-name"
                  type="text"
                  maxLength={24}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t.entry.firstNamePlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="entry-last-name"
                  className="block text-xs font-bold text-slate-800 mb-1.5"
                >
                  {t.entry.lastNameLabel}
                </label>
                <input
                  id="entry-last-name"
                  type="text"
                  maxLength={24}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t.entry.lastNamePlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Gender Selector: Male / Female */}
            <div>
              <span className="block text-xs font-bold text-slate-800 mb-2">
                {t.entry.genderLabel}
              </span>
              <div
                className="grid grid-cols-2 gap-3"
                role="radiogroup"
                aria-label={t.entry.genderLabel}
              >
                {(
                  [
                    { id: 'male', label: t.entry.male },
                    { id: 'female', label: t.entry.female },
                  ] as const
                ).map((opt) => {
                  const selected = gender === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setGender(opt.id)}
                      className={`min-h-[46px] px-4 py-2.5 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        selected
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>{opt.label}</span>
                      {selected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {!isEntryGate && (
              <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={applyToCurrentLogo}
                  onChange={(e) => setApplyToCurrentLogo(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <span>{t.entry.applyToLogoLabel}</span>
              </label>
            )}

            {error && (
              <p
                role="alert"
                className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3.5 py-2.5"
              >
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEntryGate ? t.entry.saveAndEnter : t.entry.saveChanges}</span>
              </button>

              {onEnterSaved && (
                <button
                  type="button"
                  onClick={handleOpenSavedDirect}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <FolderOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{t.entry.enterSaved}</span>
                  {savedCount > 0 && (
                    <span className="font-mono-code tabular-nums text-xs text-slate-600">
                      ({savedCount})
                    </span>
                  )}
                </button>
              )}

              {!isEntryGate && onResetProfile && (
                <button
                  type="button"
                  onClick={onResetProfile}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.entry.resetData}</span>
                </button>
              )}
            </div>
          </form>

          {initialProfile?.updatedAt && !isEntryGate && (
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>{t.entry.saveStatus}</span>
              <span>
                {t.entry.lastUpdated}:{' '}
                {new Date(initialProfile.updatedAt).toLocaleDateString(dateLocale, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>

        {/* Real-time Personalized Logo Preview Column */}
        <div
          className={`bg-slate-50 border-t lg:border-t-0 ${
            language === 'ar' ? 'lg:border-r' : 'lg:border-l'
          } border-slate-200 p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-6`}
        >
          <div className="text-xs font-semibold text-slate-500">
            {t.entry.livePreviewLabel}
          </div>

          <div className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-sm">
            <LogoSvg config={previewConfig} />
          </div>

          <div className="space-y-1">
            <div className="text-base font-bold text-slate-900">
              {firstName.trim() || t.entry.defaultFirst}{' '}
              {lastName.trim() || t.entry.defaultLast}
            </div>
            <div className="text-xs text-slate-500 flex items-center justify-center gap-2">
              <span>{gender === 'male' ? t.entry.male : t.entry.female}</span>
              <span aria-hidden="true">·</span>
              <span>{t.entry.readyToCustomize}</span>
            </div>
          </div>

          {onEnterSaved && savedPreviewItems.length > 0 && (
            <button
              type="button"
              onClick={handleOpenSavedDirect}
              className="w-full max-w-xs p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-600 transition-colors flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-1.5 shrink-0">
                {savedPreviewItems.slice(0, 3).map((item) => (
                  <span key={item.id} className="w-8 h-8 shrink-0">
                    <LogoSvg config={item.config} />
                  </span>
                ))}
              </div>
              <span className="text-xs font-bold text-blue-600 whitespace-nowrap truncate">
                {t.entry.enterSaved} ({savedCount})
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
