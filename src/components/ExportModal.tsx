import React, { useEffect, useState } from 'react';
import { X, Download, Copy, Check, FileCode2 } from 'lucide-react';
import { Translations } from '../i18n/translations';
import { LogoConfig } from '../types/logo';
import { LogoSvg } from './LogoSvg';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LogoConfig;
  defaultSize?: 512 | 1024 | 2048;
  onExportPng: (size: 512 | 1024 | 2048) => Promise<void>;
  onExportSvg: () => Promise<void> | void;
  onCopySvg: () => Promise<boolean>;
  t: Translations;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  config,
  defaultSize = 1024,
  onExportPng,
  onExportSvg,
  onCopySvg,
  t,
}) => {
  const [selectedSize, setSelectedSize] = useState<512 | 1024 | 2048>(defaultSize);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedSize(defaultSize);
    }
  }, [isOpen, defaultSize]);

  if (!isOpen) return null;

  const handlePng = async () => {
    setExporting(true);
    try {
      await onExportPng(selectedSize);
    } finally {
      setExporting(false);
    }
  };

  const handleCopy = async () => {
    const ok = await onCopySvg();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 id="export-modal-title" className="text-base font-bold text-slate-900">
            {t.exportModal.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.exportModal.close}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-xl stage-checkerboard border border-slate-200">
            <div className="w-20 h-20 shrink-0">
              <LogoSvg config={config} />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="text-sm font-bold text-slate-900 truncate">
                {config.title || config.name || t.exportModal.defaultName}
              </div>
              <div className="text-xs text-slate-600">
                {t.exportModal.transparentHint}
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <span className="block text-xs font-semibold text-slate-700">
              {t.exportModal.choosePngRes}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { size: 512, label: '512 × 512', hint: t.exportModal.fastHint },
                  { size: 1024, label: '1024 × 1024', hint: t.exportModal.hdHint },
                  { size: 2048, label: '2048 × 2048', hint: t.exportModal.ultraHint },
                ] as const
              ).map((opt) => {
                const active = selectedSize === opt.size;
                return (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => setSelectedSize(opt.size)}
                    className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono-code" dir="ltr">
                      {opt.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.hint}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              disabled={exporting}
              onClick={handlePng}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {exporting
                  ? t.exportModal.preparing
                  : `${t.exportModal.downloadPngPrefix} ${selectedSize}×${selectedSize}`}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={onExportSvg}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <FileCode2 className="w-4 h-4" />
                <span>{t.exportModal.downloadSvg}</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.exportModal.copiedSvg : t.exportModal.copySvg}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
