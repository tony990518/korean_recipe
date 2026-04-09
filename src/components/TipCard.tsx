// src/components/TipCard.tsx
// 홈 화면에 보이는 팁 카드 디자인
import { Tip } from "../types";

type Props = {
  data: Tip;
  onTipClick: (tip: Tip) => void;
  index?: number;
};

const TipCard = ({ data, onTipClick }: Props) => {
  const open = () => onTipClick(data);

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`${data.title} 詳細資訊`}
      aria-haspopup="dialog"
      className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden transition-all cursor-pointer group shadow-sm hover:shadow-md hover:border-primary/30 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex flex-col justify-start"
    >
      <div className="aspect-video w-full overflow-hidden relative shrink-0">
        <img
          src={data.hero}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-start">
        <h3 className="font-headline font-bold text-xl text-on-surface">{data.title}</h3>
        {data.preview && (
          <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
            {data.preview}
          </p>
        )}
        {/* <div className="flex justify-end">
          <span className="material-symbols-outlined text-primary">add_circle</span>
        </div> */}
      </div>
    </button>
  );
};

export default TipCard;
