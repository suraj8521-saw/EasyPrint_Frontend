import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  FileSliders,
  Loader2,
  RotateCw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  buildEditedPdfBlob,
  getCachedPdfProxy,
  parsePageRangeInput,
  renderHdPdfPageToCanvas,
  streamPdfThumbnails,
  type EditablePageConfig,
} from "../utils/pdfUtils";

interface PdfEditorModalProps {
  fileName: string;
  originalPdfBytes: ArrayBuffer;
  onApply: (editedBlob: Blob, newPageCount: number) => void;
  onClose: () => void;
}

interface HdPreviewPageProps {
  pdfBytes: ArrayBuffer;
  originalIndex: number;
  rotation: 0 | 90 | 180 | 270;
  displayPageNum: number;
  totalSelected: number;
}

/**
 * Renders an individual page in razor-sharp HD lazily when scrolled into view
 * (long-format continuous vertical document viewer).
 */
const HdPreviewPage = ({
  pdfBytes,
  originalIndex,
  rotation,
  displayPageNum,
  totalSelected,
}: HdPreviewPageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          if (canvasRef.current && !cancelled) {
            renderHdPdfPageToCanvas(
              pdfBytes,
              originalIndex,
              rotation,
              canvasRef.current
            ).then(() => {
              if (!cancelled) setIsRendered(true);
            });
          }
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [pdfBytes, originalIndex, rotation]);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-300/90 bg-white shadow-lg dark:border-slate-700"
    >
      {/* Document Page Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/90 px-4 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
        <span>
          Page {displayPageNum} of {totalSelected}
        </span>
        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
          Source Pg #{originalIndex + 1}
          {rotation > 0 ? ` • Rotated ${rotation}°` : ""}
        </span>
      </div>

      {/* Crisp HD Canvas */}
      <div className="relative flex min-h-[340px] w-full items-center justify-center bg-white">
        {!isRendered && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block h-auto w-full object-contain"
        />
      </div>
    </div>
  );
};

const PdfEditorModal = ({
  fileName,
  originalPdfBytes,
  onApply,
  onClose,
}: PdfEditorModalProps) => {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [pages, setPages] = useState<EditablePageConfig[]>([]);
  const [rangeText, setRangeText] = useState("");
  const [rangeError, setRangeError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"EDIT" | "PREVIEW">("EDIT");
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const signal = { cancelled: false };

    const init = async () => {
      const pdf = await getCachedPdfProxy(originalPdfBytes);
      if (signal.cancelled) return;

      // Render page cards immediately without waiting for thumbnails
      setPages(
        Array.from({ length: pdf.numPages }, (_, idx) => ({
          originalIndex: idx,
          selected: true,
          rotation: 0,
        }))
      );

      // Stream lightweight thumbnails smoothly in the background worker
      await streamPdfThumbnails(
        originalPdfBytes,
        (pageIndex, dataUrl) => {
          setThumbnails((prev) => ({ ...prev, [pageIndex]: dataUrl }));
        },
        signal,
        80
      );
    };

    init();
    return () => {
      signal.cancelled = true;
    };
  }, [originalPdfBytes]);

  const handleApplyRangeFilter = () => {
    setRangeError(null);
    const parsed = parsePageRangeInput(rangeText, pages.length);
    if (!parsed) {
      setRangeError(
        `Enter valid page numbers between 1 and ${pages.length} (e.g., 1-3, 5).`
      );
      return;
    }
    setPages((prev) =>
      prev.map((p) => ({
        ...p,
        selected: parsed.has(p.originalIndex),
      }))
    );
  };

  const toggleSelectAll = (selectAll: boolean) => {
    setRangeError(null);
    setPages((prev) => prev.map((p) => ({ ...p, selected: selectAll })));
  };

  const togglePage = (idx: number) => {
    setPages((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, selected: !p.selected } : p))
    );
  };

  const rotatePage = (idx: number) => {
    setPages((prev) =>
      prev.map((p, i) =>
        i === idx
          ? { ...p, rotation: ((p.rotation + 90) % 360) as 0 | 90 | 180 | 270 }
          : p
      )
    );
  };

  const movePage = (idx: number, direction: -1 | 1) => {
    const target = idx + direction;
    if (target < 0 || target >= pages.length) return;
    setPages((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(idx, 1);
      copy.splice(target, 0, moved);
      return copy;
    });
  };

  const handleConfirmApply = async () => {
    setRangeError(null);
    setIsApplying(true);
    try {
      const { blob, pageCount } = await buildEditedPdfBlob(
        originalPdfBytes,
        pages
      );
      onApply(blob, pageCount);
    } catch (err) {
      setRangeError(
        err instanceof Error ? err.message : "Failed to apply PDF edits."
      );
    } finally {
      setIsApplying(false);
    }
  };

  const selectedPages = pages.filter((p) => p.selected);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-purple-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              <FileSliders className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">
                Edit & Preview PDF
              </h2>
              <p className="max-w-[230px] truncate text-xs text-slate-500 sm:max-w-md">
                {fileName} • {selectedPages.length} of {pages.length} pages
                selected
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("EDIT")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "EDIT"
                  ? "bg-purple-700 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              1. Select & Arrange Pages
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("PREVIEW")}
              disabled={selectedPages.length === 0}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition disabled:opacity-50 ${
                activeTab === "PREVIEW"
                  ? "bg-purple-700 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              2. Full Document Preview ({selectedPages.length})
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-slate-100/70 p-4 dark:bg-slate-950/60 sm:p-6">
          {activeTab === "EDIT" ? (
            <div className="space-y-4">
              {/* Custom Page Range Toolbar */}
              <div className="flex flex-col gap-2.5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={rangeText}
                  onChange={(e) => {
                    setRangeText(e.target.value);
                    setRangeError(null);
                  }}
                  placeholder={`Custom range e.g. 1-3, 5 (max ${pages.length})`}
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleApplyRangeFilter}
                    className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-purple-700"
                  >
                    Apply Range
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSelectAll(true)}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSelectAll(false)}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {rangeError && (
                <p className="rounded-xl bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300">
                  {rangeError}
                </p>
              )}

              {/* Visual Page Grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
                {pages.map((pageCfg, idx) => {
                  const thumbSrc = thumbnails[pageCfg.originalIndex];
                  return (
                    <div
                      key={`${pageCfg.originalIndex}-${idx}`}
                      className={`group relative flex flex-col rounded-2xl border-2 bg-white p-2.5 transition dark:bg-slate-900 ${
                        pageCfg.selected
                          ? "border-purple-600 shadow-sm dark:border-purple-500"
                          : "border-slate-200 opacity-55 dark:border-slate-800"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => togglePage(idx)}
                        className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950"
                      >
                        {thumbSrc ? (
                          <img
                            src={thumbSrc}
                            alt={`Page ${pageCfg.originalIndex + 1}`}
                            style={{
                              transform: `rotate(${pageCfg.rotation}deg)`,
                            }}
                            className="max-h-full max-w-full object-contain transition-transform duration-150"
                          />
                        ) : (
                          <span className="text-xs font-bold text-slate-400">
                            Page {pageCfg.originalIndex + 1}
                          </span>
                        )}

                        <span
                          className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            pageCfg.selected
                              ? "bg-purple-700 text-white"
                              : "bg-slate-300 text-slate-700"
                          }`}
                        >
                          {pageCfg.selected ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            pageCfg.originalIndex + 1
                          )}
                        </span>
                      </button>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          Pg {pageCfg.originalIndex + 1}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => movePage(idx, -1)}
                            disabled={idx === 0}
                            title="Move Left"
                            className="rounded-lg p-1 text-slate-600 hover:bg-slate-200 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700"
                          >
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => rotatePage(idx)}
                            title="Rotate 90°"
                            className="rounded-lg p-1 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
                          >
                            <RotateCw className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => movePage(idx, 1)}
                            disabled={idx === pages.length - 1}
                            title="Move Right"
                            className="rounded-lg p-1 text-slate-600 hover:bg-slate-200 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700"
                          >
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Long-Format Continuous Vertical HD Document Viewer */
            <div className="space-y-6">
              <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                Scroll vertically to inspect all{" "}
                <strong>{selectedPages.length} selected page(s)</strong> in full
                HD resolution, then click <strong>Apply Edited PDF</strong>.
              </div>

              {selectedPages.map((pageCfg, idx) => (
                <HdPreviewPage
                  key={`${pageCfg.originalIndex}-${pageCfg.rotation}-${idx}`}
                  pdfBytes={originalPdfBytes}
                  originalIndex={pageCfg.originalIndex}
                  rotation={pageCfg.rotation}
                  displayPageNum={idx + 1}
                  totalSelected={selectedPages.length}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2.5">
            {activeTab === "EDIT" ? (
              <button
                type="button"
                onClick={() => setActiveTab("PREVIEW")}
                disabled={selectedPages.length === 0}
                className="inline-flex items-center gap-1.5 rounded-xl border border-purple-300 bg-purple-50 px-4 py-2.5 text-xs font-bold text-purple-800 hover:bg-purple-100 disabled:opacity-50 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-200"
              >
                <Eye className="h-4 w-4" />
                Full Preview
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab("EDIT")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Back to Edit
              </button>
            )}

            <button
              type="button"
              onClick={handleConfirmApply}
              disabled={selectedPages.length === 0 || isApplying}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-purple-700/25 hover:bg-purple-800 disabled:opacity-50"
            >
              {isApplying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Apply Edited PDF ({selectedPages.length} pg)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfEditorModal;