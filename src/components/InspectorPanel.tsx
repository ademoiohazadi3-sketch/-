import React, { useEffect, useRef, useState } from 'react';
import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import { EMBLEMS } from '../data/emblems';
import { COLOR_PALETTES } from '../data/presets';
import { Translations } from '../i18n/translations';
import {
  ArtworkCategory,
  ArtworkFit,
  BgMode,
  BgPattern,
  EmblemCategory,
  GlowMode,
  InspectorTab,
  LogoConfig,
  LogoFont,
  LogoLayout,
  MaskShape,
  RingStyle,
  ShadowMode,
} from '../types/logo';
import { processUploadedImage } from '../utils/imageUpload';

interface InspectorPanelProps {
  config: LogoConfig;
  onChange: (patch: Partial<LogoConfig>) => void;
  defaultArtworkFit?: ArtworkFit;
  autoApplyArtworkPalette?: boolean;
  onNotify?: (message: string) => void;
  t: Translations;
}

const FONT_SAMPLES: { id: LogoFont; sample: string }[] = [
  { id: 'Cairo', sample: 'أُفق' },
  { id: 'Readex Pro', sample: 'صَدى' },
  { id: 'Playfair Display', sample: 'A' },
  { id: 'Oswald', sample: 'APEX' },
  { id: 'JetBrains Mono', sample: 'DEV' },
];

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  config,
  onChange,
  defaultArtworkFit = 'cover',
  autoApplyArtworkPalette = true,
  onNotify,
  t,
}) => {
  const [activeTab, setActiveTab] = useState<InspectorTab>('identity');
  const [graphicSource, setGraphicSource] = useState<'artworks' | 'vectors'>(() =>
    config.artworkId || config.customImage ? 'artworks' : 'vectors'
  );
  const [artworkCat, setArtworkCat] = useState<ArtworkCategory>('all');
  const [emblemCat, setEmblemCat] = useState<EmblemCategory>('all');
  const [dragOverPhoto, setDragOverPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (config.artworkId || config.customImage) {
      setGraphicSource('artworks');
    }
  }, [config.artworkId, config.customImage]);

  const handlePhotoFile = async (file: File) => {
    try {
      const dataUrl = await processUploadedImage(file);
      onChange({
        customImage: dataUrl,
        artworkId: undefined,
        customPaths: undefined,
        artworkFit: config.artworkFit ?? defaultArtworkFit,
        artworkOpacity: config.artworkOpacity ?? 1,
      });
      setGraphicSource('artworks');
      onNotify?.(t.toasts.photoAdded);
    } catch {
      onNotify?.(t.toasts.photoInvalid);
    }
  };

  const handlePhotoInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handlePhotoFile(file);
    e.target.value = '';
  };

  const tabs: { id: InspectorTab; label: string }[] = [
    { id: 'identity', label: t.inspector.tabs.identity },
    { id: 'frame', label: t.inspector.tabs.frame },
    { id: 'colors', label: t.inspector.tabs.colors },
    { id: 'typography', label: t.inspector.tabs.typography },
    { id: 'effects', label: t.inspector.tabs.effects },
  ];

  const artworkCategories: { id: ArtworkCategory; label: string }[] = [
    { id: 'all', label: t.inspector.artworkCats.all },
    { id: 'characters', label: t.inspector.artworkCats.characters },
    { id: 'anime', label: t.inspector.artworkCats.anime },
    { id: 'cartoon', label: t.inspector.artworkCats.cartoon },
    { id: 'celebrities', label: t.inspector.artworkCats.celebrities },
    { id: 'sports', label: t.inspector.artworkCats.sports },
  ];

  const emblemCategories: { id: EmblemCategory; label: string }[] = [
    { id: 'all', label: t.inspector.emblemCats.all },
    { id: 'anime', label: t.inspector.emblemCats.anime },
    { id: 'cartoon', label: t.inspector.emblemCats.cartoon },
    { id: 'celebrities', label: t.inspector.emblemCats.celebrities },
    { id: 'sports', label: t.inspector.emblemCats.sports },
    { id: 'geometric', label: t.inspector.emblemCats.geometric },
    { id: 'tech', label: t.inspector.emblemCats.tech },
    { id: 'creative', label: t.inspector.emblemCats.creative },
    { id: 'gaming', label: t.inspector.emblemCats.gaming },
    { id: 'luxury', label: t.inspector.emblemCats.luxury },
  ];

  const layouts: { id: LogoLayout; label: string }[] = [
    { id: 'emblem-above', label: t.inspector.layouts['emblem-above'] },
    { id: 'emblem-only', label: t.inspector.layouts['emblem-only'] },
    { id: 'text-only', label: t.inspector.layouts['text-only'] },
    { id: 'emblem-backdrop', label: t.inspector.layouts['emblem-backdrop'] },
    { id: 'monogram-frame', label: t.inspector.layouts['monogram-frame'] },
  ];

  const shapes: { id: MaskShape; label: string }[] = [
    { id: 'circle', label: t.inspector.shapes.circle },
    { id: 'squircle', label: t.inspector.shapes.squircle },
    { id: 'hexagon', label: t.inspector.shapes.hexagon },
    { id: 'square', label: t.inspector.shapes.square },
  ];

  const ringStyles: { id: RingStyle; label: string }[] = [
    { id: 'none', label: t.inspector.ringStyles.none },
    { id: 'solid', label: t.inspector.ringStyles.solid },
    { id: 'accent', label: t.inspector.ringStyles.accent },
    { id: 'double', label: t.inspector.ringStyles.double },
    { id: 'dashed', label: t.inspector.ringStyles.dashed },
  ];

  const patterns: { id: BgPattern; label: string }[] = [
    { id: 'none', label: t.inspector.patterns.none },
    { id: 'dots', label: t.inspector.patterns.dots },
    { id: 'grid', label: t.inspector.patterns.grid },
    { id: 'rings', label: t.inspector.patterns.rings },
    { id: 'diagonal', label: t.inspector.patterns.diagonal },
  ];

  const filteredArtworks =
    artworkCat === 'all' ? ARTWORKS : ARTWORKS.filter((a) => a.category === artworkCat);

  const filteredEmblems =
    emblemCat === 'all' ? EMBLEMS : EMBLEMS.filter((e) => e.category === emblemCat);

  return (
    <aside className="bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden">
      {/* Tab Switcher */}
      <div className="p-2 border-b border-slate-200 bg-slate-50/70">
        <div className="grid grid-cols-5 gap-1 bg-slate-200/70 p-1 rounded-lg">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-1.5 px-1.5 text-[11px] font-semibold rounded-md transition-all duration-150 whitespace-nowrap truncate cursor-pointer ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Body */}
      <div className="p-5 space-y-6 overflow-y-auto max-h-[calc(100vh-190px)]">
        {activeTab === 'identity' && (
          <>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="logo-title-input"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {t.inspector.titleLabel}
                </label>
                <input
                  id="logo-title-input"
                  type="text"
                  maxLength={14}
                  value={config.title}
                  onChange={(e) => onChange({ title: e.target.value })}
                  placeholder={t.inspector.titlePlaceholder}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="logo-subtitle-input"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {t.inspector.subtitleLabel}
                </label>
                <input
                  id="logo-subtitle-input"
                  type="text"
                  maxLength={18}
                  value={config.subtitle}
                  onChange={(e) => onChange({ subtitle: e.target.value })}
                  placeholder={t.inspector.subtitlePlaceholder}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                {t.inspector.layoutLabel}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {layouts.map((l) => {
                  const active = config.layout === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => onChange({ layout: l.id })}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap truncate cursor-pointer ${
                        active
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {config.layout !== 'text-only' && (
              <div className="border-t border-slate-100 pt-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-700 truncate">
                    {t.inspector.emblemLibrary}
                  </span>
                  {graphicSource === 'vectors' && (
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md shrink-0">
                      <button
                        type="button"
                        onClick={() => onChange({ emblemStyle: 'filled' })}
                        className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                          config.emblemStyle === 'filled'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600'
                        }`}
                      >
                        {t.inspector.filled}
                      </button>
                      <button
                        type="button"
                        onClick={() => onChange({ emblemStyle: 'outline' })}
                        className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                          config.emblemStyle === 'outline'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600'
                        }`}
                      >
                        {t.inspector.outline}
                      </button>
                    </div>
                  )}
                </div>

                {/* Upload Custom Photo Card */}
                <div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoInputChange}
                    className="hidden"
                  />

                  {config.customImage ? (
                    <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-lg border border-blue-200 bg-blue-50/70">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={config.customImage}
                          alt={t.inspector.customPhotoActive}
                          className="w-10 h-10 rounded-lg object-cover border border-blue-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {t.inspector.customPhotoActive}
                          </div>
                          <div className="text-[11px] text-slate-500">{t.inspector.uploadPhotoHint}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => photoInputRef.current?.click()}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{t.inspector.changePhotoBtn}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onChange({ customImage: undefined })}
                          title={t.inspector.noArtworkLabel}
                          aria-label={t.inspector.noArtworkLabel}
                          className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverPhoto(true);
                      }}
                      onDragLeave={() => setDragOverPhoto(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverPhoto(false);
                        const dropped = e.dataTransfer.files?.[0];
                        if (dropped) {
                          void handlePhotoFile(dropped);
                        }
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-dashed transition-colors cursor-pointer ${
                        dragOverPhoto
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-300 bg-slate-50/70 hover:border-blue-600 hover:bg-blue-50/40 text-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <ImagePlus className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-bold truncate">
                          {t.inspector.uploadPhotoBtn}
                        </span>
                      </span>
                      <span className="text-[11px] text-slate-500 shrink-0">
                        {t.inspector.uploadPhotoHint}
                      </span>
                    </button>
                  )}
                </div>

                {/* Source Switch: Illustrated Artworks vs Vector Emblems */}
                <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setGraphicSource('artworks')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
                      graphicSource === 'artworks'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.inspector.graphicArtworks}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGraphicSource('vectors')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
                      graphicSource === 'vectors'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.inspector.graphicVectors}
                  </button>
                </div>

                {graphicSource === 'artworks' ? (
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-1 overflow-x-auto pb-1">
                      {artworkCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setArtworkCat(cat.id)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                            artworkCat === cat.id
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {filteredArtworks.map((art) => {
                        const selected = !config.customImage && config.artworkId === art.id;
                        const artName = t.artworkNames[art.id] ?? art.id;
                        return (
                          <button
                            key={art.id}
                            type="button"
                            title={artName}
                            aria-label={artName}
                            onClick={() =>
                              onChange({
                                artworkId: art.id,
                                customImage: undefined,
                                customPaths: undefined,
                                artworkFit: config.artworkFit ?? defaultArtworkFit,
                                artworkOpacity: config.artworkOpacity ?? 1,
                                ...(autoApplyArtworkPalette
                                  ? {
                                      bgColor1: art.bg1,
                                      bgColor2: art.bg2,
                                      accentColor: art.accent,
                                    }
                                  : {}),
                              })
                            }
                            className={`group relative aspect-square rounded-lg border overflow-hidden transition-all cursor-pointer bg-slate-900 ${
                              selected
                                ? 'border-blue-600 ring-2 ring-blue-600/40'
                                : 'border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            <img
                              src={art.src}
                              alt={artName}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <span className="sr-only">{artName}</span>
                          </button>
                        );
                      })}
                    </div>

                    {(config.artworkId || config.customImage) && (
                      <div className="space-y-3 pt-1 border-t border-slate-100">
                        <div className="flex items-center justify-between gap-2 pt-2">
                          <span className="text-xs font-semibold text-slate-700">
                            {t.inspector.artworkFitLabel}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onChange({ artworkId: undefined, customImage: undefined });
                              setGraphicSource('vectors');
                            }}
                            className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                          >
                            {t.inspector.noArtworkLabel}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                          {(
                            [
                              { id: 'cover', label: t.inspector.artworkFitCover },
                              { id: 'badge', label: t.inspector.artworkFitBadge },
                            ] as { id: ArtworkFit; label: string }[]
                          ).map((fitOpt) => {
                            const active = (config.artworkFit ?? 'cover') === fitOpt.id;
                            return (
                              <button
                                key={fitOpt.id}
                                type="button"
                                onClick={() => onChange({ artworkFit: fitOpt.id })}
                                className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                                  active
                                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                {fitOpt.label}
                              </button>
                            );
                          })}
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">{t.inspector.artworkOpacity}</span>
                            <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                              {Math.round((config.artworkOpacity ?? 1) * 100)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0.35}
                            max={1}
                            step={0.05}
                            value={config.artworkOpacity ?? 1}
                            onChange={(e) =>
                              onChange({ artworkOpacity: parseFloat(e.target.value) })
                            }
                            className="w-full"
                          />
                        </div>

                        {(config.artworkFit ?? 'cover') === 'badge' && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-600">{t.inspector.emblemSize}</span>
                              <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                                {Math.round(config.emblemScale * 100)}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min={0.45}
                              max={1.25}
                              step={0.01}
                              value={config.emblemScale}
                              onChange={(e) =>
                                onChange({ emblemScale: parseFloat(e.target.value) })
                              }
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1 overflow-x-auto pb-1">
                      {emblemCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setEmblemCat(cat.id)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                            emblemCat === cat.id
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {config.customPaths && config.customPaths.length > 0 && (
                      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/70">
                        <span className="text-xs font-semibold text-blue-800 truncate">
                          {t.inspector.customSketchActive}
                        </span>
                        <button
                          type="button"
                          onClick={() => onChange({ customPaths: undefined })}
                          className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 shrink-0 cursor-pointer"
                        >
                          {t.inspector.clearSketchBtn}
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-5 gap-2">
                      {filteredEmblems.map((em) => {
                        const selected =
                          !config.artworkId &&
                          !config.customImage &&
                          !(config.customPaths && config.customPaths.length > 0) &&
                          config.emblemId === em.id;
                        const emName = t.emblemNames[em.id] ?? em.nameAr;
                        return (
                          <button
                            key={em.id}
                            type="button"
                            title={emName}
                            aria-label={emName}
                            onClick={() =>
                              onChange({
                                emblemId: em.id,
                                artworkId: undefined,
                                customImage: undefined,
                                customPaths: undefined,
                              })
                            }
                            className={`aspect-square p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                              selected
                                ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                                : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-white'
                            }`}
                          >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              {em.elements.map((el, i) => {
                                const common = {
                                  ...el.attrs,
                                  fill:
                                    config.emblemStyle === 'filled' &&
                                    !(
                                      el.type === 'path' &&
                                      typeof el.attrs.d === 'string' &&
                                      !el.attrs.d.trim().toUpperCase().endsWith('Z')
                                    )
                                      ? 'currentColor'
                                      : 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: 4.5,
                                  strokeLinecap: 'round' as const,
                                  strokeLinejoin: 'round' as const,
                                };
                                if (el.type === 'path') return <path key={i} {...common} />;
                                if (el.type === 'circle') return <circle key={i} {...common} />;
                                if (el.type === 'rect') return <rect key={i} {...common} />;
                                return <polygon key={i} {...common} />;
                              })}
                            </svg>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-3 pt-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{t.inspector.emblemSize}</span>
                          <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                            {Math.round(config.emblemScale * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0.45}
                          max={1.25}
                          step={0.01}
                          value={config.emblemScale}
                          onChange={(e) => onChange({ emblemScale: parseFloat(e.target.value) })}
                          className="w-full"
                        />
                      </div>

                      {config.emblemStyle === 'outline' && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">{t.inspector.strokeWidth}</span>
                            <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                              {config.emblemStroke.toFixed(1)}px
                            </span>
                          </div>
                          <input
                            type="range"
                            min={1.5}
                            max={5.5}
                            step={0.1}
                            value={config.emblemStroke}
                            onChange={(e) => onChange({ emblemStroke: parseFloat(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                      )}

                      {config.layout === 'emblem-backdrop' && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">{t.inspector.backdropOpacity}</span>
                            <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                              {Math.round(config.emblemOpacity * 100)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0.1}
                            max={0.75}
                            step={0.02}
                            value={config.emblemOpacity}
                            onChange={(e) => onChange({ emblemOpacity: parseFloat(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'frame' && (
          <>
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                {t.inspector.maskShapeLabel}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => {
                  const active = config.maskShape === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onChange({ maskShape: s.id })}
                      className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3">
              <span className="block text-xs font-semibold text-slate-700">
                {t.inspector.innerRingLabel}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {ringStyles.map((r) => {
                  const active = config.ringStyle === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onChange({ ringStyle: r.id })}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>

              {config.ringStyle !== 'none' && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{t.inspector.ringThickness}</span>
                    <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                      {config.ringWidth}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={14}
                    step={1}
                    value={config.ringWidth}
                    onChange={(e) => onChange({ ringWidth: parseInt(e.target.value, 10) })}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-5">
              <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                {t.inspector.cornerBadgeLabel}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  [
                    { id: 'none', label: t.inspector.badges.none },
                    { id: 'dot', label: t.inspector.badges.dot },
                    { id: 'spark', label: t.inspector.badges.spark },
                    { id: 'check', label: t.inspector.badges.check },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onChange({ cornerBadge: b.id })}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      config.cornerBadge === b.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'colors' && (
          <>
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                {t.inspector.palettesLabel}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PALETTES.map((p) => {
                  const isCurrent =
                    config.bgColor1.toLowerCase() === p.bg1.toLowerCase() &&
                    config.fgColor.toLowerCase() === p.fg.toLowerCase() &&
                    config.accentColor.toLowerCase() === p.accent.toLowerCase();
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        onChange({
                          bgColor1: p.bg1,
                          bgColor2: p.bg2,
                          fgColor: p.fg,
                          accentColor: p.accent,
                        })
                      }
                      className={`flex items-center justify-between p-2 rounded-lg border transition-colors cursor-pointer ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/70'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-medium text-slate-800 truncate">
                        {t.paletteNames[p.id] ?? p.nameAr}
                      </span>
                      <span className="flex items-center -space-x-1 shrink-0" dir="ltr">
                        <span
                          className="w-4 h-4 rounded-full border border-black/15"
                          style={{ backgroundColor: p.bg1 }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-black/15"
                          style={{ backgroundColor: p.accent }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3">
              <span className="block text-xs font-semibold text-slate-700">
                {t.inspector.bgFillMode}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  [
                    { id: 'solid', label: t.inspector.bgModes.solid },
                    { id: 'linear', label: t.inspector.bgModes.linear },
                    { id: 'radial', label: t.inspector.bgModes.radial },
                    { id: 'split', label: t.inspector.bgModes.split },
                  ] as { id: BgMode; label: string }[]
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChange({ bgMode: m.id })}
                    className={`py-1.5 px-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      config.bgMode === m.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {config.bgMode === 'linear' && (
                <div className="pt-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{t.inspector.gradientAngle}</span>
                    <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                      {config.gradientAngle}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={5}
                    value={config.gradientAngle}
                    onChange={(e) => onChange({ gradientAngle: parseInt(e.target.value, 10) })}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-2.5">
              <span className="block text-xs font-semibold text-slate-700">
                {t.inspector.manualColors}
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {(
                  [
                    { key: 'bgColor1', label: t.inspector.bgColor1 },
                    { key: 'bgColor2', label: t.inspector.bgColor2 },
                    { key: 'fgColor', label: t.inspector.fgColor },
                    { key: 'accentColor', label: t.inspector.accentColor },
                  ] as const
                ).map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between gap-2 px-2.5 py-2 border border-slate-200 rounded-lg bg-slate-50/50 cursor-pointer hover:bg-white"
                  >
                    <span className="text-xs text-slate-700 truncate">{item.label}</span>
                    <span className="flex items-center gap-1.5 shrink-0" dir="ltr">
                      <span className="text-[11px] font-mono-code text-slate-500 uppercase">
                        {config[item.key]}
                      </span>
                      <input
                        type="color"
                        value={config[item.key]}
                        onChange={(e) => onChange({ [item.key]: e.target.value })}
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3">
              <span className="block text-xs font-semibold text-slate-700">
                {t.inspector.bgPatternLabel}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {patterns.map((pat) => (
                  <button
                    key={pat.id}
                    type="button"
                    onClick={() => onChange({ bgPattern: pat.id })}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      config.bgPattern === pat.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {pat.label}
                  </button>
                ))}
              </div>

              {config.bgPattern !== 'none' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{t.inspector.patternOpacity}</span>
                    <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                      {Math.round(config.patternOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.04}
                    max={0.32}
                    step={0.01}
                    value={config.patternOpacity}
                    onChange={(e) => onChange({ patternOpacity: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'typography' && (
          <>
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                {t.inspector.fontFamilyLabel}
              </span>
              <div className="space-y-1.5">
                {FONT_SAMPLES.map((f) => {
                  const active = config.fontFamily === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onChange({ fontFamily: f.id })}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-semibold truncate">{t.inspector.fonts[f.id]}</span>
                      <span
                        className="text-base font-bold text-slate-900 shrink-0"
                        style={{ fontFamily: `'${f.id}', sans-serif` }}
                      >
                        {f.sample}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{t.inspector.fontSizeLabel}</span>
                  <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                    {config.fontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={28}
                  max={160}
                  step={2}
                  value={config.fontSize}
                  onChange={(e) => onChange({ fontSize: parseInt(e.target.value, 10) })}
                  className="w-full"
                />
              </div>

              <div>
                <span className="block text-xs text-slate-600 mb-1.5">
                  {t.inspector.fontWeightLabel}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {([600, 700, 800] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => onChange({ fontWeight: w })}
                      className={`py-1.5 text-xs font-mono-code rounded-lg border transition-colors cursor-pointer ${
                        config.fontWeight === w
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{t.inspector.letterSpacingLabel}</span>
                  <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                    {config.letterSpacing}px
                  </span>
                </div>
                <input
                  type="range"
                  min={-2}
                  max={14}
                  step={1}
                  value={config.letterSpacing}
                  onChange={(e) => onChange({ letterSpacing: parseInt(e.target.value, 10) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{t.inspector.subtitleSizeLabel}</span>
                  <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                    {config.subtitleSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={28}
                  step={1}
                  value={config.subtitleSize}
                  onChange={(e) => onChange({ subtitleSize: parseInt(e.target.value, 10) })}
                  className="w-full"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'effects' && (
          <>
            {/* Quick Effect Presets */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2.5">
                {t.inspector.effectsQuickLabel}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    {
                      id: 'clean',
                      label: t.inspector.effectPresets.clean,
                      patch: { shadowMode: 'none', glowMode: 'none' },
                    },
                    {
                      id: 'softDepth',
                      label: t.inspector.effectPresets.softDepth,
                      patch: {
                        shadowMode: 'soft',
                        shadowBlur: 9,
                        shadowOffsetY: 5,
                        shadowOpacity: 0.42,
                        shadowColor: '#000000',
                        glowMode: 'none',
                      },
                    },
                    {
                      id: 'popShadow',
                      label: t.inspector.effectPresets.popShadow,
                      patch: {
                        shadowMode: 'crisp',
                        shadowBlur: 1,
                        shadowOffsetY: 6,
                        shadowOpacity: 0.75,
                        shadowColor: '#000000',
                        glowMode: 'none',
                      },
                    },
                    {
                      id: 'crispGlow',
                      label: t.inspector.effectPresets.crispGlow,
                      patch: {
                        shadowMode: 'none',
                        glowMode: 'foreground',
                        glowIntensity: 0.65,
                        glowColor: config.accentColor,
                      },
                    },
                    {
                      id: 'studioHalo',
                      label: t.inspector.effectPresets.studioHalo,
                      patch: {
                        shadowMode: 'elevated',
                        shadowBlur: 10,
                        shadowOffsetY: 6,
                        shadowOpacity: 0.45,
                        shadowColor: '#000000',
                        glowMode: 'halo',
                        glowIntensity: 0.7,
                        glowColor: config.accentColor,
                      },
                    },
                  ] as { id: string; label: string; patch: Partial<LogoConfig> }[]
                ).map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onChange(preset.patch)}
                    className="py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50/70 text-slate-800 hover:border-blue-600 hover:bg-blue-50/60 hover:text-blue-700 transition-colors cursor-pointer whitespace-nowrap truncate"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Shadow Controls */}
            <div className="border-t border-slate-100 pt-5 space-y-3.5">
              <span className="block text-xs font-semibold text-slate-700">
                {t.inspector.shadowSectionLabel}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  [
                    { id: 'none', label: t.inspector.shadowModes.none },
                    { id: 'soft', label: t.inspector.shadowModes.soft },
                    { id: 'elevated', label: t.inspector.shadowModes.elevated },
                    { id: 'crisp', label: t.inspector.shadowModes.crisp },
                  ] as { id: ShadowMode; label: string }[]
                ).map((mode) => {
                  const active = (config.shadowMode ?? 'none') === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => onChange({ shadowMode: mode.id })}
                      className={`py-2 px-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap truncate ${
                        active
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>

              {(config.shadowMode ?? 'none') !== 'none' && (
                <div className="space-y-3 pt-1">
                  {(config.shadowMode ?? 'none') !== 'crisp' && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">{t.inspector.shadowBlurLabel}</span>
                        <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                          {config.shadowBlur ?? 8}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={24}
                        step={1}
                        value={config.shadowBlur ?? 8}
                        onChange={(e) => onChange({ shadowBlur: parseInt(e.target.value, 10) })}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{t.inspector.shadowOffsetLabel}</span>
                      <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                        {config.shadowOffsetY ?? 5}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={18}
                      step={1}
                      value={config.shadowOffsetY ?? 5}
                      onChange={(e) => onChange({ shadowOffsetY: parseInt(e.target.value, 10) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{t.inspector.shadowOpacityLabel}</span>
                      <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                        {Math.round((config.shadowOpacity ?? 0.4) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={0.9}
                      step={0.05}
                      value={config.shadowOpacity ?? 0.4}
                      onChange={(e) => onChange({ shadowOpacity: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <label className="flex items-center justify-between gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50/50 cursor-pointer hover:bg-white">
                    <span className="text-xs text-slate-700">{t.inspector.shadowColorLabel}</span>
                    <span className="flex items-center gap-2 shrink-0" dir="ltr">
                      <span className="text-[11px] font-mono-code text-slate-500 uppercase">
                        {config.shadowColor ?? '#000000'}
                      </span>
                      <input
                        type="color"
                        value={config.shadowColor ?? '#000000'}
                        onChange={(e) => onChange({ shadowColor: e.target.value })}
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Glow & Backlight Controls */}
            <div className="border-t border-slate-100 pt-5 space-y-3.5">
              <span className="block text-xs font-semibold text-slate-700">
                {t.inspector.glowSectionLabel}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    { id: 'none', label: t.inspector.glowModes.none },
                    { id: 'foreground', label: t.inspector.glowModes.foreground },
                    { id: 'halo', label: t.inspector.glowModes.halo },
                    { id: 'both', label: t.inspector.glowModes.both },
                  ] as { id: GlowMode; label: string }[]
                ).map((mode) => {
                  const active = (config.glowMode ?? 'none') === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() =>
                        onChange({
                          glowMode: mode.id,
                          glowColor: config.glowColor ?? config.accentColor,
                        })
                      }
                      className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap truncate ${
                        active
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>

              {(config.glowMode ?? 'none') !== 'none' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{t.inspector.glowIntensityLabel}</span>
                      <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                        {Math.round((config.glowIntensity ?? 0.6) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.15}
                      max={1}
                      step={0.05}
                      value={config.glowIntensity ?? 0.6}
                      onChange={(e) => onChange({ glowIntensity: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-between gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50/50 cursor-pointer hover:bg-white">
                      <span className="text-xs text-slate-700 truncate">
                        {t.inspector.glowColorLabel}
                      </span>
                      <span className="flex items-center gap-1.5 shrink-0" dir="ltr">
                        <span className="text-[11px] font-mono-code text-slate-500 uppercase">
                          {config.glowColor ?? config.accentColor}
                        </span>
                        <input
                          type="color"
                          value={config.glowColor ?? config.accentColor}
                          onChange={(e) => onChange({ glowColor: e.target.value })}
                          className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => onChange({ glowColor: config.accentColor })}
                      className="px-2.5 py-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {t.inspector.matchAccentBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
