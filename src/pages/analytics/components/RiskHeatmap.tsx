import { pakistanHeatmapCities } from '@/mocks/analytics';

function getHeatColor(intensity: number): string {
  if (intensity >= 90) return 'bg-rose-500';
  if (intensity >= 80) return 'bg-rose-400';
  if (intensity >= 70) return 'bg-amber-400';
  if (intensity >= 60) return 'bg-amber-300';
  if (intensity >= 50) return 'bg-emerald-400';
  return 'bg-emerald-300';
}

function getHeatBg(intensity: number): string {
  if (intensity >= 90) return 'bg-rose-50 border-rose-200/60';
  if (intensity >= 80) return 'bg-rose-50/50 border-rose-100/50';
  if (intensity >= 70) return 'bg-amber-50 border-amber-200/60';
  if (intensity >= 60) return 'bg-amber-50/50 border-amber-100/50';
  if (intensity >= 50) return 'bg-emerald-50 border-emerald-200/60';
  return 'bg-emerald-50/50 border-emerald-100/50';
}

function getProvinceLabel(province: string): string {
  const map: Record<string, string> = {
    Punjab: 'Punjab',
    Sindh: 'Sindh',
    ICT: 'Islamabad CT',
    KPK: 'Khyber PK',
    Balochistan: 'Balochistan',
  };
  return map[province] || province;
}

export default function RiskHeatmap() {
  const provinces = [...new Set(pakistanHeatmapCities.map((c) => c.province))];

  return (
    <div className="p-5 md:p-6 rounded-xl bg-white border border-background-200/70 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-heading font-bold text-foreground-900">Risk Heatmap of Pakistan</h3>
          <p className="text-xs text-foreground-500 mt-0.5">Geographic distribution of tax risk by city</p>
        </div>
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-rose-50">
          <i className="ri-earth-line text-rose-500 text-sm"></i>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <span className="text-xs font-semibold text-foreground-500">Risk Intensity:</span>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-emerald-300"></div>
          <span className="text-xs text-foreground-400">Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-amber-400"></div>
          <span className="text-xs text-foreground-400">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-rose-500"></div>
          <span className="text-xs text-foreground-400">Critical</span>
        </div>
      </div>

      <div className="space-y-5">
        {provinces.map((province) => {
          const provinceCities = pakistanHeatmapCities.filter((c) => c.province === province);
          return (
            <div key={province}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full bg-foreground-300"></div>
                <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider">
                  {getProvinceLabel(province)}
                </span>
                <span className="text-xs text-foreground-400">
                  {provinceCities.length} cities
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {provinceCities.map((city) => (
                  <div
                    key={city.city}
                    className={`rounded-xl border p-3.5 ${getHeatBg(city.intensity)} transition-all duration-300 hover:scale-[1.03] cursor-pointer`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getHeatColor(city.intensity)}`}></div>
                      <span className="text-sm font-semibold text-foreground-800 truncate">{city.city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-heading font-bold text-foreground-900">{city.riskScore}</p>
                        <p className="text-xs text-foreground-400">Risk Score</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground-700">{city.activeCases.toLocaleString()}</p>
                        <p className="text-xs text-foreground-400">Cases</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}