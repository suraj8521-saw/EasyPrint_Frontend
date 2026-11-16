import {
  Printer,
  Send,
} from "lucide-react";

import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-700/50 bg-[#1e2b40] px-6 py-16 text-white lg:px-16">
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div>
            <a
              href="#home"
              aria-label="EasyPrint home"
              className="inline-flex items-center gap-4"
            >
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30">
                <Printer size={34} strokeWidth={2.5} />
              </span>
              <span className="text-3xl font-black tracking-tight text-white">
                EasyPrint
              </span>
            </a>

            <p className="mt-9 max-w-[300px] text-base leading-7 text-slate-400">
              The world's first smart online document printing platform.
              Making professional printing accessible to everyone.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-slate-600/40 bg-slate-700/40 text-white hover:border-blue-500 hover:bg-blue-600"
              >
                <FaFacebookF size={23} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-slate-600/40 bg-slate-700/40 text-white hover:border-blue-500 hover:bg-blue-600"
              >
                <FaXTwitter size={23} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-slate-600/40 bg-slate-700/40 text-white hover:border-pink-500 hover:bg-pink-600"
              >
                <FaInstagram size={23} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-10 text-2xl font-extrabold text-white">
              Our Services
            </h3>
            <ul className="space-y-6 text-lg text-slate-400">
              <li><a href="#services" className="inline-block hover:text-blue-400">Cloud Printing</a></li>
              <li><a href="#services" className="inline-block hover:text-blue-400">Instant Scan</a></li>
              <li><a href="#services" className="inline-block hover:text-blue-400">Business Orders</a></li>
              <li><a href="#shops" className="inline-block hover:text-blue-400">Nearby Shops</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-10 text-2xl font-extrabold text-white">
              Helpful Links
            </h3>
            <ul className="space-y-6 text-lg text-slate-400">
              <li><a href="#pricing" className="inline-block hover:text-blue-400">Pricing Plans</a></li>
              <li><a href="#support" className="inline-block hover:text-blue-400">Help Center</a></li>
              <li><a href="#terms" className="inline-block hover:text-blue-400">Terms of Use</a></li>
              <li><a href="#privacy" className="inline-block hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-10 text-2xl font-extrabold text-white">
              Newsletter
            </h3>
            <p className="mb-7 text-base leading-7 text-slate-400">
              Stay updated with the latest news.
            </p>
            <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-600/60 bg-slate-700/50 p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <input
                type="email"
                placeholder="Your Email"
                aria-label="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                aria-label="Subscribe to newsletter"
                className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500"
              >
                <Send size={23} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-slate-600/30 pt-12">
          <p className="text-center text-base text-slate-500">
            © {new Date().getFullYear()} EasyPrint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
