import { Link, useLocation } from "react-router-dom";
import { useForm } from "@formspree/react";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [formState, handleSubmit] = useForm("xgvnqwly");
  const [showSuccess, setShowSuccess] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (formState.succeeded) {
      setShowSuccess(true);
    }
  }, [formState.succeeded]);

  // Reset on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (footerRef.current && !footerRef.current.contains(event.target as Node)) {
        setShowSuccess(false);
      }
    };
    if (showSuccess) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuccess]);

  // Reset on route change
  useEffect(() => {
    setShowSuccess(false);
  }, [location.pathname]);

  return (
    <footer ref={footerRef} className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 열1: 의견 & 연락 & 제휴광고 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">意見回饋 & 合作聯絡</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:everyday.studiok@gmail.com" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">
                  <span>📧</span><span>everyday.studiok@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScwR6vBH5xbeVTmtq6YVNQ27HLKQ32yC0ECfFQtoBEu8NCheQ/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
                >
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
              <li><a href="#recipes" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">🍲<span>食譜總覽</span></a></li>
              <li><a href="#tips" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">💡<span>料理小撇步</span></a></li>
            </ul>
          </div>

          {/* 열3: 정책 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">政策</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">📜<span>隱私權政策</span></Link></li>
              <li><Link to="/terms/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">⚖️<span>使用條款</span></Link></li>
            </ul>
          </div>

          {/* 열4: 소셜 & 구독 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">社群 & 訂閱</h3>
            <ul className="space-y-2">
              <li><a href="https://www.instagram.com/everyday_studiok/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition">📸<span>Instagram</span></a></li>
            </ul>
            {showSuccess ? (
              <div className="mt-2">
                <h4 className="font-semibold text-white">感謝您的訂閱！</h4>
                <p className="text-xs text-slate-400 mt-1">我們會將最新食譜與文章透過電子郵件寄送給您</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="輸入 e-mail"
                    className="w-full rounded-md bg-white/10 placeholder-slate-400 text-white text-sm px-3 py-2 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-red-400"
                    required
                  />
                  <button type="submit" disabled={formState.submitting} className="shrink-0 px-3 py-2 rounded-md bg-red-500 hover:bg-red-400 text-white text-sm transition disabled:bg-slate-500">訂閱</button>
                </form>
                <p className="text-xs text-slate-400">訂閱後我們會將最新食譜與文章透過電子郵件寄送給您</p>
              </>
            )}
          </div>
        </div>

        {/* 版權資訊 */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400 ml-auto w-full text-right md:w-auto">© {new Date().getFullYear()} Studio.K 韓味研究所. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;