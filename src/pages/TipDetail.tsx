
import { useParams, useNavigate, Link } from "react-router-dom";
import { DB, Tip } from '../data';

const TipDetail = ({ tip }: { tip: Tip }) => {
    const nav = useNavigate();
  
    return (
      <main className="max-w-5xl mx-auto px-4 pb-20">
        <button onClick={() => nav(-1)} className="mt-6 text-sm text-slate-600 hover:text-red-600">← 返回</button>
  
        <article className="mt-4">
          <div className="rounded-2xl overflow-hidden border bg-white">
            <img src={tip.hero} alt={tip.title} className="w-full max-h-[460px] object-cover" loading="lazy" />
          </div>
  
          <div className="mt-4 flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs">💡 小撇步</span>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900">{tip.title}</h1>
                <p className="text-slate-700 mt-2">{tip.shortDescription}</p>
              </div>
  
              <div className="space-y-6">
                {tip.content.sections.map((section, index) => (
                  <div key={index} className="rounded-2xl border p-6 bg-white">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{section.title}</h3>
                    {section.image && (
                      <div className="mb-4">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full max-w-md rounded-xl object-cover" loading="lazy"
                        />
                      </div>
                    )}
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{section.text}</p>
                  </div>
                ))}
              </div>
            </div>
  
            <aside className="w-full md:w-64 space-y-4">
              <div className="rounded-2xl border p-4 bg-white">
                <div className="font-semibold text-slate-900 mb-1">相關小撇步</div>
                <ul className="text-sm list-disc pl-5 text-slate-700 space-y-1">
                  <li><Link className="hover:text-red-600" to="/tip/gochujang-selection">고추장 브랜드별 특징</Link></li>
                  <li><Link className="hover:text-red-600" to="/tip/dashi-selection">다시마 vs 멸치육수</Link></li>
                  <li><Link className="hover:text-red-600" to="/recipe/kimchi-stew">김치찌개 레시피</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>
    );
  };

  const TipRoute = () => {
    const { id } = useParams();
    const tip = DB.tips?.find(t => t.id === id);
    if (!tip) {
      return (
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">找不到這個小撇步</h1>
          <p className="text-slate-600 mt-2">請返回首頁查看其他內容。</p>
          <div className="mt-6"><Link className="text-red-600 underline" to="/">返回首頁</Link></div>
        </main>
      );
    }
    return <TipDetail tip={tip} />;
  };

  export default TipRoute;
