import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedEVSection } from '@/sections/FeaturedEVSection';
import { QuickCompareSection } from '@/sections/QuickCompareSection';
import { BrowseByTypeSection } from '@/sections/BrowseByTypeSection';
import { EfficiencyLeaderboardSection } from '@/sections/EfficiencyLeaderboardSection';
import { ReviewsSection } from '@/sections/ReviewsSection';
import { NewsletterSection } from '@/sections/NewsletterSection';

export function Home() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main className="relative">
      <HeroSection onSearch={handleSearch} />
      <FeaturedEVSection />
      <QuickCompareSection />
      <BrowseByTypeSection />
      <EfficiencyLeaderboardSection />
      <ReviewsSection />
      <NewsletterSection />
    </main>
  );
}
