import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Home } from '@/pages/Home';
import { Browse } from '@/pages/Browse';
import { EVDetail } from '@/pages/EVDetail';
import { Compare } from '@/pages/Compare';
import { Reviews } from '@/pages/Reviews';
import { useCompare } from '@/hooks/useCompare';

function App() {
  const { compareList, isLoaded } = useCompare();

  if (!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Navigation */}
        <Navigation compareCount={compareList.length} />
        
        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/ev/:slug" element={<EVDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
