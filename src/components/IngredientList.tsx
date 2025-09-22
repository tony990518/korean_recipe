import React from 'react';
import { Ingredient } from "../types";

/** 썸네일 */
const IngredientThumb = React.memo(({ url, label }: { url?: string; label: string }) => (
  <div
    className="
      w-20 h-20 md:w-24 md:h-24 aspect-square rounded-xl overflow-hidden border bg-slate-100 shrink-0
      max-[360px]:w-16 max-[360px]:h-16
    "
    aria-hidden={!url ? true : false}
  >
    {url ? (
      <img
        src={url}
        alt={label}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className="w-full h-full" />
    )}
  </div>
));

/** 장바구니 아이콘 */
const IconCart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...props}>
    <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 18zM6.2 5l.3 2H21l-2 8H8l-.2-1H5.1L4.2 5H2V3h4.4a1 1 0 0 1 .98.8zM9 13h8.1l1.3-5H6.8l.7 5H9z" fill="currentColor"/>
  </svg>
);

const IngredientList = ({ ingredients }: { ingredients: Ingredient[] }) => (
  <div className="w-full">
    <ul className="space-y-3 md:space-y-4 max-[360px]:space-y-2">
      {ingredients.map((it, idx) => {
        const key = `${it.label}-${idx}`; // 가능하면 고유 id 사용
        return (
          <li
            key={key}
            className="
              flex items-center justify-between bg-white rounded-2xl border p-4 md:p-5
              gap-4 max-[360px]:gap-3 max-[360px]:p-3
            "
          >
            {/* Left: 썸네일 + 텍스트 (텍스트 칸이 공간 우선권 갖도록) */}
            <div className="flex items-center gap-4 max-[360px]:gap-3 flex-1 min-w-0">
              <IngredientThumb url={it.image} label={it.label} />
              {/* 텍스트 래퍼: basis-0 + min-w-0 로 줄바꿈/클램프가 제대로 작동 */}
              <div className="min-w-0 basis-0 flex-1">
                {/* 제목: SE(≤360px)에서는 두 줄 허용 + 단어 강제 줄바꿈, 큰 화면에선 단계별 확대 */}
                <div
                  className="
                    font-semibold text-slate-900 leading-snug
                    text-base sm:text-lg md:text-xl
                    lg:text-[clamp(1.25rem,1vw+1.05rem,1.6rem)]
                    /* 작은 화면에서 줄바꿈 허용 & 2줄 클램프 */
                    max-[360px]:whitespace-normal max-[360px]:break-words max-[360px]:line-clamp-2
                    /* 그 외 구간에선 너무 길면 한 줄 말줄임 */
                    sm:truncate
                  "
                  title={it.label}
                >
                  {it.label}
                  {it.brand ? (
                    <span
                      className="
                        ml-1 align-middle text-slate-600 font-normal
                        text-sm sm:text-base md:text-lg
                        max-[360px]:hidden
                      "
                    >
                      （{it.brand}）
                    </span>
                  ) : null}
                </div>

                {/* 보조설명: 초소형은 숨김 (여백 확보) */}
                {it.note ? (
                  <div
                    className="
                      mt-1 text-slate-600/90 line-clamp-2
                      text-sm sm:text-base md:text-lg
                      max-[360px]:hidden
                    "
                  >
                    {it.note}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Right: 수량 + 버튼 (줄어들지 않게 shrink-0; SE에선 세로 스택) */}
            <div
              className="
                text-slate-700 flex items-center gap-3 md:gap-4
                text-sm sm:text-base md:text-lg
                shrink-0
                max-[360px]:flex-col max-[360px]:items-end max-[360px]:gap-2
              "
            >
              {it.amount ? (
                <span className="whitespace-nowrap font-medium text-slate-800 shrink-0">
                  {it.amount}
                </span>
              ) : null}

              {it.link ? (
                <a
                  href={it.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2 rounded-full border
                    px-3.5 py-2 font-semibold
                    text-sm sm:text-base md:text-lg
                    bg-red-600 text-white border-red-600
                    hover:bg-red-700 hover:border-red-700
                    focus:outline-none focus:ring-2 focus:ring-red-500/40 transition
                    max-[360px]:px-2.5 max-[360px]:py-1.5
                  "
                  aria-label={`${it.label} 購物連結（新視窗開啟）`}
                  title="購買連結"
                >
                  <IconCart className="shrink-0" />
                  {/* 초소형에서는 텍스트 숨김 → 아이콘만 */}
                  <span className="hidden sm:inline max-[360px]:hidden">購買連結</span>
                </a>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default IngredientList;
