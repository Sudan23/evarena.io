import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid3X3, List, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EVCard } from '@/components/EVCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { evs } from '@/data/evs';
import { useFilters } from '@/hooks/useFilters';
import { useCompare } from '@/hooks/useCompare';

export function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const {
    filters,
    searchQuery,
    setSearchQuery,
    filteredEVs,
    toggleBrand,
    toggleBodyType,
    setPriceRange,
    setRangeRange,
    setBatteryRange,
    setMinCharging,
    clearFilters,
    activeFilterCount,
    bounds,
  } = useFilters(evs);

  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useCompare();

  // Handle URL search param
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    setSearchQuery(urlSearch ?? '');
  }, [searchParams, setSearchQuery]);

  const handleCompareToggle = (ev: typeof evs[0]) => {
    if (isInCompare(ev.id)) {
      removeFromCompare(ev.id);
    } else {
      addToCompare(ev);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="relative pt-24 lg:pt-32 pb-16">
      <div className="w-full px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Browse EVs</h1>
          <p className="text-muted-foreground">
            Find your perfect electric vehicle from our curated collection.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by brand, model, or body type..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full h-14 pl-12 pr-4 bg-card border-border/50 rounded-2xl text-base"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.brands.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
              >
                {brand}
                <button
                  onClick={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded-full hover:bg-border flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.bodyTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm capitalize"
              >
                {type}
                <button
                  onClick={() => toggleBodyType(type)}
                  className="w-4 h-4 rounded-full hover:bg-border flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-primary"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="text-foreground font-medium">{filteredEVs.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onToggleBrand={toggleBrand}
            onToggleBodyType={toggleBodyType}
            onSetPriceRange={setPriceRange}
            onSetRangeRange={setRangeRange}
            onSetBatteryRange={setBatteryRange}
            onSetMinCharging={setMinCharging}
            onClearFilters={clearFilters}
            activeFilterCount={activeFilterCount}
            resultCount={filteredEVs.length}
            bounds={bounds}
          />

          {/* EV Grid/List */}
          <div className="flex-1">
            {filteredEVs.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No EVs found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query.
                </p>
                <Button onClick={clearFilters} variant="outline" className="rounded-full">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredEVs.map((ev) => (
                  <EVCard
                    key={ev.id}
                    ev={ev}
                    isInCompare={isInCompare(ev.id)}
                    onCompareToggle={handleCompareToggle}
                    canAddMore={canAddMore}
                    showSpecs={viewMode === 'grid'}
                    size={viewMode === 'list' ? 'sm' : 'md'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
