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
        { label: "韓式炸醬泡麵", amount: "1 包", image: "/images/recipes/yoon-nam-no/i1.webp", link: "https://shorturl.at/2lvmb" },
        { label: "青陽辣椒", amount: "1 根", image: "/images/recipes/yoon-nam-no/i2.webp", link: "https://shorturl.at/2lvmb" },
        { label: "辣椒粉", amount: "1 大匙", image: "/images/recipes/yoon-nam-no/i3.jpg", link: "https://shorturl.at/2lvmb" },
        { label: "鹽巴", amount: "一小撮", image: "/images/recipes/yoon-nam-no/i4.jpg", link: "https://shorturl.at/2lvmb" },
        { label: "橄欖油", amount: "3 大匙", image: "/images/recipes/yoon-nam-no/i5.webp", link: "https://shorturl.at/2lvmb" },
        { label: "水", amount: "600 毫升", image: "/images/recipes/yoon-nam-no/i6.png", link: "https://shorturl.at/2lvmb" }
      ],
      steps: [
        { title: "準備青陽辣椒", text: "將 1 根青陽辣椒切成小塊備用。", image: "/images/recipes/yoon-nam-no/s1.jpg" },
        { title: "製作辣椒油醬", text: "在碗中放入1大匙辣椒粉、切好的青陽辣椒、1小撮鹽和炸醬麵附贈的調味油包。", image: "/images/recipes/yoon-nam-no/s2.jpeg" },
        { title: "加熱橄欖油", text: "在小鍋中倒入3大匙橄欖油，用中小火加熱，注意不要燒焦。油量不多，很快就會熱。當看到油面出現波紋，表示油已經夠熱了。", heat: "med", image: "/images/recipes/yoon-nam-no/s3.jpg" },
        { title: "完成辣椒油", text: "將燒熱的橄欖油立即倒入裝有調味料的碗中。熱油會讓辣椒粉均勻散開。接著，加入乾燥蔬菜包，攪拌均勻，讓蔬菜塊也能吸附辣椒油的香味。", image: "/images/recipes/yoon-nam-no/s4.jpg" },
        {
          title: "煮麵並留麵水", text: "鍋中倒入 600 毫升的水煮滾，放入麵條以中火煮約 2 分鐘至彈牙；撈起麵條後，鍋內保留約 1/3 的麵水，其餘 2/3 盛出備用。",
          heat: "med", time: "2分", image: "/images/recipes/yoon-nam-no/s5.jpg"
        },
        { title: "調味與拌炒", text: "將炸醬粉包倒入鍋中，與剩下的麵水和麵條拌炒，讓麵條均勻裹上醬汁。", heat: "med", image: "/images/recipes/yoon-nam-no/s7.jpg" },
        { title: "加入辣椒油", text: "當炸醬粉溶解後，加入步驟5做好的辣椒油醬，徹底攪拌均勻。", image: "/images/recipes/yoon-nam-no/s8.jpg" },
        { title: "調整濃稠度", text: "如果覺得麵條太乾，可以慢慢加入預留的麵水，調整到你喜歡的濕潤或濃稠度。這樣，一份美味的韓式辣味炸醬麵就完成了！", image: "/images/recipes/yoon-nam-no/s9.jpeg" }
      ],
      tips: [
        "辣椒的量可以根據喜好增加或減少，沒有青陽辣椒的話可以用糯米椒試試看，不過辣度可能會有點不夠。",
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
      id: "Kaguri",
      title: "咖哩浣熊麵-Kaguri",
      hero: "/images/recipes/Kaguri/Thumbnail.png",
      minutes: 10,
      difficulty: "初",
      servings: 1,
      flavor: { spicy: 2, salty: 2, sweet: 2, fermented: 2 },
      shortDescription: "Kaguri是韓國很有名的一種泡麵吃法，做法很簡單，就是在浣熊泡麵裡加入咖哩塊一起煮。這個吃法最早在韓國的網咖（PC房）裡很流行，因為方便又好吃，後來透過網友口耳相傳變得越來越受歡迎。甚至因為人氣太高，農心還真的推出了官方版的Kaguri產品呢！懶得自己做的朋友也可以直接買官方產品來吃喔！",
      ingredients: [
        { label: "浣熊海鮮烏龍麵", amount: "1 包", link: "#", image: "/images/recipes/Kaguri/i1.jpeg" },
        { label: "咖哩塊", amount: "1 塊", link: "#", image: "/images/recipes/Kaguri/i2.jpg" },
        { label: "雞蛋(可省略)", amount: "1 顆", link: "#", image: "/images/recipes/Kaguri/i3.png" },
        { label: "青蔥(可省略)", amount: "少許", link: "#", image: "/images/recipes/Kaguri/i4.jpeg" },
        { label: "辣椒粉(可省略)", amount: "1 大匙" ,link: "#", image: "/images/recipes/Kaguri/i5.png"},
        { label: "水", amount: "550 ml", link: "#", image: "/images/recipes/yoon-nam-no/i6.png", imageFit: "contain" },
      ],
      steps: [
        { title: "溶解咖哩", text: "在鍋中加入水 550 ml，並放入泡麵的乾燥蔬菜包以及咖哩塊，加熱慢慢讓咖哩塊溶解，期間輕拌防沾底。", heat: "med", image:"/images/recipes/Kaguri/s1.png" },
        { title: "煮麵", text: "水滾後，加入麵條以及半包湯包，將麵煮至喜歡的口感。", heat: "med", time: "5 分" ,tip: "官方說明書建議煮5分鐘",image:"/images/recipes/Kaguri/s2.png"},
        { title: "加入配料", text: "根據個人喜好加入雞蛋、青蔥、辣椒粉等可選食材，完成！",image:"/images/recipes/Kaguri/s3.png" }
      ],
    },
    {
      id: "Seul Gi-enoki",
      title: "Red Velvet瑟琪的減肥食譜 - 金針菇豆腐",
      hero: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1600&auto=format&fit=crop",
      minutes: 10,
      difficulty: "初",
      servings: 1,
      flavor: { spicy: 0, salty: 3, sweet: 1, fermented: 3 },
      shortDescription: "Red Velvet 瑟琪在 YouTube 上分享過她回歸期常吃的身材管理食譜之一 - 金針菇豆腐! 不只做法簡單，熱量低，還能吃得很有飽足感。想要控制體重、又不想吃得太單調的朋友，可以一起來試試看～ 🍴",
      ingredients: [
        { label: "板豆腐", amount: "1 盒" , image: "/images/recipes/Seulgi/i1.jpg"},
        { label: "金針菇", amount: "半 包", image: "/images/recipes/Seulgi/i2.jpg" },
        { label: "醬油", amount: "1 大匙" , image: "/images/recipes/Seulgi/i3.png"},
        { label: "阿洛酮糖", amount: "1 大匙" , image: "/images/recipes/Seulgi/i4.jpg"},
        { label: "蠔油", amount: "1/2 大匙" , image: "/images/recipes/Seulgi/i5.jpg"},
        { label: "蒜泥", amount: "些許" , image: "/images/recipes/Seulgi/i6.jpg"},
        { label: "水", amount: "2 大匙" , image: "/images/recipes/yoon-nam-no/i6.png"},
        { label: "芝麻(可選)", amount: "些許" , image: "/images/recipes/Seulgi/i7.jpeg"},
        { label: "芝麻油(可選)", amount: "1 小匙" , image: "/images/recipes/Seulgi/i8.jpg"}
      ],
      steps: [
        { title: "製作醬汁", text: "將醬油、阿洛酮糖、蠔油、蒜末(各1大匙)和水(2大匙)混合，調成醬汁", heat: "med", image:"/images/recipes/Seulgi/s2.png" },
        { title: "煎豆腐", text: "在平底鍋加入一點油，並將豆腐放入煎至金黃色，先盛出放在盤中",image:"/images/recipes/Seulgi/s3.png" },
        { title: "煎金針菇", text: "將金針菇下鍋煎炒", heat: "med", image:"/images/recipes/Seulgi/s4.png" },
        { title: "加入醬汁", text: "倒入剛剛調好的醬汁，將醬汁收乾入味後，淋在豆腐上即可", heat: "med", time: "5 分", image:"/images/recipes/Seulgi/s5.png"},
        { title: "擺盤完成", text: "根據個人喜好加入芝麻、芝麻油等可選食材，完成！", image:"/images/recipes/Seulgi/s6.png" }
      ],
      tips: ["如果家裡沒有阿洛酮糖，也可以用砂糖代替，大約放 阿洛酮糖用量的 70% 就可以了。例如：食譜裡如果用到 1 大匙阿洛酮糖，改成砂糖的話只要 2/3 大匙 就差不多。不過阿洛酮糖熱量更低、對身材管理更友善，正在控制飲食的朋友還是推薦試試看～"]
    },
    {
      id: "soy-sauce-eggs",
      title: "醬油溏心蛋（마약계란장）",
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
      title: "투움바（투움바）",
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
      title: "辣椒粉有陳味怎麼辦？！",
      hero: "/images/tips/redpepper/thumbnail.png",
      shortDescription: "辣椒粉有怪味？別擔心，簡單幾招就能解決！",
      content: {
        sections: [
          {
            title: "總結",
            text: "辣椒粉存放過久或保存不當會因濕氣、氧化與異味吸附導致風味下降，雖非腐敗但品質受損。\n辣椒粉的陳味主要由濕氣與氧氣暴露引起，可用微波或乾炒去除，但若發霉則必須丟棄。\n密封冷藏、小包分裝並及時食用，可保持新鮮，發現霉味立即丟棄。"
          },
          {
            title: "怎麼去除陳味？",
            text: "微波爐加熱：將辣椒粉放入耐熱容器，微波加熱20~30秒，注意避免過熱燒焦。\n 乾鍋炒製：用小火快炒1~2分鐘，去除濕氣與異味。\n 打散結塊：加熱或炒製後，用湯匙或篩網輕輕打散辣椒粉的結塊。\n發霉注意：若發現霉點或異常氣味，絕對不可食用！霉菌毒素即使煮沸也無法去除，務必丟棄。"
          },
          {
            title: "陳味從哪裡來",
            text: "濕氣：辣椒粉吸收濕氣後，易滋生霉菌或品質下降，產生陳味。\n氧化：長時間暴露於空氣中，香氣與辣度因氧化而減弱，生成陳舊氣味。\n 異味吸附：辣椒粉表面積大，容易吸附周圍異味（如冰箱內其他食物氣味）。"
          },
          {
            title: "正確保存方式",
            text: "陰涼乾燥：避免陽光直射與潮濕環境，存放於乾燥涼爽處。\n冷藏保存：長期保存時放冰藏，防止結塊與發霉。\n密封保存：開封後使用玻璃或塑膠密封容器，或雙層密封袋，減少受潮與異味污染。\n小包分裝：將辣椒粉分裝成小份，盡快用完以保持新鮮。\n檢查狀態：輕微結塊但無異味仍可食用；若有霉斑或霉味，立即丟棄。\n💡 小秘訣：在容器上標記購買日期，優先使用較舊的辣椒粉。"
          }
        ]
      }
    },

    {
      id: "seeweed-moistened",
      title: "海苔受潮怎麼辦？！",
      hero: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "海苔受潮怎麼辦？！",
      content: {
        sections: [
          {
            title: "總結",
            text: "海苔最怕受潮，一旦失去酥脆口感，就會影響風味。只要保存得當，就能讓海苔長時間保持香氣和脆度。",
            image: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "海苔受潮怎麼辦？",
            text: "若海苔已經受潮，不必急著丟掉！ \n👉 可以用 烤箱或平底鍋小火乾烘 1～2 分鐘，讓水分蒸發後重新變脆。\n👉 也可放入 微波爐加熱 10～15 秒，效果相同。\n加熱後，放涼再密封保存，避免再次吸濕。",
            image: "https://images.unsplash.com/photo-1625944529265-9a8bd2bb0182?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "海苔受潮原因",
            text: "海苔本身含油且薄，接觸空氣後容易吸收濕氣。\n保存環境若太潮濕，或開封後未密封，海苔中的油脂會氧化並吸水，導致軟化、變色甚至產生油耗味。"
          },
          {
            title: "平時保存法",
            text: "✅ 密封保存：開封後將海苔放入密封袋中，可加放乾燥劑。 \n ✅ 冷藏或冷凍：若一次購買大量海苔，可分裝後冷藏保存，取出時先回溫再食用。\n ✅ 避免日光直射：光線會加速油脂氧化，影響香氣與顏色。\n✅ 盡快食用：開封後建議於 1～2 週內食用完畢。"
          }
        ]
      }
    },
    {
      id: "chopped-garlic",
      title: "如何保管蒜末",
      hero: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "韓式料理必備的蒜末，要怎麼保存？",
      content: {
        sections: [
          {
            title: "總結",
            text: "蒜末是韓式料理中不可或缺的靈魂調味料，從泡菜、燒肉到湯品都少不了它的香氣。 \n但剁好的蒜如果保存不當，容易出水、變綠、甚至發酸。\n其實，只要用「冷凍分裝法」，就能輕鬆解決這些問題！",
            image: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "保存方法：冷凍分裝法",
            text: "1️⃣ 壓蒜／打碎：將蒜頭壓成蒜泥（可用壓蒜器或攪拌機）。\n2️⃣ 分裝：用湯匙將蒜泥分裝入矽膠冰格模具中，一格約一匙量。\n3️⃣ 冷凍保存：放入冷凍庫凍硬後取出，再裝入密封袋中保存，避免吸附冰箱異味。\n4️⃣ 使用時：烹調時直接放入鍋中加熱即可，無需解凍。"
          },
          {
            title: "為什麼要冷凍分裝？",
            text: "因為蒜中含有豐富的水分與硫化物，若直接冷藏，容易氧化變綠或發酸。\n冷凍能中止氧化反應，同時防止細菌滋生。\n分裝能避免每次開封造成受潮與氣味流失。",
            image: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=800&auto=format&fit=crop"
          },
          {
            title: "推薦工具與保存容器",
            text: "想讓蒜末保持最佳狀態，容器也很關鍵👇 \n304不鏽鋼壓蒜器（點此購買）🔗（쿠팡 링크）\n迷你電動碎蒜機（點此購買）🔗（쿠팡 링크）\n矽膠冰格模具（附蓋）：可重複使用、取用方便（點此購買）🔗（쿠팡 링크）\n真空密封袋：防潮防味，適合長期保存（點此購買）🔗（쿠팡 링크）\n玻璃保鮮盒：短期冷藏使用最佳（點此購買）🔗（쿠팡 링크）",
            image: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=800&auto=format&fit=crop"
          }
        ]
      }
    }
    ,
    {
      id: "ramen-egg-master",
      title: "如何成為煮泡麵雞蛋達人？",
      hero: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
      shortDescription: "泡麵跟蛋的組合，怎麼煮最好吃？！",
      content: {
        sections: [
          { title: "各種煮法", text: "打散:時間點\n全熟:時間點\n半熟:時間點\n糖心蛋:另外煮6分半" },
          { title: "為什麼要加蛋", text: "泡麵營養成分不夠，加蛋可以補充蛋白質。\ntips:也可以加入一些青菜、湯不要喝完" },
          {
            title: "推薦工具",
            text: "想讓蛋煮得剛剛好👇 \n煮蛋神器：掌握煮蛋最佳時機（點此購買）🔗（쿠팡 링크）",
            image: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=800&auto=format&fit=crop"
          }          
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
  content?: {
    sections: {
      title: string;
      text: string;
      image?: string;
    }[];
  };
};

export const STORIES: SimplePost[] = [
  {
    id: "korean-chuseok",
    title: "韓國中秋也吃烤肉嗎？",
    shortDescription: "韓國人中秋節吃什麼？！",
    hero: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop",
    content: {
      sections: [
        { title: "韓國的中秋節", text: "會祭祖，跟中華文化的過年一樣大的節日" },
        { title: "吃什麼？", text: "介紹산적, 잡채, 송편 등등", image: "/images/stories/kimchi_jar.jpg" },
        { title: "那一口記憶", text: "酸香中帶著微甜，是家人一起的味道。" }
      ]
    }
  },
  {
    id: "street-food-seoul",
    title: "為什麼韓國會有中華料理？",
    shortDescription: "從魚板湯到糖餅，小吃攤位背後的溫度。",
    hero: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    content: {
      sections: [
        { title: "韓國的中秋節", text: "會祭祖，跟中華文化的過年一樣大的節日" },
        { title: "吃什麼？", text: "介紹산적, 잡채, 송편 등등", image: "/images/stories/kimchi_jar.jpg" },
        { title: "那一口記憶", text: "酸香中帶著微甜，是家人一起的味道。" }
      ]
    }
  },
  {
    id: "first-bibimbap",
    title: "部隊鍋的由來",
    shortDescription: "滋滋作響的瞬間，香氣讓時間慢了下來。",
    hero: "https://images.unsplash.com/photo-1604908554007-9a5e6dc49e45?q=80&w=1600&auto=format&fit=crop",
    content: {
      sections: [
        { title: "部隊鍋的由來", text: "部隊鍋的由來" },
        { title: "部隊鍋的特點", text: "部隊鍋的特點" },
        { title: "部隊鍋的用途", text: "部隊鍋的用途" }
      ]
    }
  },
  {
    id: "first-bibimbap",
    title: "韓國人真的吃狗肉嗎？",
    shortDescription: "滋滋作響的瞬間，香氣讓時間慢了下來。",
    hero: "https://images.unsplash.com/photo-1604908554007-9a5e6dc49e45?q=80&w=1600&auto=format&fit=crop",
    content: {
      sections: [
        { title: "部隊鍋的由來", text: "部隊鍋的由來" },
        { title: "部隊鍋的特點", text: "部隊鍋的特點" },
        { title: "部隊鍋的用途", text: "部隊鍋的用途" }
      ]
    }
  },
];

export const LABS: SimplePost[] = [
  {
    id: "allulose",
    title: "什麼是阿洛酮糖(Allulose)？",
    shortDescription: "低熱量、低GI、低血糖反應的甜味劑。",
    hero: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
    content: {
      sections: [
        { title: "什麼是阿洛酮糖(Allulose)？", text: "阿洛酮糖是一種天然的甜味劑，由葡萄糖和果糖組成，具有低熱量、低GI、低血糖反應等特點。" },
        { title: "阿洛酮糖的特點", text: "阿洛酮糖是一種天然的甜味劑，由葡萄糖和果糖組成，具有低熱量、低GI、低血糖反應等特點。" },
        { title: "阿洛酮糖的用途", text: "阿洛酮糖的用途" }
      ]
    }
  },
  {
    id: "marinate-science",
    title: "煮泡麵要先放麵還是先放湯包？",
    shortDescription: "雞腿排多汁的關鍵參數，逐一檢測。",
    hero: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "starch-thickening",
    title: "韓式料理必勝公式-醬糖蔥蒜椒麻油",
    shortDescription: "韓式料理竟然有公式？",
    hero: "https://images.unsplash.com/photo-1514511547113-bff0191bcfd4?q=80&w=1600&auto=format&fit=crop",
    content: {
      sections: [
        { title: "韓式料理必勝公式-醬糖蔥蒜椒麻油", text: "韓式料理竟然有公式？" },
        { title: "醬糖蔥蒜椒麻油的特點", text: "醬糖蔥蒜椒麻油的特點" },
        { title: "醬糖蔥蒜椒麻油的用途", text: "醬糖蔥蒜椒麻油的用途" }
      ]
    }
  },
  {
    id: "starch-thickening",
    title: "大醬與味噌的差別",
    shortDescription: "韓式料理竟然有公式？",
    hero: "https://images.unsplash.com/photo-1514511547113-bff0191bcfd4?q=80&w=1600&auto=format&fit=crop",
    content: {
      sections: [
        { title: "韓式料理必勝公式-醬糖蔥蒜椒麻油", text: "韓式料理竟然有公式？" },
        { title: "醬糖蔥蒜椒麻油的特點", text: "醬糖蔥蒜椒麻油的特點" },
        { title: "醬糖蔥蒜椒麻油的用途", text: "醬糖蔥蒜椒麻油的用途" }
      ]
    }
  },
];
