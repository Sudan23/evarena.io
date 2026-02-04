import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { evs, bodyTypes } from '@/data/evs';

const bodyTypeIcons: Record<string, string> = {
  sedan: '🚗',
  suv: '🚙',
  wagon: '🚐',
  hatchback: '🏎️',
  coupe: '🏎️',
  van: '🚐',
  truck: '🛻',
};

export function BrowseByTypeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredEVs = selectedType
    ? evs.filter(ev => ev.bodyType === selectedType).slice(0, 6)
    : evs.slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-10">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-sm font-mono uppercase tracking-wider text-primary mb-3 block">
            Browse
          </span>
          <h2 className="section-title">Browse by Body Type</h2>
          <p className="section-subtitle">Filter once. See everything that fits.</p>
        </div>

        {/* Body Type Chips */}
        <div
          className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => setSelectedType(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedType === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            All Types
          </button>
          {bodyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type === selectedType ? null : type)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all capitalize ${
                selectedType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              <span className="mr-2">{bodyTypeIcons[type] || '🚗'}</span>
              {type}
            </button>
          ))}
        </div>

        {/* EV Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEVs.map((ev, index) => (
            <Link
              key={ev.id}
              to={`/ev/${ev.slug}`}
              className={`block group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 50}ms` }}
            >
              <div className="ev-card relative h-80 overflow-hidden">
                {/* Image Area */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 240 120"
                      className="w-2/3 h-2/3 opacity-40 group-hover:opacity-60 transition-opacity"
                      fill="currentColor"
                    >
                      <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">
                        {ev.brand}
                      </span>
                      <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {ev.model}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono text-primary">
                        ${(ev.price.base / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link to="/browse">
            <Button variant="outline" size="lg" className="rounded-full">
              View all {evs.length}+ EVs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
