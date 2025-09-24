import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { DB } from "../data";

const RecipesPage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">全部食譜</h1>
        <Link to="/" className="text-sm text-red-600">返回首頁 →</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DB.recipes.map(r => (
          <RecipeCard key={r.id} data={r} />
        ))}
      </div>
    </main>
  );
};

export default RecipesPage;


