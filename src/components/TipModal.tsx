// src/components/TipModal.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Tip } from "../types";

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

  const handleClose = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      onClose();
      if (closeByKeyboardRef.current) {
        lastFocusedRef.current?.focus?.();
      } else {
        lastFocusedRef.current?.blur?.();
      }
      closeByKeyboardRef.current = false;
    }, 300);
  }, [onClose]);

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

    const overlayEl = overlayRef.current;
    const contentEl = contentRef.current;

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
      const s = contentEl;
      if (!s) return false;
      if (deltaY > 0) return s.scrollTop > 0; // 아래로 끌기(위로 스크롤)
      if (deltaY < 0) return s.scrollTop + s.clientHeight < s.scrollHeight; // 위로 밀기
      return false;
    };
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const insideContent = contentEl?.contains(e.target as Node) ?? false;
      if (!insideContent || !canScrollMore(deltaY)) {
        e.preventDefault(); // 뷰포트로 전파 차단
      }
    };

    document.addEventListener("keydown", onKey);
    overlayEl?.addEventListener("touchstart", onTouchStart, { passive: false });
    overlayEl?.addEventListener("touchmove", onTouchMove, { passive: false });

    const t = setTimeout(focusFirst, 30);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      overlayEl?.removeEventListener("touchstart", onTouchStart);
      overlayEl?.removeEventListener("touchmove", onTouchMove);

      // 바디 원복 + 기존 스크롤 위치 복귀
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo({ top: scrollY });
    };
  }, [tip, handleClose]);

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

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      className={`fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[60] transition-[opacity,visibility] duration-300 flex items-center justify-center p-4 overflow-x-hidden overscroll-y-none touch-pan-y ${show ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeByKeyboardRef.current = false;
          handleClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`bg-surface w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 flex flex-col max-h-[90vh] pb-[env(safe-area-inset-bottom)] transform motion-reduce:transition-none ${show ? "scale-100" : "scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 shrink-0">
          <img src={tip.hero} alt={tip.title} className="w-full h-full object-cover" loading="lazy" />
          <button
            onClick={() => { closeByKeyboardRef.current = false; handleClose(); }}
            className="absolute top-4 right-4 bg-surface/50 hover:bg-surface backdrop-blur p-2 rounded-full text-on-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div ref={contentRef} className="p-6 md:p-8 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold font-label">
              烹飪秘訣
            </span>
          </div>
          <h2 id={modalTitleId} className="font-headline font-extrabold text-3xl text-on-surface mb-6">
            {tip.title}
          </h2>
          
          {tip.modalData ? (
            <div className="prose prose-slate max-w-none text-on-surface-variant font-label space-y-6">
               <div>
                 <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary">psychology</span> 原因
                 </h3>
                 <p className="leading-relaxed">{tip.modalData.reason}</p>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary">build</span> 解決辦法
                 </h3>
                 <p className="leading-relaxed">{tip.modalData.solution}</p>
               </div>
               {tip.modalData.example && (
                 <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                   <h3 className="text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
                     <span className="material-symbols-outlined text-primary">lightbulb</span> 範例
                   </h3>
                   <p className="leading-relaxed text-sm">{tip.modalData.example}</p>
                 </div>
               )}
            </div>
          ) : (
            <div className="text-center py-6">
               <p className="text-lg text-on-surface-variant italic mb-4 font-label leading-relaxed">"{tip.shortDescription}"</p>
               <p className="text-sm text-on-surface-variant/70 font-label">更詳細的內容將在未來提供！</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row gap-4 font-label">
            <button
              onClick={handleShare}
              className="flex-1 bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 transition-colors py-3 rounded-full font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">share</span> 分享
            </button>
            <Link
              to={`/tip/${tip.id}/`}
              onClick={handleClose}
              className="flex-1 bg-primary text-on-primary hover:bg-primary/90 transition-colors py-3 rounded-full font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span> 查看完整文章
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TipModal;
