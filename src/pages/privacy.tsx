// src/pages/Privacy.tsx
import { useEffect, useRef } from "react";

export default function Privacy() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    h1Ref.current?.focus();

    if (window.location.hash) {
      // HashRouter에서 hash가 "#/privacy#collect" 형태로 올 수 있음
      const hashParts = window.location.hash.split("#").slice(1); // ["privacy", "collect"]
      const targetId = hashParts[1] || hashParts[0]; // section id 선택
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ block: "start" });
    }
  }, []);

  const updated = "2025-09-01"; // 필요 시 갱신

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-slate-800">
      <h1
        ref={h1Ref}
        tabIndex={-1}
        className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
      >
        個人資料保護政策
      </h1>
      <p className="text-sm text-slate-500 mb-8">最後更新：{updated}</p>

      <section className="mb-6">
        <p>
          本網站非常重視使用者的個人資料，並依照以下方式處理：
        </p>
      </section>

      <section id="collect" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">1. 收集項目</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>電子郵件地址（於訂閱服務時提供）</li>
        </ul>
      </section>

      <section id="purpose" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">2. 收集目的</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>寄送新文章通知</li>
          <li>改善網站運營與服務品質</li>
        </ul>
      </section>

      <section id="retention" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">3. 保存期間</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>使用者要求取消訂閱時即刪除</li>
          <li>依法令規定須保存之情形除外</li>
        </ul>
      </section>

      <section id="thirdparty" className="mb-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">4. 第三方提供</h2>
        <p>
          除法律規定之特殊情況外，不會將個人資料提供予第三方。
        </p>
      </section>

      <section id="contact" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-2">5. 聯絡方式</h2>
        <p>
          個人資料相關疑問：{" "}
          <a
            href="mailto:everyday.studiok@gmail.com"
            className="underline hover:no-underline"
          >
            everyday.studiok@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
