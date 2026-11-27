import { useEffect, useRef, useState, type FormEvent } from "react";
import { Camera, CameraOff, QrCode, Search } from "lucide-react";
import { extractShopCodeFromScan } from "../utils/parseShopCode";

interface QrScannerBoxProps {
  onShopDetected: (shopCode: string) => void;
}

interface DetectedBarcode {
  rawValue?: string;
}

interface BarcodeDetectorInstance {
  detect: (source: ImageBitmapSource) => Promise<DetectedBarcode[]>;
}

declare global {
  interface Window {
    BarcodeDetector?: new (options?: {
      formats?: string[];
    }) => BarcodeDetectorInstance;
  }
}

const QrScannerBox = ({ onShopDetected }: QrScannerBoxProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<number | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [manualError, setManualError] = useState<string | null>(null);

  const stopCamera = () => {
    if (scanIntervalRef.current !== null) {
      window.clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Attach MediaStream AFTER <video> renders in the DOM
  useEffect(() => {
    if (!isCameraActive || !streamRef.current || !videoRef.current) return;

    const videoEl = videoRef.current;
    videoEl.srcObject = streamRef.current;

    videoEl.play().catch(() => {
      setCameraError("Tap the video box or allow autoplay to start camera preview.");
    });

    if (!window.BarcodeDetector) {
      setCameraError(
        "Camera preview is active, but automatic QR decoding isn't supported in this browser. Use your phone's Camera app or enter the Shop Code below."
      );
      return;
    }

    const detector = new window.BarcodeDetector({ formats: ["qr_code"] });

    scanIntervalRef.current = window.setInterval(async () => {
      if (!videoRef.current || videoRef.current.readyState < 2) return;

      try {
        const barcodes = await detector.detect(videoRef.current);
        for (const code of barcodes) {
          if (!code.rawValue) continue;
          const parsed = extractShopCodeFromScan(code.rawValue);
          if (parsed) {
            stopCamera();
            onShopDetected(parsed);
            return;
          }
        }
      } catch {
        // Ignore single-frame detection errors
      }
    }, 450);

    return () => {
      if (scanIntervalRef.current !== null) {
        window.clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
    };
  }, [isCameraActive, onShopDetected]);

  const startCameraScan = async () => {
    setCameraError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "Camera access is unavailable in this browser. Enter the Shop Code below."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      streamRef.current = stream;
      setIsCameraActive(true);
    } catch {
      stopCamera();
      setCameraError(
        "Camera permission denied or camera is in use by another app. Enter the Shop Code manually below."
      );
    }
  };

  const handleManualSubmit = (e: FormEvent) => {
    e.preventDefault();
    setManualError(null);

    const parsed = extractShopCodeFromScan(manualInput);
    if (!parsed) {
      setManualError(
        "Enter a valid Shop Code (e.g., ADMI-28B93) or paste the full shop QR link."
      );
      return;
    }

    stopCamera();
    onShopDetected(parsed);
  };

  return (
    <div className="space-y-6">
      {/* Camera Viewport */}
      <div className="overflow-hidden rounded-2xl border border-purple-200/80 bg-slate-950 p-4 text-white dark:border-slate-800">
        {isCameraActive ? (
          <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-xl border-2 border-purple-500 bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-6 rounded-xl border-2 border-dashed border-emerald-400/80" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-300">
              <QrCode className="h-8 w-8" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-200">
              Scan the EasyPrint QR stand at the shop counter
            </p>
            <p className="mt-1 max-w-xs text-xs text-slate-400">
              Automatically verifies shop name & address before letting you upload
              files.
            </p>
          </div>
        )}

        {cameraError && (
          <p className="mt-3 rounded-xl bg-amber-500/15 px-3 py-2 text-center text-xs text-amber-200">
            {cameraError}
          </p>
        )}

        <div className="mt-4 flex justify-center">
          {isCameraActive ? (
            <button
              type="button"
              onClick={stopCamera}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <CameraOff className="h-4 w-4" />
              Stop Camera
            </button>
          ) : (
            <button
              type="button"
              onClick={startCameraScan}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-700"
            >
              <Camera className="h-4 w-4" />
              Open Camera Scanner
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
        <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:bg-slate-900">
          Or enter shop code
        </span>
        <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Manual Shop Code Fallback */}
      <form onSubmit={handleManualSubmit} className="space-y-2.5">
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => {
              setManualInput(e.target.value);
              setManualError(null);
            }}
            placeholder="e.g., ADMI-28B93"
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900 placeholder:font-normal placeholder:normal-case placeholder:tracking-normal focus:border-purple-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            <Search className="h-4 w-4" />
            Verify Shop
          </button>
        </div>

        {manualError && (
          <p className="text-xs font-medium text-red-600 dark:text-red-400">
            {manualError}
          </p>
        )}
      </form>
    </div>
  );
};

export default QrScannerBox;