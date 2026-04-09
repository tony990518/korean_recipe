import { Link } from "react-router-dom";
import { useRef } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer ref={footerRef} className="bg-surface-container-low w-full pt-16 pb-8 px-8 rounded-t-xl tonal-shift-no-border flat no shadows">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="text-xl font-bold text-on-surface mb-4">Studio.K</div>
          <p className="font-label text-sm leading-relaxed text-on-surface/70">
            這是一個關於味道、溫度與記憶的數位廚房。我們致力於簡化複雜的料理，讓每個人都能享受烹飪的樂趣。
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-primary mb-6">Contact</h4>
          <ul className="font-label text-sm space-y-4 text-on-surface/70">
            <li className="hover:text-primary transition-colors cursor-pointer">
              <a href="mailto:everyday.studiok@gmail.com">everyday.studiok@gmail.com</a>
            </li>
            <li className="hover:text-primary transition-colors cursor-pointer">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScwR6vBH5xbeVTmtq6YVNQ27HLKQ32yC0ECfFQtoBEu8NCheQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                意見回饋表單
              </a>
            </li>
            <li className="hover:text-primary transition-colors cursor-pointer">
              <a href="https://www.instagram.com/everyday_studiok/" target="_blank" rel="noopener noreferrer">Instagram: @everyday_studiok</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-primary mb-6">Quick Links</h4>
          <ul className="font-label text-sm space-y-4 text-on-surface/70">
            <li><Link to="/" className="hover:text-primary transition-colors cursor-pointer">食譜首頁</Link></li>
            <li><a href="/#recipes" className="hover:text-primary transition-colors cursor-pointer">熱門推薦</a></li>
            <li><a href="/#tips" className="hover:text-primary transition-colors cursor-pointer">料理小撇步</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-primary mb-6">Policies</h4>
          <ul className="font-label text-sm space-y-4 text-on-surface/70">
            <li><Link to="/terms/" className="hover:text-primary transition-colors cursor-pointer">使用條款</Link></li>
            <li><Link to="/privacy/" className="hover:text-primary transition-colors cursor-pointer">隱私政策</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-on-surface/10 text-center font-label text-sm text-on-surface/50">
        © {new Date().getFullYear()} Studio.K Digital Kitchen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;