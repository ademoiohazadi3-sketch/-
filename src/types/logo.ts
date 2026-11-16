export type AppLanguage = 'ar' | 'en' | 'fr' | 'es';

export type AppBackdrop = 'studio' | 'grid' | 'mesh' | 'plain';

export type AppView =
  | 'studio'
  | 'builder'
  | 'templates'
  | 'platforms'
  | 'saved'
  | 'profile'
  | 'settings';

export type StageBg = 'checker' | 'light' | 'dark';

export interface AppSettings {
  defaultExportSize: 512 | 1024 | 2048;
  defaultStageBg: StageBg;
  defaultShowSafeZone: boolean;
  autoPersonalizeTemplates: boolean;
  defaultArtworkFit: ArtworkFit;
  autoApplyArtworkPalette: boolean;
}

export type Gender = 'male' | 'female';

export interface UserProfile {
  firstName: string;
  lastName: string;
  gender: Gender;
  updatedAt: string;
}

export type InspectorTab = 'identity' | 'frame' | 'colors' | 'typography' | 'effects';

export type MaskShape = 'circle' | 'squircle' | 'hexagon' | 'square';

export type BgMode = 'solid' | 'linear' | 'radial' | 'split';

export type BgPattern = 'none' | 'grid' | 'dots' | 'rings' | 'diagonal';

export type RingStyle = 'none' | 'solid' | 'double' | 'dashed' | 'accent';

export type ShadowMode = 'none' | 'soft' | 'elevated' | 'crisp';

export type GlowMode = 'none' | 'foreground' | 'halo' | 'both';

export type LogoLayout =
  | 'emblem-above'
  | 'emblem-only'
  | 'text-only'
  | 'emblem-backdrop'
  | 'monogram-frame';

export type LogoFont =
  | 'Cairo'
  | 'Readex Pro'
  | 'Playfair Display'
  | 'Oswald'
  | 'JetBrains Mono';

export type EmblemCategory =
  | 'all'
  | 'anime'
  | 'cartoon'
  | 'celebrities'
  | 'sports'
  | 'geometric'
  | 'tech'
  | 'creative'
  | 'gaming'
  | 'luxury';

export type ArtworkCategory =
  | 'all'
  | 'characters'
  | 'anime'
  | 'cartoon'
  | 'celebrities'
  | 'sports';

export type ArtworkFit = 'cover' | 'badge';

export interface ArtworkDef {
  id: string;
  src: string;
  category: Exclude<ArtworkCategory, 'all'>;
  bg1: string;
  bg2: string;
  accent: string;
}

export type TemplateCategory =
  | 'all'
  | 'characters'
  | 'anime'
  | 'cartoon'
  | 'celebrities'
  | 'sports'
  | 'business'
  | 'creators'
  | 'gaming'
  | 'art'
  | 'minimal';

export interface EmblemElement {
  type: 'path' | 'circle' | 'rect' | 'polygon';
  attrs: Record<string, string | number>;
  role?: 'primary' | 'accent';
  fillRule?: 'nonzero' | 'evenodd';
}

export interface EmblemDef {
  id: string;
  nameAr: string;
  category: Exclude<EmblemCategory, 'all'>;
  elements: EmblemElement[];
}

export interface ColorPalette {
  id: string;
  nameAr: string;
  bg1: string;
  bg2: string;
  fg: string;
  accent: string;
}

export interface CustomVectorStroke {
  d: string;
  strokeWidth: number;
  role: 'primary' | 'accent';
}

export interface LogoConfig {
  name: string;
  title: string;
  subtitle: string;
  layout: LogoLayout;
  artworkId?: string;
  customImage?: string;
  artworkFit?: ArtworkFit;
  artworkOpacity?: number; // 0.35 to 1
  emblemId: string;
  emblemScale: number; // 0.45 to 1.25
  emblemRotation?: number; // -180 to 180 degrees
  emblemStyle: 'filled' | 'outline';
  emblemStroke: number; // 1.5 to 5
  emblemOpacity: number; // 0.12 to 1
  customPaths?: CustomVectorStroke[];
  maskShape: MaskShape;
  bgMode: BgMode;
  gradientAngle: number; // 0 to 360
  bgColor1: string;
  bgColor2: string;
  fgColor: string;
  accentColor: string;
  bgPattern: BgPattern;
  patternOpacity: number; // 0.04 to 0.35
  ringStyle: RingStyle;
  ringWidth: number; // 2 to 16
  fontFamily: LogoFont;
  fontSize: number; // 28 to 150
  fontWeight: 600 | 700 | 800;
  letterSpacing: number; // -4 to 16
  subtitleSize: number; // 12 to 32
  cornerBadge: 'none' | 'dot' | 'spark' | 'check';
  shadowMode?: ShadowMode;
  shadowBlur?: number; // 0 to 24
  shadowOffsetY?: number; // 0 to 18
  shadowOpacity?: number; // 0.1 to 0.9
  shadowColor?: string;
  glowMode?: GlowMode;
  glowIntensity?: number; // 0.15 to 1
  glowColor?: string;
}

export interface LogoTemplate {
  id: string;
  titleAr: string;
  category: Exclude<TemplateCategory, 'all'>;
  descriptionAr: string;
  config: LogoConfig;
}

export interface SavedLogo {
  id: string;
  savedAt: string;
  config: LogoConfig;
}
