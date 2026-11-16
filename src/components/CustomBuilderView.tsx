import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookmarkPlus,
  CircleDashed,
  Download,
  Eraser,
  FlipHorizontal2,
  ImagePlus,
  PenTool,
  RotateCcw,
  Shapes,
  Sparkles,
  Trash2,
  Undo2,
  Upload,
} from 'lucide-react';
import { EMBLEMS } from '../data/emblems';
import { COLOR_PALETTES, DEFAULT_LOGO } from '../data/presets';
import { Translations } from '../i18n/translations';
import {
  AppLanguage,
  BgMode,
  BgPattern,
  CustomVectorStroke,
  GlowMode,
  LogoConfig,
  LogoFont,
  LogoLayout,
  MaskShape,
  RingStyle,
  ShadowMode,
  StageBg,
  UserProfile,
} from '../types/logo';
import { downloadPng, downloadSvg } from '../utils/exportLogo';
import { processUploadedImage } from '../utils/imageUpload';
import { LogoSvg } from './LogoSvg';

interface CustomBuilderViewProps {
  currentStudioConfig: LogoConfig;
  userProfile: UserProfile;
  defaultExportSize: 512 | 1024 | 2048;
  defaultStageBg: StageBg;
  language: AppLanguage;
  onApplyToStudio: (config: LogoConfig) => void;
  onSaveToLibrary: (config: LogoConfig) => void;
  onNotify: (msg: string) => void;
  t: Translations;
}

type BuilderStep = 'identity' | 'mark' | 'style' | 'finish';
type MarkMode = 'sketch' | 'vector' | 'photo';

const FONT_OPTIONS: { id: LogoFont; sample: string }[] = [
  { id: 'Cairo', sample: 'أُفق' },
  { id: 'Readex Pro', sample: 'صَدى' },
  { id: 'Playfair Display', sample: 'A' },
  { id: 'Oswald', sample: 'APEX' },
  { id: 'JetBrains Mono', sample: 'DEV' },
];

function createBlankDraft(profile: UserProfile): LogoConfig {
  return {
    ...DEFAULT_LOGO,
    name: profile.firstName || 'شعاري',
    title: profile.firstName || 'شعاري',
    subtitle: profile.lastName ? profile.lastName.toUpperCase() : 'CUSTOM',
    artworkId: undefined,
    customImage: undefined,
    customPaths: undefined,
    emblemId: 'prism-core',
    emblemScale: 0.9,
    emblemRotation: 0,
    emblemStyle: 'outline',
    emblemStroke: 3.4,
    emblemOpacity: 1,
    layout: 'emblem-above',
    maskShape: 'circle',
    bgMode: 'linear',
    gradientAngle: 135,
    bgColor1: '#1E1B4B',
    bgColor2: '#0F172A',
    fgColor: '#FFFFFF',
    accentColor: '#FACC15',
    bgPattern: 'dots',
    patternOpacity: 0.1,
    ringStyle: 'accent',
    ringWidth: 6,
    shadowMode: 'soft',
    shadowBlur: 8,
    shadowOffsetY: 5,
    shadowOpacity: 0.45,
    shadowColor: '#000000',
    glowMode: 'none',
    glowIntensity: 0.55,
    glowColor: '#FACC15',
  };
}

export const CustomBuilderView: React.FC<CustomBuilderViewProps> = ({
  currentStudioConfig,
  userProfile,
  defaultExportSize,
  defaultStageBg,
  language,
  onApplyToStudio,
  onSaveToLibrary,
  onNotify,
  t,
}) => {
  const [draft, setDraft] = useState<LogoConfig>(() => createBlankDraft(userProfile));
  const [step, setStep] = useState<BuilderStep>('identity');
  const [markMode, setMarkMode] = useState<MarkMode>('sketch');
  const [stageBg, setStageBg] = useState<StageBg>(defaultStageBg);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(false);

  // Freehand Sketch Pad state
  const [brushRole, setBrushRole] = useState<'primary' | 'accent'>('primary');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [symmetry, setSymmetry] = useState<boolean>(true);
  const [activePoints, setActivePoints] = useState<{ x: number; y: number }[]>([]);
  const [strokeBatchSizes, setStrokeBatchSizes] = useState<number[]>([]);
  const isDrawingRef = useRef<boolean>(false);

  const sketchSvgRef = useRef<SVGSVGElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const exportFullSvgRef = useRef<SVGSVGElement | null>(null);
  const exportRasterSvgRef = useRef<SVGSVGElement | null>(null);

  const isRtl = language === 'ar';

  const patchDraft = (patch: Partial<LogoConfig>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const handleGenerateInitials = () => {
    const f = userProfile.firstName.trim();
    const l = userProfile.lastName.trim();
    const initials = `${f.slice(0, 1)}${l.slice(0, 1)}`.toUpperCase() || f.slice(0, 2);
    patchDraft({
      title: initials,
      subtitle: `${f} ${l}`.trim().toUpperCase(),
      layout: 'monogram-frame',
      fontSize: 96,
    });
  };

  const toSketchCoords = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const svg = sketchSvgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const x = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(4, Math.min(96, ((clientY - rect.top) / rect.height) * 100));
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  };

  const pointsToPath = (pts: { x: number; y: number }[]): string => {
    if (pts.length === 0) return '';
    if (pts.length === 1) {
      const p = pts[0];
      return `M ${p.x} ${p.y} L ${(p.x + 0.2).toFixed(1)} ${(p.y + 0.2).toFixed(1)}`;
    }
    return pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = toSketchCoords(e.clientX, e.clientY);
    if (!pt) return;
    isDrawingRef.current = true;
    setActivePoints([pt]);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawingRef.current) return;
    const pt = toSketchCoords(e.clientX, e.clientY);
    if (!pt) return;
    setActivePoints((prev) => {
      const last = prev[prev.length - 1];
      if (last && Math.hypot(pt.x - last.x, pt.y - last.y) < 1.2) {
        return prev;
      }
      return [...prev, pt];
    });
  };

  const commitActiveStroke = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    if (activePoints.length === 0) return;

    const mainPath = pointsToPath(activePoints);
    const newStrokes: CustomVectorStroke[] = [
      { d: mainPath, strokeWidth: brushSize, role: brushRole },
    ];

    if (symmetry) {
      const mirrored = activePoints.map((p) => ({
        x: Number((100 - p.x).toFixed(1)),
        y: p.y,
      }));
      newStrokes.push({
        d: pointsToPath(mirrored),
        strokeWidth: brushSize,
        role: brushRole,
      });
    }

    setDraft((prev) => ({
      ...prev,
      artworkId: undefined,
      customImage: undefined,
      layout: prev.layout === 'text-only' ? 'emblem-above' : prev.layout,
      customPaths: [...(prev.customPaths ?? []), ...newStrokes],
    }));
    setStrokeBatchSizes((prev) => [...prev, newStrokes.length]);
    setActivePoints([]);
  };

  const handleUndoStroke = () => {
    const existing = draft.customPaths ?? [];
    if (existing.length === 0) return;
    const lastBatch = strokeBatchSizes[strokeBatchSizes.length - 1] ?? 1;
    const updated = existing.slice(0, Math.max(0, existing.length - lastBatch));
    setStrokeBatchSizes((prev) => prev.slice(0, -1));
    patchDraft({ customPaths: updated.length > 0 ? updated : undefined });
  };

  const handleClearSketch = () => {
    setStrokeBatchSizes([]);
    setActivePoints([]);
    patchDraft({ customPaths: undefined });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await processUploadedImage(file);
      patchDraft({
        customImage: dataUrl,
        artworkId: undefined,
        customPaths: undefined,
        layout: draft.layout === 'text-only' ? 'emblem-above' : draft.layout,
        artworkFit: draft.artworkFit ?? 'cover',
        artworkOpacity: draft.artworkOpacity ?? 1,
      });
      onNotify(t.toasts.photoAdded);
    } catch {
      onNotify(t.toasts.photoInvalid);
    } finally {
      e.target.value = '';
    }
  };

  const stepOrder: BuilderStep[] = ['identity', 'mark', 'style', 'finish'];
  const currentStepIdx = stepOrder.indexOf(step);

  const stepTabs: { id: BuilderStep; label: string }[] = [
    { id: 'identity', label: t.builder.steps.identity },
    { id: 'mark', label: t.builder.steps.mark },
    { id: 'style', label: t.builder.steps.style },
    { id: 'finish', label: t.builder.steps.finish },
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

  const stageClass =
    stageBg === 'checker'
      ? 'stage-checkerboard'
      : stageBg === 'light'
        ? 'bg-white'
        : 'bg-[#0B1120]';

  const handleDownloadPng = async () => {
    if (!exportRasterSvgRef.current) return;
    await downloadPng(exportRasterSvgRef.current, draft, defaultExportSize);
    onNotify(t.toasts.pngDownloaded(defaultExportSize));
  };

  const handleDownloadSvg = async () => {
    if (!exportFullSvgRef.current) return;
    await downloadSvg(exportFullSvgRef.current, draft);
    onNotify(t.toasts.svgDownloaded);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Bar */}
      <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.builder.heading}
            </h1>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            {t.builder.subheading}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setDraft(createBlankDraft(userProfile));
              setStrokeBatchSizes([]);
              setActivePoints([]);
              setStep('identity');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.builder.startBlankBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDraft({ ...currentStudioConfig });
              setStrokeBatchSizes([]);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.builder.importCurrentBtn}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Custom Builder Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] gap-6 items-start">
        {/* Left: Guided Step-by-Step Builder Controls */}
        <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl overflow-hidden">
          {/* Stepper Tabs */}
          <div className="p-2.5 border-b border-slate-200 bg-slate-50/70">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-200/70 p-1 rounded-lg">
              {stepTabs.map((tab) => {
                const active = step === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStep(tab.id)}
                    className={`py-2 px-2.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
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

          <div className="p-5 sm:p-6 space-y-6">
            {/* Step 1: Identity & Typography */}
            {step === 'identity' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="builder-title-input"
                        className="text-xs font-semibold text-slate-700"
                      >
                        {t.inspector.titleLabel}
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateInitials}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        {t.builder.autoInitialsBtn}
                      </button>
                    </div>
                    <input
                      id="builder-title-input"
                      type="text"
                      maxLength={14}
                      value={draft.title}
                      onChange={(e) => patchDraft({ title: e.target.value, name: e.target.value })}
                      placeholder={t.inspector.titlePlaceholder}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="builder-subtitle-input"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      {t.inspector.subtitleLabel}
                    </label>
                    <input
                      id="builder-subtitle-input"
                      type="text"
                      maxLength={18}
                      value={draft.subtitle}
                      onChange={(e) => patchDraft({ subtitle: e.target.value })}
                      placeholder={t.inspector.subtitlePlaceholder}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-2.5">
                  <span className="block text-xs font-semibold text-slate-700">
                    {t.inspector.layoutLabel}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {layouts.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => patchDraft({ layout: l.id })}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap truncate cursor-pointer ${
                          draft.layout === l.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <span className="block text-xs font-semibold text-slate-700">
                    {t.inspector.fontFamilyLabel}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {FONT_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => patchDraft({ fontFamily: f.id })}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                          draft.fontFamily === f.id
                            ? 'border-blue-600 bg-blue-50 text-blue-800'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-semibold truncate">
                          {t.inspector.fonts[f.id]}
                        </span>
                        <span
                          className="text-sm font-bold shrink-0"
                          style={{ fontFamily: `'${f.id}', sans-serif` }}
                        >
                          {f.sample}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{t.inspector.fontSizeLabel}</span>
                    <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                      {draft.fontSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={28}
                    max={150}
                    step={2}
                    value={draft.fontSize}
                    onChange={(e) => patchDraft({ fontSize: parseInt(e.target.value, 10) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Freehand Sketch Pad, Vector + Rotation, or Photo */}
            {step === 'mark' && (
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
                  {(
                    [
                      { id: 'sketch', label: t.builder.markModes.sketch, Icon: PenTool },
                      { id: 'vector', label: t.builder.markModes.vector, Icon: Shapes },
                      { id: 'photo', label: t.builder.markModes.photo, Icon: ImagePlus },
                    ] as const
                  ).map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMarkMode(id)}
                      className={`inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
                        markMode === id
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {markMode === 'sketch' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-600">{t.builder.sketchHint}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-[260px_minmax(0,1fr)] gap-5 items-start">
                      {/* Interactive 100x100 SVG Drawing Canvas */}
                      <div className="mx-auto sm:mx-0 w-[260px] h-[260px] rounded-xl border border-slate-300 bg-slate-950 relative overflow-hidden select-none touch-none">
                        <svg
                          ref={sketchSvgRef}
                          viewBox="0 0 100 100"
                          onPointerDown={handlePointerDown}
                          onPointerMove={handlePointerMove}
                          onPointerUp={commitActiveStroke}
                          onPointerCancel={commitActiveStroke}
                          className="w-full h-full cursor-crosshair"
                        >
                          {/* Subtle center alignment & symmetry axis */}
                          <line
                            x1="50"
                            y1="4"
                            x2="50"
                            y2="96"
                            stroke={symmetry ? '#38BDF8' : '#334155'}
                            strokeWidth="0.6"
                            strokeDasharray="2 2"
                            opacity={symmetry ? 0.75 : 0.4}
                          />
                          <line
                            x1="4"
                            y1="50"
                            x2="96"
                            y2="50"
                            stroke="#334155"
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                            opacity="0.4"
                          />

                          {(draft.customPaths ?? []).map((stroke, idx) => (
                            <path
                              key={idx}
                              d={stroke.d}
                              fill="none"
                              stroke={
                                stroke.role === 'accent' ? draft.accentColor : draft.fgColor
                              }
                              strokeWidth={stroke.strokeWidth}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ))}

                          {activePoints.length > 0 && (
                            <>
                              <path
                                d={pointsToPath(activePoints)}
                                fill="none"
                                stroke={
                                  brushRole === 'accent' ? draft.accentColor : draft.fgColor
                                }
                                strokeWidth={brushSize}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {symmetry && (
                                <path
                                  d={pointsToPath(
                                    activePoints.map((p) => ({
                                      x: Number((100 - p.x).toFixed(1)),
                                      y: p.y,
                                    }))
                                  )}
                                  fill="none"
                                  stroke={
                                    brushRole === 'accent' ? draft.accentColor : draft.fgColor
                                  }
                                  strokeWidth={brushSize}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              )}
                            </>
                          )}
                        </svg>
                      </div>

                      {/* Sketch Controls */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setBrushRole('primary')}
                            className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                              brushRole === 'primary'
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: draft.fgColor }}
                            />
                            <span>{t.builder.brushPrimary}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setBrushRole('accent')}
                            className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                              brushRole === 'accent'
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: draft.accentColor }}
                            />
                            <span>{t.builder.brushAccent}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSymmetry((v) => !v)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                            symmetry
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <FlipHorizontal2 className="w-4 h-4" />
                            <span>{t.builder.symmetryLabel}</span>
                          </span>
                          <span className="font-mono-code">{symmetry ? 'ON' : 'OFF'}</span>
                        </button>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">{t.builder.brushSizeLabel}</span>
                            <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                              {brushSize}px
                            </span>
                          </div>
                          <input
                            type="range"
                            min={2}
                            max={10}
                            step={0.5}
                            value={brushSize}
                            onChange={(e) => setBrushSize(parseFloat(e.target.value))}
                            className="w-full"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleUndoStroke}
                            disabled={!draft.customPaths || draft.customPaths.length === 0}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
                          >
                            <Undo2 className="w-3.5 h-3.5" />
                            <span>{t.builder.undoStrokeBtn}</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleClearSketch}
                            disabled={!draft.customPaths || draft.customPaths.length === 0}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eraser className="w-3.5 h-3.5" />
                            <span>{t.builder.clearSketchBtn}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {markMode === 'vector' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-56 overflow-y-auto p-1">
                      {EMBLEMS.map((em) => {
                        const selected =
                          !draft.customImage &&
                          !draft.artworkId &&
                          !(draft.customPaths && draft.customPaths.length > 0) &&
                          draft.emblemId === em.id;
                        const emName = t.emblemNames[em.id] ?? em.nameAr;
                        return (
                          <button
                            key={em.id}
                            type="button"
                            title={emName}
                            aria-label={emName}
                            onClick={() =>
                              patchDraft({
                                emblemId: em.id,
                                artworkId: undefined,
                                customImage: undefined,
                                customPaths: undefined,
                                layout: draft.layout === 'text-only' ? 'emblem-above' : draft.layout,
                              })
                            }
                            className={`aspect-square p-2 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                              selected
                                ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                                : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              {em.elements.map((el, i) => {
                                const common = {
                                  ...el.attrs,
                                  fill:
                                    draft.emblemStyle === 'filled' &&
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{t.inspector.emblemSize}</span>
                          <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                            {Math.round(draft.emblemScale * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0.45}
                          max={1.25}
                          step={0.02}
                          value={draft.emblemScale}
                          onChange={(e) => patchDraft({ emblemScale: parseFloat(e.target.value) })}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{t.builder.rotationLabel}</span>
                          <span className="font-mono-code tabular-nums text-slate-900" dir="ltr">
                            {draft.emblemRotation ?? 0}°
                          </span>
                        </div>
                        <input
                          type="range"
                          min={-180}
                          max={180}
                          step={5}
                          value={draft.emblemRotation ?? 0}
                          onChange={(e) =>
                            patchDraft({ emblemRotation: parseInt(e.target.value, 10) })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => patchDraft({ emblemStyle: 'filled' })}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          draft.emblemStyle === 'filled'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {t.inspector.filled}
                      </button>
                      <button
                        type="button"
                        onClick={() => patchDraft({ emblemStyle: 'outline' })}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          draft.emblemStyle === 'outline'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {t.inspector.outline}
                      </button>
                    </div>
                  </div>
                )}

                {markMode === 'photo' && (
                  <div className="space-y-4">
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    {draft.customImage ? (
                      <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-blue-200 bg-blue-50/70">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={draft.customImage}
                            alt={t.inspector.customPhotoActive}
                            className="w-12 h-12 rounded-lg object-cover border border-blue-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate">
                              {t.inspector.customPhotoActive}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {t.inspector.uploadPhotoHint}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{t.inspector.changePhotoBtn}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => patchDraft({ customImage: undefined })}
                            className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer"
                            aria-label={t.inspector.noArtworkLabel}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="w-full py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:border-blue-600 hover:bg-blue-50/40 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                          <ImagePlus className="w-5 h-5" />
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {t.inspector.uploadPhotoBtn}
                        </span>
                        <span className="text-xs text-slate-500">{t.inspector.uploadPhotoHint}</span>
                      </button>
                    )}

                    {draft.customImage && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => patchDraft({ artworkFit: 'cover' })}
                          className={`py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                            (draft.artworkFit ?? 'cover') === 'cover'
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {t.inspector.artworkFitCover}
                        </button>
                        <button
                          type="button"
                          onClick={() => patchDraft({ artworkFit: 'badge' })}
                          className={`py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                            draft.artworkFit === 'badge'
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {t.inspector.artworkFitBadge}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Colors, Shape, Ring, Background */}
            {step === 'style' && (
              <div className="space-y-5">
                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-2">
                    {t.inspector.maskShapeLabel}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {shapes.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => patchDraft({ maskShape: s.id })}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          draft.maskShape === s.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <span className="block text-xs font-semibold text-slate-700">
                    {t.inspector.palettesLabel}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COLOR_PALETTES.slice(0, 9).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() =>
                          patchDraft({
                            bgColor1: p.bg1,
                            bgColor2: p.bg2,
                            fgColor: p.fg,
                            accentColor: p.accent,
                          })
                        }
                        className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 cursor-pointer"
                      >
                        <span className="text-xs font-medium text-slate-800 truncate">
                          {t.paletteNames[p.id] ?? p.nameAr}
                        </span>
                        <span className="flex items-center -space-x-1 shrink-0" dir="ltr">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15"
                            style={{ backgroundColor: p.bg1 }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15"
                            style={{ backgroundColor: p.accent }}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      className="flex items-center justify-between gap-2 px-2.5 py-2 border border-slate-200 rounded-lg bg-slate-50/50 cursor-pointer"
                    >
                      <span className="text-xs text-slate-700 truncate">{item.label}</span>
                      <input
                        type="color"
                        value={draft[item.key]}
                        onChange={(e) => patchDraft({ [item.key]: e.target.value })}
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0 shrink-0"
                      />
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div className="space-y-2">
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
                          onClick={() => patchDraft({ bgMode: m.id })}
                          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg border cursor-pointer ${
                            draft.bgMode === m.id
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-semibold text-slate-700">
                      {t.inspector.innerRingLabel}
                    </span>
                    <div className="grid grid-cols-5 gap-1">
                      {ringStyles.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => patchDraft({ ringStyle: r.id })}
                          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg border truncate cursor-pointer ${
                            draft.ringStyle === r.id
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-700">
                    {t.inspector.bgPatternLabel}
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {patterns.map((pat) => (
                      <button
                        key={pat.id}
                        type="button"
                        onClick={() => patchDraft({ bgPattern: pat.id })}
                        className={`py-1.5 px-2 text-xs font-medium rounded-lg border cursor-pointer ${
                          draft.bgPattern === pat.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {pat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Effects & Corner Badge */}
            {step === 'finish' && (
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <span className="block text-xs font-semibold text-slate-700">
                    {t.inspector.shadowSectionLabel}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'none', label: t.inspector.shadowModes.none },
                        { id: 'soft', label: t.inspector.shadowModes.soft },
                        { id: 'elevated', label: t.inspector.shadowModes.elevated },
                        { id: 'crisp', label: t.inspector.shadowModes.crisp },
                      ] as { id: ShadowMode; label: string }[]
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => patchDraft({ shadowMode: m.id })}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                          (draft.shadowMode ?? 'none') === m.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <span className="block text-xs font-semibold text-slate-700">
                    {t.inspector.glowSectionLabel}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'none', label: t.inspector.glowModes.none },
                        { id: 'foreground', label: t.inspector.glowModes.foreground },
                        { id: 'halo', label: t.inspector.glowModes.halo },
                        { id: 'both', label: t.inspector.glowModes.both },
                      ] as { id: GlowMode; label: string }[]
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          patchDraft({ glowMode: m.id, glowColor: draft.glowColor ?? draft.accentColor })
                        }
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                          (draft.glowMode ?? 'none') === m.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <span className="block text-xs font-semibold text-slate-700">
                    {t.inspector.cornerBadgeLabel}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
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
                        onClick={() => patchDraft({ cornerBadge: b.id })}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                          draft.cornerBadge === b.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step Prev / Next Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentStepIdx === 0}
                onClick={() => setStep(stepOrder[currentStepIdx - 1])}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
              >
                {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                <span>{t.builder.prevStepBtn}</span>
              </button>

              {currentStepIdx < stepOrder.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(stepOrder[currentStepIdx + 1])}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{t.builder.nextStepBtn}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onApplyToStudio(draft)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{t.builder.applyToStudioBtn}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Custom Logo Stage & Multi-Size Clarity Preview */}
        <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl overflow-hidden lg:sticky lg:top-20">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowSafeZone((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                showSafeZone
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <CircleDashed className="w-3.5 h-3.5" />
              <span>{t.studio.circularGuide}</span>
            </button>

            <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg">
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
          </div>

          <div
            className={`min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center p-6 sm:p-8 ${stageClass}`}
          >
            <div className="w-[230px] h-[230px] sm:w-[270px] sm:h-[270px] drop-shadow-sm">
              <LogoSvg config={draft} showSafeZone={showSafeZone} />
            </div>
          </div>

          {/* Clarity Strip at Real Avatar Sizes */}
          <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600">
              {t.builder.clarityStripLabel}
            </span>
            <div className="flex items-center gap-3 shrink-0" dir="ltr">
              <div className="w-12 h-12">
                <LogoSvg config={draft} />
              </div>
              <div className="w-8 h-8">
                <LogoSvg config={draft} />
              </div>
              <div className="w-6 h-6">
                <LogoSvg config={draft} />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-slate-200 bg-white space-y-2.5">
            <button
              type="button"
              onClick={() => onApplyToStudio(draft)}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
            >
              {t.builder.applyToStudioBtn}
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onSaveToLibrary(draft)}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>{t.builder.saveLogoBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPng}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.builder.downloadPngBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.builder.downloadSvgBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden SVGs for accurate PNG/SVG export of the builder draft */}
      <div className="sr-only" aria-hidden="true">
        <LogoSvg config={draft} svgRef={exportFullSvgRef} />
        <LogoSvg config={draft} hideTextForRaster svgRef={exportRasterSvgRef} />
      </div>
    </section>
  );
};
