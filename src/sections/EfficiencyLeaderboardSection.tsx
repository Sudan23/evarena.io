import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEfficiencyLeaderboard } from '@/data/evs';

export function EfficiencyLeaderboardSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const leaderboard = getEfficiencyLeaderboard().slice(0, 5);

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

  const maxWhPerKm = Math.max(...leaderboard.map(ev => ev.efficiency.whPerKm));

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
              Rankings
            </span>
            <h2 className="section-title">Efficiency Leaderboard</h2>
            <p className="section-subtitle">
              Who goes farthest on a kilowatt-hour.
            </p>
          </div>
          <Link to="/browse">
            <Button variant="outline" className="rounded-full">
              View All Rankings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {leaderboard.map((ev, index) => (
            <Link
              key={ev.id}
              to={`/ev/${ev.slug}`}
              className={`block group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="ev-card p-4 md:p-6 flex items-center gap-4 md:gap-6 hover:border-primary/30 transition-colors">
                {/* Rank */}
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  {index === 0 ? (
                    <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
                      <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                  ) : (
                    <span className="text-xl md:text-2xl font-mono font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Thumbnail */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary flex items-center justify-center hidden sm:flex">
                  <svg
                    viewBox="0 0 240 120"
                    className="w-12 h-12 opacity-50"
                    fill="currentColor"
                  >
                    <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {ev.brand}
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold truncate group-hover:text-primary transition-colors">
                    {ev.model}
                  </h4>
                </div>

                {/* Efficiency Bar (desktop only) */}
                <div className="hidden md:block flex-1 max-w-xs">
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{
                        width: `${(ev.efficiency.whPerKm / maxWhPerKm) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 md:gap-10">
                  <div className="text-right">
                    <div className="text-lg md:text-2xl font-mono font-semibold text-primary">
                      {ev.efficiency.whPerKm}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Wh/km
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-lg md:text-xl font-mono font-medium">
                      {ev.range.wltp}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      km
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
