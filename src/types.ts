// types.ts — 단일 소스의 진실(Single Source of Truth)

/* ========== Atomic types ========== */
export type Ingredient = {
  label: string;
  amount?: string;
  note?: string;
  brand?: string;
  link?: string;
  image?: string;
};

export type Step = {
  text: string;
  title?: string; // 소제목(옵션)
  time?: string;
  heat?: "low" | "med" | "high";
  tip?: string;
  image?: string;
};

export type FlavorProfile = {
  spicy: number;
  salty: number;
  sweet: number;
  fermented: number;
};

/* ========== Aggregates ========== */
export type Recipe = {
  id: string;
  title: string;
  hero: string;
  minutes: number;
  difficulty: "初" | "中" | "高";
  servings: number;
  flavor: FlavorProfile;

  // 현재 앱이 사용하는 단일 레일
  ingredients: Ingredient[];
  steps: Step[]; 
  shortDescription?: string;
  /** 레시피 팁(선택): 스텝 이후 요약 팁들 */
  tips?: string[];
  /** 結語/마무리 한 문단(선택) */
  conclusion?: string;
};
