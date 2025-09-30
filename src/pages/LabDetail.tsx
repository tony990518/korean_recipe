import { useParams, Link } from "react-router-dom";
import { LABS } from "../data";

const LabDetail = () => {
  const { id } = useParams();
  const lab = LABS.find((l) => l.id === id);

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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <img
          src={lab.hero}
          alt={lab.title}
          className="w-full max-h-[460px] object-cover rounded-2xl"
        />
        <h1 className="mt-6 text-3xl font-bold text-slate-900">{lab.title}</h1>
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          {lab.shortDescription}
        </p>
        <div className="mt-8">
            <Link to="/labs" className="text-red-600 hover:underline">
                ← 모든 연구 보기
            </Link>
        </div>
      </article>
    </main>
  );
};

export default LabDetail;
