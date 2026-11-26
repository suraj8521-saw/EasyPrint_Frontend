import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";

import BrandLogo from "../../shared/Brand-Logo/BrandLogo";
import { footerColumns, socialLinks } from "./data/footerData";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative z-10 overflow-x-clip px-5 py-14 text-slate-900  dark:border-slate-800/80 dark:text-white sm:px-8 sm:py-16 lg:px-16">
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {/* Brand Column */}
          <div>
            <BrandLogo />

            <p className="mt-6 max-w-[300px] text-sm leading-7 text-slate-600 dark:text-slate-400 sm:mt-8 sm:text-base">
              The world&apos;s first smart online document printing platform.
              Making professional printing accessible to everyone.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-4 sm:mt-9 sm:gap-5">
              {socialLinks.map(({ id, label, href, icon: Icon, hoverClass }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:text-white dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 sm:h-[56px] sm:w-[56px] ${hoverClass}`}
                >
                  <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Services & Helpful Links Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-6 text-xl font-extrabold text-slate-900 dark:text-white sm:mb-8 sm:text-2xl">
                {column.title}
              </h3>
              <ul className="space-y-4 text-base text-slate-600 dark:text-slate-400 sm:space-y-5 sm:text-lg">
                {column.links.map((link) => {
                  const isInternalRoute = link.href.startsWith("/");

                  return (
                    <li key={link.label}>
                      {isInternalRoute ? (
                        <Link
                          to={link.href}
                          className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div>
            <h3 className="mb-6 text-xl font-extrabold text-slate-900 dark:text-white sm:mb-8 sm:text-2xl">
              Newsletter
            </h3>
            <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:mb-7 sm:text-base">
              Stay updated with the latest news.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/85 p-2 shadow-sm backdrop-blur-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700/80 dark:bg-slate-800/80"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribed) setSubscribed(false);
                }}
                placeholder="Your Email"
                aria-label="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 active:scale-95 sm:h-12 sm:w-16"
              >
                <Send className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Subscribed! You&apos;ll receive EasyPrint updates.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-14 border-t border-slate-200/80 pt-8 dark:border-slate-800/80 sm:mt-20 sm:pt-10">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            © {new Date().getFullYear()} EasyPrint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;