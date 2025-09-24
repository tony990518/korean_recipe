// src/pages/Terms.tsx
import { useEffect, useRef } from "react";

export default function Terms() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 접근성: 페이지 진입 시 제목에 포커스
    h1Ref.current?.focus();
    // 해시(#) 스크롤 지원
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      el?.scrollIntoView({ block: "start" });
    }
  }, []);

  const updated = "2025-09-01"; // 마지막 업데이트일 필요 시 갱신

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-slate-800">
      <h1
        ref={h1Ref}
        tabIndex={-1}
        className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
      >
        使用條款
      </h1>
      <p className="text-sm text-slate-500 mb-8">最後更新：{updated}</p>

      {/* 본문 */}
      <section id="purpose" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">1. 目的</h2>
        <p>本條款旨在規範本網站（以下稱「本網站」）之使用者權利與義務。</p>
      </section>

      <section id="services" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">2. 服務內容</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>提供食譜、文章瀏覽</li>
          <li>提供電子郵件訂閱服務</li>
        </ul>
      </section>

      <section id="obligations" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">3. 使用者義務</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>遵守相關法令及本條款</li>
          <li>不得侵害他人權益或進行不當行為</li>
        </ul>
      </section>

      <section id="rights" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">4. 本網站權利</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>得視需要調整或中止服務內容</li>
          <li>發現違法或不當行為時，有權限制使用</li>
        </ul>
      </section>

      <section id="liability" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">5. 責任限制</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>本網站不保證所提供資訊之完整性與正確性</li>
          <li>使用者因使用本網站服務所產生之損失，本網站不承擔任何責任</li>
        </ul>
      </section>

      <section id="misc" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">6. 附則</h2>
        <p>本條款自公告之日起生效。</p>
      </section>
    </main>
  );
}
