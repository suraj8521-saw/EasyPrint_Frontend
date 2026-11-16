import { UploadCloud, Sparkles, Printer } from "lucide-react";
import StepCard from "./StepCard";

const HowItWorksSection = () => {
  return (
    <section id="pricing" className="relative px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-16 text-center">
          <span className="text-xs font-extrabold tracking-[0.3em] text-blue-600">
            HOW IT WORKS
          </span>
          <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-white sm:text-5xl">
            Print in 3 Simple Steps
          </h2>
          <p className="mt-5 text-slate-500 dark:text-slate-400">
            From upload to pickup, getting your documents printed is effortless.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          <StepCard
            number="01"
            icon={<UploadCloud />}
            title="Upload or Scan QR"
            text="Upload your documents or scan the QR code at a nearby shop."
          />
          <StepCard
            number="02"
            icon={<Sparkles />}
            title="Edit Your Document"
            text="Make changes, choose page settings and preview your document."
          />
          <StepCard
            number="03"
            icon={<Printer />}
            title="Print at Nearby Shop"
            text="Choose a print shop, place your order and collect your prints."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
