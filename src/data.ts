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
  // 모바일 모달용 추가 데이터
  modalData?: {
    reason: string;
    solution: string;
    example?: string;
  };
};

// ---------- Simple in-file DB (can swap to JSON/Sheets later) ----------
const DB: { recipes: Recipe[]; tips: Tip[] } = {
  recipes: [
    {
      id: "yoon-nam-no-jjapaghetti",
      title: "黑白大廚 料理狂人 辣油炸醬泡麵",
      hero: "/images/recipes/yoon-nam-no/thumbnail.png",
      minutes: 10,
      difficulty: "初",
      servings: 1,
      flavor: { spicy: 4, salty: 4, sweet: 1, fermented: 2 },
      shortDescription: "最近剛好在看韓綜叢林飯的第二季，看到料理狂人伊男老主廚用炸醬泡麵做的辣油炸醬麵，就馬上做來吃吃看了，推薦給喜歡吃辣的朋友一起來做～ 那就趕快開始吧！",
      ingredients: [
        { label: "韓式炸醬泡麵", amount: "1 包", image: "/images/recipes/yoon-nam-no/i1.webp", link:"https://shorturl.at/2lvmb"},
        { label: "青陽辣椒", amount: "1 根" , image:"/images/recipes/yoon-nam-no/i2.webp", link:"https://shorturl.at/2lvmb"},
        { label: "辣椒粉", amount: "1 大匙", image:"/images/recipes/yoon-nam-no/i3.jpg", link:"https://shorturl.at/2lvmb"},
        { label: "鹽巴", amount: "一小撮", image:"/images/recipes/yoon-nam-no/i4.jpg" , link:"https://shorturl.at/2lvmb"},
        { label: "橄欖油", amount: "3 大匙", image:"/images/recipes/yoon-nam-no/i5.webp", link:"https://shorturl.at/2lvmb"},
        { label: "水", amount: "600 毫升" , image:"/images/recipes/yoon-nam-no/i6.png" , link:"https://shorturl.at/2lvmb"}
      ],
      steps: [
        { title: "準備青陽辣椒", text: "將 1 根青陽辣椒切成小塊備用。", image: "/images/recipes/yoon-nam-no/s1.jpg"},
        { title: "製作辣椒油醬", text: "在碗中放入1大匙辣椒粉、切好的青陽辣椒、1小撮鹽和炸醬麵附贈的調味油包。", image: "/images/recipes/yoon-nam-no/s2.jpeg"},
        { title: "加熱橄欖油", text: "在小鍋中倒入3大匙橄欖油，用中小火加熱，注意不要燒焦。油量不多，很快就會熱。當看到油面出現波紋，表示油已經夠熱了。", heat: "med", image: "/images/recipes/yoon-nam-no/s3.jpg"},
        { title: "完成辣椒油", text: "將燒熱的橄欖油立即倒入裝有調味料的碗中。熱油會讓辣椒粉均勻散開。接著，加入乾燥蔬菜包，攪拌均勻，讓蔬菜塊也能吸附辣椒油的香味。", image: "/images/recipes/yoon-nam-no/s4.jpg"},
        { 
          title: "煮麵並留麵水",text: "鍋中倒入 600 毫升的水煮滾，放入麵條以中火煮約 2 分鐘至彈牙；撈起麵條後，鍋內保留約 1/3 的麵水，其餘 2/3 盛出備用。",
          heat: "med",time: "2分",image: "/images/recipes/yoon-nam-no/s5.jpg"
        },
        { title: "調味與拌炒", text: "將炸醬粉包倒入鍋中，與剩下的麵水和麵條拌炒，讓麵條均勻裹上醬汁。", heat: "med", image: "/images/recipes/yoon-nam-no/s7.jpg"},
        { title: "加入辣椒油", text: "當炸醬粉溶解後，加入步驟5做好的辣椒油醬，徹底攪拌均勻。", image: "/images/recipes/yoon-nam-no/s8.jpg"},
        { title: "調整濃稠度", text: "如果覺得麵條太乾，可以慢慢加入預留的麵水，調整到你喜歡的濕潤或濃稠度。這樣，一份美味的韓式辣味炸醬麵就完成了！", image: "/images/recipes/yoon-nam-no/s9.jpeg"}
      ],
      tips: [
        "辣椒的量可以根據喜好增加或減少，我自己是蠻喜歡吃辣的，覺得放1.5根剛剛好．沒有青陽辣椒的話可以用糯米椒試試看，不過辣度可能會有點不夠。",
      ],
      conclusion: "好啦～今天的食譜分享就到這邊 😋\n尹男老主廚的炸醬拉麵真的超簡單又好吃，這個週末不妨自己動手煮煮看，保證一口就愛上！\n希望大家都能享受下廚的樂趣，敬請期待下次的食譜，我們下次見👋"
    },

    {
      id: "ex-bf-toast",
      title: "前男友吐司（奶油乳酪藍莓吐司）",
      hero: "/images/recipes/ex-bf-toast/thumbnail.png",
      minutes: 5,
      difficulty: "初",
      servings: 1,
      flavor: { spicy: 0, salty: 1, sweet: 4, fermented: 0 },
      shortDescription: "這款吐司因為一則網路小故事而爆紅：有人忍不住去問前男友常做的點心食譜，結果就是這個神組合！外酥內軟的吐司，抹上奶油乳酪與藍莓果醬，酸酸甜甜，保證一吃就愛上～",
      ingredients: [
        { label: "吐司", amount: "2 片", image: "/images/recipes/ex-bf-toast/i1.png" },
        { label: "奶油乳酪", amount: "2-3 大匙", image: "/images/recipes/ex-bf-toast/i2.png" },
        { label: "藍莓果醬", amount: "1-2 大匙", image: "/images/recipes/ex-bf-toast/i3.png" },
        { label: "奶油", amount: "少許（可選）", image: "/images/recipes/ex-bf-toast/i4.png" }
      ],
      steps: [
        { 
          title: "預熱鍋子並融化奶油", 
          text: "將平底鍋放在爐上，以小火預熱約 30 秒。加入 1/2 小匙奶油，讓它完全融化並出現細小氣泡與香氣即可。不要等到變褐或冒煙。若用烤麵包機，可直接放吐司，不必加奶油。", 
          heat: "low",
          time: "30秒",
          image: "/images/recipes/ex-bf-toast/s1.png" 
        },
        { 
          title: "烤吐司兩面", 
          text: "把吐司放入鍋中，以中小火每面各烤 1 分半～2 分鐘，直到兩面都呈現金黃色、邊緣酥脆。火不要太大，避免外焦內冷。", 
          heat: "med",
          time: "3-4分",
          image: "/images/recipes/ex-bf-toast/s2.png" 
        },
        { 
          title: "塗抹奶油乳酪", 
          text: "將烤好的吐司移到盤子上，趁熱在其中一片均勻抹上 2-3 大匙奶油乳酪，建議抹到邊緣，吃起來每口都有味道。", 
          image: "/images/recipes/ex-bf-toast/s3.png" 
        },
        { 
          title: "加入藍莓果醬", 
          text: "在乳酪上放 1-2 大匙藍莓果醬，用湯匙背面輕輕抹開，避免太用力把乳酪攪散。", 
          image: "/images/recipes/ex-bf-toast/s4.png" 
        },
        { 
          title: "完成享用", 
          text: "想拍照漂亮就做開放式吐司；想要方便就蓋上另一片吐司，對半切開變三明治。最後放進微波爐加熱 10 秒，讓乳酪微微融化、果醬更融合，馬上就能享用啦！", 
          image: "/images/recipes/ex-bf-toast/s5.png" 
        }
      ],
      tips: [
        "藍莓果醬太甜的話，奶油乳酪厚一點，味道更平衡。",
        "吐司建議用厚片，比薄片更有嚼勁。",
        "微波爐時間不要超過 10 秒，避免吐司變硬。"
      ],
      conclusion: "名字聽起來酸酸的，但味道卻甜甜的，這就是前男友吐司的魅力啦 💔➡️💖 六分鐘就能完成，當早餐、下午茶或宵夜都很讚～快動手試試看，說不定比前男友更讓你回味無窮 😋"
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
  {
    id: "kimchi-fried-rice",
    title: "泡菜炒飯（김치볶음밥）",
    hero: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1600&auto=format&fit=crop",
    minutes: 15,
    difficulty: "初",
    servings: 1,
    flavor: { spicy: 2, salty: 3, sweet: 1, fermented: 3 },
    shortDescription: "酸香泡菜與米飯的絕配，快速滿足的一碗。",
    ingredients: [
      { label: "白飯", amount: "1 碗" },
      { label: "泡菜", amount: "1/2 碗" },
      { label: "五花肉/火腿", amount: "適量" },
      { label: "洋蔥", amount: "1/4 顆" },
      { label: "고추장", amount: "1 小匙" },
      { label: "香油", amount: "1 小匙" },
      { label: "雞蛋", amount: "1 顆" }
    ],
    steps: [
      { text: "鍋中入油炒香洋蔥與肉。", heat: "med", time: "2–3 分" },
      { text: "加入泡菜與고추장拌炒出香氣。", heat: "med", time: "1–2 分" },
      { text: "加入白飯大火拌勻，起鍋前淋香油。", heat: "high", time: "2 分" }
    ],
    tips: ["荷包蛋或起司片加上去更香濃。"]
  },
  {
    id: "soy-sauce-eggs",
    title: "醬油溏心蛋（간장계란장）",
    hero: "https://images.unsplash.com/photo-1581447109200-1cfd5f2bfae4?q=80&w=1600&auto=format&fit=crop",
    minutes: 30,
    difficulty: "初",
    servings: 4,
    flavor: { spicy: 0, salty: 3, sweet: 2, fermented: 1 },
    shortDescription: "提前做起來的萬用配飯神器。",
    ingredients: [
      { label: "雞蛋", amount: "6 顆" },
      { label: "醬油", amount: "150 ml" },
      { label: "水", amount: "150 ml" },
      { label: "糖", amount: "1 大匙" },
      { label: "蒜末", amount: "1 小匙" },
      { label: "蔥花", amount: "適量" }
    ],
    steps: [
      { text: "蛋入滾水煮 6 分鐘成半熟，冰水冷卻剝殼。", heat: "high", time: "6 分" },
      { text: "醬油、水、糖、蒜混合，加入蛋浸泡至少 2 小時。", heat: "low" }
    ]
  },
  {
    id: "seaweed-soup",
    title: "海帶湯（미역국）",
    hero: "https://images.unsplash.com/photo-1592417817034-3f1c2c90b9b5?q=80&w=1600&auto=format&fit=crop",
    minutes: 25,
    difficulty: "初",
    servings: 2,
    flavor: { spicy: 0, salty: 2, sweet: 1, fermented: 1 },
    shortDescription: "生日必喝，清爽營養的經典韓式湯品。",
    ingredients: [
      { label: "乾海帶", amount: "一小把", note: "泡水還原" },
      { label: "牛肉片", amount: "100 g" },
      { label: "蒜末", amount: "1 小匙" },
      { label: "醬油", amount: "1 大匙" },
      { label: "香油", amount: "1 小匙" },
      { label: "水/高湯", amount: "700 ml" }
    ],
    steps: [
      { text: "海帶泡軟切段，牛肉用醬油略醃。" },
      { text: "鍋中香油爆香蒜，入牛肉拌炒後加海帶。", heat: "med" },
      { text: "倒入水煮 15 分調味即可。", heat: "high", time: "15 分" }
    ]
  },
],

  tips: [
    {
      id: "gochugaru-smell",
      title: "고춧가루는 왜 냄새나는지?",
      hero: "/images/tips/redpepper/thumbnail.png",
      shortDescription: "고춧가루의 냄새 원인과 해결 방법을 알아보자",
      content: {
        sections: [
          {
            title: "고춧가루 냄새의 원인",
            text: "고춧가루에서 나는 냄새는 주로 저장 과정에서 발생합니다. 습도가 높은 환경에서 보관하면 곰팡이나 세균이 번식하면서 불쾌한 냄새가 납니다. 또한 고춧가루 자체의 자연스러운 향도 있는데, 이는 고추의 특성상 나타나는 현상입니다.",
            // image: "https://images.unsplash.com/photo-1604908554007-9a5e6dc49e45?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "올바른 보관 방법",
            text: "고춧가루는 밀폐 용기에 담아 냉장고나 서늘한 곳에 보관하는 것이 좋습니다. 습기를 차단하기 위해 실리카겔을 함께 넣어두면 더욱 효과적입니다. 또한 사용 후에는 반드시 용기를 꼭 닫아두어야 합니다.",
            // image: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=800&auto=format&fit=crop"
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
    ,
    {
      id: "rice-water-tip",
      title: "洗米水的妙用",
      hero: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "洗米水拿來煮湯或燉煮，味道更溫潤。",
      content: {
        sections: [
          { title: "為什麼有效？", text: "洗米水含少量澱粉，使湯頭更有身、口感更圓。" },
          { title: "怎麼用？", text: "煮蘿蔔湯、海帶湯、燉肉時以洗米水替代部分清水。" }
        ]
      }
    },
    {
      id: "egg-fluffy-omelet",
      title: "鬆軟蛋捲的關鍵",
      hero: "https://images.unsplash.com/photo-1544377193-33dcf5f2a3c1?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "加一點水或牛奶，小火慢煎不過度攪拌。",
      content: {
        sections: [
          { title: "比例", text: "每顆蛋加 1 小匙水或牛奶，口感更嫩。" },
          { title: "火候", text: "小火慢煎，表面略濕就捲起，餘溫熟成。" }
        ]
      }
    },
    {
      id: "pan-preheat",
      title: "鍋子預熱的重要性",
      hero: "https://images.unsplash.com/photo-1558030110-2321e6d66a83?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "食材不黏鍋、上色更漂亮的簡單訣竅。",
      content: {
        sections: [
          { title: "判斷方法", text: "水滴成珠在鍋面跳動，表示預熱到位。" },
          { title: "注意事項", text: "加入油後稍等 5–10 秒再下食材，避免燒焦。" }
        ]
      }
    }
  ]
};

export { DB };

// ---- Additional simple content types for homepage sections ----
export type SimplePost = {
  id: string;
  title: string;
  shortDescription: string;
  hero: string;
};

export const STORIES: SimplePost[] = [
  {
    id: "grandma-kimchi-memory",
    title: "外婆與泡菜的記憶",
    shortDescription: "每一罐泡菜，都是季節、家與耐心的味道。",
    hero: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "street-food-seoul",
    title: "首爾夜市的味道",
    shortDescription: "從魚板湯到糖餅，小吃攤位背後的溫度。",
    hero: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "first-bibimbap",
    title: "第一碗石鍋拌飯",
    shortDescription: "滋滋作響的瞬間，香氣讓時間慢了下來。",
    hero: "https://images.unsplash.com/photo-1604908554007-9a5e6dc49e45?q=80&w=1600&auto=format&fit=crop",
  },
];

export const LABS: SimplePost[] = [
  {
    id: "umami-boost",
    title: "鮮味增強術：醬油 vs 魚露 vs 蘑菇粉",
    shortDescription: "不同增鮮路線對湯與炒飯的影響實驗。",
    hero: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "marinate-science",
    title: "醃製科學：鹽糖比例與浸漬時間",
    shortDescription: "雞腿排多汁的關鍵參數，逐一檢測。",
    hero: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "starch-thickening",
    title: "勾芡流變學：太白粉與馬鈴薯粉",
    shortDescription: "同樣 1 茶匙，濃稠度與口感差異有多大？",
    hero: "https://images.unsplash.com/photo-1514511547113-bff0191bcfd4?q=80&w=1600&auto=format&fit=crop",
  },
];
