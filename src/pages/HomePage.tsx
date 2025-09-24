
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DB, Tip } from '../data';
import RecipeCard from "../components/RecipeCard";
import TipCard from "../components/TipCard";
import TipModal from '../components/TipModal';
import { STORIES, LABS } from '../data';

const HomePage = () => {
    const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

    const handleTipClick = (tip: Tip) => {
      setSelectedTip(tip);
    };

    const handleCloseModal = () => {
      setSelectedTip(null);
    };

  // ----- Hero Carousel -----
  const [current, setCurrent] = useState(0); // 0: 기본, 1: 레시피, 2: 팁, 3: 스토리, 4: 연구실
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const total = 5;
  const go = (idx: number) => setCurrent(((idx % total) + total) % total);
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    const threshold = 40; // px
    if (touchDeltaX.current > threshold) prev();
    else if (touchDeltaX.current < -threshold) next();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const firstRecipe = DB.recipes[0];
  const firstTip = DB.tips[0];
  const firstStory = STORIES[0];
  const firstLab = LABS[0];

  // Auto slide
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => ((c + 1) % total));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section id="hero" className="mb-8 relative">
          <div
            className="overflow-hidden rounded-2xl border"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex w-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {/* Slide 1: 기존 히어로 */}
              <div className="min-w-full p-6 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-red-50 to-amber-50">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">今天想吃什麼韓式？</h1>
                  <p className="mt-2 text-slate-700">跟著 Studio.K 韓味研究所，簡單做出美味料理🧑‍🍳</p>
                  <div className="mt-4 flex gap-2">
                    <a href="#recipes" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">立即看食譜</a>
                  </div>
                </div>
                <div className="w-full md:w-80"></div>
              </div>

              {/* Slide 2: 레시피 텍스트만 */}
              <div className="min-w-full p-6 flex flex-col md:flex-row items-center gap-6 bg-white">
                {firstRecipe && (
                  <>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">今日推薦食譜</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900">{firstRecipe.title}</h3>
                      {firstRecipe.shortDescription && (
                        <p className="mt-2 text-slate-700 line-clamp-3">{firstRecipe.shortDescription}</p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <Link to={`/recipe/${firstRecipe.id}`} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">查看食譜</Link>
                        <a href="#recipes" className="px-4 py-2 rounded-lg border text-sm">更多食譜</a>
                      </div>
                    </div>
                    <div className="w-full md:w-80" />
                  </>
                )}
              </div>

              {/* Slide 3: 팁 텍스트만 */}
              <div className="min-w-full p-6 flex flex-col md:flex-row items-center gap-6 bg-white">
                {firstTip && (
                  <>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">今日料理小撇步</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900">{firstTip.title}</h3>
                      {firstTip.shortDescription && (
                        <p className="mt-2 text-slate-700 line-clamp-3">{firstTip.shortDescription}</p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <a href="#tips" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">查看小撇步</a>
                        <button type="button" onClick={() => handleTipClick(firstTip)} className="px-4 py-2 rounded-lg border text-sm">快速預覽</button>
                      </div>
                    </div>
                    <div className="w-full md:w-80" />
                  </>
                )}
              </div>

              {/* Slide 4: 料理小故事 텍스트만 */}
              <div className="min-w-full p-6 flex flex-col md:flex-row items-center gap-6 bg-white">
                {firstStory && (
                  <>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">料理小故事</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900">{firstStory.title}</h3>
                      {firstStory.shortDescription && (
                        <p className="mt-2 text-slate-700 line-clamp-3">{firstStory.shortDescription}</p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <a href="#stories" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">前往故事</a>
                        <Link to="/stories" className="px-4 py-2 rounded-lg border text-sm">全部查看</Link>
                      </div>
                    </div>
                    <div className="w-full md:w-80" />
                  </>
                )}
              </div>

              {/* Slide 5: 料理研究室 텍스트만 */}
              <div className="min-w-full p-6 flex flex-col md:flex-row items-center gap-6 bg-white">
                {firstLab && (
                  <>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">料理研究室</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900">{firstLab.title}</h3>
                      {firstLab.shortDescription && (
                        <p className="mt-2 text-slate-700 line-clamp-3">{firstLab.shortDescription}</p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <a href="#labs" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm">查看研究</a>
                        <Link to="/labs" className="px-4 py-2 rounded-lg border text-sm">全部查看</Link>
                      </div>
                    </div>
                    <div className="w-full md:w-80" />
                  </>
                )}
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-white/70 backdrop-blur px-2 py-1 rounded-full border">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full ${current === i ? "bg-slate-900" : "bg-slate-300"}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white shadow-sm hover:bg-slate-50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white shadow-sm hover:bg-slate-50"
            >
              ›
            </button>
          </div>
        </section>
  
        <section id="recipes" className="mb-10 scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">最新食譜</h2>
            <Link to="/recipes" className="text-sm text-red-600">全部查看 →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DB.recipes.slice(0, 3).map(r => <RecipeCard key={r.id} data={r} />)}
          </div>
        </section>
  
        <section id="tips" className="mb-10 scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xl font-bold text-slate-900">料理小撇步</h2>
            <Link to="/tips" className="text-sm text-red-600">全部查看 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(DB.tips ?? []).slice(0, 3).map(tip => <TipCard key={tip.id} data={tip} onTipClick={handleTipClick} />)}
          </div>
        </section>

        {/* 料理小故事 */}
        <section id="stories" className="mb-10 scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xl font-bold text-slate-900">料理小故事</h2>
            <Link to="/stories" className="text-sm text-red-600">全部查看 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STORIES.slice(0,3).map(p => (
              <article key={p.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
                <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                  <img src={p.hero} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.shortDescription}</p>
                  <button className="text-sm text-red-600">閱讀更多 →</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 料理研究室 */}
        <section id="labs" className="mb-10 scroll-mt-24 md:scroll-mt-28">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xl font-bold text-slate-900">料理研究室</h2>
            <Link to="/labs" className="text-sm text-red-600">全部查看 →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LABS.slice(0,3).map(p => (
              <article key={p.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
                <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                  <img src={p.hero} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.shortDescription}</p>
                  <button className="text-sm text-red-600">查看實驗 →</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <TipModal tip={selectedTip} onClose={handleCloseModal} />
      </main>
    );
  };

export default HomePage;
