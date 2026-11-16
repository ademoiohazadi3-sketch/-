import { LogoConfig } from '../types/logo';

function sanitizeFilename(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[^\p{L}\p{N}_-]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return cleaned || 'profile-logo';
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function inlineSvgImages(clone: SVGSVGElement): Promise<void> {
  const images = Array.from(clone.querySelectorAll('image'));
  await Promise.all(
    images.map(async (imgEl) => {
      const href =
        imgEl.getAttribute('href') ||
        imgEl.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
      if (!href || href.startsWith('data:')) return;
      try {
        const res = await fetch(href);
        const blob = await res.blob();
        const dataUrl = await blobToDataUrl(blob);
        imgEl.setAttribute('href', dataUrl);
        imgEl.removeAttribute('xlink:href');
      } catch {
        // Keep original href if fetch fails
      }
    })
  );
}

export async function serializeSvgElementAsync(svgElement: SVGSVGElement): Promise<string> {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', '1024');
  clone.setAttribute('height', '1024');
  await inlineSvgImages(clone);
  const serializer = new XMLSerializer();
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + serializer.serializeToString(clone);
}

export async function downloadSvg(svgElement: SVGSVGElement, config: LogoConfig) {
  const svgString = await serializeSvgElementAsync(svgElement);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizeFilename(config.title || config.name)}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copySvgToClipboard(svgElement: SVGSVGElement): Promise<boolean> {
  try {
    const svgString = await serializeSvgElementAsync(svgElement);
    await navigator.clipboard.writeText(svgString);
    return true;
  } catch {
    return false;
  }
}

export async function downloadPng(
  svgNoTextElement: SVGSVGElement,
  config: LogoConfig,
  size: 512 | 1024 | 2048 = 1024
) {
  await document.fonts.ready;

  const clone = svgNoTextElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(size));
  clone.setAttribute('height', String(size));
  await inlineSvgImages(clone);

  const svgStr = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(err);
      image.src = svgUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);

    // Draw crisp typography directly via Canvas 2D so Google Fonts render accurately
    if (config.layout !== 'emblem-only') {
      const scale = size / 512;
      const hasTitle = config.title.trim().length > 0;
      const hasSubtitle = config.subtitle.trim().length > 0;

      let titleY = 256;
      let subtitleY = 340;
      if (config.layout === 'emblem-above') {
        titleY = hasSubtitle ? 332 : 352;
        subtitleY = 398;
      } else if (config.layout === 'text-only') {
        titleY = hasSubtitle ? 236 : 256;
        subtitleY = 326;
      } else if (config.layout === 'emblem-backdrop') {
        titleY = hasSubtitle ? 244 : 258;
        subtitleY = 328;
      } else if (config.layout === 'monogram-frame') {
        titleY = hasSubtitle ? 256 : 272;
        subtitleY = 374;
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const shadowMode = config.shadowMode ?? 'none';
      const glowMode = config.glowMode ?? 'none';
      const hasShadow = shadowMode !== 'none';
      const hasFgGlow = glowMode === 'foreground' || glowMode === 'both';

      const drawTextWithEffects = (drawFn: () => void) => {
        if (hasFgGlow) {
          const glowIntensity = config.glowIntensity ?? 0.6;
          const glowColor = config.glowColor ?? config.accentColor;
          ctx.save();
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = (8 + glowIntensity * 26) * scale;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          drawFn();
          ctx.restore();
        }
        if (hasShadow) {
          const shadowOpacity = config.shadowOpacity ?? 0.4;
          const shadowColor = config.shadowColor ?? '#000000';
          const shadowOffsetY = config.shadowOffsetY ?? 5;
          const shadowBlur = config.shadowBlur ?? 8;
          const r = parseInt(shadowColor.slice(1, 3) || '00', 16);
          const g = parseInt(shadowColor.slice(3, 5) || '00', 16);
          const b = parseInt(shadowColor.slice(5, 7) || '00', 16);
          ctx.save();
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
          ctx.shadowBlur =
            (shadowMode === 'crisp'
              ? 1
              : shadowMode === 'elevated'
                ? shadowBlur * 1.8
                : shadowBlur * 1.4) * scale;
          ctx.shadowOffsetX = (shadowMode === 'crisp' ? shadowOffsetY * 0.65 : 0) * scale;
          ctx.shadowOffsetY =
            (shadowMode === 'elevated' ? shadowOffsetY * 1.45 : shadowOffsetY) * scale;
          drawFn();
          ctx.restore();
        } else {
          drawFn();
        }
      };

      if (hasTitle) {
        const px = config.fontSize * scale;
        ctx.fillStyle = config.fgColor;
        ctx.font = `${config.fontWeight} ${px}px "${config.fontFamily}", sans-serif`;
        if ('letterSpacing' in ctx) {
          (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${config.letterSpacing * scale}px`;
        }
        drawTextWithEffects(() => ctx.fillText(config.title, 256 * scale, titleY * scale));
      }

      if (hasSubtitle) {
        const subPx = config.subtitleSize * scale;
        ctx.fillStyle = config.accentColor;
        ctx.font = `600 ${subPx}px "Readex Pro", sans-serif`;
        if ('letterSpacing' in ctx) {
          (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${3 * scale}px`;
        }
        drawTextWithEffects(() => ctx.fillText(config.subtitle, 256 * scale, subtitleY * scale));
      }
    }

    const pngBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png', 1.0)
    );
    if (!pngBlob) throw new Error('PNG encoding failed');

    const pngUrl = URL.createObjectURL(pngBlob);
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `${sanitizeFilename(config.title || config.name)}-${size}px.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pngUrl);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}
