import { Link } from "react-router-dom";
import AffiliateNotice from "./AffiliateNotice";

const Footer = () => (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 意見回饋區塊 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">意見回饋 & 聯絡我們</h3>
            <p className="text-slate-300 text-sm">
              對食譜有任何建議或疑問，歡迎隨時聯繫我們！
            </p>
            <div className="space-y-2">
              <a 
                href="mailto:feedback@k-lab.com" 
                className="block text-sm text-slate-300 hover:text-white transition"
              >
                📧 feedback@k-lab.com
              </a>
              <a 
                href="https://forms.gle/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-slate-300 hover:text-white transition"
              >
                📝 意見回饋表單
              </a>
            </div>
          </div>
  
          {/* 快速連結區塊 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">快速連結</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-slate-300 hover:text-white transition">
                🏠 首頁
              </Link>
              <a href="#recipes" className="block text-sm text-slate-300 hover:text-white transition">
                🍳 食譜大全
              </a>
              <a href="#tips" className="block text-sm text-slate-300 hover:text-white transition">
                💡 料理小撇步
              </a>
            </div>
          </div>
  
          {/* 品牌資訊區塊 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">K-Lab 韓味研究所</h3>
            <p className="text-slate-300 text-sm">
              在台灣重現韓國家常味的食譜研究室。
            </p>
            <div className="flex items-center gap-3">
              <img src="/images/logo_noText.png" alt="K-Lab Logo" className="w-6 h-6 object-contain" />
              <span className="text-sm text-slate-300">K-Lab 韓味研究所</span>
            </div>
          </div>
        </div>
  
        {/* 版權資訊 */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              <AffiliateNotice />
            </div>
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} K-Lab 韓味研究所. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

export default Footer;