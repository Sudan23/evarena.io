import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Zap, Battery, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedEVs } from '@/data/evs';

export function FeaturedEVSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const featuredEVs = getFeaturedEVs();
  const mainEV = featuredEVs.find(ev => ev.slug === 'hyundai-ioniq-5') || featuredEVs[0];

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
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-sm font-mono uppercase tracking-wider text-primary mb-3 block">
            Featured
          </span>
          <h2 className="section-title">Spotlight Vehicle</h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Main Featured Card */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <Link to={`/ev/${mainEV.slug}`} className="block group">
              <div className="ev-card relative h-[500px] lg:h-[600px] overflow-hidden">
                {/* Image Area */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 240 120"
                      className="w-4/5 h-4/5 opacity-40 group-hover:opacity-60 transition-opacity"
                      fill="currentColor"
                    >
                      <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                    </svg>
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-mono uppercase tracking-wider">
                      Featured
                    </span>
                    <span className="px-3 py-1.5 bg-secondary rounded-full text-xs font-mono uppercase tracking-wider">
                      {mainEV.brand}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {mainEV.model}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-6 max-w-md">
                    800V charging. Clean lines. Everyday comfort. The electric vehicle 
                    that changed the game.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="spec-pill">
                      <Battery className="w-4 h-4" />
                      {mainEV.range.wltp} km range
                    </span>
                    <span className="spec-pill">
                      <Zap className="w-4 h-4" />
                      {mainEV.charging.maxSpeed} kW charging
                    </span>
                    <span className="spec-pill">
                      <Gauge className="w-4 h-4" />
                      {mainEV.performance.acceleration}s 0-100
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button className="btn-primary">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      <Scale className="w-4 h-4 mr-2" />
                      Compare
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Side Cards */}
          <div
            className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {featuredEVs.filter(ev => ev.id !== mainEV.id).slice(0, 2).map((ev) => (
              <Link
                key={ev.id}
                to={`/ev/${ev.slug}`}
                className="block group flex-1"
              >
                <div className="ev-card relative h-full min-h-[200px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        viewBox="0 0 240 120"
                        className="w-3/5 h-3/5 opacity-30 group-hover:opacity-50 transition-opacity"
                        fill="currentColor"
                      >
                        <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                      {ev.brand}
                    </span>
                    <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {ev.model}
                    </h4>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-sm font-mono text-muted-foreground">
                        {ev.range.wltp} km
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">
                        ${(ev.price.base / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
