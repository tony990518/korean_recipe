import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <Link
          to="/"
          className="flex items-center gap-3 font-extrabold tracking-tight text-2xl md:text-3xl text-slate-900"
        >
          <img
            src="/images/logo_noText.png"
            alt="K-Lab Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />
          <span className="whitespace-nowrap">K-Lab 韓味研究所</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-base md:text-lg text-slate-700">
          <a className="hover:text-red-600" href="#recipes">食譜</a>
          <a className="hover:text-red-600" href="#tips">小撇步</a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-500"
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

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <nav className="px-6 pb-4 pt-2 flex flex-col gap-3 text-base text-slate-800 bg-white/90">
          <a className="py-2 hover:text-red-600" href="#recipes" onClick={() => setOpen(false)}>食譜</a>
          <a className="py-2 hover:text-red-600" href="#tips" onClick={() => setOpen(false)}>小撇步</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
