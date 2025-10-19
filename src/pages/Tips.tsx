// src/pages/TipsPage.tsx
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { DB } from "../data";
import { Tip } from "../types";
import TipCard from "../components/TipCard";
import TipModal from "../components/TipModal";
import SEOHelmet from "../components/SEOHelmet";
import { getTipsMeta } from "../seo";

const TipsPage = () => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  const onTipClick = useCallback((tip: Tip) => {
    setSelectedTip(tip);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTip(null);
  }, []);

  const meta = getTipsMeta();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <SEOHelmet meta={meta} />
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
          全部料理小撇步
        </h1>
        <Link to="/" className="text-sm text-red-600">返回首頁 →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(DB.tips ?? []).map((tip) => (
          <TipCard key={tip.id} data={tip} onTipClick={onTipClick} />
        ))}
      </div>

      {/* 모달: 선택된 팁이 있을 때만 열림 */}
      <TipModal tip={selectedTip} onClose={closeModal} />
    </main>
  );
};

export default TipsPage;
