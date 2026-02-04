import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { EV, RangeMode } from '@/types/ev';

interface RangeChartProps {
  ev: EV;
}

export function RangeChart({ ev }: RangeChartProps) {
  const [mode, setMode] = useState<RangeMode>('wltp');

  const data = [
    { name: 'WLTP', value: ev.range.wltp, key: 'wltp' as RangeMode },
    { name: 'EPA', value: ev.range.epa, key: 'epa' as RangeMode },
    { name: 'Real World', value: ev.range.realWorld, key: 'realWorld' as RangeMode },
  ];

  // Efficiency data for future use
  // const efficiencyData = [
  //   { name: 'Efficiency', value: ev.efficiency.whPerKm },
  // ];

  return (
    <div className="space-y-8">
      {/* Range Comparison */}
      <div className="bg-card rounded-3xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Range by Test Cycle</h3>
            <p className="text-sm text-muted-foreground">
              Compare different range testing standards
            </p>
          </div>
          <div className="flex gap-2">
            {(['wltp', 'epa', 'realWorld'] as RangeMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                  mode === m
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'realWorld' ? 'Real' : m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                label={{ value: 'km', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  padding: '12px',
                }}
                formatter={(value: number) => [`${value} km`, 'Range']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={80}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.key === mode ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {data.map((item) => (
            <div
              key={item.key}
              className={`text-center p-4 rounded-2xl transition-colors ${
                mode === item.key ? 'bg-primary/10' : 'bg-secondary/30'
              }`}
            >
              <div className={`text-2xl font-mono font-semibold ${
                mode === item.key ? 'text-primary' : ''
              }`}>
                {item.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">
                {item.name} km
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Efficiency */}
      <div className="bg-card rounded-3xl p-6 border border-border/50">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Energy Efficiency</h3>
          <p className="text-sm text-muted-foreground">
            Lower is better - less energy consumed per kilometer
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="h-8 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((ev.efficiency.whPerKm / 300) * 100, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0 Wh/km</span>
              <span>300 Wh/km</span>
            </div>
          </div>
          
          <div className="text-center min-w-[120px]">
            <div className="text-3xl font-mono font-semibold text-primary">
              {ev.efficiency.whPerKm}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">
              Wh/km
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-secondary/30 rounded-2xl p-4 text-center">
            <div className="text-xl font-mono font-semibold">{ev.efficiency.mpge}</div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">
              MPGe
            </div>
          </div>
          <div className="bg-secondary/30 rounded-2xl p-4 text-center">
            <div className="text-xl font-mono font-semibold">
              {(1000 / ev.efficiency.whPerKm).toFixed(1)}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">
              km/kWh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
