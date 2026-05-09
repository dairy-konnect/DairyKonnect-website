import { FaBolt, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * Decorative hero collage (mock/dairykonnect.html .hero-visual) — no stock imagery.
 */
export default function HeroVisual() {
  const { t } = useTranslation();
  const v = (key: string) => t(`hero.visual.${key}`);

  const bars: { pct: number; bg: string }[] = [
    { pct: 30, bg: 'bg-dk-green-200' },
    { pct: 50, bg: 'bg-dk-green-300' },
    { pct: 40, bg: 'bg-dk-green-400' },
    { pct: 70, bg: 'bg-dk-green-500' },
    { pct: 55, bg: 'bg-dk-green-600' },
    { pct: 85, bg: 'bg-dk-green-700' },
    { pct: 100, bg: 'bg-dk-green-800' },
  ];

  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,380px)] lg:max-w-none"
      role="img"
      aria-label={v('ariaLabel')}
    >
      <div className="pointer-events-none relative min-h-[400px] sm:min-h-[460px] lg:min-h-[520px]" aria-hidden>
        {/* Floating badges */}
        <div className="hero-viz-badge-1 absolute left-0 top-6 z-20 flex items-center gap-1.5 rounded-full bg-dk-green-800 px-3.5 py-2 text-xs font-semibold text-white shadow-dk-md sm:top-8">
          <FaCheckCircle className="h-3.5 w-3.5 shrink-0 opacity-95" />
          {v('badgeQuality')}
        </div>
        <div className="hero-viz-badge-2 absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-dk-gold px-3.5 py-2 text-xs font-semibold text-white shadow-dk-md sm:bottom-6 sm:right-10">
          <FaBolt className="h-3.5 w-3.5 shrink-0" />
          {v('badgeAi')}
        </div>

        {/* Phone / yield card */}
        <div className="absolute right-2 top-0 z-10 w-[min(100%,280px)] sm:right-6 sm:w-[300px] lg:right-8">
          <div className="-rotate-2 rounded-[22px] border border-dk-line bg-white shadow-dk-lg sm:-rotate-[4deg]">
            <div className="rounded-[22px] bg-gradient-to-br from-dk-green-900 to-dk-ink-2 p-2.5 sm:p-3">
              <div className="flex min-h-[280px] flex-col gap-2.5 rounded-2xl bg-white p-3.5 sm:min-h-[300px] sm:p-4">
                <div className="flex items-center justify-between text-[11px] font-semibold text-dk-green-800">
                  <span className="font-serif">{v('yieldTitle')}</span>
                  <span className="text-dk-green-600">{v('yieldUp')}</span>
                </div>
                <div className="font-serif text-[1.75rem] font-bold leading-none text-dk-green-900 sm:text-[2rem]">
                  {v('yieldAmount')}{' '}
                  <small className="text-sm font-normal text-dk-muted">{v('yieldUnit')}</small>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-[10px] bg-dk-green-100 p-2 text-center text-[10.5px] font-semibold text-dk-green-800">
                    {v('morning')}
                    <br />
                    <span className="text-[13px] font-bold">{v('morningVol')}</span>
                  </div>
                  <div className="flex-1 rounded-[10px] bg-dk-green-200 p-2 text-center text-[10.5px] font-semibold text-dk-green-800">
                    {v('evening')}
                    <br />
                    <span className="text-[13px] font-bold">{v('eveningVol')}</span>
                  </div>
                </div>
                <div
                  className="flex h-[100px] items-end justify-end rounded-xl bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 p-2 font-semibold text-white sm:h-[120px]"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 40%, #fff 12px, transparent 13px),
                      radial-gradient(circle at 60% 30%, #fff 8px, transparent 9px),
                      radial-gradient(circle at 70% 65%, #fff 18px, transparent 19px),
                      radial-gradient(circle at 25% 75%, #fff 10px, transparent 11px),
                      linear-gradient(135deg, #1f1f1f, #444)
                    `,
                  }}
                >
                  <span className="text-[10px]">{v('animalName')}</span>
                </div>
                <div>
                  <div className="flex justify-between text-[10.5px] text-dk-muted">
                    <span>{v('snf')}</span>
                    <span>8.7</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-dk-green-200">
                    <div className="h-full w-[87%] rounded-full bg-dk-green-600" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10.5px] text-dk-muted">
                    <span>{v('fat')}</span>
                    <span>4.5</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-dk-green-200">
                    <div className="h-full w-[72%] rounded-full bg-dk-gold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings card */}
        <div className="absolute bottom-8 left-0 z-[11] w-[min(100%,260px)] rotate-[2deg] sm:bottom-10 sm:w-[280px] sm:rotate-[3deg]">
          <div className="rounded-[22px] border border-dk-line bg-white p-[18px] shadow-dk-lg">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-dk-green-100 text-dk-green-800">
                <FaChartLine className="h-[18px] w-[18px]" />
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-dk-muted">{v('weekLabel')}</div>
                <div className="font-serif text-sm font-semibold text-dk-green-900">{v('earningsTitle')}</div>
              </div>
            </div>
            <div className="font-serif text-[28px] font-bold leading-none text-dk-green-800 sm:text-[30px]">{v('earningsAmount')}</div>
            <div className="mt-2.5 flex h-[50px] items-end gap-1">
              {bars.map((bar, i) => (
                <div
                  key={i}
                  className={`w-[14%] rounded-t ${bar.bg}`}
                  style={{ height: `${bar.pct}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Vet card */}
        <div className="absolute bottom-16 right-0 z-[12] w-[min(100%,200px)] rotate-[4deg] sm:bottom-20 sm:w-[220px] sm:rotate-[6deg]">
          <div className="rounded-[22px] border border-dk-line bg-gradient-to-br from-white to-dk-green-100 p-5 shadow-dk-lg">
            <div className="mb-3.5 flex items-center gap-2.5">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dk-green-500 to-dk-green-800 font-serif text-sm font-bold text-white">
                {v('drInitials')}
              </div>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-dk-green-900">{v('drName')}</div>
                <div className="text-[11px] text-dk-muted">{v('drRole')}</div>
              </div>
            </div>
            <div className="mb-2.5 rounded-lg border border-dashed border-dk-green-300 bg-white px-2.5 py-2 text-[11px] text-dk-green-800">
              <strong className="mb-0.5 block text-xs text-dk-green-900">{v('visitTitle')}</strong>
              {v('visitTime')}
            </div>
            <span className="block w-full rounded-[10px] bg-dk-green-800 py-2 text-center text-xs font-semibold text-white">
              {v('reschedule')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
