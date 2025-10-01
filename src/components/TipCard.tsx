// src/components/TipCard.tsx
// 홈 화면에 보이는 팁 카드 디자인
import { Tip } from "../data";

type Props = {
  data: Tip;
  onTipClick: (tip: Tip) => void;
};

const TipCard = ({ data, onTipClick }: Props) => {
  const open = () => onTipClick(data);

  return (
    <article className="group text-left bg-white rounded-2xl border overflow-hidden hover:shadow-md transition">
      {/* 카드 전체를 실제 버튼으로 만들어 접근성/키보드 상호작용 기본 제공 */}
      <button
        type="button"
        onClick={open}
        aria-label={`${data.title} 상세 보기`}
        aria-haspopup="dialog"
        // className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
        className="w-full text-left cursor-pointer focus:outline-none
           focus-visible:ring-2 focus-visible:ring-red-500
           focus-visible:ring-offset-2 focus-visible:ring-offset-white
           rounded-2xl"
      >
        {/* 미디어 영역: 모바일(기본) h≈65% of viewport, ≥sm에서는 16:9 고정 */}
        <div className="w-full overflow-hidden">
          <div className="aspect-[16/9] bg-slate-100">
            <img
              src={data.hero}
              alt={data.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition"
              loading="lazy"
            />
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">💡 小撇步</span>
          </div>

          <h3 className="font-semibold text-slate-900 leading-snug">
            {data.title}
          </h3>

        </div>
      </button>
    </article>
  );
};

export default TipCard;
