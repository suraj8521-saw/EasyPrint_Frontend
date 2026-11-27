import { PDFDocument, degrees } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export interface EditablePageConfig {
  originalIndex: number;
  selected: boolean;
  rotation: 0 | 90 | 180 | 270;
}

const pdfProxyCache = new WeakMap<ArrayBuffer, Promise<PDFDocumentProxy>>();

export const getCachedPdfProxy = (
  pdfBytes: ArrayBuffer
): Promise<PDFDocumentProxy> => {
  let cached = pdfProxyCache.get(pdfBytes);
  if (!cached) {
    const task = pdfjsLib.getDocument({ data: pdfBytes.slice(0) });
    cached = task.promise;
    pdfProxyCache.set(pdfBytes, cached);
  }
  return cached;
};

export const parsePageRangeInput = (
  input: string,
  totalPages: number
): Set<number> | null => {
  const cleaned = input.trim();
  if (!cleaned) return null;

  const selected = new Set<number>();
  const parts = cleaned.split(",");

  for (const rawPart of parts) {
    const part = rawPart.trim();
    if (!part) continue;

    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = Number(startStr);
      const end = Number(endStr);
      if (
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 1 ||
        end < start ||
        end > totalPages
      ) {
        return null;
      }
      for (let p = start; p <= end; p++) {
        selected.add(p - 1);
      }
    } else {
      const pageNum = Number(part);
      if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
        return null;
      }
      selected.add(pageNum - 1);
    }
  }

  return selected.size > 0 ? selected : null;
};

/**
 * Counts pages in a PDF ArrayBuffer in ~5ms via pdf-lib (never blocks on PDF.js worker).
 */
export const getPdfPageCount = async (pdfBytes: ArrayBuffer): Promise<number> => {
  const doc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  return doc.getPageCount();
};

/**
 * Streams lightweight grid thumbnails in the background worker without blocking clicks.
 */
export const streamPdfThumbnails = async (
  pdfBytes: ArrayBuffer,
  onThumbnailReady: (pageIndex: number, dataUrl: string) => void,
  signal: { cancelled: boolean },
  maxPages = 60
): Promise<void> => {
  const pdf = await getCachedPdfProxy(pdfBytes);
  const count = Math.min(pdf.numPages, maxPages);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  for (let pageNum = 1; pageNum <= count; pageNum++) {
    if (signal.cancelled) return;

    const page = await pdf.getPage(pageNum);
    const unscaled = page.getViewport({ scale: 1 });
    const scale = Math.min(0.45, 220 / Math.max(unscaled.width, 1));
    const viewport = page.getViewport({ scale });

    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.72);
    page.cleanup();

    if (signal.cancelled) return;
    onThumbnailReady(pageNum - 1, dataUrl);

    await new Promise<void>((r) => window.setTimeout(r, 0));
  }
};

/**
 * Renders a single PDF page in razor-sharp HD (up to 1920px wide) for continuous vertical reading.
 */
export const renderHdPdfPageToCanvas = async (
  pdfBytes: ArrayBuffer,
  zeroBasedPageIndex: number,
  rotation: 0 | 90 | 180 | 270,
  canvas: HTMLCanvasElement
): Promise<void> => {
  const pdf = await getCachedPdfProxy(pdfBytes);
  const page = await pdf.getPage(zeroBasedPageIndex + 1);

  const baseRotation = page.rotate || 0;
  const totalRotation = (baseRotation + rotation) % 360;

  const unscaled = page.getViewport({ scale: 1, rotation: totalRotation });
  // Render at crisp 2.2x-2.5x print sharpness (1600px - 1920px wide)
  const targetPixelWidth = Math.min(1920, Math.max(1500, unscaled.width * 2.4));
  const scale = targetPixelWidth / Math.max(unscaled.width, 1);

  const viewport = page.getViewport({ scale, rotation: totalRotation });

  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: ctx, viewport, canvas }).promise;
  page.cleanup();
};

export const buildEditedPdfBlob = async (
  sourceBytes: ArrayBuffer,
  pageConfigs: EditablePageConfig[]
): Promise<{ blob: Blob; pageCount: number }> => {
  const activePages = pageConfigs.filter((p) => p.selected);
  if (activePages.length === 0) {
    throw new Error("Select at least 1 page before applying edits.");
  }

  const srcDoc = await PDFDocument.load(sourceBytes, { ignoreEncryption: true });
  const outDoc = await PDFDocument.create();

  const indices = activePages.map((p) => p.originalIndex);
  const copiedPages = await outDoc.copyPages(srcDoc, indices);

  copiedPages.forEach((page, idx) => {
    const extraRotation = activePages[idx].rotation;
    if (extraRotation !== 0) {
      const currentAngle = page.getRotation().angle;
      page.setRotation(degrees((currentAngle + extraRotation) % 360));
    }
    outDoc.addPage(page);
  });

  const savedBytes = await outDoc.save();
  const blob = new Blob([savedBytes.slice()], { type: "application/pdf" });
  return { blob, pageCount: outDoc.getPageCount() };
};

export type PhotoLayoutPreset =
  | "ID_CARD_DUAL"
  | "ID_CARD_SINGLE"
  | "GRID_2_PER_PAGE"
  | "GRID_3_PER_PAGE"
  | "GRID_4_PER_PAGE"
  | "ONE_PER_PAGE";

export const compileImagesToA4PdfBlob = async (
  imageDataUrls: string[],
  preset: PhotoLayoutPreset
): Promise<{ blob: Blob; pageCount: number }> => {
  if (imageDataUrls.length === 0) {
    throw new Error("Add at least one image to generate a printable PDF.");
  }

  const pdfDoc = await PDFDocument.create();
  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;
  const MARGIN = 36;

  const embeddedImages = await Promise.all(
    imageDataUrls.map(async (dataUrl) => {
      const res = await fetch(dataUrl);
      const bytes = await res.arrayBuffer();
      return dataUrl.startsWith("data:image/png")
        ? pdfDoc.embedPng(bytes)
        : pdfDoc.embedJpg(bytes);
    })
  );

  const ID_CARD_W = 250;
  const ID_CARD_H = 158;

  if (preset === "ID_CARD_DUAL") {
    for (let i = 0; i < embeddedImages.length; i += 2) {
      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      const front = embeddedImages[i];
      const fScale = Math.min(ID_CARD_W / front.width, ID_CARD_H / front.height);
      const fw = front.width * fScale;
      const fh = front.height * fScale;
      page.drawImage(front, {
        x: (A4_WIDTH - fw) / 2,
        y: A4_HEIGHT - 120 - fh,
        width: fw,
        height: fh,
      });

      if (embeddedImages[i + 1]) {
        const back = embeddedImages[i + 1];
        const bScale = Math.min(ID_CARD_W / back.width, ID_CARD_H / back.height);
        const bw = back.width * bScale;
        const bh = back.height * bScale;
        page.drawImage(back, {
          x: (A4_WIDTH - bw) / 2,
          y: A4_HEIGHT - 120 - fh - 36 - bh,
          width: bw,
          height: bh,
        });
      }
    }
  } else if (preset === "ID_CARD_SINGLE") {
    for (const img of embeddedImages) {
      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      const scale = Math.min(ID_CARD_W / img.width, ID_CARD_H / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      page.drawImage(img, {
        x: (A4_WIDTH - w) / 2,
        y: A4_HEIGHT - 140 - h,
        width: w,
        height: h,
      });
    }
  } else {
    const perPage =
      preset === "GRID_2_PER_PAGE"
        ? 2
        : preset === "GRID_3_PER_PAGE"
        ? 3
        : preset === "GRID_4_PER_PAGE"
        ? 4
        : 1;

    const cols = preset === "GRID_4_PER_PAGE" ? 2 : 1;
    const rows = Math.ceil(perPage / cols);
    const gap = 18;
    const usableW = A4_WIDTH - MARGIN * 2 - gap * (cols - 1);
    const usableH = A4_HEIGHT - MARGIN * 2 - gap * (rows - 1);
    const cellW = usableW / cols;
    const cellH = usableH / rows;

    for (let i = 0; i < embeddedImages.length; i += perPage) {
      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      const slice = embeddedImages.slice(i, i + perPage);

      slice.forEach((img, slotIdx) => {
        const col = slotIdx % cols;
        const row = Math.floor(slotIdx / cols);
        const scale = Math.min(cellW / img.width, cellH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;

        const cellX = MARGIN + col * (cellW + gap);
        const cellTopY = A4_HEIGHT - MARGIN - row * (cellH + gap);

        page.drawImage(img, {
          x: cellX + (cellW - drawW) / 2,
          y: cellTopY - cellH + (cellH - drawH) / 2,
          width: drawW,
          height: drawH,
        });
      });
    }
  }

  const savedBytes = await pdfDoc.save();
  return {
    blob: new Blob([savedBytes.slice()], { type: "application/pdf" }),
    pageCount: pdfDoc.getPageCount(),
  };
};