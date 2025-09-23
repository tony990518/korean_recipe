// src/hooks/useFocusTrap.ts
import { useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

type Opts = {
  /** ESC 키로 닫기 */
  onEscape?: () => void;
  /** 열릴 때 자동 포커스 이동 */
  autoFocus?: boolean;
};

/** ref.current 안에서 Tab/Shift+Tab 포커스를 순환(트랩)시키는 훅 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  { onEscape, autoFocus = true }: Opts = {}
) {
  // keydown 핸들링 (ESC + Tab 순환)
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const getFocusable = (): HTMLElement[] => {
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      return nodes.filter((el) => !el.hasAttribute('inert') && el.offsetParent !== null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = getFocusable();
      if (focusables.length === 0) {
        e.preventDefault();
        (root as HTMLElement).focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = !!(active && root.contains(active));

      if (!inside) {
        e.preventDefault();
        first.focus();
        return;
      }

      // forward tab on last -> first
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
        return;
      }
      // shift+tab on first -> last
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, onEscape]);

  // 초기 포커스 이동
  useEffect(() => {
    if (!autoFocus) return;
    const root = containerRef.current;
    if (!root) return;

    const t = setTimeout(() => {
      const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((el) => !el.hasAttribute('inert') && el.offsetParent !== null);
      (focusables[0] ?? root).focus();
    }, 30);

    return () => clearTimeout(t);
  }, [containerRef, autoFocus]);
}
