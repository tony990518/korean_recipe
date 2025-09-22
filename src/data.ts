import { Recipe } from './types';

// ---------- Types for Tips ----------
export type Tip = {
  id: string;
  title: string;
  hero: string;
  shortDescription: string;
  content: {
    sections: {
      title: string;
      text: string;
      image?: string;
    }[];
  };
};

// ---------- Simple in-file DB (can swap to JSON/Sheets later) ----------
const DB: { recipes: Recipe[]; tips: Tip[] } = {
  recipes: [
    {
      id: "yoon-nam-no-jjapaghetti",
      title: "黑白大廚 料理狂人 辣油炸醬泡麵",
      hero: "../public/images/recipes/yoon-nam-no/thumbnail.png",
      minutes: 10,
      difficulty: "初",
      servings: 1,
      flavor: { spicy: 4, salty: 4, sweet: 1, fermented: 2 },
      shortDescription: "採用四川風味辣椒油，香辣濃郁，麵條勁道。",
      ingredients: [
        { label: "韓式炸醬泡麵", amount: "1 包", image: "../public/images/recipes/yoon-nam-no/i1.webp", link:"https://shorturl.at/2lvmb"},
        { label: "青陽辣椒", amount: "1 根" , image:"../public/images/recipes/yoon-nam-no/i2.webp", link:"https://shorturl.at/2lvmb"},
        { label: "辣椒粉", amount: "1 大匙", image:"../public/images/recipes/yoon-nam-no/i3.jpg", link:"https://shorturl.at/2lvmb"},
        { label: "鹽巴", amount: "一小撮", image:"../public/images/recipes/yoon-nam-no/i4.jpg" , link:"https://shorturl.at/2lvmb"},
        { label: "橄欖油", amount: "3 大匙", image:"../public/images/recipes/yoon-nam-no/i5.webp", link:"https://shorturl.at/2lvmb"},
        { label: "水", amount: "600 毫升" , image:"../public/images/recipes/yoon-nam-no/i6.png" , link:"https://shorturl.at/2lvmb"}
      ],
      steps: [
        { title: "準備青陽辣椒", text: "將 1 根青陽辣椒切成小塊備用。", image: "../public/images/recipes/yoon-nam-no/s1.jpg"},
        { title: "製作辣椒油醬", text: "在碗中放入 1 大匙辣椒粉、切好的青陽辣椒、少許鹽，並加入炸醬麵附的調味油包，拌勻。", image: "../public/images/recipes/yoon-nam-no/s2.jpeg"},
        { title: "加熱橄欖油", text: "小鍋入 3 大匙橄欖油，中小火加熱至油面出現波紋，注意不要燒焦。", heat: "med", image: "../public/images/recipes/yoon-nam-no/s3.jpg"},
        { title: "完成辣椒油", text: "將熱油倒入裝有調味料的碗中，使辣椒粉受熱釋香；加入乾燥蔬菜包並攪拌均勻。", image: "../public/images/recipes/yoon-nam-no/s4.jpg"},
        { 
          title: "煮麵並留麵水",text: "鍋中倒入 600 毫升的水煮滾，放入麵條以中火煮約 2 分鐘至彈牙；撈起麵條後，鍋內保留約 1/3 的麵水，其餘 2/3 盛出備用。",
          heat: "med",time: "15秒",image: "../public/images/recipes/yoon-nam-no/s5.jpg"
        },
        { title: "調味與拌炒", text: "倒入炸醬粉包，與鍋中剩餘麵水和麵條拌炒，讓麵條均勻掛醬。", heat: "med", image: "../public/images/recipes/yoon-nam-no/s7.jpg"},
        { title: "加入辣椒油", text: "炸醬粉溶解後，加入先前完成的辣椒油醬，徹底攪拌均勻。", image: "../public/images/recipes/yoon-nam-no/s8.jpg"},
        { title: "調整濃稠度", text: "視口感分次加入預留的麵水，調到理想的濕潤或濃稠度即可完成。", image: "../public/images/recipes/yoon-nam-no/s9.jpeg"}
      ],
      tips: [
        "辣椒量可依喜好調整；偏好重辣可用 1.5 根。沒有青陽辣椒可試用糯米椒，但辣度會偏低。",
        "調整濃稠度時，麵水請少量多次加入，避免一下子過稀。"
      ],
      conclusion: "好啦～今天的食譜分享就到這邊 😋\n尹男老主廚的炸醬拉麵真的超簡單又好吃，這個週末不妨自己動手煮煮看，保證一口就愛上！\n希望大家都能享受下廚的樂趣，敬請期待下次的食譜，我們下次見👋"
    },

  {
    id: "kimchi-stew",
    title: "泡菜鍋（김치찌개）",
    hero: "https://images.unsplash.com/photo-1572552635556-b8e9f7a0fc66?q=80&w=1600&auto=format&fit=crop",
    minutes: 30,
    difficulty: "初",
    servings: 2,
    flavor: { spicy: 3, salty: 3, sweet: 1, fermented: 4 },
    shortDescription: "發酵香明顯，微辣帶甜，湯感濃郁。",
    ingredients: [
      { label: "熟成泡菜", amount: "300g", brand: "宗家", link: "#", image: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=800&auto=format&fit=crop" },
      { label: "五花肉", amount: "200g" },
      { label: "洋蔥", amount: "1/2 顆" },
      { label: "豆腐", amount: "1 塊" },
      { label: "고추장 辣椒醬", amount: "1 大匙", brand: "CJ", link: "#", image: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=800&auto=format&fit=crop" },
      { label: "辣椒粉(粗/細)", amount: "1 大匙", image: "https://images.unsplash.com/photo-1604908554007-9a5e6dc49e45?q=80&w=800&auto=format&fit=crop" },
      { label: "大蒜", amount: "2 瓣" },
      { label: "鯷魚/昆布高湯", amount: "600 ml" },
      { label: "韓式泡菜(超市)", amount: "300g", note: "酸度較低可加少許醋" },
      { label: "板豆腐", amount: "1 塊", note: "대체재료" },
      { label: "替代辣醬：辣椒醬+味噌+糖", amount: "各 1 小匙", note: "甜度↑ 發酵感↓" },
      { label: "昆布高湯粉 + 水", amount: "600 ml", note: "대체재료" },
    ],
    steps: [
      { text: "鍋中中火炒五花至微出油，入洋蔥炒軟。", heat: "med", time: "3 分" , tip: "不要炒到焦，影響湯色"},
      { text: "下泡菜、大蒜拌炒出香。", tip: "香味가 나올 때까지 볶기" },
      { text: "入高湯、고추장、辣椒粉，煮滾後轉小火。", heat: "low", time: "10 分", tip: "表面持續小泡即是小火" },
      { text: "加入豆腐，試味調整鹽度與甜度。", time: "3–5 分", tip: "湯頭需帶發酵酸香" },
    ],
  },
  {
    id: "tteokbokki",
    title: "辣炒年糕（떡볶이）",
    hero: "https://images.unsplash.com/photo-1627360209316-8c0f24c6559a?q=80&w=1600&auto=format&fit=crop",
    minutes: 20,
    difficulty: "初",
    servings: 2,
    flavor: { spicy: 4, salty: 2, sweet: 2, fermented: 2 },
    shortDescription: "甜辣濃稠，年糕外裹醬、內心Q彈。",
    ingredients: [
      { label: "年糕條", amount: "300g", image: "https://images.unsplash.com/photo-1617093727343-374aabf83b7d?q=80&w=800&auto=format&fit=crop" },
      { label: "魚板", amount: "150g" },
      { label: "고추장", amount: "1.5 大匙", brand: "CJ", link: "#", image: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=800&auto=format&fit=crop" },
      { label: "辣椒粉(粗/細)", amount: "1 大匙" },
      { label: "醬油", amount: "1 小匙" },
      { label: "糖", amount: "1 大匙" },
      { label: "水/高湯", amount: "400 ml" },
      { label: "冷凍年糕", amount: "300g", note: "先溫水浸泡 10 分防外硬內芯" },
      { label: "甜不辣", amount: "150g", note: "口感較脆，風味較淡" },
      { label: "替代辣醬：辣椒醬+味噌+糖", amount: "比例 1:1:1" },
      { label: "糖/蜂蜜", amount: "1 大匙", note: "대체재료" },
      { label: "水", amount: "400 ml", note: "대체재료" },
    ],
    steps: [
      { text: "小鍋入水與所有調味料煮滾。", heat: "high", time: "2–3 分" },
      { text: "加入年糕中小火煮至軟，期間輕拌防沾底。", heat: "med", time: "6–8 分", tip: "醬汁略稠、能掛住年糕即好" },
      { text: "加入魚板再煮 1–2 分，關火後靜置 1 分收醬。", heat: "low", time: "2–3 分" },
    ],
  },
],
  tips: [
    {
      id: "gochugaru-smell",
      title: "고춧가루는 왜 냄새나는지?",
      hero: "https://images.unsplash.com/photo-1604908554007-9a5e6dc49e45?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "고춧가루의 냄새 원인과 해결 방법을 알아보자",
      content: {
        sections: [
          {
            title: "고춧가루 냄새의 원인",
            text: "고춧가루에서 나는 냄새는 주로 저장 과정에서 발생합니다. 습도가 높은 환경에서 보관하면 곰팡이나 세균이 번식하면서 불쾌한 냄새가 납니다. 또한 고춧가루 자체의 자연스러운 향도 있는데, 이는 고추의 특성상 나타나는 현상입니다.",
            image: "https://images.unsplash.com/photo-1604908554007-9a5e6dc49e45?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "올바른 보관 방법",
            text: "고춧가루는 밀폐 용기에 담아 냉장고나 서늘한 곳에 보관하는 것이 좋습니다. 습기를 차단하기 위해 실리카겔을 함께 넣어두면 더욱 효과적입니다. 또한 사용 후에는 반드시 용기를 꼭 닫아두어야 합니다.",
            image: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "냄새 제거 방법",
            text: "이미 냄새가 난 고춧가루는 팬에 살짝 볶아서 사용하면 냄새를 줄일 수 있습니다. 너무 오래된 것은 사용을 피하고, 새로 구입할 때는 신선한 것을 선택하는 것이 중요합니다."
          }
        ]
      }
    },
    {
      id: "gochujang-selection",
      title: "고추장 브랜드별 특징과 선택법",
      hero: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "CJ, 청정원, 해찬들 등 브랜드별 고추장의 차이점",
      content: {
        sections: [
          {
            title: "CJ 고추장의 특징",
            text: "CJ 고추장은 전통적인 발효 공법을 사용하여 깊은 맛이 특징입니다. 단맛과 발효향이 균형있게 어우러져 있어 김치찌개나 된장찌개에 특히 잘 어울립니다.",
            image: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "청정원 고추장의 특징",
            text: "청정원 고추장은 상대적으로 단맛이 강하고 부드러운 맛이 특징입니다. 떡볶이나 닭볶음탕 같은 요리에 사용하면 좋습니다."
          },
          {
            title: "고추장 선택 팁",
            text: "고추장을 선택할 때는 용도에 따라 달라집니다. 찌개류에는 발효향이 강한 것을, 볶음류에는 단맛이 강한 것을 선택하는 것이 좋습니다."
          }
        ]
      }
    },
    {
      id: "dashi-selection",
      title: "다시마와 멸치육수의 차이점",
      hero: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "일본식 다시마 vs 한국식 멸치육수, 언제 어떤 걸 써야 할까?",
      content: {
        sections: [
          {
            title: "다시마 육수의 특징",
            text: "다시마 육수는 깔끔하고 담백한 맛이 특징입니다. 일본 요리나 깔끔한 국물 요리에 사용하면 좋습니다. 채식주의자도 사용할 수 있는 장점이 있습니다.",
            image: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "멸치 육수의 특징",
            text: "멸치 육수는 깊고 진한 맛이 특징입니다. 한국 요리나 구수한 국물 요리에 사용하면 좋습니다. 칼슘과 단백질이 풍부한 영양상의 장점도 있습니다."
          },
          {
            title: "요리별 육수 선택법",
            text: "김치찌개나 된장찌개에는 멸치 육수를, 미소시루나 우동에는 다시마 육수를 사용하는 것이 일반적입니다. 하지만 개인의 취향에 따라 조합해 사용해도 됩니다."
          }
        ]
      }
    }
  ]
};

export { DB };
