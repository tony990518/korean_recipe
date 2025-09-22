// src/components/FlavorMeter.tsx
import React from "react";
import type { FlavorProfile } from "../types";

type Props = {
  profile: FlavorProfile;
  max?: number;                // 기본 5칸
  variant?: "bar" | "icons";   // ← 추가: 아이콘 모드
};

const traits: Array<{
  key: keyof FlavorProfile;
  label: string;
  // 아이콘: 이모지/인라인 SVG 아무거나 OK. 일단 이모지로 심플하게.
  icon: React.ReactNode;
}> = [
  { key: "spicy",     label: "辣度",   icon: "🌶️" },
  { key: "salty",     label: "鹹度",   icon: "🧂" },
  { key: "sweet",     label: "甜度",   icon: "🍬" },
  { key: "fermented", label: "發酵感", icon: "🫧" },
];

export default function FlavorMeter({ profile, max = 5, variant = "icons" }: Props) {
  if (variant === "bar") {
    // 기존 막대형 (간단 샘플; 네가 쓰던 스타일 유지해도 됨)
    return (
      <div className="space-y-3">
        {traits.map(({ key, label, icon }) => {
          const v = Math.max(0, Math.min(max, Number(profile[key] ?? 0)));
          const pct = (v / max) * 100;
          return (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-slate-700 flex items-center gap-2">
                  <span aria-hidden>{icon}</span>
                  {label}
                </span>
                <span className="text-xs text-slate-500">{v}/{max}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-red-600" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // 아이콘(도트)형
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {traits.map(({ key, label, icon }) => {
        const v = Math.max(0, Math.min(max, Number(profile[key] ?? 0)));
        return (
          <div key={key} className="flex items-center gap-3 p-3 rounded-xl border bg-white">
            {/* 아이콘+라벨 */}
            <div className="shrink-0 flex items-center gap-2 min-w-[4.5rem]">
              <span className="text-xl md:text-2xl" aria-hidden>{icon}</span>
              <span className="text-sm md:text-base text-slate-800">{label}</span>
            </div>

            {/* 도트 레이팅 */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: max }).map((_, i) => {
                const filled = i < v;
                return (
                  <span
                    key={i}
                    className={`inline-block rounded-full
                                w-3.5 h-3.5 md:w-4 md:h-4
                                ${filled ? "bg-red-600" : "bg-slate-200"}`}
                    aria-hidden
                  />
                );
              })}
            </div>

            {/* 수치(선택) */}
            <span className="ml-auto text-xs text-slate-500">{v}/{max}</span>
          </div>
        );
      })}
    </div>
  );
}
