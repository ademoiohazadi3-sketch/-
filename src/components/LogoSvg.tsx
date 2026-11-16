import React, { useId } from 'react';
import { ARTWORKS } from '../data/artworks';
import { EMBLEMS } from '../data/emblems';
import { EmblemElement, LogoConfig, MaskShape } from '../types/logo';

interface LogoSvgProps {
  config: LogoConfig;
  className?: string;
  showSafeZone?: boolean;
  hideTextForRaster?: boolean;
  svgRef?: React.RefObject<SVGSVGElement | null>;
}

export function getShapeClipPath(shape: MaskShape): string {
  switch (shape) {
    case 'circle':
      return 'M 256 16 A 240 240 0 1 1 255.9 16 Z';
    case 'squircle':
      return 'M 256 16 C 410 16 496 102 496 256 C 496 410 410 496 256 496 C 102 496 16 410 16 256 C 16 102 102 16 256 16 Z';
    case 'hexagon':
      return 'M 256 18 L 464 137 L 464 375 L 256 494 L 48 375 L 48 137 Z';
    case 'square':
      return 'M 16 16 H 496 V 496 H 16 Z';
  }
}

export function getInnerRingPath(shape: MaskShape, inset: number): string {
  const min = 16 + inset;
  const max = 496 - inset;
  const r = 240 - inset;
  switch (shape) {
    case 'circle':
      return `M 256 ${min} A ${r} ${r} 0 1 1 255.9 ${min} Z`;
    case 'squircle': {
      const c = 154 - inset * 0.45;
      return `M 256 ${min} C ${256 + c} ${min} ${max} ${256 - c} ${max} 256 C ${max} ${256 + c} ${256 + c} ${max} 256 ${max} C ${256 - c} ${max} ${min} ${256 + c} ${min} 256 C ${min} ${256 - c} ${256 - c} ${min} 256 ${min} Z`;
    }
    case 'hexagon': {
      const top = 18 + inset * 1.15;
      const bot = 494 - inset * 1.15;
      const left = 48 + inset;
      const right = 464 - inset;
      const y1 = 137 + inset * 0.55;
      const y2 = 375 - inset * 0.55;
      return `M 256 ${top} L ${right} ${y1} L ${right} ${y2} L 256 ${bot} L ${left} ${y2} L ${left} ${y1} Z`;
    }
    case 'square':
      return `M ${min} ${min} H ${max} V ${max} H ${min} Z`;
  }
}

function renderEmblemElement(
  el: EmblemElement,
  index: number,
  style: 'filled' | 'outline',
  strokeWidth: number,
  fgColor: string,
  accentColor: string
) {
  const color = el.role === 'accent' ? accentColor : fgColor;
  const isPathOnlyStroke =
    el.type === 'path' &&
    typeof el.attrs.d === 'string' &&
    !el.attrs.d.trim().toUpperCase().endsWith('Z');

  const effectiveStyle = isPathOnlyStroke ? 'outline' : style;
  const commonProps: Record<string, string | number> = {
    ...el.attrs,
    fill: effectiveStyle === 'filled' ? color : 'none',
    stroke: effectiveStyle === 'outline' || isPathOnlyStroke ? color : 'none',
    strokeWidth: effectiveStyle === 'outline' || isPathOnlyStroke ? strokeWidth : 0,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (el.type) {
    case 'path':
      return <path key={index} {...commonProps} />;
    case 'circle':
      return <circle key={index} {...commonProps} />;
    case 'rect':
      return <rect key={index} {...commonProps} />;
    case 'polygon':
      return <polygon key={index} {...commonProps} />;
  }
}

export const LogoSvg: React.FC<LogoSvgProps> = ({
  config,
  className = 'w-full h-full',
  showSafeZone = false,
  hideTextForRaster = false,
  svgRef,
}) => {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '');
  const clipId = `clip_${uid}`;
  const gradId = `grad_${uid}`;
  const ringGradId = `ringGrad_${uid}`;
  const patternId = `pat_${uid}`;
  const haloGradId = `halo_${uid}`;
  const fgFilterId = `fgFilter_${uid}`;
  const badgeClipId = `badge_${uid}`;
  const scrimGradId = `scrim_${uid}`;

  const shadowMode = config.shadowMode ?? 'none';
  const shadowBlur = config.shadowBlur ?? 8;
  const shadowOffsetY = config.shadowOffsetY ?? 5;
  const shadowOpacity = config.shadowOpacity ?? 0.4;
  const shadowColor = config.shadowColor ?? '#000000';

  const glowMode = config.glowMode ?? 'none';
  const glowIntensity = config.glowIntensity ?? 0.6;
  const glowColor = config.glowColor ?? config.accentColor;

  const hasShadow = shadowMode !== 'none';
  const hasFgGlow = glowMode === 'foreground' || glowMode === 'both';
  const hasHalo = glowMode === 'halo' || glowMode === 'both';
  const hasFgFilter = hasShadow || hasFgGlow;

  const shadowDx = shadowMode === 'crisp' ? Math.round(shadowOffsetY * 0.65) : 0;
  const shadowDy = shadowMode === 'elevated' ? Math.round(shadowOffsetY * 1.45) : shadowOffsetY;
  const shadowStd =
    shadowMode === 'crisp'
      ? 0.6
      : shadowMode === 'elevated'
        ? Math.round(shadowBlur * 1.35)
        : shadowBlur;
  const glowStd = 4 + glowIntensity * 14;
  const glowAlpha = Math.min(0.95, 0.25 + glowIntensity * 0.7);

  const emblem = EMBLEMS.find((e) => e.id === config.emblemId) || EMBLEMS[0];
  const artwork = config.artworkId
    ? ARTWORKS.find((a) => a.id === config.artworkId)
    : undefined;
  const activeImageSrc = config.customImage || artwork?.src;
  const artworkFit = config.artworkFit ?? 'cover';
  const artworkOpacity = config.artworkOpacity ?? 1;
  const shapePath = getShapeClipPath(config.maskShape);

  // Compute linear gradient vector from angle
  const angleRad = ((config.gradientAngle - 90) * Math.PI) / 180;
  const x1 = 50 - Math.cos(angleRad) * 50;
  const y1 = 50 - Math.sin(angleRad) * 50;
  const x2 = 50 + Math.cos(angleRad) * 50;
  const y2 = 50 + Math.sin(angleRad) * 50;

  // Emblem layout calculation inside 512x512
  const hasTitle = config.title.trim().length > 0;
  const hasSubtitle = config.subtitle.trim().length > 0;

  let emblemCx = 256;
  let emblemCy = 256;
  let emblemBaseSize = 230;
  let titleY = 256;
  let subtitleY = 340;

  if (config.layout === 'emblem-above') {
    emblemCy = hasTitle ? (hasSubtitle ? 174 : 188) : 256;
    emblemBaseSize = hasTitle ? 168 : 230;
    titleY = hasSubtitle ? 332 : 352;
    subtitleY = 398;
  } else if (config.layout === 'emblem-only') {
    emblemCy = 256;
    emblemBaseSize = 250;
  } else if (config.layout === 'text-only') {
    titleY = hasSubtitle ? 236 : 256;
    subtitleY = 326;
  } else if (config.layout === 'emblem-backdrop') {
    emblemCy = 256;
    emblemBaseSize = 286;
    titleY = hasSubtitle ? 244 : 258;
    subtitleY = 328;
  } else if (config.layout === 'monogram-frame') {
    emblemCy = 116;
    emblemBaseSize = 84;
    titleY = hasSubtitle ? 256 : 272;
    subtitleY = 374;
  }

  const finalEmblemSize = emblemBaseSize * config.emblemScale;
  const scaleFactor = finalEmblemSize / 100;
  const emblemTx = emblemCx - 50 * scaleFactor;
  const emblemTy = emblemCy - 50 * scaleFactor;
  const emblemRotation = config.emblemRotation ?? 0;
  const hasCustomPaths = Boolean(config.customPaths && config.customPaths.length > 0);
  const badgeRadius = Math.max(42, Math.min(136, finalEmblemSize * 0.56));

  const badgePos =
    config.maskShape === 'circle' || config.maskShape === 'hexagon'
      ? { x: 374, y: 138 }
      : { x: 404, y: 108 };

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label={config.title || config.name || 'شعار البروفايل'}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={shapePath} />
        </clipPath>

        {config.bgMode === 'linear' && (
          <linearGradient id={gradId} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
            <stop offset="0%" stopColor={config.bgColor1} />
            <stop offset="100%" stopColor={config.bgColor2} />
          </linearGradient>
        )}

        {config.bgMode === 'radial' && (
          <radialGradient id={gradId} cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor={config.bgColor1} />
            <stop offset="100%" stopColor={config.bgColor2} />
          </radialGradient>
        )}

        <linearGradient id={ringGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.accentColor} />
          <stop offset="100%" stopColor={config.fgColor} />
        </linearGradient>

        {config.bgPattern === 'grid' && (
          <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke={config.fgColor}
              strokeWidth="1.2"
              strokeOpacity={config.patternOpacity}
            />
          </pattern>
        )}

        {config.bgPattern === 'dots' && (
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle
              cx="12"
              cy="12"
              r="1.8"
              fill={config.fgColor}
              fillOpacity={config.patternOpacity * 1.4}
            />
          </pattern>
        )}

        {config.bgPattern === 'diagonal' && (
          <pattern
            id={patternId}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="20"
              stroke={config.fgColor}
              strokeWidth="2"
              strokeOpacity={config.patternOpacity}
            />
          </pattern>
        )}

        {hasHalo && (
          <radialGradient id={haloGradId} cx="50%" cy="46%" r="54%">
            <stop offset="0%" stopColor={glowColor} stopOpacity={Math.min(0.65, glowIntensity * 0.55)} />
            <stop offset="55%" stopColor={glowColor} stopOpacity={Math.min(0.25, glowIntensity * 0.2)} />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
        )}

        {activeImageSrc && artworkFit === 'cover' && (
          <linearGradient id={scrimGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#090D16" stopOpacity="0" />
            <stop offset="48%" stopColor="#090D16" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#090D16" stopOpacity="0.88" />
          </linearGradient>
        )}

        {activeImageSrc && artworkFit === 'badge' && (
          <clipPath id={badgeClipId}>
            <circle cx={emblemCx} cy={emblemCy} r={badgeRadius} />
          </clipPath>
        )}

        {hasFgFilter && (
          <filter id={fgFilterId} x="-40%" y="-40%" width="180%" height="180%">
            {hasShadow && (
              <feDropShadow
                dx={shadowDx}
                dy={shadowDy}
                stdDeviation={shadowStd}
                floodColor={shadowColor}
                floodOpacity={shadowOpacity}
                result="shadowOut"
              />
            )}
            {hasFgGlow && (
              <>
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation={glowStd}
                  result="glowBlur"
                />
                <feFlood
                  floodColor={glowColor}
                  floodOpacity={glowAlpha}
                  result="glowFlood"
                />
                <feComposite
                  in="glowFlood"
                  in2="glowBlur"
                  operator="in"
                  result="coloredGlow"
                />
                <feMerge>
                  <feMergeNode in="coloredGlow" />
                  <feMergeNode in="coloredGlow" />
                  <feMergeNode in={hasShadow ? 'shadowOut' : 'SourceGraphic'} />
                </feMerge>
              </>
            )}
          </filter>
        )}
      </defs>

      {/* Clipped Logo Body */}
      <g clipPath={`url(#${clipId})`}>
        {/* Background */}
        {config.bgMode === 'solid' && <rect width="512" height="512" fill={config.bgColor1} />}
        {(config.bgMode === 'linear' || config.bgMode === 'radial') && (
          <rect width="512" height="512" fill={`url(#${gradId})`} />
        )}
        {config.bgMode === 'split' && (
          <>
            <rect width="512" height="512" fill={config.bgColor1} />
            <polygon points="0,512 512,180 512,512" fill={config.bgColor2} />
          </>
        )}

        {/* Pattern Layer */}
        {config.bgPattern !== 'none' && config.bgPattern !== 'rings' && (
          <rect width="512" height="512" fill={`url(#${patternId})`} />
        )}

        {config.bgPattern === 'rings' && (
          <g fill="none" stroke={config.fgColor} strokeOpacity={config.patternOpacity}>
            <circle cx="256" cy="256" r="95" strokeWidth="1.5" />
            <circle cx="256" cy="256" r="145" strokeWidth="1.5" />
            <circle cx="256" cy="256" r="195" strokeWidth="1.5" />
          </g>
        )}

        {/* Ambient Glow Halo Layer */}
        {hasHalo && (
          <circle cx="256" cy="240" r="225" fill={`url(#${haloGradId})`} />
        )}

        {/* Full-Cover Illustrated Artwork or Custom Photo Layer */}
        {activeImageSrc && config.layout !== 'text-only' && artworkFit === 'cover' && (
          <g>
            <image
              href={activeImageSrc}
              x="0"
              y="0"
              width="512"
              height="512"
              preserveAspectRatio="xMidYMid slice"
              opacity={artworkOpacity}
            />
            {config.layout !== 'emblem-only' && (hasTitle || hasSubtitle) && (
              <rect width="512" height="512" fill={`url(#${scrimGradId})`} />
            )}
          </g>
        )}

        {/* Decorative Ring */}
        {config.ringStyle !== 'none' && (
          <g fill="none">
            <path
              d={getInnerRingPath(config.maskShape, 18)}
              stroke={
                config.ringStyle === 'accent'
                  ? config.accentColor
                  : config.ringStyle === 'solid' || config.ringStyle === 'double' || config.ringStyle === 'dashed'
                    ? config.fgColor
                    : `url(#${ringGradId})`
              }
              strokeOpacity={config.ringStyle === 'accent' ? 0.95 : 0.35}
              strokeWidth={config.ringWidth}
              strokeDasharray={config.ringStyle === 'dashed' ? '14 10' : undefined}
              strokeLinecap="round"
            />
            {config.ringStyle === 'double' && (
              <path
                d={getInnerRingPath(config.maskShape, 32)}
                stroke={config.accentColor}
                strokeOpacity={0.7}
                strokeWidth={Math.max(1.5, config.ringWidth * 0.45)}
              />
            )}
          </g>
        )}

        {/* Foreground Group with Shadow & Glow Effects */}
        <g filter={hasFgFilter ? `url(#${fgFilterId})` : undefined}>
          {/* Emblem or Badge Artwork Layer */}
          {config.layout !== 'text-only' && activeImageSrc && artworkFit === 'badge' && (
            <g opacity={artworkOpacity}>
              <g clipPath={`url(#${badgeClipId})`}>
                <image
                  href={activeImageSrc}
                  x={emblemCx - badgeRadius}
                  y={emblemCy - badgeRadius}
                  width={badgeRadius * 2}
                  height={badgeRadius * 2}
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
              <circle
                cx={emblemCx}
                cy={emblemCy}
                r={badgeRadius}
                fill="none"
                stroke={config.accentColor}
                strokeWidth={Math.max(3, config.emblemStroke * 1.15)}
              />
            </g>
          )}

          {config.layout !== 'text-only' && !activeImageSrc && (
            <g
              transform={`translate(${emblemTx.toFixed(2)}, ${emblemTy.toFixed(2)}) scale(${scaleFactor.toFixed(4)}) rotate(${emblemRotation} 50 50)`}
              opacity={config.emblemOpacity}
            >
              {hasCustomPaths
                ? config.customPaths!.map((stroke, idx) => (
                    <path
                      key={idx}
                      d={stroke.d}
                      fill="none"
                      stroke={stroke.role === 'accent' ? config.accentColor : config.fgColor}
                      strokeWidth={stroke.strokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))
                : emblem.elements.map((el, idx) =>
                    renderEmblemElement(
                      el,
                      idx,
                      config.emblemStyle,
                      config.emblemStroke,
                      config.fgColor,
                      config.accentColor
                    )
                  )}
            </g>
          )}

          {/* Monogram Divider Accent */}
          {config.layout === 'monogram-frame' && hasSubtitle && (
            <line
              x1="212"
              y1="342"
              x2="300"
              y2="342"
              stroke={config.accentColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* Typography Layer */}
          {!hideTextForRaster && config.layout !== 'emblem-only' && (
            <g>
              {hasTitle && (
                <text
                  x="256"
                  y={titleY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={config.fgColor}
                  style={{
                    fontFamily: `'${config.fontFamily}', sans-serif`,
                    fontSize: `${config.fontSize}px`,
                    fontWeight: config.fontWeight,
                    letterSpacing: `${config.letterSpacing}px`,
                  }}
                >
                  {config.title}
                </text>
              )}
              {hasSubtitle && (
                <text
                  x="256"
                  y={subtitleY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={config.accentColor}
                  style={{
                    fontFamily: `'Readex Pro', sans-serif`,
                    fontSize: `${config.subtitleSize}px`,
                    fontWeight: 600,
                    letterSpacing: '3px',
                  }}
                >
                  {config.subtitle}
                </text>
              )}
            </g>
          )}

          {/* Optional Corner Accent Badge */}
          {config.cornerBadge === 'dot' && (
            <circle
              cx={badgePos.x}
              cy={badgePos.y}
              r="14"
              fill={config.accentColor}
              stroke={config.bgColor1}
              strokeWidth="4"
            />
          )}
          {config.cornerBadge === 'spark' && (
            <path
              d={`M ${badgePos.x} ${badgePos.y - 16} L ${badgePos.x + 4} ${badgePos.y - 4} L ${badgePos.x + 16} ${badgePos.y} L ${badgePos.x + 4} ${badgePos.y + 4} L ${badgePos.x} ${badgePos.y + 16} L ${badgePos.x - 4} ${badgePos.y + 4} L ${badgePos.x - 16} ${badgePos.y} L ${badgePos.x - 4} ${badgePos.y - 4} Z`}
              fill={config.accentColor}
            />
          )}
          {config.cornerBadge === 'check' && (
            <g transform={`translate(${badgePos.x}, ${badgePos.y})`}>
              <circle r="15" fill={config.accentColor} />
              <path
                d="M -6 0 L -2 4 L 7 -5"
                fill="none"
                stroke={config.bgColor1}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
        </g>
      </g>

      {/* Optional Safe-Zone Circular Crop Overlay (Preview only) */}
      {showSafeZone && (
        <g pointerEvents="none">
          <circle
            cx="256"
            cy="256"
            r="238"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.85"
          />
          <circle
            cx="256"
            cy="256"
            r="195"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.55"
          />
        </g>
      )}
    </svg>
  );
};
