import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background to-background">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(185, 255, 44, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(185, 255, 44, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-secondary/60 backdrop-blur-sm rounded-full mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono uppercase tracking-wider">
              Discover Electric Vehicles
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`section-title mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="block">Explore.</span>
            <span className="block text-primary">Compare.</span>
            <span className="block">Electrify.</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Find the electric vehicle that fits your life—range, charging, price, 
            and real-world reviews. All in one place.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className={`max-w-2xl mx-auto mb-12 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by brand, model, or body type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-36 bg-card/80 backdrop-blur-xl border-border/50 rounded-full text-lg placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-primary/20"
              />
              <Button
                type="submit"
                className="absolute right-2 h-12 px-6 bg-primary text-primary-foreground hover:brightness-110 rounded-full font-medium"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Quick Stats */}
          <div
            className={`flex flex-wrap justify-center gap-8 md:gap-12 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-semibold text-primary">
                25+
              </div>
              <div className="text-sm text-muted-foreground mt-1">EV Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-semibold text-primary">
                8
              </div>
              <div className="text-sm text-muted-foreground mt-1">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-mono font-semibold text-primary">
                2.4k+
              </div>
              <div className="text-sm text-muted-foreground mt-1">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs font-mono uppercase tracking-wider">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
