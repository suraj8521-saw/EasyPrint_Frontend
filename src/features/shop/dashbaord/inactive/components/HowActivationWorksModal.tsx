import { X } from "lucide-react";

interface HowActivationWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: () => void;
}

const HowActivationWorksModal = ({
  isOpen,
  onClose,
  onActivate,
}: HowActivationWorksModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-purple-100 bg-white p-6 text-left shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How Activation Works
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <ol className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <li>
            <strong className="text-purple-700 dark:text-purple-400">
              1. Get your activation key
            </strong>
            <p className="mt-1">
              Obtain your shop activation key from the EasyPrint administrator.
            </p>
          </li>

          <li>
            <strong className="text-purple-700 dark:text-purple-400">
              2. Enter your activation key
            </strong>
            <p className="mt-1">
              Submit the key through the shop activation page.
            </p>
          </li>

          <li>
            <strong className="text-purple-700 dark:text-purple-400">
              3. Unlock your dashboard
            </strong>
            <p className="mt-1">
              After successful verification, your shop features will become
              available.
            </p>
          </li>
        </ol>

        <button
          type="button"
          onClick={onActivate}
          className="mt-6 w-full cursor-pointer rounded-xl bg-purple-700 px-4 py-3 font-bold text-white transition hover:bg-purple-800"
        >
          Activate Now
        </button>
      </div>
    </div>
  );
};

export default HowActivationWorksModal;