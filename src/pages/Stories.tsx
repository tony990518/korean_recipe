import { Link } from "react-router-dom";
import { STORIES } from "../data";

const StoriesPage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">料理小故事</h1>
        <Link to="/" className="text-sm text-red-600">返回首頁 →</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STORIES.map(p => (
          <article key={p.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
            <div className="aspect-video w-full bg-slate-100 overflow-hidden">
              <img src={p.hero} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.shortDescription}</p>
              <button className="text-sm text-red-600">閱讀更多 →</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default StoriesPage;


