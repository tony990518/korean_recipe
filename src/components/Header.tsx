import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: Event) => {
      const target = e.target as Node | null;
      if (headerRef.current && target && !headerRef.current.contains(target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <Link
          to="/"
          className="flex items-center gap-3 font-extrabold tracking-tight text-2xl md:text-3xl text-slate-900"
        >
          <img
            src="/images/logo_noText.webp"
            alt="Studio.K Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
          <span className="whitespace-nowrap">Studio.K 韓味研究所</span>
        </Link>

        {/* Hamburger (always visible) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 border border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            // X icon
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            // Hamburger icon
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Backdrop to close on outside click */}
      {open ? (
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/0 cursor-default"
        />
      ) : null}

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`absolute right-6 mt-2 z-40 w-56 overflow-hidden rounded-xl border shadow-lg transition-[max-height] duration-300 bg-white ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav className="px-2 pb-3 pt-2 flex flex-col gap-1.5 text-base text-slate-800" role="navigation" aria-label="Primary">
          <div className="px-2 pb-2 pt-1 text-xs font-medium text-slate-500 text-right">快速導航</div>

          <a href="/#recipes" onClick={() => setOpen(false)} className="w-full group rounded-lg px-2 py-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 flex flex-col items-end text-right">
                <span className="font-medium leading-tight">食譜</span>
                <span className="text-xs text-slate-500 leading-snug">最新 3 · 全部查看</span>
              </div>
              <div className="shrink-0 text-lg">🍲</div>
            </div>
          </a>

          <a href="/#tips" onClick={() => setOpen(false)} className="w-full group rounded-lg px-2 py-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 flex flex-col items-end text-right">
                <span className="font-medium leading-tight">小撇步</span>
                <span className="text-xs text-slate-500 leading-snug">料理更順手的小技巧</span>
              </div>
              <div className="shrink-0 text-lg">💡</div>
            </div>
          </a>

          {/* <a href="/#stories" onClick={() => setOpen(false)} className="w-full group rounded-lg px-2 py-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 flex flex-col items-end text-right">
                <span className="font-medium leading-tight">料理小故事</span>
                <span className="text-xs text-slate-500 leading-snug">廚房裡的日常與回憶</span>
              </div>
              <div className="shrink-0 text-lg">📖</div>
            </div>
          </a> */}

          {/* <a href="/#labs" onClick={() => setOpen(false)} className="w-full group rounded-lg px-2 py-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 flex flex-col items-end text-right">
                <span className="font-medium leading-tight">料理研究室</span>
                <span className="text-xs text-slate-500 leading-snug">用實驗精神做料理</span>
              </div>
              <div className="shrink-0 text-lg">🧪</div>
            </div>
          </a> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
