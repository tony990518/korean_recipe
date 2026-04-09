import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { DB } from "../data";
import { Recipe } from "../types";
import AffiliateNotice from "../components/AffiliateNotice";
import IngredientList from "../components/IngredientList";
import StepBlock from "../components/StepBlock";
import TipsBlock from "../components/TipsBlock";
import ConclusionBlock from "../components/ConclusionBlock";
import ShareIcons from "../components/ShareIcons";
import MetaRow from "../components/metaraw";
import ProductRecommendation from "../components/ProductRecommendation";
import SEOHelmet from "../components/SEOHelmet";
import { getRecipeMeta, getNotFoundMeta } from "../seo";
import SmartClampText from "../components/SmartClampText";

const RecipeDetail = ({ recipe }: { recipe: Recipe }) => {
  const meta = useMemo(() => getRecipeMeta(recipe), [recipe]);

  return (
    <>
      <SEOHelmet meta={meta} />
      <main className="w-full">
        <article>
          {/* Navigation Row removed as requested */}
          {/* Hero */}
          <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 z-0">
          <div className="w-full aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden shadow-lg relative">
            <img
              src={recipe.hero}
              alt={recipe.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {/* Subtle bottom gradient to help blend the overlapping card */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </section>

        {/* Intro / Title Overlay */}
        <section className="relative -mt-16 sm:-mt-24 px-6 sm:px-8 max-w-4xl mx-auto z-10">
          <div className="bg-surface backdrop-blur-2xl p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-xl text-center border border-outline-variant/30">
            {/* Tag Badges (Placeholder since actual data doesn't have categories yet) */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-widest">
                韓國食譜
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-on-surface tracking-tight leading-tight mb-6">
              {recipe.title}
            </h1>
            
            {recipe.shortDescription ? (
              <SmartClampText 
                text={recipe.shortDescription}
                maxLines={3}
                className="text-on-surface-variant text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 font-medium"
              />
            ) : null}

            {/* ===== Block: Meta Info (Time, Difficulty, etc.) ===== */}
            <div className="flex justify-center">
              <MetaRow servings={recipe.servings} minutes={recipe.minutes} difficulty={recipe.difficulty} spicy={recipe.flavor.spicy} />
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-24 pt-16 space-y-24">

            {/* ===== Block: Ingredients ===== */}
            <section className="scroll-mt-24">
              <div className="flex items-center justify-between mb-8 sm:mb-12">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">材料 Ingredient</h2>
              </div>
              
              <div className="text-xs sm:text-sm text-slate-600 mb-6">
                <AffiliateNotice />
              </div>
              
              <IngredientList ingredients={recipe.ingredients} />
            </section>

            {/* ===== Block: Steps ===== */}
            <section className="scroll-mt-24">
              <div className="mb-12">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">步驟 Steps</h2>
                <p className="text-on-surface-variant mt-2 font-body text-base sm:text-lg">照著節奏一步一步做，味道就會到位。</p>
              </div>

              <div className="space-y-8 md:space-y-12">
                {recipe.steps.map((s, i) => (
                  <StepBlock key={i} step={s} index={i} />
                ))}
              </div>
            </section>

            {/* ===== Block: Extra Tips ===== */}
            {Array.isArray(recipe.tips) && recipe.tips.length > 0 ? (
              <TipsBlock items={recipe.tips} />
            ) : null}

            {/* ===== Block: Conclusion ===== */}
            {recipe.conclusion ? (
              <section className="mt-12">
                <ConclusionBlock text={recipe.conclusion} />
              </section>
            ) : null}

            {/* ===== Block: Share Icons ===== */}
            <div className="w-full max-w-xl mx-auto pt-2 text-center">
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">分享</h3>
              <div className="mt-5 flex justify-center">
                <ShareIcons recipe={recipe} />
              </div>
            </div>

            {/* ===== Block: Recommended Products ===== */}
            {recipe.recommendedProducts && recipe.recommendedProducts.length > 0 && (
              <section className="mt-16">
                <ProductRecommendation products={recipe.recommendedProducts} />
              </section>
            )}
          </div>

      </article>
    </main>
  </>
  );
};

const RecipeRoute = () => {
  const { id } = useParams();
  const recipe = DB.recipes.find((r) => r.id === id);

  if (!recipe) {
    const notFoundMeta = getNotFoundMeta();
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center max-[360px]:px-3 max-[360px]:py-16">
        <SEOHelmet meta={notFoundMeta} />
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">找不到這道食譜</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">請返回首頁查看其他內容。</p>
        <div className="mt-6">
          <Link className="text-red-600 underline text-sm sm:text-base" to="/">返回首頁</Link>
        </div>
      </main>
    );
  }
  return <RecipeDetail recipe={recipe} />;
};

export default RecipeRoute;
