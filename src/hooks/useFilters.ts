import { useState, useCallback, useMemo } from 'react';
import type { EV, FilterState } from '@/types/ev';

const FALLBACK_BOUNDS = {
  maxPrice: 200000,
  maxRange: 800,
  maxBattery: 150,
  maxCharging: 300,
};

function getBounds(evs: EV[]) {
  if (evs.length === 0) return FALLBACK_BOUNDS;

  const maxPrice = Math.max(...evs.map(ev => ev.price.base));
  const maxRange = Math.max(...evs.map(ev => ev.range.wltp));
  const maxBattery = Math.max(...evs.map(ev => ev.battery.usable));
  const maxCharging = Math.max(...evs.map(ev => ev.charging.maxSpeed));

  return {
    maxPrice: Math.ceil(maxPrice / 1000) * 1000,
    maxRange: Math.ceil(maxRange / 50) * 50,
    maxBattery: Math.ceil(maxBattery / 5) * 5,
    maxCharging: Math.ceil(maxCharging / 10) * 10,
  };
}

function createDefaultFilters(bounds: ReturnType<typeof getBounds>): FilterState {
  return {
    brands: [],
    bodyTypes: [],
    minPrice: 0,
    maxPrice: bounds.maxPrice,
    minRange: 0,
    maxRange: bounds.maxRange,
    minBattery: 0,
    maxBattery: bounds.maxBattery,
    minCharging: 0,
    minEfficiency: 0,
  };
}

export function useFilters(evs: EV[]) {
  const bounds = useMemo(() => getBounds(evs), [evs]);
  const [filters, setFilters] = useState<FilterState>(() => createDefaultFilters(bounds));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEVs = useMemo(() => {
    return evs.filter(ev => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          ev.fullName.toLowerCase().includes(query) ||
          ev.brand.toLowerCase().includes(query) ||
          ev.model.toLowerCase().includes(query) ||
          ev.bodyType.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(ev.brand)) {
        return false;
      }

      // Body type filter
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(ev.bodyType)) {
        return false;
      }

      // Price filter
      if (ev.price.base < filters.minPrice || ev.price.base > filters.maxPrice) {
        return false;
      }

      // Range filter (using WLTP)
      if (ev.range.wltp < filters.minRange || ev.range.wltp > filters.maxRange) {
        return false;
      }

      // Battery filter
      if (ev.battery.usable < filters.minBattery || ev.battery.usable > filters.maxBattery) {
        return false;
      }

      // Charging speed filter
      if (ev.charging.maxSpeed < filters.minCharging) {
        return false;
      }

      // Efficiency filter
      if (ev.efficiency.whPerKm < filters.minEfficiency) {
        return false;
      }

      return true;
    });
  }, [evs, filters, searchQuery]);

  const toggleBrand = useCallback((brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand],
    }));
  }, []);

  const toggleBodyType = useCallback((bodyType: string) => {
    setFilters(prev => ({
      ...prev,
      bodyTypes: prev.bodyTypes.includes(bodyType)
        ? prev.bodyTypes.filter(b => b !== bodyType)
        : [...prev.bodyTypes, bodyType],
    }));
  }, []);

  const setPriceRange = useCallback((min: number, max: number) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  const setRangeRange = useCallback((min: number, max: number) => {
    setFilters(prev => ({ ...prev, minRange: min, maxRange: max }));
  }, []);

  const setBatteryRange = useCallback((min: number, max: number) => {
    setFilters(prev => ({ ...prev, minBattery: min, maxBattery: max }));
  }, []);

  const setMinCharging = useCallback((value: number) => {
    setFilters(prev => ({ ...prev, minCharging: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(createDefaultFilters(bounds));
    setSearchQuery('');
  }, [bounds]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.brands.length > 0) count++;
    if (filters.bodyTypes.length > 0) count++;
    if (filters.minPrice > 0 || filters.maxPrice < bounds.maxPrice) count++;
    if (filters.minRange > 0 || filters.maxRange < bounds.maxRange) count++;
    if (filters.minBattery > 0 || filters.maxBattery < bounds.maxBattery) count++;
    if (filters.minCharging > 0) count++;
    if (filters.minEfficiency > 0) count++;
    return count;
  }, [filters, bounds]);

  return {
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
  };
}
