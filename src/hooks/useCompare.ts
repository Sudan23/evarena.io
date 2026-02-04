import React, { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import type { EV } from '@/types/ev';

const STORAGE_KEY = 'ev-arena-compare';
const MAX_COMPARE = 4;

type CompareContextValue = {
  compareList: EV[];
  addToCompare: (ev: EV) => void;
  removeFromCompare: (evId: string) => void;
  clearCompare: () => void;
  isInCompare: (evId: string) => boolean;
  canAddMore: boolean;
  compareCount: number;
  isLoaded: boolean;
};

const CompareContext = React.createContext<CompareContextValue | null>(null);

function useCompareState(): CompareContextValue {
  const [compareList, setCompareList] = useState<EV[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCompareList(parsed);
      }
    } catch (e) {
      console.error('Failed to load compare list:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when list changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
      } catch (e) {
        console.error('Failed to save compare list:', e);
      }
    }
  }, [compareList, isLoaded]);

  const addToCompare = useCallback((ev: EV) => {
    setCompareList(prev => {
      if (prev.some(item => item.id === ev.id)) {
        return prev;
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, ev];
    });
  }, []);

  const removeFromCompare = useCallback((evId: string) => {
    setCompareList(prev => prev.filter(item => item.id !== evId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const isInCompare = useCallback((evId: string) => {
    return compareList.some(item => item.id === evId);
  }, [compareList]);

  const canAddMore = compareList.length < MAX_COMPARE;

  return useMemo(
    () => ({
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      canAddMore,
      compareCount: compareList.length,
      isLoaded,
    }),
    [compareList, addToCompare, removeFromCompare, clearCompare, isInCompare, canAddMore, isLoaded]
  );
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const value = useCompareState();
  return React.createElement(CompareContext.Provider, { value }, children);
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within <CompareProvider>');
  }
  return context;
}
