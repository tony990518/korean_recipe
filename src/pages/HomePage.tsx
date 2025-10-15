// src/pages/HomePage.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DB, Tip, STORIES, LABS } from "../data";
import RecipeCard from "../components/RecipeCard";
import TipCard from "../components/TipCard";
import TipModal from "../components/TipModal";

const DRAG_ACTIVATE_PX = 6;     // 드래그로 간주할 최소 이동
const SWIPE_THRESHOLD_PX = 60;  // 이전/다음으로 넘길 임계치
const AUTOPLAY_INTERVAL_MS = 6000;
const USER_COOLDOWN_MS = 4000;  // 사용자 조작 후 오토플레이 재개 대기
const HORIZ_PRIORITY_FACTOR = 1.25; // |dx|가 |dy|보다 1.25배 이상일 때만 드래그로 인정

const HomePage = () => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const handleTipClick = (tip: Tip) => setSelectedTip(tip);
  const handleCloseModal = () => setSelectedTip(null);

  // ----- 슬라이드 데이터 -----
  const firstRecipe = DB.recipes?.[0];
  const firstTip = DB.tips?.[0];
  // const firstStory = STORIES?.[0];
  // const firstLab = LABS?.[0];

  const slides = [
    {
      key: "hero",
      title: "今天想吃什麼韓式？",
      desc: "跟著 Studio.K 韓味研究所，簡單做出美味料理🧑‍🍳",
      buttons: [
        <a key="recipes" href="#recipes" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">
          立即看食譜
        </a>,
      ],
      type: "text" as const,
    },
    firstRecipe && {
      key: "recipe",
      title: "今日推薦食譜",
      subtitle: firstRecipe.title,
      desc: firstRecipe.shortDescription,
      buttons: [
        <Link key="view" to={`/recipe/${firstRecipe.id}`} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">
          查看食譜
        </Link>,
        <a key="more" href="#recipes" className="px-4 py-2 rounded-lg border text-sm">更多食譜</a>,
      ],
      type: "text" as const,
    },
    firstTip && {
      key: "tip",
      title: "今日料理小撇步",
      subtitle: firstTip.title,
      desc: firstTip.shortDescription,
      buttons: [
        <a key="tips" href="#tips" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">查看小撇步</a>,
        <button key="preview" type="button" onClick={() => setSelectedTip(firstTip)} className="px-4 py-2 rounded-lg border text-sm">
          快速預覽
        </button>,
      ],
      type: "text" as const,
    },
    /* firstStory && {
      key: "story",
      title: "料理小故事",
      subtitle: firstStory.title,
      desc: firstStory.shortDescription,
      buttons: [
        <a key=\"stories\" href=\"#stories\" className=\"px-4 py-2 rounded-lg bg-slate-900 text-white text-sm\">前往故事</a>,
        <Link key=\"all\" to=\"/stories\" className=\"px-4 py-2 rounded-lg border text-sm\">全部查看</Link>,
      ],
      type: "text" as const,
    }, */
    /* firstLab && {
      key: "lab",
      title: "料理研究室",
      subtitle: firstLab.title,
      desc: firstLab.shortDescription,
      buttons: [
        <a key=\"labs\" href=\"#labs\" className=\"px-4 py-2 rounded-lg bg-slate-900 text-white text-sm\">查看研究</a>,
        <Link key=\"all\" to=\"/labs\" className=\"px-4 py-2 rounded-lg border text-sm\">全部查看</Link>,
      ],
      type: "text" as const,
    }, */
  ].filter(Boolean) as Array<{
    key: string;
    title: string;
    subtitle?: string;
    desc?: string;
    buttons: JSX.Element[];
    type: "text" | "image";
  }>;

  const total = slides.length;

  // ----- 상태 -----
  const [current, setCurrent] = useState(0);

  // 드래그 상태
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const [dragDX, setDragDX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragArmed, setDragArmed] = useState(false); // 드래그 활성화 여부(임계치+각도)

  // 휠/트랙패드 락
  const wheelLockRef = useRef(false);

  // 오토플레이 관련
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rafRef = useRef<number | null>(null);
  const cooldownTimer = useRef<number | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(!prefersReducedMotion);

  const go = (idx: number) => setCurrent(((idx % total) + total) % total);
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  const markUserActive = () => {
    setAutoplayEnabled(false);
    if (cooldownTimer.current) window.clearTimeout(cooldownTimer.current);
    cooldownTimer.current = window.setTimeout(() => {
      setAutoplayEnabled(!prefersReducedMotion);
    }, USER_COOLDOWN_MS);
  };

  // 언마운트 시 쿨다운 타이머 정리
  useEffect(() => {
    return () => {
      if (cooldownTimer.current) window.clearTimeout(cooldownTimer.current);
    };
  }, []);

  // 오토플레이 루프
  useEffect(() => {
    if (!autoplayEnabled) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      if (now - last >= AUTOPLAY_INTERVAL_MS) {
        last = now;
        setCurrent((c) => (c + 1) % total);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [autoplayEnabled, total]);

  // 가로 제스처 우선 arm
  const maybeArmDrag = (dx: number, dy: number) => {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    return absX >= DRAG_ACTIVATE_PX && absX >= absY * HORIZ_PRIORITY_FACTOR;
  };

  // 포인터(마우스) 드래그 — 컨트롤(UI) 클릭 제외
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-control]")) return; // 컨트롤 클릭은 드래그 비활성
    if (e.button !== 0) return;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    setDragDX(0);
    setDragArmed(false);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (startXRef.current == null || startYRef.current == null) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;
    setDragDX(dx);
    if (!dragArmed && maybeArmDrag(dx, dy)) {
      setDragArmed(true);
      setIsDragging(true);
      markUserActive();
    }
  };

  const endDrag = () => {
    if (!dragArmed) {
      startXRef.current = null;
      startYRef.current = null;
      setDragDX(0);
      return;
    }
    if (dragDX > SWIPE_THRESHOLD_PX) prev();
    else if (dragDX < -SWIPE_THRESHOLD_PX) next();
    setIsDragging(false);
    setDragArmed(false);
    startXRef.current = null;
    startYRef.current = null;
    setDragDX(0);
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => endDrag();
  const onPointerCancel: React.PointerEventHandler<HTMLDivElement> = () => endDrag();

  // 터치(사파리 호환 안전망) — 컨트롤 제외
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-control]")) return;
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    setDragDX(0);
    setDragArmed(false);
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (startXRef.current == null || startYRef.current == null) return;
    const dx = e.touches[0].clientX - startXRef.current;
    const dy = e.touches[0].clientY - startYRef.current;
    setDragDX(dx);
    if (!dragArmed && maybeArmDrag(dx, dy)) {
      setDragArmed(true);
      setIsDragging(true);
      markUserActive();
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => endDrag();

  // 휠/트랙패드 좌우 스와이프
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      wheelLockRef.current = true;
      e.deltaX > 0 ? next() : prev();
      markUserActive();
      window.setTimeout(() => (wheelLockRef.current = false), 500);
    }
  };

  // 키보드 ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev(); markUserActive();
      } else if (e.key === "ArrowRight") {
        next(); markUserActive();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, total]);

  // 호버/포커스 동안만 일시정지(사용자 쿨다운 로직과 별개)
  const onMouseEnter = () => setAutoplayEnabled(false);
  const onMouseLeave = () => setAutoplayEnabled(!prefersReducedMotion);
  const onFocus = () => setAutoplayEnabled(false);
  const onBlur = () => setAutoplayEnabled(!prefersReducedMotion);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Carousel */}
      <section id="hero" className="mb-8 relative">
        <div
          className="overflow-hidden rounded-2xl border select-none touch-pan-y overscroll-x-contain"
          style={{ touchAction: "pan-y", overscrollBehaviorX: "contain" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          role="region"
          aria-roledescription="carousel"
          aria-label="Hero carousel"
        >
          <div
            className={`flex w-full ${isDragging ? "transition-none" : "transition-transform duration-300 ease-out"}`}
            style={{
              transform: `translateX(calc(-${current * 100}% + ${isDragging ? dragDX : 0}px))`,
            }}
          >
            {slides.map((s) => (
              <div
                key={s.key}
                className="min-w-full p-6 flex flex-col md:flex-row items-start md:items-center gap-6 bg-white"
              >
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{s.title}</h2>
                  {s.subtitle && (
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900">{s.subtitle}</h3>
                  )}
                  {s.desc && <p className="mt-2 text-slate-700 leading-relaxed line-clamp-3">{s.desc}</p>}
                  <div className="mt-4 flex gap-2">{s.buttons}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지 인디케이터 (작게) */}
          <div
            data-control
            className="absolute bottom-2 right-2 flex items-center gap-0.5 
             rounded-full bg-slate-900/85 text-white text-xs
             shadow-md border border-black/10"
          >
            <button
              type="button"
              onClick={() => { prev(); markUserActive(); }}
              aria-label="Previous slide"
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-white/10 active:scale-95 transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="px-1 tabular-nums font-mono">{current + 1} / {total}</span>

            <button
              type="button"
              onClick={() => { next(); markUserActive(); }}
              aria-label="Next slide"
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-white/10 active:scale-95 transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section id="recipes" className="mb-10 scroll-mt-24 md:scroll-mt-28">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">最新食譜</h2>
          <Link to="/recipes" className="text-sm text-red-600">全部查看 →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(DB.recipes ?? []).slice(0, 3).map((r) => <RecipeCard key={r.id} data={r} />)}
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="mb-10 scroll-mt-24 md:scroll-mt-28">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">料理小撇步</h2>
          <Link to="/tips" className="text-sm text-red-600">全部查看 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(DB.tips ?? []).slice(0, 3).map((tip) => (
            <TipCard key={tip.id} data={tip} onTipClick={handleTipClick} />
          ))}
        </div>
      </section>

      {/* Stories */}
      {/* <section id="stories" className="mb-10 scroll-mt-24 md:scroll-mt-28">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">料理小故事</h2>
          <Link to="/stories" className="text-sm text-red-600">全部查看 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(STORIES ?? []).slice(0, 3).map((p) => (
            <Link to={`/story/${p.id}`} key={p.id} className="group block rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
              <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                <img src={p.hero} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" loading="lazy" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.shortDescription}</p>
                <span className="text-sm text-red-600">閱讀更多 →</span>
              </div>
            </Link>
          ))}
        </div>
      </section> */}

      {/* Labs */}
      {/* <section id="labs" className="mb-10 scroll-mt-24 md:scroll-mt-28">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">料理研究室</h2>
          <Link to="/labs" className="text-sm text-red-600">全部查看 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(LABS ?? []).slice(0, 3).map((p) => (
            <Link to={`/lab/${p.id}`} key={p.id} className="group block rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
              <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                <img src={p.hero} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" loading="lazy" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.shortDescription}</p>
                <span className="text-sm text-red-600">查看實驗 →</span>
              </div>
            </Link>
          ))}
        </div>
      </section> */}

      <TipModal tip={selectedTip} onClose={handleCloseModal} />
    </main>
  );
};

export default HomePage;
