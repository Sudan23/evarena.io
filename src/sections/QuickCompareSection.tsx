import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Battery, Zap, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { evs } from '@/data/evs';

export function QuickCompareSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Select 3 popular EVs for comparison
  const compareEVs = [
    evs.find(ev => ev.slug === 'tesla-model-3'),
    evs.find(ev => ev.slug === 'bmw-i4'),
    evs.find(ev => ev.slug === 'hyundai-ioniq-6'),
  ].filter(Boolean);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
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
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <span className="text-sm font-mono uppercase tracking-wider text-primary mb-3 block">
              Compare
            </span>
            <h2 className="section-title">Quick Compare</h2>
            <p className="section-subtitle">Three leaders. One glance.</p>
          </div>
          <Link to="/compare">
            <Button variant="outline" className="rounded-full">
              Open Full Comparator
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Compare Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {compareEVs.map((ev, index) => (
            <Link
              key={ev!.id}
              to={`/ev/${ev!.slug}`}
              className={`block group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="ev-card relative h-[450px] overflow-hidden">
                {/* VS Badge for middle card */}
                {index === 1 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">VS</span>
                    </div>
                  </div>
                )}

                {/* Image Area */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 240 120"
                      className="w-3/4 h-3/4 opacity-40 group-hover:opacity-60 transition-opacity"
                      fill="currentColor"
                    >
                      <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-secondary rounded-full text-xs font-mono uppercase tracking-wider">
                      {ev!.brand}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {ev!.model}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-border/30">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Battery className="w-4 h-4" />
                        Range
                      </span>
                      <span className="font-mono font-medium">{ev!.range.wltp} km</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/30">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="w-4 h-4" />
                        Charge
                      </span>
                      <span className="font-mono font-medium">{ev!.charging.maxSpeed} kW</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Gauge className="w-4 h-4" />
                        0-100
                      </span>
                      <span className="font-mono font-medium">{ev!.performance.acceleration}s</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
