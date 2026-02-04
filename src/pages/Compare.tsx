import { Link } from 'react-router-dom';
import { ArrowRight, Scale, X, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpecTable } from '@/components/SpecTable';
import { evs } from '@/data/evs';
import { useCompare } from '@/hooks/useCompare';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Compare() {
  const { compareList, removeFromCompare, addToCompare, clearCompare, isInCompare } = useCompare();

  const availableEVs = evs.filter((ev) => !isInCompare(ev.id));

  if (compareList.length === 0) {
    return (
      <main className="relative pt-24 lg:pt-32 pb-16">
        <div className="w-full px-6 lg:px-10">
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Scale className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-semibold mb-4">No EVs to Compare</h1>
            <p className="text-muted-foreground mb-6">
              Add electric vehicles to your comparison list to see how they stack up against each other.
            </p>
            <Link to="/browse">
              <Button className="btn-primary">
                Browse EVs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative pt-24 lg:pt-32 pb-16">
      <div className="w-full px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">Compare EVs</h1>
            <p className="text-muted-foreground">
              Side-by-side comparison of up to 4 vehicles
            </p>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length < 4 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add EV
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Add Vehicle to Compare</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] mt-4">
                    <div className="grid gap-3">
                      {availableEVs.map((ev) => (
                        <button
                          key={ev.id}
                          onClick={() => addToCompare(ev)}
                          className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors text-left"
                        >
                          <div className="w-16 h-16 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                            <svg
                              viewBox="0 0 240 120"
                              className="w-10 h-10 opacity-50"
                              fill="currentColor"
                            >
                              <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                              {ev.brand}
                            </div>
                            <div className="font-semibold">{ev.model}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {ev.range.wltp} km · ${(ev.price.base / 1000).toFixed(0)}k
                            </div>
                          </div>
                          <Plus className="w-5 h-5 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
            <Button
              variant="ghost"
              onClick={clearCompare}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Selected EVs Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {compareList.map((ev) => (
            <div
              key={ev.id}
              className="bg-card rounded-2xl p-4 border border-border/50 relative group"
            >
              <button
                onClick={() => removeFromCompare(ev.id)}
                aria-label={`Remove ${ev.model} from compare`}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="aspect-[4/3] rounded-xl bg-secondary flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 240 120"
                  className="w-2/3 h-2/3 opacity-50"
                  fill="currentColor"
                >
                  <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                </svg>
              </div>
              
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                {ev.brand}
              </div>
              <h3 className="font-semibold truncate">{ev.model}</h3>
              <div className="text-sm text-primary font-mono mt-1">
                ${ev.price.base.toLocaleString()}
              </div>
              
              <Link
                to={`/ev/${ev.slug}`}
                aria-label={`View ${ev.model} details`}
                className="absolute inset-0 rounded-2xl ring-2 ring-transparent hover:ring-primary/30 transition-all"
              />
            </div>
          ))}
          
          {/* Empty slots */}
          {Array.from({ length: 4 - compareList.length }).map((_, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <button className="aspect-[3/4] rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-sm">Add EV</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Add Vehicle to Compare</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] mt-4">
                  <div className="grid gap-3">
                    {availableEVs.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => addToCompare(ev)}
                        className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors text-left"
                      >
                        <div className="w-16 h-16 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                          <svg
                            viewBox="0 0 240 120"
                            className="w-10 h-10 opacity-50"
                            fill="currentColor"
                          >
                            <path d="M200 70h-10l-5-15h-30l-5 15h-60l-5-15h-30l-5 15H35c-5.5 0-10 4.5-10 10v15c0 5.5 4.5 10 10 10h10c0-11 9-20 20-20s20 9 20 20h60c0-11 9-20 20-20s20 9 20 20h15c5.5 0 10-4.5 10-10V80c0-5.5-4.5-10-10-10zM65 55l10-20h80l10 20H65z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                            {ev.brand}
                          </div>
                          <div className="font-semibold">{ev.model}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {ev.range.wltp} km · ${(ev.price.base / 1000).toFixed(0)}k
                          </div>
                        </div>
                        <Plus className="w-5 h-5 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-card rounded-3xl p-6 border border-border/50 overflow-hidden">
          <h2 className="text-xl font-semibold mb-6">Specification Comparison</h2>
          <SpecTable evs={compareList} highlightBest={true} />
        </div>

        {/* Quick Summary */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Best Range
            </h3>
            {compareList.length > 0 && (
              <div>
                {(() => {
                  const best = compareList.reduce((prev, current) =>
                    prev.range.wltp > current.range.wltp ? prev : current
                  );
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{best.model}</div>
                        <div className="text-sm text-muted-foreground">{best.brand}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-mono font-semibold text-primary">
                          {best.range.wltp}
                        </div>
                        <div className="text-xs text-muted-foreground">km</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Fastest Charging
            </h3>
            {compareList.length > 0 && (
              <div>
                {(() => {
                  const best = compareList.reduce((prev, current) =>
                    prev.charging.maxSpeed > current.charging.maxSpeed ? prev : current
                  );
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{best.model}</div>
                        <div className="text-sm text-muted-foreground">{best.brand}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-mono font-semibold text-primary">
                          {best.charging.maxSpeed}
                        </div>
                        <div className="text-xs text-muted-foreground">kW</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Most Efficient
            </h3>
            {compareList.length > 0 && (
              <div>
                {(() => {
                  const best = compareList.reduce((prev, current) =>
                    prev.efficiency.whPerKm < current.efficiency.whPerKm ? prev : current
                  );
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{best.model}</div>
                        <div className="text-sm text-muted-foreground">{best.brand}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-mono font-semibold text-primary">
                          {best.efficiency.whPerKm}
                        </div>
                        <div className="text-xs text-muted-foreground">Wh/km</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
