// src/pages/TipDetail.tsx
import { useParams, Link } from "react-router-dom";
import { DB } from "../data";
import ProductRecommendation from "../components/ProductRecommendation";
import SEOHelmet from "../components/SEOHelmet";
import { getTipMeta, getNotFoundMeta } from "../seo";

const TipDetail = () => {
  const { id } = useParams();
  const tip = DB.tips.find((t) => t.id === id);

  if (!tip) {
    const notFoundMeta = getNotFoundMeta();
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <SEOHelmet meta={notFoundMeta} />
        <h1 className="text-2xl font-bold">팁을 찾을 수 없습니다.</h1>
        <div className="mt-6">
          <Link className="text-red-600 underline" to="/tips">
            모든 팁 보기
          </Link>
        </div>
      </main>
    );
  }

  const meta = getTipMeta(tip);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <SEOHelmet meta={meta} />
      <article>
        {/* ===== Block: Hero Image ===== */}
        <img
          src={tip.hero}
          alt={tip.title}
          className="w-full max-h-[460px] object-cover rounded-2xl mb-6"
        />

        {/* ===== Block: Title ===== */}
        <h1 className="text-3xl font-bold text-slate-900">{tip.title}</h1>

        {/* ===== Block: Short Description ===== */}
        <p className="mt-2 text-lg text-slate-600">{tip.shortDescription}</p>

        {/* ===== Block: Content Sections ===== */}
        <div className="mt-12 space-y-6">
          {tip.modalData ? (
            // modalData가 있는 경우 (현재는 사용되지 않지만 호환성을 위해 유지)
            <div className="prose prose-lg max-w-none">
              <h2>🧠 이유</h2>
              <p>{tip.modalData.reason}</p>
              <h2>🛠️ 해결방법</h2>
              <p>{tip.modalData.solution}</p>
              {tip.modalData.example && (
                <>
                  <h2>📌 예시</h2>
                  <blockquote>{tip.modalData.example}</blockquote>
                </>
              )}
            </div>
          ) : (
            // content.sections를 새 디자인으로 렌더링
            tip.content?.sections.map((section, index) => {
              const icons: { [key: string]: string } = {
                "總結": "📝",
                "快速去味方法": "💡",
                "怪味從哪裡來": "🤔",
                "正確的保存方式": "📦",
              };
              const icon = icons[section.title] || "🔹";

              return (
                <section key={index} className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                    <span className="text-2xl">{icon}</span>
                    <span>{section.title}</span>
                  </h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg">
                    {section.text.includes('•') ? (
                      <ul className="list-none space-y-2">
                        {section.text.split('\n').map((item, i) => (
                          <li key={i} className="flex items-start">
                            {item.startsWith('•') && <span className="mr-2">•</span>}
                            <span>{item.replace(/^•\s?/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="whitespace-pre-line">{section.text}</p>
                    )}
                    {section.image && (
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-auto object-cover rounded-lg mt-2"
                      />
                    )}
                  </div>
                </section>
              );
            })
          )}
        </div>

        {/* ===== Block: Recommended Products ===== */}
        {tip.recommendedProducts && tip.recommendedProducts.length > 0 && (
          <div className="mt-12">
            <ProductRecommendation products={tip.recommendedProducts} />
          </div>
        )}

        {/* ===== Block: Back Link ===== */}
        <div className="mt-12">
          <Link to="/tips" className="text-red-600 hover:underline">
            ← 모든 팁 보기
          </Link>
        </div>
      </article>
    </main>
  );
};

export default TipDetail;
