import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  ScanLine,
  Folder,
  RotateCw,
  Crop,
  Maximize,
  Type,
  Layers,
  Trash2,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ShoppingCart,
  Camera,
  Cloud,
  FileImage,
  SlidersHorizontal,
  RotateCcw,
  Move,
  Check,
  X,
  LoaderCircle,
} from "lucide-react";
import { api } from "../../services/api.js";
import { useAuth } from "../auth/AuthContext.jsx";

const initialSettings = {
  rotation: 0,
  brightness: 100,
  contrast: 100,
  zoom: 100,
  perspectiveX: 0,
  perspectiveY: 0,
  copies: 1,
  color: "bw",
  paper: "A4",
  quality: "Standard",
};
export default function UploadPage() {
  const { session } = useAuth();
  const inputRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState(0);
  const [settings, setSettings] = useState(initialSettings);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploadedJobs, setUploadedJobs] = useState({});
  const [showPerspective, setShowPerspective] = useState(false);
  const [textOverlay, setTextOverlay] = useState("");
  const [showText, setShowText] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [price, setPrice] = useState(0);
  const active = pages[selected];
  const totalPages = pages.length;
  const pagePrice =
    (settings.color === "color" ? 5 : 2) * totalPages * settings.copies;
  useEffect(() => setPrice(pagePrice), [pagePrice]);
  const remember = () => {
    setHistory((h) => [
      ...h.slice(-29),
      {
        pages: pages.map((p) => ({ ...p })),
        selected,
        settings: { ...settings },
      },
    ]);
    setFuture([]);
  };
  const updateSetting = (key, value) => {
    remember();
    setSettings((s) => ({ ...s, [key]: value }));
  };
  const uploadFiles = (files) => {
    const valid = Array.from(files || []).filter((f) =>
      /\.(pdf|png|jpe?g|webp|docx?)$/i.test(f.name),
    );
    if (!valid.length) {
      setNotice("Please choose a PDF, JPG, PNG, WEBP, DOC or DOCX file.");
      return;
    }
    const next = valid.map((file, i) => ({
      id: `${Date.now()}-${i}-${Math.random().toString(16).slice(2)}`,
      file,
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      kind:
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
          ? "pdf"
          : file.type.startsWith("image/")
            ? "image"
            : "document",
    }));
    remember();
    setPages((old) => [...old, ...next]);
    setSelected(pages.length);
    setNotice(
      `${valid.length} file${valid.length > 1 ? "s" : ""} added to your document workspace.`,
    );
  };
  const undo = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setFuture((f) => [
      {
        pages: pages.map((p) => ({ ...p })),
        selected,
        settings: { ...settings },
      },
      ...f,
    ]);
    setPages(prev.pages);
    setSelected(Math.min(prev.selected, Math.max(0, prev.pages.length - 1)));
    setSettings(prev.settings);
    setHistory((h) => h.slice(0, -1));
  };
  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setHistory((h) => [
      ...h,
      {
        pages: pages.map((p) => ({ ...p })),
        selected,
        settings: { ...settings },
      },
    ]);
    setPages(next.pages);
    setSelected(Math.min(next.selected, Math.max(0, next.pages.length - 1)));
    setSettings(next.settings);
    setFuture((f) => f.slice(1));
  };
  const removePage = () => {
    if (!active) return;
    remember();
    const next = pages.filter((_, i) => i !== selected);
    setPages(next);
    setSelected(Math.max(0, Math.min(selected, next.length - 1)));
    setNotice("Selected page removed.");
  };
  const reset = () => {
    remember();
    setSettings(initialSettings);
    setTextOverlay("");
    setNotice("Editor adjustments reset.");
  };
  const rotate = () =>
    updateSetting("rotation", (settings.rotation + 90) % 360);
  const movePage = (direction) => {
    const to = selected + direction;
    if (to < 0 || to >= pages.length) return;
    remember();
    const next = [...pages];
    [next[selected], next[to]] = [next[to], next[selected]];
    setPages(next);
    setSelected(to);
  };

  const uploadToBackend = async () => {
    if (!active) {
      setNotice("Choose a file first, then upload it to the backend.");
      return;
    }

    if (uploadedJobs[active.id]) {
      setNotice(
        `This file is already uploaded. Job ID: ${uploadedJobs[active.id]}`,
      );
      return;
    }

    setBusy(true);
    setNotice("Creating a print job and uploading your file…");

    let processId = "";

    try {
      const guestId =
        session?.userId ||
        (session?.type === "guest"
          ? `guest_${Date.now()}`
          : `user_${session?.email || "account"}`);

      const init = await api.initJob({
        userId: guestId,
        shopId: null,
        originalFileName: active.name,
        fileSizeInBytes: active.file.size,
        pageCount: totalPages,
        printerCategory: `${settings.paper}_${settings.color === "color" ? "COLOR" : "BW"}_LASER`,
      });

      processId = init.processId;

      const sig = await api.uploadSignature(init.cloudFileName);

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      if (!cloudName || cloudName === "your_cloud_name") {
        throw new Error(
          "Set VITE_CLOUDINARY_CLOUD_NAME in .env to enable backend file uploads.",
        );
      }

      const resourceType = active.kind === "image" ? "image" : "raw";

      const body = new FormData();
      body.append("file", active.file);
      body.append("api_key", sig.api_key);
      body.append("timestamp", String(sig.timestamp));
      body.append("signature", sig.signature);
      body.append("upload_preset", "easyprint_user_uploads");
      body.append("public_id", init.cloudFileName);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body,
        },
      );

      const uploaded = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploaded.error?.message || "Cloudinary upload failed");
      }

      await api.confirmJob({
        processId: init.processId,
        cloudFileUrl: uploaded.secure_url,
        status: "SUCCESS",
      });

      setUploadedJobs((prev) => ({
        ...prev,
        [active.id]: init.processId,
      }));

      // Show toast only after successful upload and confirmation
      toast.success("File uploaded successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      setNotice("");
    } catch (e) {
      if (processId) {
        try {
          await api.confirmJob({
            processId,
            cloudFileUrl: "",
            status: "FAILED",
          });
        } catch (confirmError) {
          console.error("Failed to update job status:", confirmError);
        }
      }

      setNotice(
        `Upload failed: ${e?.message || "Something went wrong."}. Check your backend, MongoDB and Cloudinary settings.`,
      );

      console.error("Backend upload error:", e);
    } finally {
      setBusy(false);
    }
  };

  const addToCart = () => {
    if (!active) {
      setNotice("Choose a document before adding it to your cart.");
      return;
    }
    const jobId = uploadedJobs[active.id];
    if (!jobId) {
      setNotice(
        "Your file is selected. Click “Upload to Backend” first, then continue to the cart.",
      );
      return;
    }
    setNotice(
      `Your file is uploaded and ready for the next print-order step. Job ID: ${jobId}`,
    );
  };
  const previewStyle = useMemo(
    () => ({
      filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`,
      transform: `perspective(1000px) rotate(${settings.rotation}deg) scale(${settings.zoom / 100}) rotateY(${settings.perspectiveX}deg) rotateX(${settings.perspectiveY}deg)`,
      transition: "filter .12s, transform .12s",
    }),
    [settings],
  );
  return (
    <div className="upload-page">
      <section className="upload-card">
        <div className="section-title">
          <div>
            <h1>Upload Your Document</h1>
            <p>Choose files, edit if needed, and print at a nearby shop.</p>
          </div>
          <button
            className="button button-outline button-small"
            onClick={() => inputRef.current?.click()}
          >
            <UploadCloud size={17} /> Upload files
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
          hidden
          onChange={(e) => {
            uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="upload-options">
          <button
            className="dropzone"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              uploadFiles(e.dataTransfer.files);
            }}
          >
            <UploadCloud size={58} />
            <strong>Drag & Drop your files here</strong>
            <span>or</span>
            <b>
              <Folder size={20} /> Choose Files
            </b>
            <small>
              Supports PDF, JPG, JPEG, PNG, DOC, DOCX (Max 10 MB per file)
            </small>
          </button>
          <div className="upload-shortcuts">
            <div className="format-grid">
              <button onClick={() => inputRef.current?.click()}>
                <span className="format-icon pdf">
                  <FileText />
                </span>
                <small>Upload PDF</small>
              </button>
              <button onClick={() => inputRef.current?.click()}>
                <span className="format-icon img">
                  <ImageIcon />
                </span>
                <small>Upload Image</small>
              </button>
              <button onClick={() => inputRef.current?.click()}>
                <span className="format-icon doc">
                  <FileText />
                </span>
                <small>Upload DOC</small>
              </button>
              <button
                onClick={() =>
                  setNotice(
                    "Document scanning requires camera permission and a scanning integration.",
                  )
                }
              >
                <span className="format-icon scan">
                  <ScanLine />
                </span>
                <small>Scan Document</small>
              </button>
            </div>
            <div className="quick-options">
              <strong>Quick Options</strong>
              <div className="quick-grid">
                <button
                  onClick={() =>
                    setNotice(
                      "Google Drive import requires Google OAuth configuration.",
                    )
                  }
                >
                  <b className="drive-logo">▲</b>
                  <small>From Google Drive</small>
                </button>
                <button
                  onClick={() =>
                    setNotice(
                      "Dropbox import requires Dropbox OAuth configuration.",
                    )
                  }
                >
                  <b className="dropbox-logo">▦</b>
                  <small>From Dropbox</small>
                </button>
                <button
                  onClick={() =>
                    setNotice(
                      "OneDrive import requires Microsoft OAuth configuration.",
                    )
                  }
                >
                  <Cloud />
                  <small>From OneDrive</small>
                </button>
                <button
                  onClick={() =>
                    setNotice(
                      "Camera capture is available on supported mobile browsers. Use Upload files to select a photo.",
                    )
                  }
                >
                  <Camera />
                  <small>Capture with Camera</small>
                </button>
              </div>
            </div>
          </div>
        </div>
        {pages.length > 0 && (
          <div className="backend-upload-bar">
            <div className="backend-upload-file">
              <FileText size={20} />
              <div>
                <strong>{active?.name || "Selected document"}</strong>
                <small>
                  {active
                    ? `${(active.file.size / 1024 / 1024).toFixed(2)} MB · ${uploadedJobs[active.id] ? `Uploaded · Job ${uploadedJobs[active.id]}` : "Selected locally — not uploaded to backend yet"}`
                    : "Choose a document"}
                </small>
              </div>
            </div>
            <button
              className="button button-primary"
              onClick={uploadToBackend}
              disabled={busy || !active || Boolean(uploadedJobs[active?.id])}
            >
              {busy ? <LoaderCircle className="spin" /> : <UploadCloud />}
              {busy
                ? "Uploading…"
                : uploadedJobs[active?.id]
                  ? "Uploaded"
                  : "Upload"}
            </button>
          </div>
        )}
      </section>
      <section className="editor-card">
        <div className="section-title">
          <div>
            <h2>Edit Your Document</h2>
            <p>Make changes before printing</p>
          </div>
          <div className="history-buttons">
            <button
              className="tool-mini"
              disabled={!history.length}
              onClick={undo}
              title="Undo"
            >
              <Undo2 />
            </button>
            <button
              className="tool-mini"
              disabled={!future.length}
              onClick={redo}
              title="Redo"
            >
              <Redo2 />
            </button>
            <button className="tool-mini" onClick={reset} title="Reset">
              <RotateCcw />
            </button>
          </div>
        </div>
        <div className="edit-toolbar">
          <button className="edit-tool active" onClick={rotate}>
            <RotateCw />
            <span>Rotate</span>
          </button>
          <button
            className={`edit-tool ${cropMode ? "active" : ""}`}
            onClick={() => {
              setCropMode(!cropMode);
              setNotice(
                !cropMode
                  ? "Crop mode selected. Use the crop frame preview and apply controls."
                  : "Crop mode closed.",
              );
            }}
          >
            <Crop />
            <span>Crop</span>
          </button>
          <button
            className="edit-tool"
            onClick={() =>
              updateSetting("zoom", Math.min(200, settings.zoom + 10))
            }
          >
            <Maximize />
            <span>Resize</span>
          </button>
          <button
            className={`edit-tool ${showText ? "active" : ""}`}
            onClick={() => setShowText((v) => !v)}
          >
            <Type />
            <span>Add Text</span>
          </button>
          <button
            className="edit-tool"
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon />
            <span>Add Image</span>
          </button>
          <button className="edit-tool" onClick={() => movePage(1)}>
            <Layers />
            <span>Reorder</span>
          </button>
          <button
            className="edit-tool danger-tool"
            onClick={removePage}
            disabled={!active}
          >
            <Trash2 />
            <span>Delete</span>
          </button>
        </div>
        <div className="document-workspace">
          <aside className="page-thumbnails">
            {pages.map((page, i) => (
              <button
                className={`thumbnail ${i === selected ? "selected" : ""}`}
                key={page.id}
                onClick={() => setSelected(i)}
              >
                <span className="thumbnail-preview">
                  {page.kind === "image" ? (
                    <img src={page.url} alt="" />
                  ) : page.kind === "pdf" ? (
                    <FileText />
                  ) : (
                    <FileImage />
                  )}
                </span>
                <b>{i + 1}</b>
              </button>
            ))}
            {!pages.length && (
              <div className="empty-thumbnails">
                <FileText />
                <small>Pages will appear here</small>
              </div>
            )}
          </aside>
          <div className="document-viewer">
            <div className="preview-stage">
              {active ? (
                <div
                  className={`preview-paper ${cropMode ? "crop-active" : ""}`}
                  style={active.kind === "image" ? previewStyle : {}}
                >
                  {active.kind === "image" ? (
                    <img
                      src={active.url}
                      alt={active.name}
                      className="preview-image"
                      style={previewStyle}
                    />
                  ) : active.kind === "pdf" ? (
                    <iframe
                      src={`${active.url}#toolbar=0&navpanes=0`}
                      title="PDF document preview"
                    />
                  ) : (
                    <div className="unsupported-preview">
                      <FileText size={54} />
                      <strong>{active.name}</strong>
                      <p>
                        Browser preview isn't available for this Word document.
                        You can still include it in your print job.
                      </p>
                    </div>
                  )}
                  {textOverlay && (
                    <div className="text-overlay">{textOverlay}</div>
                  )}
                  {cropMode && (
                    <div className="crop-frame">
                      <span>Crop area preview</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="preview-empty">
                  <UploadCloud size={55} />
                  <h3>Your document preview appears here</h3>
                  <p>Upload a PDF or image to start editing.</p>
                  <button
                    className="button button-primary"
                    onClick={() => inputRef.current?.click()}
                  >
                    Choose a file
                  </button>
                </div>
              )}
            </div>
            <div className="viewer-toolbar">
              <button
                disabled={!pages.length || selected === 0}
                onClick={() => setSelected((v) => Math.max(0, v - 1))}
                title="Previous page"
              >
                <ChevronLeft />
              </button>
              <span className="page-counter">
                {pages.length ? selected + 1 : 0} / {totalPages}
              </span>
              <button
                disabled={!pages.length || selected === pages.length - 1}
                onClick={() =>
                  setSelected((v) => Math.min(pages.length - 1, v + 1))
                }
                title="Next page"
              >
                <ChevronRight />
              </button>
              <i />
              <button
                onClick={() =>
                  updateSetting("zoom", Math.max(30, settings.zoom - 10))
                }
                title="Zoom out"
              >
                <Minus />
              </button>
              <span className="zoom-value">{settings.zoom}%</span>
              <button
                onClick={() =>
                  updateSetting("zoom", Math.min(200, settings.zoom + 10))
                }
                title="Zoom in"
              >
                <Plus />
              </button>
              <i />
              <button
                onClick={() =>
                  setNotice("Preview is fitted to the editor area.")
                }
                title="Fit preview"
              >
                <ZoomIn />
              </button>
              <button
                onClick={() =>
                  setNotice("Preview is fitted to the editor area.")
                }
                title="Preview zoom"
              >
                <ZoomOut />
              </button>
              <button
                className="viewer-fullscreen"
                onClick={() =>
                  document
                    .querySelector(".document-viewer")
                    ?.requestFullscreen?.()
                }
                title="Fullscreen"
              >
                <Maximize />
              </button>
            </div>
          </div>
        </div>
        <div className="adjustments-panel">
          <div className="adjustments-heading">
            <SlidersHorizontal />
            <strong>Image Adjustments</strong>
            <button onClick={() => setShowPerspective((v) => !v)}>
              {showPerspective ? "Hide" : "Perspective"}
            </button>
          </div>
          <div className="slider-grid">
            <Adjust
              label="Brightness"
              value={settings.brightness}
              min={30}
              max={180}
              onChange={(v) => updateSetting("brightness", v)}
              suffix="%"
            />
            <Adjust
              label="Contrast"
              value={settings.contrast}
              min={30}
              max={180}
              onChange={(v) => updateSetting("contrast", v)}
              suffix="%"
            />
          </div>
          {showPerspective && (
            <div className="slider-grid">
              <Adjust
                label="Perspective X"
                value={settings.perspectiveX}
                min={-25}
                max={25}
                onChange={(v) => updateSetting("perspectiveX", v)}
                suffix="°"
              />
              <Adjust
                label="Perspective Y"
                value={settings.perspectiveY}
                min={-25}
                max={25}
                onChange={(v) => updateSetting("perspectiveY", v)}
                suffix="°"
              />
            </div>
          )}
          {showText && (
            <div className="text-entry">
              <input
                value={textOverlay}
                onChange={(e) => setTextOverlay(e.target.value)}
                placeholder="Type text to overlay on preview"
              />
              <button onClick={() => setShowText(false)}>
                <Check size={16} /> Apply
              </button>
            </div>
          )}
          {cropMode && (
            <div className="crop-notice">
              <Crop size={16} /> Crop preview mode is active. Fine-grained PDF
              cropping requires a PDF processing backend.
            </div>
          )}
        </div>
      </section>
      <aside className="print-settings-card">
        <h2>Print Settings</h2>
        <p>Customize your print options</p>
        <label>
          Color Mode
          <select
            value={settings.color}
            onChange={(e) => updateSetting("color", e.target.value)}
          >
            <option value="bw">◐ Black & White</option>
            <option value="color">🌈 Color</option>
          </select>
        </label>
        <label>
          Paper Size
          <select
            value={settings.paper}
            onChange={(e) => updateSetting("paper", e.target.value)}
          >
            <option>A4</option>
            <option>A3</option>
            <option>A5</option>
            <option>Letter</option>
            <option>Legal</option>
          </select>
        </label>
        <label>
          Pages
          <select
            defaultValue="all"
            onChange={(e) =>
              setNotice(
                e.target.value === "all"
                  ? "All uploaded pages selected."
                  : `Page selection: ${e.target.value}`,
              )
            }
          >
            <option value="all">All Pages ({totalPages})</option>
            {pages.map((p, i) => (
              <option key={p.id} value={i + 1}>
                Page {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label>
          Copies
          <div className="copies-control">
            <button
              onClick={() =>
                updateSetting("copies", Math.max(1, settings.copies - 1))
              }
            >
              <Minus />
            </button>
            <span>{settings.copies}</span>
            <button
              onClick={() =>
                updateSetting("copies", Math.min(99, settings.copies + 1))
              }
            >
              <Plus />
            </button>
          </div>
        </label>
        <label>
          Print Quality
          <select
            value={settings.quality}
            onChange={(e) => updateSetting("quality", e.target.value)}
          >
            <option>Standard</option>
            <option>High</option>
            <option>Draft</option>
          </select>
        </label>
        <div className="estimated-price">
          <span>Estimated Price</span>
          <strong>₹ {price.toFixed(2)}</strong>
          <small>
            (₹{settings.color === "color" ? 5 : 2} per page × {totalPages} pages
            × {settings.copies} copies)
          </small>
        </div>
        <button
          className="button button-primary add-cart"
          onClick={addToCart}
          disabled={busy || !active}
        >
          <ShoppingCart />
          Add to Cart
        </button>
        <div className="print-security">
          <Check size={15} /> Final print pricing may vary by shop.
        </div>
      </aside>
      {notice && (
        <div className="toast-notice" role="status">
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
function Adjust({ label, value, min, max, onChange, suffix = "" }) {
  return (
    <label className="adjust-slider">
      <span>
        {label}
        <b>
          {value}
          {suffix}
        </b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
