import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
// import TipButton from "../components/TipButton";

import { HowToStep } from "schema-dts";

const RecipeDetail = ({ recipe }: { recipe: Recipe }) => {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: recipe.title,
      recipeYield: `${recipe.servings} 份`,
      totalTime: `PT${recipe.minutes}M`,
      recipeIngredient: recipe.ingredients.map(
        (i) => `${i.label}${i.amount ? ` ${i.amount}` : ""}`
      ),
      recipeInstructions: recipe.steps.map((s, idx) => {
        const stepObj: HowToStep = {
          "@type": "HowToStep",
          text: `${idx + 1}. ${s.text}`,
        };
        if (s.title) stepObj.name = s.title;
        return stepObj;
      }),
      image: recipe.hero,
    }),
    [recipe]
  );

  const nav = useNavigate();

  return (
    <>
      <Helmet>
        <title>{`${recipe.title} | K-Food Studio`}</title>
        <meta name="description" content={recipe.shortDescription} />
      </Helmet>
      <main
        className="
        max-w-5xl mx-auto px-4 pb-20
        max-[360px]:px-3 max-[360px]:pb-16
      "
      >
      {/* back */}
      <button
        onClick={() => nav(-1)}
        className="
          mt-6 text-slate-600 hover:text-red-600
          text-sm sm:text-base
          max-[360px]:mt-4
        "
      >
        ← 返回
      </button>

      <article className="mt-4">
        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border bg-white">
          <img
            src={recipe.hero}
            alt={recipe.title}
            className="w-full max-h-[460px] object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col md:flex-row gap-6">
          {/* ⬇️ 본문 공통 폰트 스케일 상향 (여기 한 줄로 전체 체감 상승) */}
          <div className="
              flex-1 space-y-4 max-[360px]:space-y-3
              text-[15px] sm:text-base md:text-[17px]
            ">
            {/* ===== Block: Title ===== */}
            <h1
              className="
                font-extrabold text-slate-900 leading-snug
                text-2xl sm:text-3xl md:text-4xl
                lg:text-[clamp(2rem,1.2vw+1.8rem,2.5rem)]
                break-words
              "
            >
              {recipe.title}
            </h1>

            {/* ===== Block: Short Description ===== */}
            {recipe.shortDescription ? (
              <p
                className="
                  text-slate-700 leading-relaxed
                  text-[15px] sm:text-base md:text-lg
                  max-[360px]:line-clamp-3 max-[360px]:whitespace-normal
                "
              >
                {recipe.shortDescription}
              </p>
            ) : null}

            {/* ===== Block: Meta Info (Time, Difficulty, etc.) ===== */}
            <MetaRow servings={recipe.servings} minutes={recipe.minutes} difficulty={recipe.difficulty} spicy={recipe.flavor.spicy} />

            {/* ===== Block: Ingredients ===== */}
            <div className="rounded-2xl border p-4 max-[360px]:p-3">
              <h3
                className="
                    font-semibold mb-3 text-slate-900
                    text-lg sm:text-xl md:text-2xl
                    leading-snug
                  "
              >
                材料
                <em className="ml-2 text-xs sm:text-sm italic text-slate-500">Ingredient</em>
              </h3>

              <div className="text-xs sm:text-sm text-slate-600">
                <AffiliateNotice />
              </div>
              <div className="mt-3">
                <IngredientList ingredients={recipe.ingredients} />
              </div>
            </div>

            {/* ===== Block: Steps ===== */}
            <div className="rounded-2xl border p-4 max-[360px]:p-3">
              <h3
                className="
                    font-semibold mb-3 text-slate-900
                    text-lg sm:text-xl md:text-2xl
                    leading-snug
                  "
              >
                步驟
                <em className="ml-2 text-xs sm:text-sm italic text-slate-500">Steps</em>
              </h3>

              <div className="
                  space-y-3 max-[360px]:space-y-2
                  text-[15px] sm:text-base md:text-lg
                ">
                {recipe.steps.map((s, i) => (
                  <StepBlock key={i} step={s} index={i} />
                ))}
              </div>
            </div>

            {/* ===== Block: Extra Tips ===== */}
            {Array.isArray(recipe.tips) && recipe.tips.length > 0 ? (
              <TipsBlock items={recipe.tips} />
            ) : null}

            {/* ===== Block: Conclusion ===== */}
            {recipe.conclusion ? (
              <ConclusionBlock text={recipe.conclusion} />
            ) : null}

            {/* ===== Block: Share Icons ===== */}
            <ShareIcons recipe={recipe} />

            {/* ===== Block: Recommended Products ===== */}
            {recipe.recommendedProducts && recipe.recommendedProducts.length > 0 && (
              <ProductRecommendation products={recipe.recommendedProducts} />
            )}
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  </>
  );
};

const RecipeRoute = () => {
  const { id } = useParams();
  const recipe = DB.recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center max-[360px]:px-3 max-[360px]:py-16">
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
