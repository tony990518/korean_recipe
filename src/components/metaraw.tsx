// src/components/MetaRow.tsx
import React from "react";

type Props = {
  servings: number;
  minutes: number;
  difficulty: string; // "初" | "中" | "高/難"
  spicy: number;
};

const IconUser = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7" aria-hidden {...p}>
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" className="fill-current" />
  </svg>
);

const IconClock = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7" aria-hidden {...p}>
    <path d="M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm1 11h-3V7h2v4h2Z" className="fill-current" />
  </svg>
);

const IconStar = ({ className = "", ...p }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 md:w-6 md:h-6 ${className}`} aria-hidden {...p}>
    <path d="m12 2 2.76 5.59L21 9.27l-4.5 4.38L17.52 21 12 17.77 6.48 21l1.02-7.35L3 9.27l6.24-1.68L12 2Z" className="fill-current" />
  </svg>
);

/** "初/中/高(難)" → 1/2/3 매핑 */
function difficultyToLevel(d: string): 1 | 2 | 3 {
  const s = (d || "").trim();
  const n = Number(s);
  if ([1, 2, 3].includes(n)) return n as 1 | 2 | 3;
  if (["初", "易", "簡單", "低", "入門"].some(t => s.includes(t))) return 1;
  if (["中", "普", "普通", "中等"].some(t => s.includes(t))) return 2;
  return 3;
}

function spicyToLabel(spicy: number): string {
  if (spicy <= 1) return "不辣";
  if (spicy === 2) return "小辣";
  if (spicy === 3) return "中辣";
  return "大辣";
}

export default function MetaRow({ servings, minutes, difficulty, spicy }: Props) {
  const level = difficultyToLevel(difficulty);
  const spicyLabel = spicyToLabel(spicy);

  return (
    <ul
      className="
        mt-2 sm:mt-3
        grid grid-cols-4 place-items-center
        gap-4 sm:gap-8
        text-slate-500
        w-full max-w-3xl mx-auto
      "
      aria-label="食譜資訊"
    >
      {/* 1) 인분 */}
      <li className="flex flex-col items-center gap-1.5 text-center">
        <span className="opacity-70"><IconUser /></span>
        <span className="text-xs sm:text-sm md:text-base">{servings}人份</span>
      </li>

      {/* 2) 시간 */}
      <li className="flex flex-col items-center gap-1.5 text-center">
        <span className="opacity-70"><IconClock /></span>
        <span className="text-xs sm:text-sm md:text-base">{minutes} 分</span>
      </li>

      {/* 3) 난이도 */}
      <li className="flex flex-col items-center gap-1.5 text-center">
        <div
          className="flex items-center gap-1.5 text-slate-300"
          role="img"
          aria-label={`難度 ${difficulty}（${level}/3）`}
          title={`難度 ${difficulty}`}
        >
          {[0, 1, 2].map(i => (
            <IconStar key={i} className={i < level ? "text-yellow-400" : ""} />
          ))}
        </div>
        <span className="text-xs sm:text-sm md:text-base">難度 {difficulty}</span>
      </li>

      {/* 4) 매운맛 */}
      <li className="flex flex-col items-center gap-1.5 text-center">
        <div
          className="flex items-center gap-1.5"
          role="img"
          aria-label={`辣度 ${spicyLabel}`}
          title={`辣度 ${spicyLabel}`}
        >
          {[0, 1, 2].map(i => (
            <img
              key={i}
              src={i < spicy ? "/images/spicyColor.png" : "/images/spicyone.png"}
              alt={spicyLabel}
              className="w-6 h-6 md:w-8 md:h-8 object-contain"
            />
          ))}
        </div>

        <span className="text-xs sm:text-sm md:text-base">{spicyLabel}</span>
      </li>
    </ul>
  );
}
