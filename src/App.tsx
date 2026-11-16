import React, { useEffect, useRef, useState } from 'react';
import {
  BookmarkPlus,
  Check,
  CircleDashed,
  Copy,
  Download,
  FolderOpen,
  Redo2,
  Shuffle,
  Undo2,
  UserCheck,
} from 'lucide-react';
import { AppBackgroundLayer } from './components/AppBackgroundLayer';
import { BackdropSwitcher } from './components/BackdropSwitcher';
import { CustomBuilderView } from './components/CustomBuilderView';
import { buildPersonalizedLogo, EntryProfileView } from './components/EntryProfileView';
import { ExportModal } from './components/ExportModal';
import { InspectorPanel } from './components/InspectorPanel';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LivePreviewPanel } from './components/LivePreviewPanel';
import { LogoSvg } from './components/LogoSvg';
import { PlatformShowcase } from './components/PlatformShowcase';
import { SavedLibrary } from './components/SavedLibrary';
import { SettingsView } from './components/SettingsView';
import { TemplatesGallery } from './components/TemplatesGallery';
import { TopBar } from './components/TopBar';
import { ARTWORKS } from './data/artworks';
import { EMBLEMS } from './data/emblems';
import { COLOR_PALETTES, DEFAULT_LOGO, TEMPLATES } from './data/presets';
import { TRANSLATIONS } from './i18n/translations';
import {
  AppBackdrop,
  AppLanguage,
  AppSettings,
  AppView,
  BgMode,
  BgPattern,
  LogoConfig,
  MaskShape,
  SavedLogo,
  StageBg,
  UserProfile,
} from './types/logo';
import { copySvgToClipboard, downloadPng, downloadSvg } from './utils/exportLogo';

const SAVED_LOGOS_KEY = 'shaar_studio_saved_logos_v1';
const PROFILE_STORAGE_KEY = 'shaar_studio_user_profile_v1';
const ACTIVE_LOGO_KEY = 'shaar_studio_active_logo_v1';
const LANGUAGE_KEY = 'shaar_studio_lang_v1';
const BACKDROP_KEY = 'shaar_studio_backdrop_v1';
const SETTINGS_KEY = 'shaar_studio_settings_v1';

const DEFAULT_SETTINGS: AppSettings = {
  defaultExportSize: 1024,
  defaultStageBg: 'checker',
  defaultShowSafeZone: false,
  autoPersonalizeTemplates: true,
  defaultArtworkFit: 'cover',
  autoApplyArtworkPalette: true,
};

function loadStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppSettings>;
      return {
        defaultExportSize:
          parsed.defaultExportSize === 512 ||
          parsed.defaultExportSize === 1024 ||
          parsed.defaultExportSize === 2048
            ? parsed.defaultExportSize
            : DEFAULT_SETTINGS.defaultExportSize,
        defaultStageBg:
          parsed.defaultStageBg === 'checker' ||
          parsed.defaultStageBg === 'light' ||
          parsed.defaultStageBg === 'dark'
            ? parsed.defaultStageBg
            : DEFAULT_SETTINGS.defaultStageBg,
        defaultShowSafeZone:
          typeof parsed.defaultShowSafeZone === 'boolean'
            ? parsed.defaultShowSafeZone
            : DEFAULT_SETTINGS.defaultShowSafeZone,
        autoPersonalizeTemplates:
          typeof parsed.autoPersonalizeTemplates === 'boolean'
            ? parsed.autoPersonalizeTemplates
            : DEFAULT_SETTINGS.autoPersonalizeTemplates,
        defaultArtworkFit:
          parsed.defaultArtworkFit === 'cover' || parsed.defaultArtworkFit === 'badge'
            ? parsed.defaultArtworkFit
            : DEFAULT_SETTINGS.defaultArtworkFit,
        autoApplyArtworkPalette:
          typeof parsed.autoApplyArtworkPalette === 'boolean'
            ? parsed.autoApplyArtworkPalette
            : DEFAULT_SETTINGS.autoApplyArtworkPalette,
      };
    }
  } catch {
    // Fallback
  }
  return DEFAULT_SETTINGS;
}

function loadStoredLanguage(): AppLanguage {
  try {
    const raw = localStorage.getItem(LANGUAGE_KEY);
    if (raw === 'ar' || raw === 'en' || raw === 'fr' || raw === 'es') {
      return raw;
    }
  } catch {
    // Fallback
  }
  return 'ar';
}

function loadStoredBackdrop(): AppBackdrop {
  try {
    const raw = localStorage.getItem(BACKDROP_KEY);
    if (raw === 'studio' || raw === 'grid' || raw === 'mesh' || raw === 'plain') {
      return raw;
    }
  } catch {
    // Fallback
  }
  return 'studio';
}

function loadStoredProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProfile;
    if (parsed && parsed.firstName && parsed.lastName && parsed.gender) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function loadInitialLogo(profile: UserProfile | null): LogoConfig {
  try {
    const raw = localStorage.getItem(ACTIVE_LOGO_KEY);
    if (raw) {
      return { ...DEFAULT_LOGO, ...(JSON.parse(raw) as Partial<LogoConfig>) };
    }
  } catch {
    // Fallback below
  }
  return profile ? buildPersonalizedLogo(profile) : DEFAULT_LOGO;
}

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadStoredSettings());
  const [language, setLanguage] = useState<AppLanguage>(() => loadStoredLanguage());
  const [backdrop, setBackdrop] = useState<AppBackdrop>(() => loadStoredBackdrop());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => loadStoredProfile());
  const [activeView, setActiveView] = useState<AppView>('studio');
  const [config, setConfig] = useState<LogoConfig>(() => loadInitialLogo(loadStoredProfile()));
  const [history, setHistory] = useState<LogoConfig[]>(() => [config]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const [stageBg, setStageBg] = useState<StageBg>(() => loadStoredSettings().defaultStageBg);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(
    () => loadStoredSettings().defaultShowSafeZone
  );
  const [exportOpen, setExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [savedLogos, setSavedLogos] = useState<SavedLogo[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_LOGOS_KEY);
      return raw ? (JSON.parse(raw) as SavedLogo[]) : [];
    } catch {
      return [];
    }
  });

  const t = TRANSLATIONS[language];

  const fullExportSvgRef = useRef<SVGSVGElement | null>(null);
  const rasterNoTextSvgRef = useRef<SVGSVGElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.title = t.pageTitle;
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // Ignore storage errors
    }
  }, [language, t.pageTitle]);

  useEffect(() => {
    try {
      localStorage.setItem(BACKDROP_KEY, backdrop);
    } catch {
      // Ignore storage errors
    }
  }, [backdrop]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_LOGOS_KEY, JSON.stringify(savedLogos));
    } catch {
      // Ignore storage quota issues
    }
  }, [savedLogos]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_LOGO_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage quota issues
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota issues
    }
  }, [settings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const applyConfig = (next: LogoConfig, pushHistory = true) => {
    setConfig(next);
    if (pushHistory) {
      setHistory((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        const updated = [...sliced, next].slice(-30);
        setHistoryIndex(updated.length - 1);
        return updated;
      });
    }
  };

  const handlePatchConfig = (patch: Partial<LogoConfig>) => {
    applyConfig({ ...config, ...patch }, true);
  };

  const handleSaveProfile = (
    profile: UserProfile,
    applyToLogo: boolean,
    nextView: AppView = 'studio'
  ) => {
    setUserProfile(profile);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota issues
    }

    if (applyToLogo) {
      const personalized = buildPersonalizedLogo(profile, config);
      applyConfig(personalized, true);
    }

    setActiveView(nextView);
    showToast(t.toasts.profileSaved(`${profile.firstName} ${profile.lastName}`));
  };

  const handleEnterSaved = (draftProfile?: UserProfile) => {
    if (draftProfile) {
      handleSaveProfile(draftProfile, false, 'saved');
      return;
    }
    setActiveView('saved');
  };

  const handleResetProfile = () => {
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      localStorage.removeItem(ACTIVE_LOGO_KEY);
    } catch {
      // Ignore
    }
    setUserProfile(null);
    setConfig(DEFAULT_LOGO);
    setHistory([DEFAULT_LOGO]);
    setHistoryIndex(0);
    setActiveView('studio');
  };

  const handleUpdateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    if (patch.defaultStageBg) {
      setStageBg(patch.defaultStageBg);
    }
    if (typeof patch.defaultShowSafeZone === 'boolean') {
      setShowSafeZone(patch.defaultShowSafeZone);
    }
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setStageBg(DEFAULT_SETTINGS.defaultStageBg);
    setShowSafeZone(DEFAULT_SETTINGS.defaultShowSafeZone);
    showToast(t.toasts.settingsReset);
  };

  const handleClearSaved = () => {
    setSavedLogos([]);
    showToast(t.toasts.savedCleared);
  };

  const handleExportBackup = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      profile: userProfile,
      activeLogo: config,
      savedLogos,
      settings,
      language,
      backdrop,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `panda-latscom-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(t.toasts.backupExported);
  };

  const handleImportBackup = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text) as {
        version?: number;
        profile?: UserProfile | null;
        activeLogo?: Partial<LogoConfig>;
        savedLogos?: SavedLogo[];
        settings?: Partial<AppSettings>;
        language?: AppLanguage;
        backdrop?: AppBackdrop;
      };

      if (!data || typeof data !== 'object' || !data.activeLogo) {
        showToast(t.toasts.backupInvalid);
        return;
      }

      if (data.profile && data.profile.firstName && data.profile.lastName && data.profile.gender) {
        setUserProfile(data.profile);
        try {
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data.profile));
        } catch {
          // Ignore
        }
      }

      const restoredLogo: LogoConfig = { ...DEFAULT_LOGO, ...data.activeLogo };
      applyConfig(restoredLogo, true);

      if (Array.isArray(data.savedLogos)) {
        const validSaved = data.savedLogos
          .filter((item) => item && item.id && item.config)
          .map((item) => ({
            ...item,
            config: { ...DEFAULT_LOGO, ...item.config },
          }));
        setSavedLogos(validSaved);
      }

      if (data.settings && typeof data.settings === 'object') {
        const mergedSettings: AppSettings = { ...DEFAULT_SETTINGS, ...data.settings };
        setSettings(mergedSettings);
        setStageBg(mergedSettings.defaultStageBg);
        setShowSafeZone(mergedSettings.defaultShowSafeZone);
      }

      if (
        data.language === 'ar' ||
        data.language === 'en' ||
        data.language === 'fr' ||
        data.language === 'es'
      ) {
        setLanguage(data.language);
      }

      if (
        data.backdrop === 'studio' ||
        data.backdrop === 'grid' ||
        data.backdrop === 'mesh' ||
        data.backdrop === 'plain'
      ) {
        setBackdrop(data.backdrop);
      }

      showToast(t.toasts.backupImported);
    } catch {
      showToast(t.toasts.backupInvalid);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setConfig(history[nextIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setConfig(history[nextIdx]);
    }
  };

  const handleSmartRandomize = () => {
    const shapes: MaskShape[] = ['circle', 'squircle', 'hexagon'];
    const useArtwork = Math.random() < 0.7;

    if (useArtwork) {
      const art = ARTWORKS[Math.floor(Math.random() * ARTWORKS.length)];
      applyConfig({
        ...config,
        artworkId: art.id,
        customImage: undefined,
        customPaths: undefined,
        artworkFit: settings.defaultArtworkFit,
        artworkOpacity: 1,
        bgColor1: art.bg1,
        bgColor2: art.bg2,
        fgColor: '#FFFFFF',
        accentColor: art.accent,
        maskShape: shapes[Math.floor(Math.random() * shapes.length)],
        ringStyle: 'accent',
      });
      return;
    }

    const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    const emblem = EMBLEMS[Math.floor(Math.random() * EMBLEMS.length)];
    const patterns: BgPattern[] = ['none', 'dots', 'grid', 'rings', 'diagonal'];
    const modes: BgMode[] = ['solid', 'linear', 'radial'];

    applyConfig({
      ...config,
      artworkId: undefined,
      customImage: undefined,
      customPaths: undefined,
      emblemId: emblem.id,
      bgColor1: palette.bg1,
      bgColor2: palette.bg2,
      fgColor: palette.fg,
      accentColor: palette.accent,
      maskShape: shapes[Math.floor(Math.random() * shapes.length)],
      bgPattern: patterns[Math.floor(Math.random() * patterns.length)],
      bgMode: modes[Math.floor(Math.random() * modes.length)],
      gradientAngle: Math.floor(Math.random() * 8) * 45,
    });
  };

  const handleSaveCurrent = () => {
    const entry: SavedLogo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: new Date().toISOString(),
      config: { ...config },
    };
    setSavedLogos((prev) => [entry, ...prev]);
    showToast(t.toasts.logoSaved);
  };

  const handleExportPng = async (size: 512 | 1024 | 2048 = 1024) => {
    if (!rasterNoTextSvgRef.current) return;
    await downloadPng(rasterNoTextSvgRef.current, config, size);
    showToast(t.toasts.pngDownloaded(size));
  };

  const handleExportSvg = async () => {
    if (!fullExportSvgRef.current) return;
    await downloadSvg(fullExportSvgRef.current, config);
    showToast(t.toasts.svgDownloaded);
  };

  const handleCopySvg = async (): Promise<boolean> => {
    if (!fullExportSvgRef.current) return false;
    const ok = await copySvgToClipboard(fullExportSvgRef.current);
    if (ok) showToast(t.toasts.svgCopied);
    return ok;
  };

  const handleSelectTemplate = (tplConfig: LogoConfig) => {
    applyConfig(
      {
        ...tplConfig,
        title:
          settings.autoPersonalizeTemplates && userProfile?.firstName
            ? userProfile.firstName
            : tplConfig.title,
        subtitle:
          settings.autoPersonalizeTemplates && userProfile?.lastName
            ? userProfile.lastName.toUpperCase()
            : tplConfig.subtitle,
      },
      true
    );
    setActiveView('studio');
    showToast(t.toasts.templateLoaded);
  };

  // Entry Gate: Ask for First Name, Last Name, Gender (Male/Female) and save
  if (!userProfile) {
    return (
      <div className="relative min-h-screen">
        <AppBackgroundLayer backdrop={backdrop} />
        <EntryProfileView
          initialProfile={null}
          isEntryGate
          onSaveProfile={handleSaveProfile}
          savedCount={savedLogos.length}
          savedPreviewItems={savedLogos.slice(0, 3)}
          onEnterSaved={handleEnterSaved}
          language={language}
          onChangeLanguage={setLanguage}
          backdrop={backdrop}
          onChangeBackdrop={setBackdrop}
          t={t}
        />
      </div>
    );
  }

  const stageClass =
    stageBg === 'checker'
      ? 'stage-checkerboard'
      : stageBg === 'light'
        ? 'bg-white'
        : 'bg-[#0B1120]';

  const genderLabel = userProfile.gender === 'male' ? t.entry.male : t.entry.female;

  return (
    <div className="relative min-h-screen flex flex-col text-slate-900">
      <AppBackgroundLayer backdrop={backdrop} />
      <div className="relative z-10 min-h-screen flex flex-col">
        <TopBar
          activeView={activeView}
          onSelectView={setActiveView}
          savedCount={savedLogos.length}
          onOpenExport={() => setExportOpen(true)}
          t={t}
        />

        <main className="flex-1">
          {activeView === 'studio' && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-5 space-y-5">
              {/* Personalized Welcome + Quick-Start Preset Strip + Language & Backdrop Switchers */}
              <section
                aria-label={t.studio.quickStart}
                className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-4 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-4"
              >
                <div className="flex flex-wrap items-center justify-between xl:justify-start gap-2.5 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveView('profile')}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        {t.studio.welcomePrefix} {userProfile.firstName} {userProfile.lastName}
                      </span>
                    </button>
                    <span className="text-slate-300" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{genderLabel}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveView('saved')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{t.entry.enterSaved}</span>
                      {savedLogos.length > 0 && (
                        <span className="font-mono-code tabular-nums text-[11px] text-slate-500">
                          ({savedLogos.length})
                        </span>
                      )}
                    </button>
                    <BackdropSwitcher backdrop={backdrop} onChange={setBackdrop} t={t} />
                    <LanguageSwitcher language={language} onChange={setLanguage} />
                  </div>
                </div>

              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 xl:pb-0">
                {TEMPLATES.slice(0, 7).map((tpl) => {
                  const localizedTitle = t.templateText[tpl.id]?.title ?? tpl.titleAr;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tpl.config)}
                      className="group flex items-center gap-2 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-600 transition-colors shrink-0 cursor-pointer"
                    >
                      <span className="w-8 h-8 shrink-0">
                        <LogoSvg config={tpl.config} />
                      </span>
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 whitespace-nowrap">
                        {localizedTitle}
                      </span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setActiveView('templates')}
                  className="px-3 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {t.studio.viewAll} ({TEMPLATES.length})
                </button>
              </div>
            </section>

            {/* 3-Column Studio Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[330px_minmax(0,1fr)_300px] gap-5 items-start">
              <InspectorPanel
                config={config}
                onChange={handlePatchConfig}
                defaultArtworkFit={settings.defaultArtworkFit}
                autoApplyArtworkPalette={settings.autoApplyArtworkPalette}
                onNotify={showToast}
                t={t}
              />

              <section className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleUndo}
                      disabled={historyIndex === 0}
                      title={t.studio.undo}
                      aria-label={t.studio.undo}
                      className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Undo2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      title={t.studio.redo}
                      aria-label={t.studio.redo}
                      className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Redo2 className="w-4 h-4" />
                    </button>

                    <span className="h-5 w-px bg-slate-200 mx-1" aria-hidden="true" />

                    <button
                      type="button"
                      onClick={() => setShowSafeZone((v) => !v)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        showSafeZone
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CircleDashed className="w-3.5 h-3.5" />
                      <span>{t.studio.circularGuide}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center bg-slate-200/70 p-0.5 rounded-lg"
                      role="group"
                      aria-label={t.studio.backdropLabel}
                    >
                      {(
                        [
                          { id: 'checker', label: t.studio.backdropChecker },
                          { id: 'light', label: t.studio.backdropLight },
                          { id: 'dark', label: t.studio.backdropDark },
                        ] as { id: StageBg; label: string }[]
                      ).map((bg) => (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => setStageBg(bg.id)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                            stageBg === bg.id
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {bg.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleSmartRandomize}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>{t.studio.smartRandomize}</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`relative min-h-[380px] sm:min-h-[450px] flex flex-col items-center justify-center p-8 sm:p-12 transition-colors duration-150 ${stageClass}`}
                >
                  <div className="w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] drop-shadow-sm transition-transform duration-150">
                    <LogoSvg config={config} showSafeZone={showSafeZone} />
                  </div>

                  <div
                    className={`mt-5 text-xs font-mono-code tabular-nums flex items-center gap-2 ${
                      stageBg === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}
                    dir="ltr"
                  >
                    <span>512 × 512 SVG</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.inspector.shapes[config.maskShape]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{config.fontFamily}</span>
                  </div>
                </div>

                <div className="px-4 py-3.5 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveCurrent}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                      <span>{t.studio.saveToLibrary}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopySvg}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.studio.copySvg}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleExportPng(settings.defaultExportSize)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.studio.downloadPng}</span>
                    <span className="font-mono-code tabular-nums text-[11px] opacity-80" dir="ltr">
                      {settings.defaultExportSize}px
                    </span>
                  </button>
                </div>
              </section>

              <div className="lg:col-span-2 xl:col-span-1">
                <LivePreviewPanel
                  config={config}
                  userProfile={userProfile}
                  onOpenPlatforms={() => setActiveView('platforms')}
                  t={t}
                />
              </div>
            </div>
          </div>
        )}

        {activeView === 'builder' && (
          <CustomBuilderView
            currentStudioConfig={config}
            userProfile={userProfile}
            defaultExportSize={settings.defaultExportSize}
            defaultStageBg={settings.defaultStageBg}
            language={language}
            onApplyToStudio={(customCfg) => {
              applyConfig(customCfg, true);
              setActiveView('studio');
              showToast(t.toasts.builderApplied);
            }}
            onSaveToLibrary={(customCfg) => {
              const entry: SavedLogo = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                savedAt: new Date().toISOString(),
                config: { ...customCfg },
              };
              setSavedLogos((prev) => [entry, ...prev]);
              showToast(t.toasts.logoSaved);
            }}
            onNotify={showToast}
            t={t}
          />
        )}

        {activeView === 'templates' && (
          <TemplatesGallery
            onSelectTemplate={handleSelectTemplate}
            language={language}
            t={t}
          />
        )}

        {activeView === 'platforms' && (
          <PlatformShowcase
            config={config}
            userProfile={userProfile}
            onQuickExport={handleExportPng}
            onBackToStudio={() => setActiveView('studio')}
            t={t}
          />
        )}

        {activeView === 'saved' && (
          <SavedLibrary
            items={savedLogos}
            onLoad={(c) => {
              applyConfig(c, true);
              setActiveView('studio');
              showToast(t.toasts.logoLoaded);
            }}
            onDuplicate={(item) => {
              const copy: SavedLogo = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                savedAt: new Date().toISOString(),
                config: { ...item.config },
              };
              setSavedLogos((prev) => [copy, ...prev]);
              showToast(t.toasts.logoDuplicated);
            }}
            onDelete={(id) => {
              setSavedLogos((prev) => prev.filter((item) => item.id !== id));
              showToast(t.toasts.logoDeleted);
            }}
            onGoToStudio={() => setActiveView('studio')}
            language={language}
            t={t}
          />
        )}

        {activeView === 'profile' && (
          <EntryProfileView
            initialProfile={userProfile}
            isEntryGate={false}
            onSaveProfile={handleSaveProfile}
            onResetProfile={handleResetProfile}
            savedCount={savedLogos.length}
            savedPreviewItems={savedLogos.slice(0, 3)}
            onEnterSaved={() => setActiveView('saved')}
            language={language}
            onChangeLanguage={setLanguage}
            backdrop={backdrop}
            onChangeBackdrop={setBackdrop}
            t={t}
          />
        )}

        {activeView === 'settings' && (
          <SettingsView
            language={language}
            onChangeLanguage={setLanguage}
            backdrop={backdrop}
            onChangeBackdrop={setBackdrop}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetSettings={handleResetSettings}
            userProfile={userProfile}
            onOpenProfile={() => setActiveView('profile')}
            savedCount={savedLogos.length}
            onExportBackup={handleExportBackup}
            onImportBackup={handleImportBackup}
            onClearSaved={handleClearSaved}
            onBackToStudio={() => setActiveView('studio')}
            t={t}
          />
        )}
      </main>

      <div className="sr-only" aria-hidden="true">
        <LogoSvg config={config} svgRef={fullExportSvgRef} />
        <LogoSvg config={config} hideTextForRaster svgRef={rasterNoTextSvgRef} />
      </div>

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        config={config}
        defaultSize={settings.defaultExportSize}
        onExportPng={handleExportPng}
        onExportSvg={handleExportSvg}
        onCopySvg={handleCopySvg}
        t={t}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-lg"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
      </div>
    </div>
  );
}
