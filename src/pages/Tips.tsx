import { Link } from "react-router-dom";
import { DB, Tip } from "../data";
import TipCard from "../components/TipCard";

const TipsPage = () => {
  const onTipClick = (tip: Tip) => {
    alert(`${tip.title}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">全部料理小撇步</h1>
        <Link to="/" className="text-sm text-red-600">返回首頁 →</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(DB.tips ?? []).map(tip => (
          <TipCard key={tip.id} data={tip} onTipClick={onTipClick} />
        ))}
      </div>
    </main>
  );
};

export default TipsPage;


