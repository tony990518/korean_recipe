import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { hash, pathname } = useLocation();


  const recipesRef = useRef<HTMLAnchorElement>(null);
  const tipsRef = useRef<HTMLAnchorElement>(null);
  const [lineStyle, setLineStyle] = useState({ width: 0, transform: "translateX(0px)" });
  const [activeTab, setActiveTab] = useState<'recipes' | 'tips' | null>(null);

  useEffect(() => {
    if (pathname !== '/') return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as 'recipes' | 'tips');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const recipesEl = document.getElementById('recipes');
    const tipsEl = document.getElementById('tips');

    if (recipesEl) observer.observe(recipesEl);
    if (tipsEl) observer.observe(tipsEl);

    return () => observer.disconnect();
  }, [pathname]);

  const isTips = pathname.includes('tip') || (pathname === '/' && activeTab === 'tips') || (pathname === '/' && !activeTab && hash === '#tips');

  useEffect(() => {
    const activeRef = isTips ? tipsRef.current : recipesRef.current;
    if (activeRef) {
      setLineStyle({
        width: activeRef.offsetWidth,
        transform: `translateX(${activeRef.offsetLeft}px)`,
      });
    }
  }, [isTips, pathname]);

  const handleNavClick = (id: string) => {
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 10);
      }
    }
  };

  useEffect(() => {
    if (pathname === '/' && hash) {
      setTimeout(() => {
        document.getElementById(hash.substring(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [hash, pathname]);

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
    <header ref={headerRef} className="bg-surface/70 backdrop-blur-md fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full px-6 py-3 shadow-[0px_20px_40px_rgba(57,56,54,0.06)] grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <Link
        to="/"
        onClick={(e) => {
          if (pathname === '/') {
            e.preventDefault();
            window.history.pushState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="text-2xl font-black text-primary tracking-tighter cursor-pointer active:scale-95 transition-transform duration-300"
        aria-label="Studio.K Home"
      >
        <span className="block truncate whitespace-nowrap">Studio.K 韓味研究所</span>
      </Link>

      <nav className="relative hidden items-center justify-self-center md:flex">
        <div className="flex items-center gap-8 z-10 relative">
          <Link ref={recipesRef} to="/#recipes" onClick={() => handleNavClick('recipes')} className={`font-headline font-bold text-lg tracking-tight pb-1 cursor-pointer hover:scale-105 active:scale-95 transition-colors ${!isTips ? "text-primary" : "text-on-surface hover:text-primary"}`}>
            食譜
          </Link>
          <Link ref={tipsRef} to="/#tips" onClick={() => handleNavClick('tips')} className={`font-headline font-bold text-lg tracking-tight pb-1 cursor-pointer hover:scale-105 active:scale-95 transition-colors ${isTips ? "text-primary" : "text-on-surface hover:text-primary"}`}>
            小撇步
          </Link>
        </div>
        <div
          className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ width: `${lineStyle.width}px`, transform: lineStyle.transform }}
        />
      </nav>

      <div className="col-start-2 flex items-center justify-end gap-4 md:col-start-3">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="focus:outline-none md:hidden"
        >
          <span className="material-symbols-outlined text-on-surface cursor-pointer hover:scale-105 transition-transform">
            {open ? "close" : "menu"}
          </span>
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
        className={`absolute top-[calc(100%+0.5rem)] right-0 md:right-6 z-40 w-64 overflow-hidden rounded-2xl bg-surface/95 backdrop-blur-xl border border-white/40 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-right ${open ? "opacity-100 scale-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] pointer-events-auto translate-y-0" : "opacity-0 scale-95 shadow-none pointer-events-none -translate-y-2"
          }`}
      >
        <nav className="p-3 flex flex-col gap-1 text-on-surface" role="navigation" aria-label="Primary">
          <div className="px-3 pb-2 pt-2 text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest font-label">
            Menu
          </div>

          <a href="/#recipes" onClick={() => setOpen(false)} className="w-full group rounded-xl p-3 hover:bg-primary/5 active:bg-primary/10 transition-colors focus:outline-none flex items-center gap-4">
            <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">restaurant_menu</span>
            </div>
            <div className="flex-1 flex flex-col items-start text-left">
              <span className="font-headline font-bold text-[1.1rem] leading-tight text-on-surface group-hover:text-primary transition-colors">食譜</span>
              <span className="text-[0.8rem] text-on-surface-variant leading-snug mt-0.5">探索所有經典料理</span>
            </div>
          </a>

          <a href="/#tips" onClick={() => setOpen(false)} className="w-full group rounded-xl p-3 hover:bg-tertiary-container/30 active:bg-tertiary-container/50 transition-colors focus:outline-none flex items-center gap-4">
            <div className="w-10 h-10 shrink-0 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">tips_and_updates</span>
            </div>
            <div className="flex-1 flex flex-col items-start text-left">
              <span className="font-headline font-bold text-[1.1rem] leading-tight text-on-surface group-hover:text-on-tertiary-container transition-colors">小撇步</span>
              <span className="text-[0.8rem] text-on-surface-variant leading-snug mt-0.5">料理更順手的技巧</span>
            </div>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
