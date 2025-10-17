import { useParams, Link, useNavigate } from "react-router-dom";
import { LABS } from "../data";
// import ProductRecommendation from "../components/ProductRecommendation";

const LabDetail = () => {
  const { id } = useParams();
  const lab = LABS.find((l) => l.id === id);
  const nav = useNavigate();

  if (!lab) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">찾을 수 없는 연구</h1>
        <div className="mt-6">
          <Link className="text-red-600 underline" to="/labs">
            모든 연구 보기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 pb-20">
      <button
        onClick={() => nav(-1)}
        className="mt-6 text-slate-600 hover:text-red-600 text-sm sm:text-base"
      >
        ← 返回
      </button>

      <article className="mt-4">
        {/* ===== Block: Hero Image ===== */}
        <div className="rounded-2xl overflow-hidden border bg-white">
          <img
            src={lab.hero}
            alt={lab.title}
            className="w-full max-h-[460px] object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col gap-6">
          {/* ===== Block: Title & Summary ===== */}
          <div>
            <h1 className="font-extrabold text-slate-900 leading-snug text-2xl sm:text-3xl md:text-4xl">
              {lab.title}
            </h1>
            <p className="mt-3 text-slate-700 leading-relaxed text-[15px] sm:text-base md:text-lg">
              {lab.shortDescription}
            </p>
          </div>

          {/* ===== Block: Content Sections ===== */}
          {lab.content?.sections?.map((section, index) => (
            <section key={index} className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                {section.title}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg">
                <p className="whitespace-pre-line">{section.text}</p>
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto object-cover rounded-lg mt-2"
                  />
                )}
              </div>
            </section>
          ))}

          {/* ===== Block: Recommended Products (Future Use) ===== */}
          {/*
          {lab.recommendedProducts && lab.recommendedProducts.length > 0 && (
            <ProductRecommendation products={lab.recommendedProducts} />
          )}
          */}

          {/* ===== Block: Back Link ===== */}
          <div className="flex">
            <Link to="/labs" className="text-red-600 hover:underline text-sm sm:text-base">
              ← 返回研究列表
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default LabDetail;
