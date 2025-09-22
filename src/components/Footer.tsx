import { Link } from "react-router-dom";
import AffiliateNotice from "./AffiliateNotice";
import { FormEvent } from "react";

const Footer = () => {
  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // TODO: Connect to real email service. For now, just a friendly confirmation.
    alert(`구독해 주셔서 감사합니다!\n${email}`);
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 열1: 의견 & 연락 & 제휴광고 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">意見 & 聯絡 & 合作廣告</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:feedback@k-lab.com" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
                  <span>📧</span><span>feedback@k-lab.com</span>
                </a>
              </li>
              <li>
                <a href="https://forms.gle/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
                  <span>📋</span><span>意見回饋表單</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 열2: 빠른 연결 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">快速連結</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">🏠<span>首頁</span></Link></li>
              <li><Link to="/#recipes" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">🍲<span>食譜總覽</span></Link></li>
              <li><Link to="/#tips" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">💡<span>料理小撇步</span></Link></li>
            </ul>
          </div>

          {/* 열3: 정책 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">政策</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">📜<span>個資政策（準備中）</span></Link></li>
              <li><Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">⚖️<span>使用條款（準備中）</span></Link></li>
            </ul>
          </div>

          {/* 열4: 소셜 & 구독 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">社群 & 訂閱</h3>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">📸<span>Instagram</span></a></li>
              <li><a href="#" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">▶️<span>其他社群</span></a></li>
            </ul>
            <form onSubmit={handleSubscribe} className="mt-2 flex items-center gap-2">
              <input
                type="email"
                name="email"
                placeholder="輸入 e-mail"
                className="w-full rounded-md bg-white/10 placeholder-slate-400 text-white text-sm px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-red-400"
                required
              />
              <button type="submit" className="shrink-0 px-3 py-2 rounded-md bg-red-500 hover:bg-red-400 text-white text-sm transition">訂閱</button>
            </form>
            <p className="text-xs text-slate-400">訂閱後我們會將最新食譜與文章透過電子郵件寄給您</p>
          </div>
        </div>

        {/* 版權資訊 */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              <AffiliateNotice />
            </div>
            <div className="text-sm text-slate-400">© {new Date().getFullYear()} K-Lab 韓味研究所. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;