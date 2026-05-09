import { FaChartLine, FaExclamationTriangle, FaCamera } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function HomeAiSection() {
  const { t } = useTranslation();
  const ai = t('homePage.ai', { returnObjects: true }) as Record<string, string>;

  const feats = [
    { icon: FaCamera, title: ai.f1Title, desc: ai.f1Desc },
    { icon: FaChartLine, title: ai.f2Title, desc: ai.f2Desc },
    { icon: FaExclamationTriangle, title: ai.f3Title, desc: ai.f3Desc },
  ];

  return (
    <section
      id="home-ai"
      className="relative w-full overflow-hidden bg-dk-ink py-16 text-white sm:py-20 md:py-24"
      aria-labelledby="ai-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        aria-hidden
        style={{
          background:
            'radial-gradient(600px 400px at 80% 20%, rgba(67,196,126,0.18), transparent 60%), radial-gradient(500px 300px at 10% 80%, rgba(255,122,89,0.12), transparent 60%)',
        }}
      />
      <div className="home-section-inner relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-dk-green-400 sm:text-[13px]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-dk-green-500 shadow-[0_0_0_4px_rgba(67,196,126,0.25)]" aria-hidden />
            {ai.eyebrow}
          </div>
          <h2 id="ai-heading" className="font-serif mt-5 text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.75rem]">
            {ai.titleBefore}
            <em className="not-italic font-medium text-dk-green-400">{ai.titleEm1}</em>
            {ai.titleMid}
            <em className="not-italic font-medium text-dk-green-400">{ai.titleEm2}</em>
            {ai.titleAfter}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/78 sm:text-[17px]">{ai.lead}</p>

          <ul className="mt-8 grid gap-3.5">
            {feats.map((row) => (
              <li
                key={row.title}
                className="flex gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-3.5 py-3.5 sm:px-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-dk-green-700 text-white">
                  <row.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <strong className="block text-[15px]">{row.title}</strong>
                  <span className="mt-0.5 block text-[13.5px] text-white/70">{row.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a3329] to-[#0f1f17] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-lg text-white">{ai.cardTitle}</h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-dk-green-400">
              <span className="ai-live-dot h-2 w-2 shrink-0 rounded-full bg-dk-green-500 shadow-[0_0_0_4px_rgba(67,196,126,0.25)]" aria-hidden />
              {ai.liveLabel}
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center rounded-2xl bg-white/[0.04] px-4 py-5">
            <div
              className="relative grid h-40 w-40 place-items-center rounded-full"
              style={{
                background: 'conic-gradient(var(--green-500) 0% 87%, rgba(255,255,255,0.08) 87% 100%)',
              }}
            >
              <div className="absolute inset-3.5 rounded-full bg-[#0f1f17]" />
              <div className="relative text-center font-serif text-[38px] font-semibold leading-none text-white">
                {ai.gaugeVal}
                <small className="mt-1 block text-center text-sm font-normal text-white/50">{ai.gaugeSub}</small>
              </div>
            </div>
            <p className="mt-3 text-center text-[13px] text-white/60">
              {ai.gaugeCaption.includes('A+') ? (
                <>
                  {ai.gaugeCaption.split('A+')[0]}
                  <strong className="text-dk-green-400">A+</strong>
                  {ai.gaugeCaption.split('A+')[1]}
                </>
              ) : (
                ai.gaugeCaption
              )}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <div className="rounded-xl bg-white/[0.04] px-3 py-3.5 text-center">
              <div className="font-serif text-[22px] font-semibold text-dk-green-400">8.7</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/55">{ai.metricSnf}</div>
            </div>
            <div className="rounded-xl bg-white/[0.04] px-3 py-3.5 text-center">
              <div className="font-serif text-[22px] font-semibold text-dk-green-400">4.5%</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/55">{ai.metricFat}</div>
            </div>
            <div className="rounded-xl bg-white/[0.04] px-3 py-3.5 text-center">
              <div className="font-serif text-[22px] font-semibold text-dk-green-400">14.6 L</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/55">{ai.metricVol}</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-dk-green-500/25 bg-dk-green-500/10 px-3.5 py-3.5">
            <div className="mb-1.5 flex justify-between text-xs text-white/70">
              <span>{ai.forecastLabel}</span>
              <span className="text-dk-green-400">{ai.forecastHint}</span>
            </div>
            <div className="flex h-[50px] items-end gap-1.5">
              {[
                'h-[50%] bg-white/15',
                'h-[60%] bg-white/20',
                'h-[55%] bg-dk-green-600/60',
                'h-[70%] bg-dk-green-600/70',
                'h-[78%] bg-dk-green-500/80',
                'h-[85%] bg-dk-green-500/90',
                'h-[95%] bg-dk-green-500',
              ].map((cls, i) => (
                <div key={i} className={`flex-1 rounded-t ${cls}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
