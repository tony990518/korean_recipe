// src/pages/Privacy.tsx
import { useEffect, useRef } from "react";
import SEOHelmet from "../components/SEOHelmet";
import { getPrivacyMeta } from "../seo";

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

  const meta = getPrivacyMeta();

  const updated = "2025-09-01"; // 필요 시 갱신

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-slate-800">
      <SEOHelmet meta={meta} />
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
        <h2 className="text-xl font-semibold mb-2">4. 第三方服務與廣告</h2>
        <p className="mb-2">本網站為維持營運，可能使用第三方廣告服務（例如：Google AdSense）。</p>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li>第三方供應商（包括 Google）會使用 Cookie 來放送廣告，其依據是使用者先前的網站造訪記錄。</li>
          <li>Google 使用廣告 Cookie 可讓 Google 及其合作夥伴根據使用者瀏覽本網站及/或其他網站的資料，向使用者放送適當的廣告。</li>
          <li>使用者可前往<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">廣告設定</a>，停用個人化廣告。</li>
        </ul>
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
