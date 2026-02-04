import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Battery,
  Zap,
  Gauge,
  Scale,
  Check,
  Star,
  Shield,
  Ruler,
  Weight,
  Package,
  ChevronRight,
  Share2,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RangeChart } from '@/components/RangeChart';
import { ReviewCard } from '@/components/ReviewCard';
import { getEVBySlug, getReviewsByEvId, evs } from '@/data/evs';
import { useCompare } from '@/hooks/useCompare';
import type { RangeMode } from '@/types/ev';

export function EVDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const ev = getEVBySlug(slug || '');
  const reviews = ev ? getReviewsByEvId(ev.id) : [];
  const [rangeMode, setRangeMode] = useState<RangeMode>('wltp');
  
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useCompare();

  if (!ev) {
    return (
      <main className="relative pt-24 lg:pt-32 pb-16">
        <div className="w-full px-6 lg:px-10">
          <div className="text-center py-20">
            <h1 className="text-3xl font-semibold mb-4">EV Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The vehicle you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link to="/browse">
              <Button className="rounded-full">Browse All EVs</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const inCompare = isInCompare(ev.id);

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(ev.id);
    } else {
      addToCompare(ev);
    }
  };

  const relatedEVs = evs
    .filter((e) => e.bodyType === ev.bodyType && e.id !== ev.id)
    .slice(0, 3);

  return (
    <main className="relative pt-20 lg:pt-24 pb-16">
      {/* Sticky Action Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="w-full px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={handleCompareToggle}
                disabled={!inCompare && !canAddMore}
                aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
              >
                <Scale className="w-4 h-4 mr-2" />
                {inCompare ? 'In Compare' : 'Add to Compare'}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Save to favorites">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full px-6 lg:px-10 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="ev-card aspect-[4/3] lg:aspect-auto lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-secondary/50 to-secondary/20">
            <svg
              viewBox="0 0 240 120"
              className="w-3/4 h-3/4 opacity-50"
              fill="currentColor"
            >
              <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
            </svg>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 bg-secondary rounded-full text-xs font-mono uppercase tracking-wider">
                {ev.brand}
              </span>
              <span className="px-3 py-1.5 bg-secondary rounded-full text-xs font-mono uppercase tracking-wider capitalize">
                {ev.bodyType}
              </span>
              {ev.safety.ncapRating === 5 && (
                <span className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-mono uppercase tracking-wider">
                  5★ Safety
                </span>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-semibold mb-4">{ev.model}</h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              From <span className="text-foreground font-semibold">${ev.price.base.toLocaleString()}</span>
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-2xl p-4 border border-border/50">
                <Battery className="w-5 h-5 text-primary mb-2" />
                <div className="text-xl font-mono font-semibold">{ev.range.wltp}</div>
                <div className="text-xs text-muted-foreground">km range</div>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border/50">
                <Zap className="w-5 h-5 text-primary mb-2" />
                <div className="text-xl font-mono font-semibold">{ev.charging.maxSpeed}</div>
                <div className="text-xs text-muted-foreground">kW charge</div>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border/50">
                <Gauge className="w-5 h-5 text-primary mb-2" />
                <div className="text-xl font-mono font-semibold">{ev.performance.acceleration}</div>
                <div className="text-xs text-muted-foreground">s 0-100</div>
              </div>
            </div>

            {/* Range Mode Toggle */}
            <div className="mb-6">
              <span className="text-sm text-muted-foreground mb-2 block">Range estimate:</span>
              <div className="flex gap-2">
                {(['wltp', 'epa', 'realWorld'] as RangeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setRangeMode(mode)}
                    className={`px-4 py-2 rounded-full text-sm font-mono uppercase tracking-wider transition-colors ${
                      rangeMode === mode
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {mode === 'realWorld' ? 'Real' : mode.toUpperCase()}: {ev.range[mode]} km
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button className="btn-primary flex-1">
                Configure & Price
              </Button>
              <Button variant="outline" className="rounded-full">
                Book Test Drive
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tabs */}
      <section className="w-full px-6 lg:px-10 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start bg-card rounded-2xl p-1 mb-8 overflow-x-auto">
            <TabsTrigger value="overview" className="rounded-xl px-6">Overview</TabsTrigger>
            <TabsTrigger value="specs" className="rounded-xl px-6">Specs</TabsTrigger>
            <TabsTrigger value="battery" className="rounded-xl px-6">Battery & Charging</TabsTrigger>
            <TabsTrigger value="performance" className="rounded-xl px-6">Performance</TabsTrigger>
            <TabsTrigger value="safety" className="rounded-xl px-6">Safety</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl px-6">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {ev.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <RangeChart ev={ev} />
            </div>
          </TabsContent>

          <TabsContent value="specs" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <Ruler className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">Dimensions</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Length</span>
                    <span className="font-mono">{ev.dimensions.length} mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Width</span>
                    <span className="font-mono">{ev.dimensions.width} mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Height</span>
                    <span className="font-mono">{ev.dimensions.height} mm</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Cargo Space</span>
                    <span className="font-mono">{ev.dimensions.cargoSpace} L</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <Weight className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">Weight</h4>
                </div>
                <div className="text-3xl font-mono font-semibold mb-2">
                  {ev.dimensions.weight}
                </div>
                <div className="text-sm text-muted-foreground">kg</div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">General</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Release Year</span>
                    <span className="font-mono">{ev.releaseYear}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Body Type</span>
                    <span className="font-mono capitalize">{ev.bodyType}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-mono">{ev.isAvailable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="battery" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h4 className="font-semibold mb-4">Battery</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Capacity</div>
                    <div className="text-2xl font-mono font-semibold">{ev.battery.capacity} kWh</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Usable Capacity</div>
                    <div className="text-2xl font-mono font-semibold">{ev.battery.usable} kWh</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h4 className="font-semibold mb-4">Charging</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Max Charging Speed</div>
                    <div className="text-2xl font-mono font-semibold">{ev.charging.maxSpeed} kW</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Port Type</div>
                    <div className="text-2xl font-mono font-semibold">{ev.charging.portType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">10-80% Charge Time</div>
                    <div className="text-2xl font-mono font-semibold">{ev.charging.time10to80} min</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                <Gauge className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-mono font-semibold mb-1">{ev.performance.acceleration}</div>
                <div className="text-sm text-muted-foreground">seconds 0-100 km/h</div>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-mono font-semibold mb-1">{ev.performance.topSpeed}</div>
                <div className="text-sm text-muted-foreground">km/h top speed</div>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                <Battery className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-mono font-semibold mb-1">{ev.performance.power}</div>
                <div className="text-sm text-muted-foreground">kW power output</div>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                <Weight className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-mono font-semibold mb-1">{ev.performance.torque}</div>
                <div className="text-sm text-muted-foreground">Nm torque</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h4 className="font-semibold">Safety Rating</h4>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl font-mono font-semibold text-primary">
                    {ev.safety.ncapRating}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < ev.safety.ncapRating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Euro NCAP Rating
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h4 className="font-semibold mb-4">Safety Features</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl font-mono font-semibold text-primary">
                    {ev.safety.airbags}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Airbags
                  </div>
                </div>
                <ul className="space-y-2">
                  {ev.safety.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            {reviews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground">
                  Be the first to review this vehicle.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Related EVs */}
      {relatedEVs.length > 0 && (
        <section className="w-full px-6 lg:px-10 py-8 border-t border-border/50">
          <h3 className="text-xl font-semibold mb-6">Similar Vehicles</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEVs.map((relatedEv) => (
              <Link
                key={relatedEv.id}
                to={`/ev/${relatedEv.slug}`}
                className="ev-card p-4 flex items-center gap-4 group"
              >
                <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 240 120"
                    className="w-14 h-14 opacity-50"
                    fill="currentColor"
                  >
                    <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    {relatedEv.brand}
                  </div>
                  <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
                    {relatedEv.model}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-mono text-muted-foreground">
                      {relatedEv.range.wltp} km
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
