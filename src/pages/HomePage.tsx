
import { useState } from 'react';
import { DB, Tip } from '../data';
import RecipeCard from "../components/RecipeCard";
import TipCard from "../components/TipCard";
import TipModal from '../components/TipModal';

const HomePage = () => {
    const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

    const handleTipClick = (tip: Tip) => {
      setSelectedTip(tip);
    };

    const handleCloseModal = () => {
      setSelectedTip(null);
    };

    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section id="hero" className="mb-8">
          <div className="bg-gradient-to-br from-red-50 to-amber-50 border rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">今天想吃什麼韓式？</h1>
              <p className="mt-2 text-slate-700">跟著 K-Lab 韓味研究所，簡單做出美味料理🧑‍🍳</p>
              <div className="mt-4 flex gap-2">
                <a href="#recipes" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">立即看食譜</a>
              </div>
            </div>
            <div className="w-full md:w-80"></div>
          </div>
        </section>
  
        <section id="recipes" className="mb-10">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">最新食譜</h2>
            <p className="text-sm text-slate-600">15–30 分完成 · 初學者友善</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DB.recipes.map(r => <RecipeCard key={r.id} data={r} />)}
          </div>
        </section>
  
        <section id="tips" className="mb-10">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xl font-bold text-slate-900">料理小撇步</h2>
            <a className="text-sm text-red-600" href="#">全部查看 →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(DB.tips ?? []).map(tip => <TipCard key={tip.id} data={tip} onTipClick={handleTipClick} />)}
          </div>
        </section>

        <TipModal tip={selectedTip} onClose={handleCloseModal} />
      </main>
    );
  };

export default HomePage;
