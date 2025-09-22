
import { Link } from "react-router-dom";
import { Tip } from "../data";

const TipCard = ({ data }: { data: Tip }) => (
    <Link to={`/tip/${data.id}`} className="group text-left bg-white rounded-2xl border overflow-hidden hover:shadow-md transition">
      <div className="aspect-video w-full bg-slate-100 overflow-hidden">
        <img src={data.hero} alt={data.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition" loading="lazy" />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">💡 小撇步</span>
        </div>
        <h3 className="font-semibold text-slate-900">{data.title}</h3>
        <p className="text-sm text-slate-600">{data.shortDescription}</p>
      </div>
    </Link>
  );

export default TipCard;
