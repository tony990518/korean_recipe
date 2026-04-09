import { Recipe, Tip, Product } from './types';

// ---------- Simple in-file DB (can swap to JSON/Sheets later) ----------
const DB: { recipes: Recipe[]; tips: Tip[] } = {
  recipes: [
    {
      id: "hudeokjuk-lacho-jjapaghetti",
      title: "侯德竹辣炒炸醬泡麵",
      hero: "/images/recipes/hudeokjuk-lacho-jjapaghetti/hero.jpg",
      minutes: 12,
      difficulty: "易",
      servings: 1,
      flavor: { spicy: 3, salty: 4, sweet: 2, fermented: 1 },
      preview: "2026 年 3 月 30 日，農心公開與侯德竹共同開發的辣炒版炸醬泡麵。這不是單純加辣，而是把中式熱炒的香氣邏輯搬進一包國民泡麵。",
      shortDescription: "這道食譜的故事，不只是泡麵聯名而已。2026 年 3 月 30 日，農心宣布由侯德竹擔任炸醬泡麵品牌新代言人，並同步公開與他共同開發的辣炒版本。韓媒對做法的描述很明確：先把豬五花、辣椒、蒜末、豆瓣醬與少量食醋炒出醬底，再拌入麵體與粉包，最後用橄欖風味調味油收尾。官方韓文名是「라초 짜파게티」，其中「辣炒」的意思其實就已經把整道料理的方向講完了。\n\n為什麼這道麵會和侯德竹綁在一起？因為它要借的不是名氣，而是中式熱炒的手法與厚度。台灣媒體多直接用「侯德竹」稱呼他，也常把他寫成韓國中餐界的傳奇人物或「活歷史」。相關報導提到，他長年深耕高端中餐體系，從宴席料理到飯店中餐廳都留下很深的影響；這次與農心合作，等於是把他熟悉的鍋氣、醬香與收味邏輯，壓縮成一份一般人在家也做得出的泡麵版本。\n\n所以這道麵真正迷人的地方，在於它不是把辣椒塞進去就結束。豬五花先把油脂與肉香墊起來，蒜末和辣椒把香氣往前推，豆瓣醬補上厚度，白醋負責把甜味與油感拉開，最後再用調味油把整體香氣收緊。下面這份做法，是依照農心公開的食材主線與調理順序，整理成 1 人份、適合台灣家庭直接操作的版本。",
      ingredients: [
        { label: "韓式炸醬泡麵", amount: "1 包（含粉包與橄欖調味油）", image: "/images/recipes/yoon-nam-no/i1.webp" },
        { label: "豬五花", amount: "80 g", image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/i-pork.jpg" },
        { label: "青辣椒", amount: "1 根", note: "推薦青陽辣椒，怕辣可減量", image: "/images/recipes/yoon-nam-no/i2.webp" },
        { label: "蒜末", amount: "1 大匙", image: "/images/recipes/bomdong/i2.png" },
        { label: "豆瓣醬", amount: "1 小匙", image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/i-douban.jpg" },
        { label: "白醋", amount: "1 小匙", image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/i-vinegar.jpg" },
        { label: "水", amount: "600 ml", image: "/images/recipes/yoon-nam-no/i6.webp", imageFit: "contain" }
      ],
      steps: [
        {
          title: "備料",
          text: "先把豬五花切成容易入口的薄片，青辣椒切小圈。蒜末先備好，這道菜節奏很快，先把材料放在手邊會比較順。",
          image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/s1.jpg"
        },
        {
          title: "煮麵並留麵水",
          text: "鍋中煮滾 600 ml 水，放入麵條煮約 4 分鐘到略帶嚼勁。撈起麵條後保留約 4~5 大匙麵水，其他倒掉。",
          heat: "med",
          time: "4 分",
          tip: "先不要煮到太軟，後面還要和醬一起拌炒。",
          image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/s2.jpg"
        },
        {
          title: "炒出豬香與蒜辣味",
          text: "平底鍋不必另外加油，直接下豬五花用中火煸出油脂。肉片開始上色後，加入蒜末與青辣椒快速翻炒，讓香氣先出來。",
          heat: "med",
          image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/s3.jpg"
        },
        {
          title: "做 라초 醬底",
          text: "加入豆瓣醬拌炒 10~15 秒，讓醬香和豬油結合，再淋入白醋快速翻勻。這一步就是官方提到的 라초（辣炒）風味來源。",
          heat: "med",
          tip: "白醋的量不用多，目的是提香解膩，不是做成酸味主調。",
          image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/s4.jpg"
        },
        {
          title: "加入麵與粉包拌炒",
          text: "把麵條放回鍋中，先加入炸醬粉包的一半到三分之二，再倒入 2~3 大匙麵水快速拌炒。如果顏色和味道不夠，再少量補粉包與麵水。",
          heat: "med",
          tip: "因為豆瓣醬和豬五花本身就有味道，粉包建議分次加，比一次全下更安全。",
          image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/s5.jpg"
        },
        {
          title: "以橄欖調味油收尾",
          text: "關火後加入附贈的橄欖風味調味油拌勻，讓香氣更立體。盛盤後趁熱吃，豬香、蒜辣和炸醬甜味會最明顯。",
          image: "/images/recipes/hudeokjuk-lacho-jjapaghetti/s6.jpg"
        }
      ],
      tips: [
        "如果你平常覺得 짜파게티 偏甜，這一版用豆瓣醬和辣椒拉出厚度，整體會更平衡。",
        "豬五花若出油太多，可以先倒掉一點再拌麵，成品會比較不膩。",
        "想更接近官方公開方向，可以保留三層肉、辣椒、蒜、豆瓣醬、食醋和橄欖調味油這幾個核心元素。"
      ],
      conclusion: "這道 후덕죽 라초 짜파게티 的重點，不是把辣度堆高而已，而是把原本偏甜鹹的炸醬泡麵做出更像熱炒的層次。公開資料沒有完整公開定量，但只要掌握豬香、蒜辣、豆瓣醬與最後的橄欖調味油收尾，家裡也能做出很有存在感的一碗。"
    },
    {
      id: "yoon-nam-no-jjapaghetti",
      title: "黑白大廚料理狂人 - 辣油炸醬泡麵",
      hero: "/images/recipes/yoon-nam-no/thumbnail.webp",
      minutes: 10,
      difficulty: "易",
      servings: 1,
      flavor: { spicy: 4, salty: 4, sweet: 1, fermented: 2 },
      preview: "看著《黑白大廚》，跟著料理狂人伊男老主廚，將平價韓式泡麵升級為高級餐廳水準的辣油炸醬麵！",
      shortDescription: "最近剛好在看韓綜叢林飯的第二季，看到料理狂人伊男老主廚用炸醬泡麵做的辣油炸醬麵，就馬上做來吃吃看了！\n\n尹男老（윤남노）主廚在Netflix實境節目《黑白大廚》（The Chefs' Line）中被稱為「料理狂人」，他那不按牌理出牌但又充滿創意的料理風格深受許多人喜愛。雖然在這檔節目中他沒有直接示範這道麵，但他在另一檔節目《叢林飯》裡大展身手，用最平易近人的韓國泡麵，升級成了帶有高級餐廳水準的辣油炸醬麵。\n\n其實在韓國，炸醬麵（짜장면）一直是非常親民且充滿靈魂的國民美食，有別於高檔粵菜，它是韓國人畢業、搬家或日常嘴饞時的首選。這款食譜完美融合了韓國人最愛的炸醬風味與微刺激的青陽辣椒，那股用橄欖油嗆出的獨特辣油香氣，真的會讓人一口接一口停不下來。推薦給喜歡吃辣、又想把平凡泡麵吃出儀式感的朋友一起來試試～ 那就趕快開始吧！",
      ingredients: [

        { label: "韓式炸醬泡麵", amount: "1 包", image: "/images/recipes/yoon-nam-no/i1.webp", link: { url: "https://afflink.one/s/6WHUp", label: "酷澎" } },
        { label: "青陽辣椒", amount: "1 根", image: "/images/recipes/yoon-nam-no/i2.webp", link: { url: "https://linkgo.one/s/uljVu", label: "酷澎" } },
        { label: "辣椒粉", amount: "1 大匙", image: "/images/recipes/yoon-nam-no/i3.webp", link: { url: "https://afflink.one/s/izm8l", label: "酷澎" } },
        { label: "鹽巴", amount: "一小撮", image: "/images/recipes/yoon-nam-no/i4.webp", link: [{ url: "https://onelink.one/s/ZJR4d", label: "酷澎" }, { url: "https://linkgo.one/s/hBdx7", label: "家樂福" }] },
        { label: "橄欖油", amount: "3 大匙", image: "/images/recipes/yoon-nam-no/i5.webp", link: [{ url: "https://linkgo.one/s/Y6Exz", label: "酷澎" }, { url: "https://linkgo.one/s/PYhnv", label: "家樂福" }] },
        { label: "水", amount: "600 毫升", image: "/images/recipes/yoon-nam-no/i6.webp", link: [{ url: "https://onelink.one/s/1VEeE", label: "酷澎" }, { url: "https://onelink.one/s/JUVPW", label: "家樂福" }] }
      ],
      steps: [
        { title: "準備青陽辣椒", text: "將 1 根青陽辣椒切成小塊備用。", image: "/images/recipes/yoon-nam-no/s1.webp" },
        { title: "製作辣椒油醬", text: "在碗中放入1大匙辣椒粉、切好的青陽辣椒、1小撮鹽和炸醬麵附贈的調味油包。", image: "/images/recipes/yoon-nam-no/s2.webp" },
        { title: "加熱橄欖油", text: "在小鍋中倒入3大匙橄欖油，用中小火加熱，注意不要燒焦。油量不多，很快就會熱。當看到油面出現波紋，表示油已經夠熱了。", heat: "med", image: "/images/recipes/yoon-nam-no/s3.webp" },
        { title: "完成辣椒油", text: "將燒熱的橄欖油立即倒入裝有調味料的碗中。熱油會讓辣椒粉均勻散開。接著，加入乾燥蔬菜包，攪拌均勻，讓蔬菜塊也能吸附辣椒油的香味。", image: "/images/recipes/yoon-nam-no/s4.webp" },
        {
          title: "煮麵並留麵水", text: "鍋中倒入 600 毫升的水煮滾，放入麵條以中火煮約 2 分鐘至彈牙；撈起麵條後，鍋內保留約 1/3 的麵水，其餘 2/3 盛出備用。",
          heat: "med", time: "2分", image: "/images/recipes/yoon-nam-no/s5.webp"
        },
        { title: "調味與拌炒", text: "將炸醬粉包倒入鍋中，與剩下的麵水和麵條拌炒，讓麵條均勻裹上醬汁。", heat: "med", image: "/images/recipes/yoon-nam-no/s7.webp" },
        { title: "加入辣椒油", text: "當炸醬粉溶解後，加入步驟5做好的辣椒油醬，徹底攪拌均勻。", image: "/images/recipes/yoon-nam-no/s8.webp" },
        { title: "調整濃稠度", text: "如果覺得麵條太乾，可以慢慢加入預留的麵水，調整到你喜歡的濕潤或濃稠度。這樣，一份美味的韓式辣味炸醬麵就完成了！", image: "/images/recipes/yoon-nam-no/s9.webp" }
      ],
      tips: [
        "辣椒的量可以根據喜好增加或減少，沒有青陽辣椒的話可以用糯米椒試試看，不過辣度可能會有點不夠。",
      ],
      conclusion: "好啦～今天的食譜分享就到這邊 😋\n尹男老主廚的炸醬拉麵真的超簡單又好吃，這個週末不妨自己動手煮煮看，保證一口就愛上！\n希望大家都能享受下廚的樂趣，敬請期待下次的食譜，我們下次見👋",
    },

    {
      id: "ex-bf-toast",
      title: "前男友吐司 - 奶油乳酪藍莓吐司",
      hero: "/images/recipes/ex-bf-toast/thumbnail.webp",
      minutes: 5,
      difficulty: "易",
      servings: 1,
      flavor: { spicy: 0, salty: 1, sweet: 4, fermented: 0 },
      preview: "好吃到讓人連自尊心都不要了？分手後依然念念不忘，五分鐘就能完成的神仙級藍莓奶油乳酪組合。",
      shortDescription: "這款吐司因為一則網路真實小故事而爆紅：有一位韓國女網友在與前男友分手後，依然對前男友曾經做給她吃的「藍莓奶油乳酪吐司」念念不忘。實在是太想念那個味道了，她竟然厚著臉皮傳訊息向前男友討教食譜，甚至連食材的指定品牌都問得一清二楚！前男友雖然滿腹無奈，還是非常詳細地分享了做法。\n\n這段誠實又帶點可愛的對話截圖在社群媒體上迅速傳開，引爆熱烈討論，因為這真的是「好吃到讓人連自尊心都不要了」的神仙組合！隨後，這款吐司就被大家戲稱為「前男友吐司」（전남친 토스트），甚至紅到連人氣韓綜《Biong Biong地球娛樂室3》都有提起，韓國超商更順勢推出了致敬款的「男朋友三明治」。\n\n外酥內軟的熱烤厚片吐司，抹上一層厚厚的奶油乳酪（原版據說是法國Madame Loïk），再鋪滿酸甜的藍莓果醬（推薦ST. Dalfour），最後微波10秒讓乳酪半融化......酸酸甜甜的豐富層次，保證一吃就愛上～",
      ingredients: [
        { label: "吐司", amount: "2 片", image: "/images/recipes/ex-bf-toast/i1.webp", link: { url: "https://linkgo.one/s/qJuCG", label: "家樂福" } },
        { label: "奶油乳酪", amount: "2-3 大匙", image: "/images/recipes/ex-bf-toast/i2.webp", link: { url: "https://linkgo.one/s/kmhZ8", label: "家樂福" } },
        { label: "藍莓果醬", amount: "1-2 大匙", image: "/images/recipes/ex-bf-toast/i3.webp", link: { url: "https://afflink.one/s/dOfZf", label: "酷澎" } },
        { label: "奶油", amount: "少許（可選）", image: "/images/recipes/ex-bf-toast/i4.webp", link: { url: "https://onelink.one/s/OFb8T", label: "家樂福" } }
      ],
      steps: [
        {
          title: "預熱鍋子並融化奶油",
          text: "將平底鍋放在爐上，以小火預熱約 30 秒。加入 1/2 小匙奶油，讓它完全融化並出現細小氣泡與香氣即可。不要等到變褐或冒煙。若用烤麵包機，可直接放吐司，不必加奶油。",
          heat: "low",
          time: "30秒",
          image: "/images/recipes/ex-bf-toast/s1.webp"
        },
        {
          title: "烤吐司兩面",
          text: "把吐司放入鍋中，以中小火每面各烤 1 分半～2 分鐘，直到兩面都呈現金黃色、邊緣酥脆。火不要太大，避免外焦內冷。",
          heat: "med",
          time: "3-4分",
          image: "/images/recipes/ex-bf-toast/s2.webp"
        },
        {
          title: "塗抹奶油乳酪",
          text: "將烤好的吐司移到盤子上，趁熱在其中一片均勻抹上 2-3 大匙奶油乳酪，建議抹到邊緣，吃起來每口都有味道。",
          image: "/images/recipes/ex-bf-toast/s3.webp"
        },
        {
          title: "加入藍莓果醬",
          text: "在乳酪上放 1-2 大匙藍莓果醬，用湯匙背面輕輕抹開，避免太用力把乳酪攪散。",
          image: "/images/recipes/ex-bf-toast/s4.webp"
        },
        {
          title: "完成享用",
          text: "想拍照漂亮就做開放式吐司；想要方便就蓋上另一片吐司，對半切開變三明治。最後放進微波爐加熱 10 秒，讓乳酪微微融化、果醬更融合，馬上就能享用啦！",
          image: "/images/recipes/ex-bf-toast/s5.webp"
        }
      ],
      tips: [
        "藍莓果醬太甜的話，奶油乳酪可以抹厚一點，味道更平衡。",
        "吐司建議用厚片，比薄片更有嚼勁。",
        "微波時間不要超過 10 秒，避免吐司變硬。"
      ],
      conclusion: "名字聽起來酸酸的，但味道卻甜甜的，這就是前男友吐司的魅力啦 💔➡️💖 五分鐘就能完成，當早餐、下午茶或宵夜都很讚～快動手試試看，說不定比前男友更讓你回味無窮 😋"
    },
    {
      id: "Kaguri",
      title: "咖哩浣熊麵 - Kaguri",
      hero: "/images/recipes/Kaguri/Thumbnail.webp",
      minutes: 10,
      difficulty: "易",
      servings: 1,
      flavor: { spicy: 2, salty: 2, sweet: 2, fermented: 2 },
      preview: "還原韓國網咖爆紅傳說！農心浣熊海鮮烏龍麵加上咖哩塊，濃厚辛香絕對是完美宵夜。",
      shortDescription: "「Kaguri（咖哩浣熊麵）」是韓國近年來超級火紅的一種泡麵隱藏吃法！它的做法非常簡單，就是在農心經典的「浣熊海鮮烏龍麵（Neoguri）」裡加入一塊咖哩（Curry）一起煮，所以名字就被合稱為「Kaguri」。\n\n這個神仙吃法最早其實發源於韓國的網咖（PC房）。大家都知道，在網咖吃泡麵總是比在家裡自己煮的還要好吃！韓國網咖的工讀生們發明了這種濃郁又開胃的加料煮法，透過熟客們的口耳相傳，瞬間在網路上引發熱潮。這種由消費者自己發明混搭吃法的「模範消費者（modisumers）」文化在韓國非常盛行，就像因為電影《寄生上流》紅遍全世界的「炸醬浣熊麵（Jjapaguri）」一樣。\n\n因為Kaguri的人氣實在太高，農心公司順應民意，竟然在2021年把這個網咖隱藏菜單「官方產品化」，直接推出了Kaguri的實體泡麵！濃厚的海鮮湯底結合咖哩的辛香，配上滑Ｑ的粗麵條，簡直是追劇或打電動時的完美宵夜。今天我們就來還原這個網咖傳說，自己在家動手煮煮看吧！",
      ingredients: [
        { label: "浣熊海鮮烏龍麵", amount: "1 包", link: { url: "https://onelink.one/s/EOClb", label: "酷澎" }, image: "/images/recipes/Kaguri/i1.webp" },
        { label: "咖哩塊", amount: "1 塊", link: [{ url: "https://linkgo.one/s/IMrsO", label: "酷澎" }, { url: "https://afflink.one/s/809Qz", label: "家樂福" }], image: "/images/recipes/Kaguri/i2.webp" },
        { label: "雞蛋(可省略)", amount: "1 顆", link: { url: "https://onelink.one/s/tUWPq", label: "家樂福" }, image: "/images/recipes/Kaguri/i3.webp" },
        { label: "青蔥(可省略)", amount: "少許", link: { url: "https://onelink.one/s/QB3LO", label: "家樂福" }, image: "/images/recipes/Kaguri/i4.webp" },
        { label: "辣椒粉(可省略)", amount: "1 大匙", link: { url: "https://linkgo.one/s/X9HqM", label: "酷澎" }, image: "/images/recipes/Kaguri/i5.webp" },
        { label: "水", amount: "550 ml", link: [{ url: "https://afflink.one/s/4VbZS", label: "酷澎" }, { url: "https://afflink.one/s/c8iCw", label: "家樂福" }], image: "/images/recipes/yoon-nam-no/i6.webp", imageFit: "contain" },
      ],
      steps: [
        { title: "溶解咖哩", text: "在鍋中加入水 550 ml，並放入泡麵的乾燥蔬菜包以及咖哩塊，加熱慢慢讓咖哩塊溶解，期間輕拌防沾底。", heat: "med", image: "/images/recipes/Kaguri/s1.webp" },
        { title: "煮麵", text: "水滾後，加入麵條以及半包湯包，將麵煮至喜歡的口感。", heat: "med", time: "5 分", tip: "官方建議煮5分鐘", image: "/images/recipes/Kaguri/s2.webp" },
        { title: "加入配料", text: "根據個人喜好加入雞蛋、青蔥、辣椒粉等可選食材，完成！", image: "/images/recipes/Kaguri/s3.webp" }
      ],
    },
    // {
    //   id: "Seul Gi-enoki",
    //   title: "Red Velvet瑟琪的減肥食譜 - 金針菇豆腐",
    //   hero: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1600&auto=format&fit=crop",
    //   minutes: 10,
    //   difficulty: "初",
    //   servings: 1,
    //   flavor: { spicy: 0, salty: 3, sweet: 1, fermented: 3 },
    //   shortDescription: "Red Velvet 瑟琪在 YouTube 上分享過她回歸期常吃的身材管理食譜之一 - 金針菇豆腐! 不只做法簡單，熱量低，還能吃得很有飽足感。想要控制體重、又不想吃得太單調的朋友，可以一起來試試看～ 🍴",
    //   ingredients: [
    //     { label: "板豆腐", amount: "1 盒" , image: "/images/recipes/Seulgi/i1.webp"},
    //     { label: "金針菇", amount: "半 包", image: "/images/recipes/Seulgi/i2.webp" },
    //     { label: "醬油", amount: "1 大匙" , image: "/images/recipes/Seulgi/i3.webp"},
    //     { label: "阿洛酮糖", amount: "1 大匙" , image: "/images/recipes/Seulgi/i4.webp"},
    //     { label: "蠔油", amount: "1/2 大匙" , image: "/images/recipes/Seulgi/i5.webp"},
    //     { label: "蒜泥", amount: "些許" , image: "/images/recipes/Seulgi/i6.webp"},
    //     { label: "水", amount: "2 大匙" , image: "/images/recipes/yoon-nam-no/i6.webp"},
    //     { label: "芝麻(可選)", amount: "些許" , image: "/images/recipes/Seulgi/i7.webp"},
    //     { label: "芝麻油(可選)", amount: "1 小匙" , image: "/images/recipes/Seulgi/i8.webp"}
    //   ],
    //   steps: [
    //     { title: "製作醬汁", text: "將醬油、阿洛酮糖、蠔油、蒜末(各1大匙)和水(2大匙)混合，調成醬汁", heat: "med", image:"/images/recipes/Seulgi/s2.webp" },
    //     { title: "煎豆腐", text: "在平底鍋加入一點油，並將豆腐放入煎至金黃色，先盛出放在盤中",image:"/images/recipes/Seulgi/s3.webp" },
    //     { title: "煎金針菇", text: "將金針菇下鍋煎炒", heat: "med", image:"/images/recipes/Seulgi/s4.webp" },
    //     { title: "加入醬汁", text: "倒入剛剛調好的醬汁，將醬汁收乾入味後，淋在豆腐上即可", heat: "med", time: "5 分", image:"/images/recipes/Seulgi/s5.webp"},
    //     { title: "擺盤完成", text: "根據個人喜好加入芝麻、芝麻油等可選食材，完成！", image:"/images/recipes/Seulgi/s6.webp" }
    //   ],
    //   tips: ["如果家裡沒有阿洛酮糖，也可以用砂糖代替，大約放 阿洛酮糖用量的 70% 就可以了。例如：食譜裡如果用到 1 大匙阿洛酮糖，改成砂糖的話只要 2/3 大匙 就差不多。不過阿洛酮糖熱量更低、對身材管理更友善，正在�      hero: "/images/tips/redpepper/thumbnail.webp",
    // preview: "韓國買回來的辣椒粉飄出油耗怪味？別急著丟，幾個簡單小撇步教你還原辛香，保存更長久！",
    // shortDescription: "「奇怪，這包韓國買回來的辣椒粉怎麼有一股怪味？」這是很多人在家做韓式料理時常遇到的困擾。\n\n辣椒粉（고춧가루）是韓式料理的靈魂，無論是做泡菜、辣炒年糕還是煮各種湯品，絕對少不了它。但買了一大包如果沒有馬上用完，放著放著就會發現它不僅顏色變暗，還會飄出一股難以形容的「陳味」或「油耗味」。這其實是因為辣椒粉表面積大，非常容易吸收空氣中的濕氣和冰箱裡的各種異味，加上台灣氣候潮濕，更容易加速氧化。\n\n雖然這不代表它壞掉了，但如果直接加進料理中，整鍋湯的味道可能都會被破壞掉！別擔心，今天就來教大家幾個韓國主婦都在用的超簡單實用小撇步，不僅能輕鬆幫辣椒粉「去霉味、恢復香氣」，還要告訴你到底該怎麼正確保存，才能讓辣椒粉從第一匙到最後一匙都像剛磨好一樣新鮮！", tion: "生日必喝，清爽營養的經典韓式湯品。",
    // //   ingredients: [
    //     { label: "乾海帶", amount: "一小把", note: "泡水還原" },
    //     { label: "牛肉片", amount: "100 g" },
    //     { label: "蒜末", amount: "1 小匙" },
    //     { label: "醬油", amount: "1 大匙" },
    //     { label: "香油", amount: "1 小匙" },
    //     { label: "水/高湯", amount: "700 ml" }
    //   ],
    //   steps: [
    //     { text: "海帶泡軟切段，牛肉用醬油略醃。" },
    //     { text: "鍋中香油爆香蒜，入牛肉拌炒後加海帶。", heat: "med" },
    //     { text: "倒入水煮 15 分調味即可。", heat: "high", time: "15 分" }
    //   ]
    // },
    {
      id: "dujjonku",
      title: "杜拜麻糬軟餅乾 (두쫀쿠)",
      hero: "/images/recipes/dujjonku/hero.png",
      minutes: 45,
      difficulty: "中",
      servings: 25,
      flavor: { spicy: 0, salty: 1, sweet: 5, fermented: 0 },
      preview: "風靡韓國烘焙圈！外皮如麻糬般軟糯拉絲，內餡滿滿開心果與酥脆卡達伊夫的極致雙重口感。",
      shortDescription: "「杜拜麻糬軟餅乾（Dujjonku）」是韓國社群近期最火熱的變種甜點！它的名字是由「杜拜巧克力」、「軟糯（쫀득）」與「餅乾」組合而成。自從充滿開心果與酥脆卡達伊夫（Kataifi）的杜拜巧克力爆紅後，因為市面上不僅價格昂貴且一粒難求，韓國烘焙圈便掀起了一股自製熱潮。這款「杜拜麻糬軟餅乾」正是這波熱潮中的天才發明！\n\n有別於一般單純的巧克力塊，它外層使用了融化棉花糖與可可粉混合製成的外皮，帶來如同麻糬般無敵軟糯拉絲的誘人嚼勁（겉쫀）；而切開內餡，則是滿滿的開心果醬與奶油現炒的卡達伊夫麵線，交織出極致的酥脆口感（속바）。這種「外軟糯、內酥脆」的雙重極端口感衝擊，加上濃郁的開心果堅果香氣與可可的微苦甘甜，絕對會讓你一口接一口停不下來。不用花大錢排隊，現在就跟著韓國烘焙達人的秘方，在家自己動手做出這款風靡全網的夢幻甜點吧！",
      ingredients: [
        { label: "卡達伊夫麵線", amount: "200 g", image: "/images/recipes/dujjonku/i1.png" },
        { label: "無鹽奶油", amount: "25 g", note: "炒麵線10g, 融化棉花糖15g", image: "/images/recipes/dujjonku/i2.png" },
        { label: "開心果醬", amount: "180 g", image: "/images/recipes/dujjonku/i3.png" },
        { label: "白巧克力", amount: "60 g", image: "/images/recipes/dujjonku/i4.png" },
        { label: "棉花糖", amount: "350 g", note: "建議使用小顆粒", image: "/images/recipes/dujjonku/i5.png" },
        { label: "無糖可可粉", amount: "25 g", note: "另備半杯作為外層裹粉", image: "/images/recipes/dujjonku/i6.png" },
        { label: "脫脂奶粉", amount: "15 g", image: "/images/recipes/dujjonku/i7.png" }
      ],
      steps: [
        { title: "炒酥卡達伊夫", text: "在平底鍋中融化 10g 奶油，加入卡達伊夫麵線，用中火翻炒 3~4 分鐘直到極致酥脆。炒好後平鋪放涼。", heat: "med", time: "4 分", tip: "即使買的是熟麵線，用奶油回炒能去除冰箱雪櫃味並大幅提升酥脆度與香氣。", image: "/images/recipes/dujjonku/s1.png" },
        { title: "製作開心果內餡", text: "將放涼的卡達伊夫、180g 開心果醬與融化的 60g 白巧克力混合均勻。將餡料分成每個 25~30g 的小圓球，放入冷凍庫稍微冰鎮定型。", image: "/images/recipes/dujjonku/s2.png" },
        { title: "製作麻糬外皮", text: "鍋中融化 15g 奶油，加入 350g 棉花糖用中小火慢慢壓融。完全融化且無顆粒後關火，趁熱拌入 25g 可可粉與 15g 脫脂奶粉，攪拌均勻後倒在托盤上稍微放涼。", heat: "low", tip: "棉花糖不要過度加熱，以免水分流失導致冷卻後變硬難以包覆。", image: "/images/recipes/dujjonku/s3.png" },
        { title: "包覆與定型", text: "雙手抹上一點食用油防沾黏，取約 15g 的麻糬麵糰壓平，包入剛剛冷凍定型的開心果球，收口捏緊搓圓。最後在外層均勻滾上一層優質的無糖可可粉即完成！", tip: "完成後放冰箱冷凍保存，吃之前微波 5~10 秒，拉絲口感最完美！", image: "/images/recipes/dujjonku/s4.png" }
      ]
    },
    {
      id: "bomdong-bibimbap",
      title: "超簡單當季美味！春白菜拌飯",
      difficulty: "易",
      minutes: 10,
      servings: 1,
      hero: "/images/recipes/bomdong/hero.png",
      flavor: { spicy: 2, salty: 3, sweet: 2, fermented: 2 },
      preview: "生拌春白菜搭配靈魂醬汁與半熟蛋，清爽解膩零失敗，這道國民拌飯連大明星都為之瘋狂！",
      shortDescription: "在韓國的冬末春初，有一道讓無數韓國人為之瘋狂的家常美味——「春白菜拌飯（봄동 비빔밥）」。近期它在韓國社群平台上的討論度甚至超越了爆紅的杜拜巧克力！為什麼一道看似平凡的蔬菜拌飯會如此受歡迎？故事要從韓國國民綜藝節目《兩天一夜》說起。當年主持人姜鎬童在節目中大口扒著這道拌飯、滿臉幸福的模樣，成為了韓國人心目中無法抹滅的「吃播神級畫面」。最近，隨著知名演員柳秀榮等明星在節目中分享了升級版秘方，這股春白菜熱潮再度席捲全韓！\n\n春白菜（Bomdong）生長在寒冷的冬季，為了抵抗嚴寒，它的葉片不像一般白菜那樣包覆成長，而是貼著地面如同一朵盛開的綠色花朵般展開。正因為經歷了寒冬的冰霜，春白菜的口感極致爽脆，咀嚼時還會散發出令人驚豔的天然清甜。這道拌飯的精髓就在於「生拌」——不需開火煮菜，只要將洗淨的春白菜撕成小塊，拌入以粗辣椒粉、醬油、魚露和芝麻油調製而成的靈魂醬汁，最後蓋在熱騰騰的白飯上，放上一顆半熟荷包蛋。當戳破蛋黃、與微辣鹹香的脆口白菜拌在一起送入口中時，那種清爽解膩又充滿生機的滋味，絕對會讓你一口接一口。對於忙碌的現代人或租屋族來說，這是一道充滿大自然恩賜、零失敗且超級療癒的必學料理！",
      ingredients: [
        { label: "春白菜 (Bomdong)", amount: "150 g", image: "/images/recipes/bomdong/i1.png" },
        { label: "溫白飯", amount: "1 碗" },
        { label: "雞蛋", amount: "1 顆", image: "/images/recipes/bomdong/i6.png" },
        { label: "粗辣椒粉", amount: "1.5 大匙", image: "/images/recipes/bomdong/i4.png" },
        { label: "醬油", amount: "1 大匙" },
        { label: "鯷魚魚露", amount: "1 大匙", image: "/images/recipes/bomdong/i3.png" },
        { label: "白醋", amount: "0.5 大匙" },
        { label: "砂糖", amount: "0.5 大匙" },
        { label: "蒜末", amount: "0.5 大匙", image: "/images/recipes/bomdong/i2.png" },
        { label: "芝麻油", amount: "2 大匙", image: "/images/recipes/bomdong/i5.png" }
      ],
      steps: [
        { title: "準備春白菜", text: "將春白菜切去根部，將葉片一片片剝下後用清水洗淨瀝乾。用手將葉片撕成適合入口的大小。", tip: "用手撕的切口比用刀切更不規則，能吸附更多美味的醬汁！", image: "/images/recipes/bomdong/s1.png" },
        { title: "調製靈魂醬汁", text: "在一個大碗中，加入 1.5 大匙粗辣椒粉、1 大匙醬油、1 大匙鯷魚魚露、0.5 大匙白醋、0.5 大匙砂糖與 0.5 大匙蒜末。先將這些材料攪拌均勻，讓糖完全融化。", image: "/images/recipes/bomdong/s2.png" },
        { title: "輕柔拌菜", text: "將撕好的春白菜放入醬汁碗中，加入 1 大匙芝麻油。用手「輕輕地」由下往上翻拌讓葉片均勻沾附醬汁。", tip: "切記不要用力揉捏，以免白菜出水變軟並產生生澀的青草味，保持清脆是關鍵！", image: "/images/recipes/bomdong/s3.png" },
        { title: "完美組合", text: "在大碗中盛入熱騰騰的白飯，將拌好的春白菜滿滿地鋪在飯上。煎一顆邊緣微焦的半熟荷包蛋放在正中央，最後再淋上 1 大匙芝麻油並撒上滿滿的烤白芝麻。戳破蛋黃拌勻享用吧！", heat: "med", time: "3 分", image: "/images/recipes/bomdong/s4.png" }
      ]
    }
  ],

  tips: [
    {
      id: "gochugaru-smell",
      title: "辣椒粉有陳味怎麼辦？！",
      hero: "/images/tips/redpepper/thumbnail.webp",
      preview: "韓國買回來的辣椒粉飄出油耗怪味？別急著丟，幾個簡單小撇步教你還原辛香，保存更長久！",
      shortDescription: "「奇怪，這包韓國買回來的辣椒粉怎麼有一股怪味？」這是很多人在家做韓式料理時常遇到的困擾。\n\n辣椒粉（고춧가루）是韓式料理的靈魂，無論是做泡菜、辣炒年糕還是煮各種湯品，絕對少不了它。但買了一大包如果沒有馬上用完，放著放著就會發現它不僅顏色變暗，還會飄出一股難以形容的「陳味」或「油耗味」。這其實是因為辣椒粉表面積大，非常容易吸收空氣中的濕氣和冰箱裡的各種異味，加上台灣氣候潮濕，更容易加速氧化。\n\n雖然這不代表它壞掉了，但如果直接加進料理中，整鍋湯的味道可能都會被破壞掉！別擔心，今天就來教大家幾個韓國主婦都在用的超簡單實用小撇步，不僅能輕鬆幫辣椒粉「去霉味、恢復香氣」，還要告訴你到底該怎麼正確保存，才能讓辣椒粉從第一匙到最後一匙都像剛磨好一樣新鮮！",
      content: {
        sections: [
          {
            title: "總結",
            text: "• 辣椒粉存放過久或保存不當會因濕氣、氧化與異味吸附導致風味下降，雖非腐敗但品質受損。\n• 辣椒粉的陳味主要由濕氣與氧氣暴露引起，可用微波或乾炒去除，但若發霉則必須丟棄。\n• 密封冷藏、小包分裝並及時食用，可保持新鮮，發現霉味立即丟棄。"
          },
          {
            title: "陳味從哪裡來",
            text: "• 濕氣：辣椒粉吸收濕氣後，易滋生霉菌或品質下降，產生陳味。\n• 氧化：長時間暴露於空氣中，香氣與辣度因氧化而減弱，生成陳舊氣味。\n• 異味吸附：辣椒粉表面積大，容易吸附周圍異味（如冰箱內其他食物氣味）。"
          },
          {
            title: "怎麼去除陳味？",
            text: "• 微波爐加熱：將辣椒粉放入耐熱容器，微波加熱20~30秒，注意避免過熱燒焦。\n• 乾鍋炒製：用小火快炒1~2分鐘，去除濕氣與異味。\n• 打散結塊：加熱或炒製後，用湯匙或篩網輕輕打散辣椒粉的結塊。\n• 發霉注意：若發現霉點或異常氣味，絕對不可食用！霉菌毒素即使煮沸也無法去除，務必丟棄。"
          },
          {
            title: "正確保存方式",
            text: "• 陰涼乾燥：避免陽光直射與潮濕環境，存放於乾燥涼爽處。\n• 冷藏保存：長期保存時放冰藏，防止結塊與發霉。\n• 密封保存：開封後使用玻璃或塑膠密封容器，或雙層密封袋，減少受潮與異味污染。\n• 小包分裝：將辣椒粉分裝成小份，盡快用完以保持新鮮。\n• 檢查狀態：輕微結塊但無異味仍可食用；若有霉斑或霉味，立即丟棄。\n💡 小秘訣：在容器上標記購買日期，優先使用較舊的辣椒粉。"
          },
        ]
      },
      recommendedProducts: [
        {
          name: "gomgom 韓國產辣椒粉 中辣",
          description: "嚴選韓國產辣椒粉，為您的料理增添道地風味，讓您在家也能輕鬆享受韓式美味",
          image: "/images/tips/redpepper/recommend_redpepper.webp",
          link: "https://onelink.one/s/FD4Vu"
        },
        {
          name: "couselect 廚房二合一定量調味罐/密封調料瓶/防潮玻璃罐/佐料罐",
          description: "結合了定量取用與密封防潮功能，讓您的調味料保持新鮮，也可輕鬆拆卸，方便清洗",
          image: "/images/tips/redpepper/recommend_container.webp",
          link: "https://linkgo.one/s/l3Aqb"
        },
      ]
    },

    {
      id: "seeweed-moistened",
      title: "海苔放久變軟了要怎麼辦？！",
      hero: "/images/tips/seeweed/thumbnail1.webp",
      preview: "海苔受潮軟趴趴？只要 10 秒鐘就能起死回生，重新恢復剛出廠般的咔滋酥脆口感！",
      shortDescription: "海苔（김）絕對是韓國餐桌上最不可或缺的國民配菜！不管是拿來包白飯、做紫菜包飯（김밥），還是單純當零食吃，那種又薄又脆、帶點芝麻油香氣的口感，真的是大人小孩都無法抗拒的美味。\n\n但是，海苔最大的敵人就是「濕氣」！特別是在台灣這種潮濕的氣候下，有時候一包海苔打開沒吃完，才過一個晚上，原本酥脆的海苔就變得軟趴趴、韌韌的（甚至有點難咬斷），完全失去了靈魂。直接丟掉覺得太浪費，但直接吃口感又很差。\n\n遇到海苔變軟到底該怎麼辦？其實只要掌握幾個簡單的小魔法，短短10秒鐘就能讓軟掉的海苔「死而復生」，重新恢復剛出廠般的酥脆咔滋聲！除了教你如何神救援軟海苔，還要分享幾個韓國人都在用的隱藏版消耗吃法，保證讓你家的海苔不僅不會浪費，還能變換出更多超讚的家庭料理！",
      content: {
        sections: [
          {
            title: "總結",
            text: "• 海苔容易受潮變軟，開封後應儘速食用，沒吃完需密封冷凍保存。\n• 受潮變軟的海苔可以透過微波爐或平底鍋加熱恢復脆度。\n• 若海苔已有明顯油耗味或變色，代表已經變質，應避免食用。",
          },
          {
            title: "海苔變軟的原因",
            text: "• 韓國海苔通常以紫菜烘烤製成，本身容易吸濕氣，一旦開封後未密封好，或放在高濕度的地方，就會快速軟化。"
          },
          {
            title: "解決方法",
            text: "• 微波爐加熱： 將受潮的海苔放入微波爐中，加熱 10～20 秒。如果還是有點軟的話可以再加熱。\n• 平底鍋加熱：用乾鍋小火快速翻烤約 10 秒，記得火不要太大，有可能會焦掉！"
          },
          {
            title: "開封後保存方法",
            text: "• 密封保存：海苔開封後應盡速吃完，如果真的吃不完，建議在密封容器或密封袋裡先墊一張廚房紙巾再將海苔放入，並放入海苔裡附的乾燥劑冷凍保存。\n• 調味海苔要平放：一般我們在臺灣見到的韓國海苔都是各別包裝的調味海苔，有加入鹽巴跟芝麻油調味，建議平放保存，油才不會往下沈積在底部。\n• 海苔有明顯油耗味或顏色變暗，表示油脂氧化，此時不僅風味變差，也可能對身體有害，應立即丟棄"
          },
          {
            title: "如何利用軟掉的海苔",
            text: "海苔變軟後雖然少了脆度，但仍可運用在多種料理中。若海苔已有明顯油耗味或異味，請不要食用，以免影響健康。\n• 拌飯或飯糰：將軟海苔撕碎後拌入白飯或做成飯糰，增加香氣與鹹味。\n• 泡麵或湯品：灑在熱湯或泡麵上，增添鮮味。\n• 涼拌或煎蛋料理：可加入紅蘿菠、醬油、蔥、蒜、香油、糖等食材做成涼拌菜，或加入蛋液中做成海苔煎蛋捲。"
          },
        ]
      },
      recommendedProducts: [
        {
          name: "海苔用密封保鮮盒+乾燥劑組",
          description: "密封保鮮盒搭配乾燥劑，有效隔絕濕氣，讓海苔、餅乾等食品隨時保持最佳的酥脆口感!",
          image: "/images/tips/seeweed/recommend_container.webp",
          link: "https://linkgo.one/s/6ydgP"
        },
      ]
    },
    {
      id: "chopped-garlic",
      title: "韓式料理的必備食材--蒜末，如何大量製作與保存？",
      hero: "/images/tips/garlic/thumbnail.webp",
      preview: "韓國大媽的大把蒜末秘密！教你快速去皮、搗碎與聰明冷凍，從此告別手上的各種蒜味。",
      shortDescription: "如果說辣椒粉是韓式料理的靈魂，那「蒜末（다진 마늘）」絕對是韓式料理的心臟！\n\n你看韓國大媽做菜的影片就會發現，她們加蒜末通常不是用「顆」算，而是用「一大匙、兩大匙」在狂挖的。不管是醃製辛奇（泡菜）、涼拌小菜、烤肉沾醬，還是滾煮各種濃郁的鍋物與湯品，蒜末的嗆辣與香氣都是撐起整道料理底蘊的關鍵。\n\n但問題來了：每次煮飯都要重新剝蒜皮、切蒜末，不僅非常花時間，手指還會殘留好幾天洗不掉的蒜味！如果是偶爾煮飯就算了，但對於經常下廚的人來說，這真的是一件很勸退的事。其實，韓國家庭都有自己一套「大量處理與保存蒜末」的聰明秘訣。今天就來大公開，教你如何像韓國主婦一樣，一次搞定一個月份的蒜末，不僅能輕鬆幫蒜頭脫衣服，還能聰明冷凍保存，讓妳以後下廚只要「啪」一聲折下一小塊蒜末冰磚，就能立刻爆香，省時省力又優雅！",
      content: {
        sections: [
          {
            title: "總結",
            text: "• 想一次處理大量蒜頭，可先用浸水或微波法輕鬆去皮。\n• 蒜頭去除根部後用刀、攪拌機或袋子搗碎，並用密封袋或分格容器冷凍保存。\n• 處理完可用檸檬水或不鏽鋼去除手上蒜味，蒜皮也能再利用熬湯或煮茶，健康又環保。",

          },
          {
            title: "處理蒜頭",
            text: "• 剝皮 - 浸水法: 將蒜浸泡在水中30~60分鐘，蒜皮會變軟，輕鬆剝落，泡越久會越好剝。用手輕搓或用刀輕壓，蒜皮就能輕易分離。\n• 剝皮 - 微波爐加熱法: 將蒜放入微波爐適用容器，以500~600W加熱20~30秒，蒜皮會微微張開，更容易剝除。注意不要加熱過久，以免蒜頭熟了。\n• 去除根部與壞掉部分: 用刀切除蒜的硬根部及變色的褐色部分，僅保留新鮮部分。"
          },
          {
            title: "製作蒜末",
            text: "• 用刀切碎：將蒜用刀背壓扁後，細細切碎，是一般家庭最常用的傳統方法。\n• 用攪拌機：大量處理時，使用攪拌機能快速且均勻地打碎蒜頭。但要注意不要過度攪拌，以免蒜末變得太碎，可分次短時間攪打。\n• 用塑膠袋搗碎：將蒜放入堅固的塑膠袋或夾鍊袋中，用擀麵棍或重物敲打搗碎，這樣手不會黏上太多蒜末。",

          },
          {
            title: "保存方法",
            text: "• 使用密封袋並劃分小格：將蒜末放入密封袋中，封口後壓平，用刀背輕輕劃出格線，冷凍後就會分成一格一格的。需要時可直接取出一格使用。\n• 使用分格容器：將蒜末放入有分格的矽膠密封模具冷凍保管。每次只取出一小塊即可。\n• 冷凍保存：將密封袋或容器放冷凍，使用時無需解凍，直接加入料理即可！",

          },
          {
            title: "延伸應用",
            text: "• 去除蒜味：處理蒜頭後，可用檸檬水、醋水或鹽水與肥皂一起洗手來去除手上的味道。若仍有氣味殘留，也可以拿不鏽鋼湯匙或任何不銹鋼製品在手上摩擦幾下，效果會更好。\n• 蒜皮再利用：將蒜皮放入蔬菜湯料袋中，可為高湯增添自然鮮味。若將蒜皮洗淨晾乾後煮茶，也可以加入洋蔥皮一起煮，不僅可增強免疫力、促進血液循環，還有助於體脂肪代謝。",

          },
        ]
      },
      recommendedProducts: [
        {
          name: "無線電動攪蒜器",
          description: "無線設計讓您擺脫電線束縛，隨時隨地輕鬆製作蒜蓉及各式佐料，讓下廚變得更加簡單方便",
          image: "/images/tips/garlic/recommend_grinder.webp",
          link: "https://afflink.one/s/qaTna"
        },
        {
          name: "Comet Kitchen 大蒜分格保鮮盒",
          description: "獨立分裝，每次取用適量蒜泥，方便料理，節省備料時間",
          image: "/images/tips/garlic/recommend_container.webp",
          link: "https://linkgo.one/s/MtJV3"
        },
        {
          name: "Cotton labo 食物滷包袋 日本製造 超大容量, 20 x 20cm",
          description: "棉質滷包袋，觸感柔軟細緻，適用於多種烹飪方式，讓烹調更方便",
          image: "/images/tips/garlic/recommend_bag.webp",
          link: "https://onelink.one/s/PobaN"
        },
      ]
    }
    ,
    // {
    //   id: "ramen-egg-master",
    //   title: "如何成為煮泡麵雞蛋達人!",
    //   hero: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
    //   shortDescription: "泡麵跟蛋的組合，怎麼煮最好吃？！",
    //   content: {
    //     sections: [ { title: "總結", text: "總結\n全熟:時間點\n半熟:時間點\n糖心蛋:另外煮6分半" },
    //       { title: "各種煮法", text: "打散:時間點\n全熟:時間點\n半熟:時間點\n溏心蛋:另外煮6分半" },
    //       { title: "為什麼要加蛋", text: "泡麵營養成分不夠，加蛋可以補充蛋白質。\ntips:也可以加入一些青菜、湯不要喝完" },
    //       {
    //         title: "Studio.K推薦",
    //         text: "想讓蛋煮得剛剛好👇 \n煮蛋神器：掌握煮蛋最佳時機（點此購買）🔗（쿠팡 링크）",
    //         image: "https://images.unsplash.com/photo-1604908176997-43162b16832d?q=80&w=800&auto=format&fit=crop"
    //       }          
    //     ]
    //   }
    // },
    // {
    //   id: "egg-fluffy-omelet",
    //   title: "鬆軟蛋捲的關鍵",
    //   hero: "https://images.unsplash.com/photo-1544377193-33dcf5f2a3c1?q=80&w=1600&auto=format&fit=crop",
    //   shortDescription: "加一點水或牛奶，小火慢煎不過度攪拌。",
    //   content: {
    //     sections: [ { title: "比例", text: "每顆蛋加 1 小匙水或牛奶，口感更嫩。" },
    //       { title: "火候", text: "小火慢煎，表面略濕就捲起，餘溫熟成。" }
    //     ]
    //   }
    // },
    // {
    //   id: "pan-preheat",
    //   title: "鍋子預熱的重要性",
    //   hero: "https://images.unsplash.com/photo-1558030110-2321e6d66a83?q=80&w=1600&auto=format&fit=crop",
    //   shortDescription: "食材不黏鍋、上色更漂亮的簡單訣竅。",
    //   content: {
    //     sections: [ { title: "判斷方法", text: "水滴成珠在鍋面跳動，表示預熱到位。" },
    //       { title: "注意事項", text: "加入油後稍等 5–10 秒再下食材，避免燒焦。" }
    //     ]
    //   }
    // }
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
  recommendedProducts?: Product[];
};

export const STORIES: SimplePost[] = [];

export const LABS: SimplePost[] = [];
