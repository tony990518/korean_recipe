import { useState } from "react";
import { Link } from "react-router-dom";
import { DB } from "../data";
import { Tip } from "../types";
import RecipeCard from "../components/RecipeCard";
import TipCard from "../components/TipCard";
import TipModal from "../components/TipModal";
import SEOHelmet from "../components/SEOHelmet";
import { getHomeMeta } from "../seo";

const HomePage = () => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const handleTipClick = (tip: Tip) => setSelectedTip(tip);
  const handleCloseModal = () => setSelectedTip(null);
  const meta = getHomeMeta();

  const firstRecipe = DB.recipes?.[0];
  const firstTip = DB.tips?.[0];

  return (
    <main className="pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-20 md:space-y-24">
      <SEOHelmet meta={meta} />

      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">

          {/* Slide 1: Welcome (Static) */}
          <div className="flex-none w-full snap-center relative bg-surface-container-low rounded-xl md:rounded-xl min-h-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-tertiary-container rounded-full blur-3xl opacity-40"></div>
            <div className="relative z-10 w-full md:w-1/2 space-y-4 md:space-y-6">
              <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-7xl text-on-surface tracking-tight leading-tight max-w-[80vw]">
                今天想吃什麼韓式？
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md">
                開啟一段從傳統到現代的韓國料理之旅。精選私房食譜，讓你在家也能做出地道韓味。
              </p>
              <a href="#recipes" className="inline-block bg-inverse-surface text-surface rounded-full px-8 py-4 font-bold hover:scale-105 active:scale-95 transition-all duration-300">
                立即看食譜
              </a>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-white shadow-xl relative z-10">
                <img
                  className="w-full h-full object-cover"
                  alt="Korean Banchan array"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA01hIR8HV-2-B6AMJCZEH2hYEedpk81EjiF8dihfqpGuKLaB4zWFdVHNiJUJPt3ev1yIdPjBjxQwINYLuzTpxXfHsU27noaVyFI4OCJiiIRIy-3G4leiWsq_NBgr_R43kucIDvWsdQETK7JUAAilhU7Pgcp74xnZgl6suAScxDpikZ7YaNHGkIcn5MEsBrmr-KJooM0HaNkVzTN3HSiAIRbe_kjhGR_T4471V8BWZs_TFwQXrNPZyof58EEYBOd45_KPjV6Gfjlmo"
                />
              </div>
              <div className="absolute bottom-4 -left-4 w-40 h-40 bg-secondary-fixed rounded-xl rotate-12 -z-10 opacity-60"></div>
            </div>
          </div>

          {/* Slide 2: Featured Recipe (Dynamic) */}
          {firstRecipe && (
            <div className="flex-none w-full snap-center relative bg-surface-container rounded-xl md:rounded-xl min-h-[500px] flex flex-col md:flex-row-reverse items-center p-8 md:p-16 overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10 w-full md:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1 bg-primary text-on-primary rounded-full text-sm font-bold tracking-widest uppercase">
                  本週精選
                </div>
                <h2 className="font-headline font-extrabold text-4xl md:text-6xl text-on-surface tracking-tight leading-tight line-clamp-2">
                  {firstRecipe.title}
                </h2>
                <p className="text-lg text-on-surface-variant max-w-md line-clamp-3">
                  {firstRecipe.preview}
                </p>
                <Link to={`/recipe/${firstRecipe.id}/`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                  探索完整做法 <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
                <div className="rounded-xl overflow-hidden rotate-[-2deg] shadow-lg w-full max-w-sm">
                  <img className="w-full h-full object-cover aspect-square" alt={firstRecipe.title} src={firstRecipe.hero} />
                </div>
              </div>
            </div>
          )}

          {/* Slide 3: Cooking Tip (Dynamic) */}
          {firstTip && (
            <div className="flex-none w-full snap-center relative bg-secondary-container/30 rounded-xl md:rounded-xl min-h-[500px] flex flex-col items-center justify-center p-8 md:p-16 text-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-tertiary-fixed opacity-10 rounded-full blur-3xl"></div>
              <div className="relative z-10 space-y-8 max-w-2xl">
                <span className="material-symbols-outlined text-7xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  restaurant
                </span>
                <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">
                  {firstTip.title}
                </h2>
                <p className="text-xl text-on-surface-variant leading-relaxed line-clamp-3">
                  {firstTip.shortDescription}
                </p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setSelectedTip(firstTip)} className="bg-primary text-on-primary rounded-full px-8 py-3 font-bold hover:scale-105 active:scale-95 transition-all">
                    查看技巧
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Latest Recipes Section */}
      <section id="recipes" className="space-y-10 scroll-mt-24 md:scroll-mt-28">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">最新食譜</h2>
            <p className="text-on-surface-variant">跟著我們的步驟，輕鬆端出餐廳等級的韓式家常菜</p>
          </div>
          <Link to="/recipes/" className="text-primary font-bold hover:underline flex items-center gap-1 group whitespace-nowrap">
            全部查看
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(DB.recipes ?? []).slice(0, 3).map((r) => (
            <RecipeCard key={r.id} data={r} />
          ))}
        </div>
      </section>

      {/* Cooking Tips Section */}
      <section id="tips" className="space-y-10 scroll-mt-24 md:scroll-mt-28">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">料理小撇步</h2>
            <p className="text-on-surface-variant">這些廚房裡的小知識，能讓你的料理層次更上一層樓</p>
          </div>
          <Link to="/tips/" className="text-primary font-bold hover:underline flex items-center gap-1 group whitespace-nowrap">
            全部查看
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(DB.tips ?? []).slice(0, 3).map((tip) => (
            <TipCard key={tip.id} data={tip} onTipClick={handleTipClick} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-tertiary-fixed rounded-xl p-12 overflow-hidden flex flex-col md:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fef2af] rounded-full translate-x-1/3 -translate-y-1/3 opacity-50 blur-xl"></div>
        <div className="w-full md:w-1/2 space-y-6 relative z-10">
          <h2 className="font-headline font-extrabold text-4xl text-on-surface leading-tight">想收到最新食譜通知嗎？</h2>
          <p className="text-on-surface-variant">訂閱我們的電子報，每週為您送上靈感。我們不發送垃圾郵件，只分享料理的愛。</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); alert("感謝您的訂閱！(UI Demo)"); }}>
            <input
              className="bg-white border-none rounded-full px-6 py-4 flex-grow shadow-sm focus:ring-2 focus:ring-primary outline-none"
              placeholder="輸入您的電子郵件"
              type="email"
              required
            />
            <button
              type="submit"
              className="bg-primary text-on-primary rounded-full px-8 py-4 font-bold hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap"
            >
              立即訂閱
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
            <img
              className="w-full h-full object-cover rounded-xl shadow-2xl relative z-10 rotate-3"
              alt="Ingredients"
              src={DB.recipes?.[0]?.hero || "https://lh3.googleusercontent.com/aida-public/AB6AXuAIIKxTB_qiUVlFv_MNfLLClJ14Awk7xYEhxN8V8ccjI6oLCnn3XZjYQ_avLUi62TjEAWDkgj1TGUDDalTBBmAuhbRUBlIuHQXYNiCIG31E6F3y_ZSdZ4CbVk94BT3RQXrxm9YvoTyJEN3ddGnpOYsNFCq1Yy7D454P0BWfDY1QZ3bCEL6xWHdZ5PRrCSHlNDX7a7VLrW2tQaLp4xBN5rqtrfqO8_DgGp7osCBTlQNsC_DPU_W7RdmZKgbgpKa3CwSlGn2ibvdERHs"}
            />
          </div>
        </div>
      </section>

      <TipModal tip={selectedTip} onClose={handleCloseModal} />
    </main>
  );
};

export default HomePage;
