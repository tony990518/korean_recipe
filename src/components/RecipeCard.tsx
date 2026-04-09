import { Link } from "react-router-dom";
import { Recipe } from "../types";

const RecipeCard = ({ data }: { data: Recipe }) => {
  return (
    <Link 
      to={`/recipe/${data.id}/`} 
      className={`group block cursor-pointer bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md hover:border-primary/30 text-left w-full`}
    >
      <div className="aspect-video w-full overflow-hidden relative shrink-0">
        <img
          src={data.hero}
          alt={data.title}
          className={`absolute inset-0 w-full h-full ${data.cardImageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-110`}
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          {data.minutes} 分鐘
        </div>
      </div>
      <div className="p-6 space-y-2">
        <h3 className="font-headline font-bold text-xl text-on-surface group-hover:text-primary transition-colors line-clamp-1">
          {data.title}
        </h3>
        {data.preview && (
          <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
            {data.preview}
          </p>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
