// src/components/TipModal.tsx
import { useEffect, useRef, useState } from "react";
import { Tip } from "../data";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(",");

const TipModal = ({ tip, onClose }: { tip: Tip | null; onClose: () => void }) => {
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closeByKeyboardRef = useRef(false);

  const getFocusable = () => {
    if (!dialogRef.current) return [] as HTMLElement[];
    const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    return nodes.filter((el) => !el.hasAttribute("inert") && el.offsetParent !== null);
  };

  useEffect(() => {
    if (!tip) { setShow(false); return; }

    lastFocusedRef.current = (document.activeElement as HTMLElement) || null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const rafId = requestAnimationFrame(() => setShow(true));

    const focusFirst = () => {
      const f = getFocusable();
      (f[0] ?? dialogRef.current)?.focus();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeByKeyboardRef.current = true;
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;

      const f = getFocusable();
      if (f.length === 0) { e.preventDefault(); dialogRef.current?.focus(); return; }
      const first = f[0], last = f[f.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = !!(active && dialogRef.current?.contains(active));
      if (!inside) { e.preventDefault(); first.focus(); return; }
      if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); return; }
    };

    document.addEventListener("keydown", onKey);
    const t = setTimeout(focusFirst, 30);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [tip]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
      if (closeByKeyboardRef.current) lastFocusedRef.current?.focus?.();
      else lastFocusedRef.current?.blur?.();
      closeByKeyboardRef.current = false;
    }, 300);
  };

  const handleShare = async () => {
    if (!tip) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: tip.title, text: tip.shortDescription, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 클립보드에 복사되었습니다!");
      }
    } catch {
      const ok = window.confirm("공유에 실패했어요. 링크를 직접 선택해 복사할까요?");
      if (ok) prompt("이 페이지 링크입니다. 복사하세요:", window.location.href);
    }
  };

  if (!tip) return null;
  const modalTitleId = "tip-modal-title";

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      className={`fixed inset-0 z-50 p-4 flex items-center justify-center transition-opacity duration-300 ${show ? "bg-black/50" : "bg-black/0"
        }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeByKeyboardRef.current = false;
          handleClose();
        }
      }}
    >
      {/* 부모 컨테이너에 overflow-hidden: 둥근 모서리 통일 */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative bg-white rounded-2xl overflow-hidden
                    max-w-md sm:max-w-lg md:max-w-xl w-full
                    max-h-[86svh] md:max-h-[90vh]
                    shadow-2xl border border-gray-100
                    transition-all duration-300 transform motion-reduce:transition-none motion-reduce:duration-0 motion-reduce:transform-none ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 닫기 버튼: 스크롤과 무관하게 고정 */}
        <button
          onClick={() => { closeByKeyboardRef.current = false; handleClose(); }}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="닫기"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 레이아웃: header / body / footer */}
        <div className="grid grid-rows-[auto_1fr_auto] max-h-[inherit]">
          {/* HEADER: 히어로 (모서리 상단 둥글게 보이도록 부모 overflow-hidden에 의존) */}
          <div className="relative w-full bg-gray-100">
            <div className="h-[clamp(160px,30svh,280px)] md:h-[clamp(220px,38vh,420px)]">
              {/* 블러 배경 레이어 */}
              <img
                src={tip.hero}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-60"
              />
              {/* 실제 사진 (안 잘리게) */}
              <img
                src={tip.hero}
                alt={tip.title}
                className="relative w-full h-full object-contain md:object-cover"
                loading="lazy"
              />
            </div>

            {/* 오버레이/타이틀 그대로 */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
              <h2 id={modalTitleId} className="relative text-white text-lg sm:text-xl md:text-2xl font-bold drop-shadow-sm">
                {tip.title}
              </h2>
            </div>
          </div>

          {/* BODY: 본문만 스크롤 (둥근 모서리는 부모가 처리) */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800">
                💡 小撇步
              </span>
            </div>

            {tip.shortDescription && (
              <p className="text-gray-700 text-sm leading-relaxed break-keep">
                {tip.shortDescription}
              </p>
            )}

            <div className="space-y-5">
              {tip.modalData ? (
                <>
                  <section className="space-y-2">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                      <span className="inline-block w-5 h-5">🧠</span> 이유
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed break-keep">
                      {tip.modalData.reason}
                    </p>
                  </section>

                  <hr className="border-gray-100" />

                  <section className="space-y-2">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                      <span className="inline-block w-5 h-5">🛠️</span> 해결방법
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed break-keep">
                      {tip.modalData.solution}
                    </p>
                  </section>

                  {tip.modalData.example && (
                    <>
                      <hr className="border-gray-100" />
                      <section className="space-y-2">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                          <span className="inline-block w-5 h-5">📌</span> 예시
                        </h3>
                        <p className="text-gray-700 text-xs leading-relaxed bg-gray-50 p-3 rounded-lg break-keep">
                          {tip.modalData.example}
                        </p>
                      </section>
                    </>
                  )}
                </>
              ) : (
                Array.isArray(tip.content?.sections) &&
                tip.content.sections.map((section, index) => (
                  <section key={index} className="space-y-2">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                      <span className="inline-block w-5 h-5">🍳</span>
                      {section.title}
                    </h3>
                    <p className="text-gray-700 text-xs leading-relaxed break-keep">{section.text}</p>
                    {section.image && (
                      <div className="mt-2">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-32 object-cover rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {index < (tip.content.sections.length - 1) && <hr className="border-gray-100" />}
                  </section>
                ))
              )}
            </div>
          </div>

          {/* FOOTER: 고정 (모서리 하단 둥글게는 부모 overflow-hidden에 의존) */}
          <div className="border-t border-gray-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 pb-[env(safe-area-inset-bottom)]">
            <div className="p-3 sm:p-4 flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                공유하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipModal;
