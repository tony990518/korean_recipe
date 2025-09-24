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
  const contentRef = useRef<HTMLDivElement | null>(null); // 본문 스크롤 영역
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closeByKeyboardRef = useRef(false);

  const getFocusable = () => {
    if (!dialogRef.current) return [] as HTMLElement[];
    const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    return nodes.filter((el) => !el.hasAttribute("inert") && el.offsetParent !== null);
  };

  useEffect(() => {
    if (!tip) {
      setShow(false);
      return;
    }
    lastFocusedRef.current = (document.activeElement as HTMLElement) || null;

    // 바디 스크롤 완전 잠금 (iOS Safari 대응)
    const body = document.body;
    const scrollY = window.scrollY || window.pageYOffset;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

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
      if (f.length === 0) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = f[0], last = f[f.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = !!(active && dialogRef.current?.contains(active));
      if (!inside) { e.preventDefault(); first.focus(); return; }
      if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); return; }
    };

    // iOS rubber-band 차단: overlay에서의 터치 이동 전파 방지
    let startY = 0;
    const canScrollMore = (deltaY: number) => {
      const s = contentRef.current;
      if (!s) return false;
      if (deltaY > 0) return s.scrollTop > 0; // 아래로 끌기(위로 스크롤)
      if (deltaY < 0) return s.scrollTop + s.clientHeight < s.scrollHeight; // 위로 밀기
      return false;
    };
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const insideContent = contentRef.current?.contains(e.target as Node) ?? false;
      if (!insideContent || !canScrollMore(deltaY)) {
        e.preventDefault(); // 뷰포트로 전파 차단
      }
    };

    document.addEventListener("keydown", onKey);
    overlayRef.current?.addEventListener("touchstart", onTouchStart, { passive: false });
    overlayRef.current?.addEventListener("touchmove", onTouchMove, { passive: false });

    const t = setTimeout(focusFirst, 30);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      overlayRef.current?.removeEventListener("touchstart", onTouchStart);
      overlayRef.current?.removeEventListener("touchmove", onTouchMove);

      // 바디 원복 + 기존 스크롤 위치 복귀
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo({ top: scrollY });
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
      // 가로 넘침 방지 + overscroll 차단
      className={`fixed inset-0 z-50 p-4 flex items-center justify-center transition-opacity duration-300
                  overflow-x-hidden overscroll-y-none touch-pan-y
                  ${show ? "bg-black/50" : "bg-black/0"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeByKeyboardRef.current = false;
          handleClose();
        }
      }}
    >
      {/* 부모 컨테이너: 둥근 모서리 통일 + 가로 넘침 차단 */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative bg-white rounded-2xl overflow-hidden overscroll-x-none
                    max-w-md sm:max-w-lg md:max-w-xl w-full
                    max-h-[86svh] md:max-h-[90vh]
                    shadow-2xl border border-gray-100
                    transition-all duration-300 transform motion-reduce:transition-none motion-reduce:duration-0 motion-reduce:transform-none
                    ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 닫기 버튼 (고정) */}
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
          {/* HEADER */}
          <div className="relative w-full bg-gray-100">
            <div className="h-[clamp(160px,30svh,280px)] md:h-[clamp(220px,38vh,420px)]">
              {/* 블러 배경(여백 채우기) */}
              <img
                src={tip.hero}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-60"
              />
              {/* 실제 사진 (모바일 contain, 데스크톱 cover) */}
              <img
                src={tip.hero}
                alt={tip.title}
                className="relative w-full h-full object-contain md:object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
              <h2
                id={modalTitleId}
                className="relative text-white text-lg sm:text-xl md:text-2xl font-bold drop-shadow-sm break-keep break-words"
              >
                {tip.title}
              </h2>
            </div>
          </div>

          {/* BODY (본문만 스크롤) */}
          <div
            ref={contentRef}
            className="overflow-y-auto overscroll-contain overflow-x-hidden min-w-0 p-4 sm:p-6 space-y-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800">
                💡 小撇步
              </span>
            </div>

            {tip.shortDescription && (
              <p className="text-gray-700 text-sm leading-relaxed break-keep break-words">
                {tip.shortDescription}
              </p>
            )}

            <div className="space-y-5">
              {tip.modalData ? (
                <>
                  <section className="space-y-2">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm break-keep break-words">
                      <span className="inline-block w-5 h-5">🧠</span> 이유
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed break-keep break-words">
                      {tip.modalData.reason}
                    </p>
                  </section>

                  <hr className="border-gray-100" />

                  <section className="space-y-2">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm break-keep break-words">
                      <span className="inline-block w-5 h-5">🛠️</span> 해결방법
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed break-keep break-words">
                      {tip.modalData.solution}
                    </p>
                  </section>

                  {tip.modalData.example && (
                    <>
                      <hr className="border-gray-100" />
                      <section className="space-y-2">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm break-keep break-words">
                          <span className="inline-block w-5 h-5">📌</span> 예시
                        </h3>
                        <p className="text-gray-700 text-xs leading-relaxed bg-gray-50 p-3 rounded-lg break-keep break-words">
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
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 text-sm break-keep break-words">
                      <span className="inline-block w-5 h-5">🍳</span>
                      {section.title}
                    </h3>
                    <p className="text-gray-700 text-xs leading-relaxed break-keep break-words">
                      {section.text}
                    </p>
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
                    {index < (tip.content.sections.length - 1) && (
                      <hr className="border-gray-100" />
                    )}
                  </section>
                ))
              )}
            </div>
          </div>

          {/* FOOTER */}
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
