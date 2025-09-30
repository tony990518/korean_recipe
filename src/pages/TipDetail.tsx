// src/pages/TipDetail.tsx
import { useParams, Link } from "react-router-dom";
import { DB } from "../data";

const TipDetail = () => {
  const { id } = useParams();
  const tip = DB.tips.find((t) => t.id === id);

  if (!tip) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">팁을 찾을 수 없습니다.</h1>
        <div className="mt-6">
          <Link className="text-red-600 underline" to="/tips">
            모든 팁 보기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <img
          src={tip.hero}
          alt={tip.title}
          className="w-full max-h-[460px] object-cover rounded-2xl mb-6"
        />
        <h1 className="text-3xl font-bold text-slate-900">{tip.title}</h1>
        <p className="mt-2 text-lg text-slate-600">{tip.shortDescription}</p>

        <div className="mt-8 prose prose-lg max-w-none">
          {tip.modalData ? (
            <>
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
            </>
          ) : (
            tip.content?.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto object-cover rounded-lg mt-2"
                  />
                )}
              </div>
            ))
          )}
        </div>

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
