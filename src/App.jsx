import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PortfolioPage from './pages/PortfolioPage';
import AgriDroneHome from './projects/agri-drone/pages/Home';
import MovieGenreHome from './projects/movie-genre/pages/Home';
import SmartHelmetHome from './projects/smart-helmet/pages/Home';
import SmartHomeHome from './projects/smart-home/pages/Home';
import DailyDoseHome from './projects/daily-dose/pages/Home';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force instant scroll by temporarily disabling smooth scrolling
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    
    // Restore original scroll behavior after a short delay
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalStyle;
    }, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/project/agri-drone" element={<AgriDroneHome />} />
        <Route path="/project/movie-genre" element={<MovieGenreHome />} />
        <Route path="/project/smart-helmet" element={<SmartHelmetHome />} />
        <Route path="/project/smart-home" element={<SmartHomeHome />} />
        <Route path="/project/daily-dose" element={<DailyDoseHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
