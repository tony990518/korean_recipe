import { Link } from "react-router-dom";
import { LABS } from "../data";

const LabsPage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">料理研究室</h1>
        <Link to="/" className="text-sm text-red-600">返回首頁 →</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LABS.map(p => (
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
    </main>
  );
};

export default LabsPage;


