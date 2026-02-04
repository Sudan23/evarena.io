import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { brands, bodyTypes } from '@/data/evs';
import type { FilterState } from '@/types/ev';

interface FilterSidebarProps {
  filters: FilterState;
  onToggleBrand: (brand: string) => void;
  onToggleBodyType: (bodyType: string) => void;
  onSetPriceRange: (min: number, max: number) => void;
  onSetRangeRange: (min: number, max: number) => void;
  onSetBatteryRange: (min: number, max: number) => void;
  onSetMinCharging: (value: number) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
  resultCount: number;
  bounds: {
    maxPrice: number;
    maxRange: number;
    maxBattery: number;
    maxCharging: number;
  };
}

function FilterContent({
  filters,
  onToggleBrand,
  onToggleBodyType,
  onSetPriceRange,
  onSetRangeRange,
  onSetBatteryRange,
  onSetMinCharging,
  onClearFilters,
  resultCount,
  bounds,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2 scrollbar-hide">
        {/* Brand Filter */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Brand
          </h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => onToggleBrand(brand)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm group-hover:text-foreground transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Body Type Filter */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">
            Body Type
          </h3>
          <div className="space-y-2">
            {bodyTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group capitalize"
              >
                <Checkbox
                  checked={filters.bodyTypes.includes(type)}
                  onCheckedChange={() => onToggleBodyType(type)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm group-hover:text-foreground transition-colors capitalize">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Price Range
          </h3>
          <div className="px-1">
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) => onSetPriceRange(min, max)}
              max={bounds.maxPrice}
              step={5000}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${(filters.minPrice / 1000).toFixed(0)}k</span>
              <span>${(filters.maxPrice / 1000).toFixed(0)}k</span>
            </div>
          </div>
        </div>

        {/* Range Filter */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Range (WLTP)
          </h3>
          <div className="px-1">
            <Slider
              value={[filters.minRange, filters.maxRange]}
              onValueChange={([min, max]) => onSetRangeRange(min, max)}
              max={bounds.maxRange}
              step={50}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.minRange} km</span>
              <span>{filters.maxRange} km</span>
            </div>
          </div>
        </div>

        {/* Battery Size */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Battery Size
          </h3>
          <div className="px-1">
            <Slider
              value={[filters.minBattery, filters.maxBattery]}
              onValueChange={([min, max]) => onSetBatteryRange(min, max)}
              max={bounds.maxBattery}
              step={5}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.minBattery} kWh</span>
              <span>{filters.maxBattery} kWh</span>
            </div>
          </div>
        </div>

        {/* Charging Speed */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
            Min Charging Speed
          </h3>
          <div className="px-1">
            <Slider
              value={[filters.minCharging]}
              onValueChange={([value]) => onSetMinCharging(value)}
              max={bounds.maxCharging}
              step={10}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 kW</span>
              <span>{filters.minCharging} kW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result Count */}
      <div className="pt-4 border-t border-border mt-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-medium">{resultCount}</span> vehicles
        </p>
      </div>
    </div>
  );
}

export function FilterSidebar(props: FilterSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-3xl p-6 border border-border/50">
          <FilterContent {...props} />
        </div>
      </aside>

      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="lg:hidden fixed bottom-6 right-6 z-40 rounded-full shadow-lg"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {props.activeFilterCount > 0 && (
              <span className="ml-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {props.activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-card border-border p-6">
          <FilterContent {...props} />
        </SheetContent>
      </Sheet>
    </>
  );
}
