export interface EV {
  id: string;
  slug: string;
  brand: string;
  model: string;
  fullName: string;
  bodyType: 'sedan' | 'suv' | 'wagon' | 'hatchback' | 'coupe' | 'van' | 'truck';
  price: {
    base: number;
    currency: string;
  };
  range: {
    wltp: number;
    epa: number;
    realWorld: number;
  };
  battery: {
    capacity: number;
    usable: number;
  };
  charging: {
    maxSpeed: number;
    portType: string;
    time10to80: number;
  };
  performance: {
    acceleration: number;
    topSpeed: number;
    power: number;
    torque: number;
  };
  efficiency: {
    whPerKm: number;
    mpge: number;
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
    cargoSpace: number;
  };
  safety: {
    ncapRating: number;
    airbags: number;
    features: string[];
  };
  images: {
    main: string;
    gallery: string[];
  };
  features: string[];
  isAvailable: boolean;
  releaseYear: number;
}

export interface Review {
  id: string;
  evId: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verifiedOwner: boolean;
  vehicleOwned: string;
  helpfulCount: number;
}

export interface CompareItem {
  ev: EV;
  isFavorite: boolean;
}

export type RangeMode = 'wltp' | 'epa' | 'realWorld';

export interface FilterState {
  brands: string[];
  bodyTypes: string[];
  minPrice: number;
  maxPrice: number;
  minRange: number;
  maxRange: number;
  minBattery: number;
  maxBattery: number;
  minCharging: number;
  minEfficiency: number;
}
