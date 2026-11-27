import { useRef, useState, type ChangeEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileSliders,
  FileText,
  FileUp,
  ImagePlus,
  Loader2,
  Plus,
  Receipt,
  Sparkles,
  Trash2,
} from "lucide-react";
import type {
  CartItemRequestPayload,
  DraftOrderResponse,
  PublicShopProfile,
  SessionMode,
  StagedCartItem,
} from "../types/customer.types";
import {
  ALL_BINDING_TYPES,
  ALL_COLOR_MODES,
  ALL_PAPER_SIZES,
  ALL_PRINT_SIDES,
  estimateItemCost,
  getDefaultPrintOptions,
} from "../utils/pricingUtils";
import { getPdfPageCount } from "../utils/pdfUtils";
import {
  createDraftOrderApi,
  generateCloudinaryUploadSignature,
  uploadPdfBlobToCloudinary,
} from "../api/customerCheckoutApi";
import PdfEditorModal from "./PdfEditorModal";
import PhotoLayoutStudioModal from "./PhotoLayoutStudioModal";

interface PrintCartWorkspaceProps {
  shop: PublicShopProfile;
  sessionMode: SessionMode;
  userEmail?: string;
}

const MAX_CART_ITEMS = 10;

const PrintCartWorkspace = ({
  shop,
  sessionMode,
  userEmail,
}: PrintCartWorkspaceProps) => {
  const pdfInputRef = useRef<HTMLInputElement | null>(null);

  const [items, setItems] = useState<StagedCartItem[]>([]);
  const [isReadingPdf, setIsReadingPdf] = useState(false);
  const [editingPdfItemId, setEditingPdfItemId] = useState<string | null>(null);
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false);

  // Batch upload & server draft bill state
  const [isUploadingBatch, setIsUploadingBatch] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(
    null
  );
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);
  const [draftOrder, setDraftOrder] = useState<DraftOrderResponse | null>(null);
  const [uploadSessionToken, setUploadSessionToken] = useState<string | null>(
    null
  );

  const editingPdfItem =
    items.find((item) => item.id === editingPdfItemId) || null;

  const handleSelectPdfFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;
    setWorkspaceError(null);
    setDraftOrder(null);
    setIsReadingPdf(true);

    if (items.length + selectedFiles.length > MAX_CART_ITEMS) {
      setWorkspaceError(
        `Maximum ${MAX_CART_ITEMS} documents allowed per print order.`
      );
      setIsReadingPdf(false);
      e.target.value = "";
      return;
    }

    const defaults = getDefaultPrintOptions(shop);

    try {
      const stagedAdditions: StagedCartItem[] = [];
      for (const file of selectedFiles) {
        if (
          file.type !== "application/pdf" &&
          !file.name.toLowerCase().endsWith(".pdf")
        ) {
          throw new Error(
            `"${file.name}" is not a PDF. Use Photo Studio for images.`
          );
        }
        const arrayBuffer = await file.arrayBuffer();
        const pageCount = await getPdfPageCount(arrayBuffer);

        stagedAdditions.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          sourceType: "PDF",
          fileName: file.name,
          originalPdfBytes: arrayBuffer,
          finalPdfBlob: new Blob([arrayBuffer], { type: "application/pdf" }),
          pageCount,
          fileSizeBytes: file.size,
          ...defaults,
          copies: 1,
          isEdited: false,
        });
      }

      setItems((prev) => [...prev, ...stagedAdditions]);
    } catch (err) {
      setWorkspaceError(
        err instanceof Error ? err.message : "Failed to read selected PDF."
      );
    } finally {
      setIsReadingPdf(false);
      e.target.value = "";
    }
  };

  const handleApplyPdfEdits = (
    itemId: string,
    editedBlob: Blob,
    newPageCount: number
  ) => {
    setDraftOrder(null);
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              finalPdfBlob: editedBlob,
              pageCount: newPageCount,
              fileSizeBytes: editedBlob.size,
              isEdited: true,
            }
          : item
      )
    );
    setEditingPdfItemId(null);
  };

  const handleAddPhotoPdfItem = (
    pdfBlob: Blob,
    fileName: string,
    pageCount: number
  ) => {
    setWorkspaceError(null);
    setDraftOrder(null);

    if (items.length >= MAX_CART_ITEMS) {
      setWorkspaceError(`Maximum ${MAX_CART_ITEMS} documents allowed per order.`);
      setIsPhotoStudioOpen(false);
      return;
    }

    const defaults = getDefaultPrintOptions(shop);
    setItems((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        sourceType: "PHOTO_LAYOUT",
        fileName,
        finalPdfBlob: pdfBlob,
        pageCount,
        fileSizeBytes: pdfBlob.size,
        ...defaults,
        copies: 1,
        isEdited: true,
      },
    ]);
    setIsPhotoStudioOpen(false);
  };

  const updateItemOption = <K extends keyof StagedCartItem>(
    itemId: string,
    field: K,
    value: StagedCartItem[K]
  ) => {
    setDraftOrder(null);
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setDraftOrder(null);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Sequential upload of all finalized PDFs to Cloudinary -> POST /customer/checkout/draft
  const handleContinueBatchUpload = async () => {
    if (items.length === 0) return;
    setWorkspaceError(null);
    setIsUploadingBatch(true);

    try {
      let currentSessionToken = uploadSessionToken;
      const uploadedItems: CartItemRequestPayload[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        setUploadProgressText(
          `Uploading document ${i + 1} of ${items.length}: ${item.fileName}...`
        );

        const sig = await generateCloudinaryUploadSignature(
          currentSessionToken
        );
        currentSessionToken = sig.uploadSessionToken;
        setUploadSessionToken(sig.uploadSessionToken);

        const publicId = await uploadPdfBlobToCloudinary(
          item.finalPdfBlob,
          item.fileName,
          sig
        );

        uploadedItems.push({
          publicId,
          fileName: item.fileName,
          colorMode: item.colorMode,
          paperSize: item.paperSize,
          printSide: item.printSide,
          bindingType: item.bindingType,
          copies: item.copies,
        });
      }

      if (!currentSessionToken) {
        throw new Error("Missing upload session token.");
      }

      setUploadProgressText("Verifying documents & calculating exact bill...");
      const draft = await createDraftOrderApi({
        shopCode: shop.shopCode,
        customerEmail: userEmail,
        uploadSessionToken: currentSessionToken,
        orderCategory: "PRINTING",
        items: uploadedItems,
      });

      setDraftOrder(draft);
    } catch (err) {
      setWorkspaceError(
        err instanceof Error
          ? err.message
          : "Upload or price verification failed. Please try again."
      );
    } finally {
      setIsUploadingBatch(false);
      setUploadProgressText(null);
    }
  };

  const estimatedTotal = items.reduce(
    (sum, item) => sum + estimateItemCost(item, shop),
    0
  );

  return (
    <div className="space-y-6">
      {/* Dual Entry Toolbar: Upload PDF vs Upload Photos / ID Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => pdfInputRef.current?.click()}
          disabled={
            isUploadingBatch || isReadingPdf || items.length >= MAX_CART_ITEMS
          }
          className="group flex cursor-pointer items-center justify-between rounded-2xl border-2 border-purple-200 bg-purple-50/60 p-4 text-left transition hover:border-purple-600 hover:bg-purple-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-purple-500"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-700 text-white shadow-md shadow-purple-700/20">
              {isReadingPdf ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <FileUp className="h-6 w-6" />
              )}
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                {isReadingPdf ? "Reading PDF..." : "Select PDF Document(s)"}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Upload PDFs & customize page range, rotation, or order
              </p>
            </div>
          </div>
          <Plus className="h-5 w-5 text-purple-700 transition-transform group-hover:scale-110 dark:text-purple-400" />
        </button>

        <input
          ref={pdfInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={handleSelectPdfFiles}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => setIsPhotoStudioOpen(true)}
          disabled={isUploadingBatch || items.length >= MAX_CART_ITEMS}
          className="group flex cursor-pointer items-center justify-between rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-4 text-left transition hover:border-indigo-600 hover:bg-indigo-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-indigo-500"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <ImagePlus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                Upload Photos / ID Cards
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Aadhaar Front+Back, PAN Card, or multi-photo A4 sheet
              </p>
            </div>
          </div>
          <CreditCard className="h-5 w-5 text-indigo-600 transition-transform group-hover:scale-110 dark:text-indigo-400" />
        </button>
      </div>

      {workspaceError && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{workspaceError}</span>
        </div>
      )}

      {/* Staged Cart Items */}
      {items.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Print Queue ({items.length}/{MAX_CART_ITEMS})
            </h3>
            <span className="text-xs font-medium text-slate-500">
              All edits stay local until you click Continue
            </span>
          </div>

          {items.map((item) => {
            const itemEstimate = estimateItemCost(item, shop);

            return (
              <div
                key={item.id}
                className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/50"
              >
                {/* Top File Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="max-w-[200px] truncate text-sm font-extrabold text-slate-900 dark:text-white sm:max-w-xs">
                          {item.fileName}
                        </p>
                        {item.isEdited && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Edited Ready
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {item.pageCount} page{item.pageCount === 1 ? "" : "s"} •{" "}
                        {(item.fileSizeBytes / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.sourceType === "PDF" && item.originalPdfBytes && (
                      <button
                        type="button"
                        onClick={() => setEditingPdfItemId(item.id)}
                        disabled={isUploadingBatch}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-purple-300 bg-white px-3 py-2 text-xs font-bold text-purple-800 shadow-sm transition hover:bg-purple-50 dark:border-purple-800 dark:bg-slate-900 dark:text-purple-300"
                      >
                        <FileSliders className="h-3.5 w-3.5" />
                        Edit PDF
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={isUploadingBatch}
                      aria-label="Remove item"
                      className="rounded-xl border border-red-200 bg-white p-2 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-900 dark:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Print Configuration Options (Dynamically Enabled/Disabled per Shop Config) */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {/* Color Mode */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase text-slate-500">
                      Color Mode
                    </label>
                    <select
                      value={item.colorMode}
                      disabled={isUploadingBatch}
                      onChange={(e) =>
                        updateItemOption(
                          item.id,
                          "colorMode",
                          e.target.value as StagedCartItem["colorMode"]
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      {ALL_COLOR_MODES.map((opt) => {
                        const rate = shop.colorPrices?.[opt.value];
                        const enabled = rate !== undefined;
                        return (
                          <option
                            key={opt.value}
                            value={opt.value}
                            disabled={!enabled}
                          >
                            {opt.label}{" "}
                            {enabled ? `(₹${rate}/pg)` : "(Unavailable)"}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Paper Size */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase text-slate-500">
                      Paper Size
                    </label>
                    <select
                      value={item.paperSize}
                      disabled={isUploadingBatch}
                      onChange={(e) =>
                        updateItemOption(
                          item.id,
                          "paperSize",
                          e.target.value as StagedCartItem["paperSize"]
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      {ALL_PAPER_SIZES.map((opt) => {
                        const mult = shop.sizeMultipliers?.[opt.value];
                        const enabled = mult !== undefined;
                        return (
                          <option
                            key={opt.value}
                            value={opt.value}
                            disabled={!enabled}
                          >
                            {opt.label} {enabled ? `(${mult}x)` : "(Unavailable)"}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Print Side */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase text-slate-500">
                      Print Side
                    </label>
                    <select
                      value={item.printSide}
                      disabled={isUploadingBatch}
                      onChange={(e) =>
                        updateItemOption(
                          item.id,
                          "printSide",
                          e.target.value as StagedCartItem["printSide"]
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      {ALL_PRINT_SIDES.map((opt) => {
                        const mult = shop.sideMultipliers?.[opt.value];
                        const enabled = mult !== undefined;
                        return (
                          <option
                            key={opt.value}
                            value={opt.value}
                            disabled={!enabled}
                          >
                            {opt.label} {enabled ? `(${mult}x)` : "(Unavailable)"}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Binding Type */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase text-slate-500">
                      Binding
                    </label>
                    <select
                      value={item.bindingType}
                      disabled={isUploadingBatch}
                      onChange={(e) =>
                        updateItemOption(
                          item.id,
                          "bindingType",
                          e.target.value as StagedCartItem["bindingType"]
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      {ALL_BINDING_TYPES.map((opt) => {
                        const price = shop.bindingPrices?.[opt.value];
                        const enabled = price !== undefined;
                        return (
                          <option
                            key={opt.value}
                            value={opt.value}
                            disabled={!enabled}
                          >
                            {opt.label}{" "}
                            {enabled
                              ? price > 0
                                ? `(+₹${price})`
                                : "(Free)"
                              : "(Unavailable)"}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Copies */}
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase text-slate-500">
                      Copies
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={item.copies}
                      disabled={isUploadingBatch}
                      onChange={(e) =>
                        updateItemOption(
                          item.id,
                          "copies",
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end border-t border-slate-200/70 pt-2.5 text-xs dark:border-slate-700/70">
                  <span className="text-slate-500">
                    Estimated Item Cost:{" "}
                    <strong className="text-sm font-extrabold text-slate-900 dark:text-white">
                      ₹{itemEstimate.toFixed(2)}
                    </strong>
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bottom Continue Action Bar */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-purple-200 bg-purple-50/70 p-4 dark:border-purple-900/50 dark:bg-purple-950/30 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Estimated Subtotal ({items.length} file
                {items.length === 1 ? "" : "s"})
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                ₹{estimatedTotal.toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleContinueBatchUpload}
              disabled={isUploadingBatch || !shop.acceptingOrders}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-purple-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-purple-700/25 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploadingBatch ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{uploadProgressText || "Uploading..."}</span>
                </>
              ) : (
                <>
                  <span>Continue & Verify Bill</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-purple-200/90 bg-purple-50/30 p-8 text-center dark:border-slate-800 dark:bg-slate-800/30">
          <Sparkles className="mx-auto h-8 w-8 text-purple-600" />
          <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            Select PDFs or Photos above to begin
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Unsupported paper sizes or bindings for {shop.shopName} are
            automatically disabled.
          </p>
        </div>
      )}

      {/* Authoritative Server-Verified Draft Bill Summary (Returned after Cloudinary Upload) */}
      {draftOrder && (
        <div className="space-y-4 rounded-3xl border-2 border-emerald-400/80 bg-white p-5 shadow-xl dark:border-emerald-700/70 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Verified Print Bill • {draftOrder.orderCode}
                </h4>
                <p className="text-xs text-slate-500">
                  Server-verified page counts & shop pricing ({sessionMode} Mode)
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {draftOrder.status}
            </span>
          </div>

          <div className="divide-y divide-slate-200/70 dark:divide-slate-800">
            {draftOrder.items.map((job) => (
              <div
                key={job.jobId}
                className="flex items-center justify-between py-2.5 text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {job.fileName}
                  </p>
                  <p className="text-slate-500">
                    {job.verifiedPages} verified pg × {job.copies} copies •{" "}
                    {job.colorMode} • {job.paperSize} • {job.printSide} •{" "}
                    {job.bindingType}
                  </p>
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  ₹{Number(job.jobCost).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-200">
              <Receipt className="h-4 w-4 text-purple-600" />
              Authoritative Total Payable
            </span>
            <span className="text-xl font-black text-purple-700 dark:text-purple-300">
              ₹{Number(draftOrder.totalAmount).toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Modals */}
      {editingPdfItem && editingPdfItem.originalPdfBytes && (
        <PdfEditorModal
          fileName={editingPdfItem.fileName}
          originalPdfBytes={editingPdfItem.originalPdfBytes}
          onApply={(blob, pageCount) =>
            handleApplyPdfEdits(editingPdfItem.id, blob, pageCount)
          }
          onClose={() => setEditingPdfItemId(null)}
        />
      )}

      {isPhotoStudioOpen && (
        <PhotoLayoutStudioModal
          onApply={handleAddPhotoPdfItem}
          onClose={() => setIsPhotoStudioOpen(false)}
        />
      )}
    </div>
  );
};

export default PrintCartWorkspace;