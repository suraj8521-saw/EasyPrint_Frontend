import {
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentType,
} from "react";
import Cropper, { type Area, type CropperProps } from "react-easy-crop";
import {
  CheckCircle2,
  CreditCard,
  ImagePlus,
  LayoutGrid,
  Loader2,
  RotateCw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  compileImagesToA4PdfBlob,
  type PhotoLayoutPreset,
} from "../utils/pdfUtils";

const EasyCropper =
  (Cropper as unknown as { default?: ComponentType<Partial<CropperProps>> })
    .default ?? (Cropper as unknown as ComponentType<Partial<CropperProps>>);

interface PhotoItem {
  id: string;
  src: string;
  name: string;
  croppedDataUrl: string;
  bwFilter: boolean;
}

interface PhotoLayoutStudioModalProps {
  onApply: (pdfBlob: Blob, fileName: string, pageCount: number) => void;
  onClose: () => void;
}

const LAYOUT_OPTIONS: {
  id: PhotoLayoutPreset;
  label: string;
  desc: string;
}[] = [
  {
    id: "ID_CARD_DUAL",
    label: "Aadhaar / ID Card (Front + Back)",
    desc: "Front & back stacked cleanly on 1 A4 sheet",
  },
  {
    id: "ID_CARD_SINGLE",
    label: "PAN / Single ID Card",
    desc: "Single standard ID size centered on A4",
  },
  {
    id: "GRID_2_PER_PAGE",
    label: "2 Photos on 1 Page",
    desc: "Two large photos arranged per A4 page",
  },
  {
    id: "GRID_3_PER_PAGE",
    label: "3 Photos on 1 Page",
    desc: "Three stacked photos on 1 A4 page",
  },
  {
    id: "GRID_4_PER_PAGE",
    label: "4 Photos (2×2 Grid)",
    desc: "Four photos per A4 sheet",
  },
  {
    id: "ONE_PER_PAGE",
    label: "1 Photo Per Page",
    desc: "Each photo placed on its own A4 page",
  },
];

async function renderCroppedCanvas(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
  bwFilter: boolean
): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image for cropping."));
    img.src = imageSrc;
  });

  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const rotW = Math.floor(image.width * cos + image.height * sin);
  const rotH = Math.floor(image.width * sin + image.height * cos);

  const rotCanvas = document.createElement("canvas");
  rotCanvas.width = rotW;
  rotCanvas.height = rotH;
  const rCtx = rotCanvas.getContext("2d");
  if (!rCtx) {
    throw new Error("2D canvas context unavailable.");
  }

  rCtx.translate(rotW / 2, rotH / 2);
  rCtx.rotate(radians);
  rCtx.drawImage(image, -image.width / 2, -image.height / 2);

  const outCanvas = document.createElement("canvas");
  const scaleDown = Math.min(
    1,
    1600 / Math.max(pixelCrop.width, pixelCrop.height, 1)
  );
  outCanvas.width = Math.max(1, Math.floor(pixelCrop.width * scaleDown));
  outCanvas.height = Math.max(1, Math.floor(pixelCrop.height * scaleDown));

  const oCtx = outCanvas.getContext("2d");
  if (!oCtx) {
    throw new Error("2D output canvas context unavailable.");
  }

  if (bwFilter) {
    oCtx.filter = "grayscale(100%) contrast(135%) brightness(105%)";
  }

  oCtx.drawImage(
    rotCanvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outCanvas.width,
    outCanvas.height
  );

  return outCanvas.toDataURL("image/jpeg", 0.88);
}

const PhotoLayoutStudioModal = ({
  onApply,
  onClose,
}: PhotoLayoutStudioModalProps) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null);
  const [layoutPreset, setLayoutPreset] =
    useState<PhotoLayoutPreset>("ID_CARD_DUAL");
  const [documentTitle, setDocumentTitle] = useState("ID_Card_Print");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activePhoto = photos.find((p) => p.id === activePhotoId) || null;
  const isIdCardPreset =
    layoutPreset === "ID_CARD_DUAL" || layoutPreset === "ID_CARD_SINGLE";

  const handleFilesSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setError(null);

    const newItems: PhotoItem[] = await Promise.all(
      files.map(
        (file) =>
          new Promise<PhotoItem>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = String(reader.result);
              resolve({
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                src: dataUrl,
                name: file.name,
                croppedDataUrl: dataUrl,
                bwFilter: false,
              });
            };
            reader.readAsDataURL(file);
          })
      )
    );

    setPhotos((prev) => {
      const updated = [...prev, ...newItems];
      if (!activePhotoId && updated[0]) {
        setActivePhotoId(updated[0].id);
      }
      return updated;
    });
    e.target.value = "";
  };

  const onCropComplete = useCallback((_area: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSaveCurrentCrop = async () => {
    if (!activePhoto || !croppedAreaPixels) return;
    const cropped = await renderCroppedCanvas(
      activePhoto.src,
      croppedAreaPixels,
      rotation,
      activePhoto.bwFilter
    );
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === activePhoto.id ? { ...p, croppedDataUrl: cropped } : p
      )
    );
  };

  const handleToggleScanFilter = async () => {
    if (!activePhoto) return;
    const nextFilter = !activePhoto.bwFilter;
    let updatedUrl = activePhoto.croppedDataUrl;
    if (croppedAreaPixels) {
      updatedUrl = await renderCroppedCanvas(
        activePhoto.src,
        croppedAreaPixels,
        rotation,
        nextFilter
      );
    }
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === activePhoto.id
          ? { ...p, bwFilter: nextFilter, croppedDataUrl: updatedUrl }
          : p
      )
    );
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      if (activePhotoId === id) {
        setActivePhotoId(filtered[0]?.id ?? null);
      }
      return filtered;
    });
  };

  const handleCompilePdf = async () => {
    if (photos.length === 0) {
      setError("Upload at least one photo or ID card image.");
      return;
    }
    setIsCompiling(true);
    setError(null);
    try {
      let finalUrls = photos.map((p) => p.croppedDataUrl);
      if (activePhoto && croppedAreaPixels) {
        const latestCrop = await renderCroppedCanvas(
          activePhoto.src,
          croppedAreaPixels,
          rotation,
          activePhoto.bwFilter
        );
        finalUrls = photos.map((p) =>
          p.id === activePhoto.id ? latestCrop : p.croppedDataUrl
        );
      }

      const { blob, pageCount } = await compileImagesToA4PdfBlob(
        finalUrls,
        layoutPreset
      );
      const cleanName = `${documentTitle.trim() || "Photo_Print"}.pdf`;
      onApply(blob, cleanName, pageCount);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to compile images to PDF."
      );
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex max-h-[93vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-purple-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">
                Photo & ID Card Studio (Aadhaar / PAN / Multi-Photo)
              </h2>
              <p className="text-xs text-slate-500">
                Crop, enhance, and arrange multiple photos onto printable A4 PDF
                sheets
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

        {/* Content */}
        <div className="grid flex-1 grid-cols-1 gap-5 overflow-y-auto p-5 lg:grid-cols-12">
          {/* Left 7 Cols: Upload & Interactive Cropper */}
          <div className="space-y-4 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-800">
                <ImagePlus className="h-4 w-4" />
                Add Photos / ID Sides
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFilesSelected}
                  className="hidden"
                />
              </label>

              <span className="text-xs font-semibold text-slate-500">
                {photos.length} image{photos.length === 1 ? "" : "s"} added
              </span>
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 0 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className={`relative shrink-0 rounded-xl border-2 p-1 ${
                      photo.id === activePhotoId
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/30"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActivePhotoId(photo.id);
                        setCrop({ x: 0, y: 0 });
                        setZoom(1);
                        setRotation(0);
                      }}
                      className="block h-16 w-20 overflow-hidden rounded-lg bg-slate-100"
                    >
                      <img
                        src={photo.croppedDataUrl}
                        alt={photo.name}
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <span className="mt-1 block text-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="absolute -right-1.5 -top-1.5 rounded-full bg-red-600 p-1 text-white shadow"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Crop Area */}
            {activePhoto ? (
              <div className="space-y-3">
                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-950 sm:h-72">
                  <EasyCropper
                    image={activePhoto.src}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={isIdCardPreset ? 1.586 : 4 / 3}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                      Rotate 90°
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleScanFilter}
                      className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                        activePhoto.bwFilter
                          ? "bg-slate-900 text-white dark:bg-purple-700"
                          : "border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      {activePhoto.bwFilter ? "Scan B&W: ON" : "B&W Scan Enhance"}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveCurrentCrop}
                    className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    Apply Crop
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center dark:border-slate-700 dark:bg-slate-800/40">
                <ImagePlus className="h-9 w-9 text-purple-600" />
                <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                  Upload Front & Back of Aadhaar, PAN, or multiple photos
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Supports JPG, PNG, and WebP. Crop each image cleanly before
                  generating your A4 print sheet.
                </p>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Page Placement Preset & Document Title */}
          <div className="space-y-4 lg:col-span-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Document Name
              </label>
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="e.g., Aadhaar_Card_Print"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 focus:border-purple-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <LayoutGrid className="h-3.5 w-3.5 text-purple-600" />
                Choose A4 Placement Layout
              </div>

              <div className="space-y-2">
                {LAYOUT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLayoutPreset(opt.id)}
                    className={`w-full rounded-2xl border-2 p-3 text-left transition ${
                      layoutPreset === opt.id
                        ? "border-purple-600 bg-purple-50/70 dark:border-purple-500 dark:bg-purple-950/30"
                        : "border-slate-200 bg-white hover:border-purple-300 dark:border-slate-800 dark:bg-slate-800/50"
                    }`}
                  >
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {opt.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3.5 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCompilePdf}
            disabled={photos.length === 0 || isCompiling}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-purple-700/25 hover:bg-purple-800 disabled:opacity-50"
          >
            {isCompiling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Apply & Add Printable Sheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoLayoutStudioModal;