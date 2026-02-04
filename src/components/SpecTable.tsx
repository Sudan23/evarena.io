import { Check, TrendingUp, TrendingDown } from 'lucide-react';
import type { EV } from '@/types/ev';

interface SpecTableProps {
  evs: EV[];
  highlightBest?: boolean;
}

interface SpecRow {
  label: string;
  key: string;
  format: (ev: EV) => string;
  lowerIsBetter?: boolean;
  unit?: string;
}

const specRows: SpecRow[] = [
  {
    label: 'Price',
    key: 'price',
    format: (ev) => `$${ev.price.base.toLocaleString()}`,
    lowerIsBetter: true,
  },
  {
    label: 'Range (WLTP)',
    key: 'range.wltp',
    format: (ev) => `${ev.range.wltp} km`,
    unit: 'km',
  },
  {
    label: 'Range (EPA)',
    key: 'range.epa',
    format: (ev) => `${ev.range.epa} km`,
    unit: 'km',
  },
  {
    label: 'Battery',
    key: 'battery.usable',
    format: (ev) => `${ev.battery.usable} kWh`,
    unit: 'kWh',
  },
  {
    label: 'Max Charging',
    key: 'charging.maxSpeed',
    format: (ev) => `${ev.charging.maxSpeed} kW`,
    unit: 'kW',
  },
  {
    label: '10-80% Charge',
    key: 'charging.time10to80',
    format: (ev) => `${ev.charging.time10to80} min`,
    lowerIsBetter: true,
    unit: 'min',
  },
  {
    label: 'Acceleration',
    key: 'performance.acceleration',
    format: (ev) => `${ev.performance.acceleration}s`,
    lowerIsBetter: true,
    unit: 's',
  },
  {
    label: 'Top Speed',
    key: 'performance.topSpeed',
    format: (ev) => `${ev.performance.topSpeed} km/h`,
    unit: 'km/h',
  },
  {
    label: 'Power',
    key: 'performance.power',
    format: (ev) => `${ev.performance.power} kW`,
    unit: 'kW',
  },
  {
    label: 'Efficiency',
    key: 'efficiency.whPerKm',
    format: (ev) => `${ev.efficiency.whPerKm} Wh/km`,
    lowerIsBetter: true,
    unit: 'Wh/km',
  },
  {
    label: 'Weight',
    key: 'dimensions.weight',
    format: (ev) => `${ev.dimensions.weight} kg`,
    lowerIsBetter: true,
    unit: 'kg',
  },
  {
    label: 'Cargo Space',
    key: 'dimensions.cargoSpace',
    format: (ev) => `${ev.dimensions.cargoSpace} L`,
    unit: 'L',
  },
  {
    label: 'NCAP Rating',
    key: 'safety.ncapRating',
    format: (ev) => `${ev.safety.ncapRating}★`,
  },
];

function getValueByKey(ev: EV, key: string): number {
  const keys = key.split('.');
  let value: any = ev;
  for (const k of keys) {
    value = value?.[k];
  }
  return typeof value === 'number' ? value : 0;
}

function findBestValue(evs: EV[], key: string, lowerIsBetter?: boolean): number | null {
  if (evs.length === 0) return null;
  
  const values = evs.map(ev => getValueByKey(ev, key));
  if (lowerIsBetter) {
    return Math.min(...values);
  }
  return Math.max(...values);
}

export function SpecTable({ evs, highlightBest = true }: SpecTableProps) {
  if (evs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No vehicles selected for comparison
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 text-sm font-mono uppercase tracking-wider text-muted-foreground sticky left-0 bg-background z-10">
              Specification
            </th>
            {evs.map((ev) => (
              <th
                key={ev.id}
                className="text-left py-4 px-4 min-w-[160px]"
              >
                <div className="font-semibold">{ev.model}</div>
                <div className="text-sm text-muted-foreground">{ev.brand}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specRows.map((row, index) => {
            const bestValue = highlightBest ? findBestValue(evs, row.key, row.lowerIsBetter) : null;
            
            return (
              <tr
                key={row.key}
                className={index % 2 === 0 ? 'bg-secondary/30' : ''}
              >
                <td className="py-4 px-4 text-sm font-medium sticky left-0 bg-inherit z-10">
                  {row.label}
                </td>
                {evs.map((ev) => {
                  const value = getValueByKey(ev, row.key);
                  const isBest = highlightBest && bestValue !== null && value === bestValue;
                  
                  return (
                    <td
                      key={ev.id}
                      className={`py-4 px-4 font-mono ${
                        isBest ? 'text-primary font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {row.format(ev)}
                        {isBest && (
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/20 rounded-full">
                            {row.lowerIsBetter ? (
                              <TrendingDown className="w-3 h-3 text-primary" />
                            ) : (
                              <TrendingUp className="w-3 h-3 text-primary" />
                            )}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
          
          {/* Features Row */}
          <tr className="bg-secondary/30">
            <td className="py-4 px-4 text-sm font-medium sticky left-0 bg-inherit z-10 align-top">
              Key Features
            </td>
            {evs.map((ev) => (
              <td key={ev.id} className="py-4 px-4 align-top">
                <ul className="space-y-1">
                  {ev.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
