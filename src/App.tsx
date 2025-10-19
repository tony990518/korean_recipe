// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/Recipes";
import TipsPage from "./pages/Tips";
import RecipeRoute from "./pages/RecipeDetail";
import TipDetail from "./pages/TipDetail";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import SEOHelmet from "./components/SEOHelmet";
import { getNotFoundMeta } from "./seo";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return null;
};

const AppShell = () => (
  <div className="min-h-dvh bg-gradient-to-b from-white to-slate-50 text-slate-900">
    <Header />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/tips" element={<TipsPage />} />
      <Route path="/recipe/:id" element={<RecipeRoute />} />
      <Route path="/tip/:id" element={<TipDetail />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <SEOHelmet meta={getNotFoundMeta()} />
          <h1 className="text-2xl font-bold">頁面不存在</h1>
          <div className="mt-6">
            <Link className="text-red-600 underline" to="/">返回首頁</Link>
          </div>
        </main>
      } />
    </Routes>
    <Footer />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
