import { Link } from 'react-router-dom';
import { Scale, Check, Battery, Zap, Gauge } from 'lucide-react';
import type { EV } from '@/types/ev';

interface EVCardProps {
  ev: EV;
  isInCompare?: boolean;
  onCompareToggle?: (ev: EV) => void;
  canAddMore?: boolean;
  showSpecs?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function EVCard({
  ev,
  isInCompare = false,
  onCompareToggle,
  canAddMore = true,
  showSpecs = true,
  size = 'md',
}: EVCardProps) {
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompareToggle?.(ev);
  };

  const sizeClasses = {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
  };

  return (
    <Link to={`/ev/${ev.slug}`} className="block group">
      <div className={`ev-card relative ${sizeClasses[size]} flex flex-col`}>
        {/* Image Area */}
        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/20">
          {/* Placeholder for EV Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 relative">
              {/* Car silhouette placeholder */}
              <svg
                viewBox="0 0 240 120"
                className="w-full h-full opacity-30 group-hover:opacity-50 transition-opacity"
                fill="currentColor"
              >
                <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
              </svg>
            </div>
          </div>
          
          {/* Brand Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-xs font-mono uppercase tracking-wider">
              {ev.brand}
            </span>
          </div>

          {/* Compare Button */}
          {onCompareToggle && (
            <button
              onClick={handleCompareClick}
              disabled={!isInCompare && !canAddMore}
              aria-label={isInCompare ? 'Remove from compare' : 'Add to compare'}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isInCompare
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {isInCompare ? (
                <Check className="w-5 h-5" />
              ) : (
                <Scale className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Body Type Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="spec-pill">
              {ev.bodyType}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 bg-card">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {ev.model}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                From ${ev.price.base.toLocaleString()}
              </p>
            </div>
          </div>

          {showSpecs && (
            <div className="flex flex-wrap gap-2">
              <span className="spec-pill">
                <Battery className="w-3.5 h-3.5" />
                {ev.range.wltp} km
              </span>
              <span className="spec-pill">
                <Zap className="w-3.5 h-3.5" />
                {ev.charging.maxSpeed} kW
              </span>
              <span className="spec-pill">
                <Gauge className="w-3.5 h-3.5" />
                {ev.performance.acceleration}s
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
