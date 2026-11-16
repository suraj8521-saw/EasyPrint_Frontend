import { Zap, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section
      id="services"
      className="relative bg-white/45 px-6 py-24 dark:bg-slate-900/45 lg:px-16"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-16 text-center">
          <span className="text-xs font-extrabold tracking-[0.3em] text-blue-600">
            THE EASYPRINT ADVANTAGE
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Everything You Need to Print Smarter
          </h2>
          <p className="mt-5 text-slate-500 dark:text-slate-400">
            Simple tools that make printing faster, easier and more secure.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Zap />}
            title="Fast & Easy"
            text="Upload, configure, and print in under 60 seconds. No more waiting in lines."
          />
          <FeatureCard
            icon={<FileCheck2 />}
            title="Multi-Format"
            text="Support for PDF, Word, images and more — all in one place."
          />
          <FeatureCard
            icon={<Sparkles />}
            title="Edit Online"
            text="Crop, rotate and adjust settings right in your browser before printing."
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Secure & Private"
            text="Your documents are encrypted and automatically deleted after printing."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
