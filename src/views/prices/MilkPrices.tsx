import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import pricingService, {
  type DairyRates,
  type RateCard,
  type MilkType,
  MILK_RANGES,
  calculatePrice,
} from '../../services/PricingService'

const FALLBACK_BASE = 38
const FALLBACK_FAT_R = 0.05
const FALLBACK_SNF_R = 0.07

function splitPrice(p: number) {
  const s = p.toFixed(2)
  const [w, frac] = s.split('.')
  return { w, frac: `.${frac}` }
}

function milkGrade(fat: number, snf: number): string {
  if (snf >= 8.5 && fat >= 4.5) return 'A+'
  if (snf >= 8.3 && fat >= 4.0) return 'A'
  if (snf >= 8.0 && fat >= 3.5) return 'B'
  return 'C'
}

function useRefRates(dairyRates: DairyRates[]) {
  return useMemo(() => {
    const card = dairyRates[0]?.rateCards[0]
    const base = card?.basePrice ?? FALLBACK_BASE
    const fatR = card?.fatRate ?? FALLBACK_FAT_R
    const snfR = card?.snfRate ?? FALLBACK_SNF_R
    return { card, base, fatR, snfR }
  }, [dairyRates])
}

export default function MilkPrices() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [dairyRates, setDairyRates] = useState<DairyRates[]>([])
  const [selectedMilkType, setSelectedMilkType] = useState<MilkType | 'all'>('all')
  const [selectedCard, setSelectedCard] = useState<RateCard | null>(null)
  const [selectedDairy, setSelectedDairy] = useState<DairyRates | null>(null)
  const [showModal, setShowModal] = useState(false)

  const [vol, setVol] = useState(14.6)
  const [snf, setSnf] = useState(8.7)
  const [fat, setFat] = useState(4.5)

  const { card: refCard, base, fatR, snfR } = useRefRates(dairyRates)

  useEffect(() => {
    fetchRates()
  }, [selectedMilkType])

  const fetchRates = async () => {
    try {
      setLoading(true)
      const milkType = selectedMilkType === 'all' ? undefined : selectedMilkType
      const rates = await pricingService.getAllDairyRates(milkType)
      setDairyRates(rates)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch milk prices'
      toast.error(msg)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const viewPriceChart = (card: RateCard, dairy: DairyRates) => {
    setSelectedCard(card)
    setSelectedDairy(dairy)
    setShowModal(true)
  }

  const totalDairies = dairyRates.length
  const totalRateCards = dairyRates.reduce((acc, d) => acc + d.rateCards.length, 0)

  const perL = calculatePrice(base, fatR, snfR, fat, snf)
  const bonus = Math.max(0, perL - base)
  const grade = milkGrade(fat, snf)
  const totalPayout = perL * vol

  const tierPoints = [
    { key: 'aplus', fat: 4.5, snf: 8.5, cls: 'from-dk-green-500 to-dk-green-800' },
    { key: 'a', fat: 4.0, snf: 8.3, cls: 'from-dk-green-400 to-dk-green-500' },
    { key: 'b', fat: 3.5, snf: 8.0, cls: 'from-dk-gold to-[#a17a26]' },
    { key: 'c', fat: 3.2, snf: 7.8, cls: 'from-dk-sky to-[#345d80]' },
  ] as const

  const tierPrices = tierPoints.map((tp) => ({
    ...tp,
    price: calculatePrice(base, fatR, snfR, tp.fat, tp.snf),
  }))

  return (
    <div className="min-h-screen bg-dk-cream text-dk-ink">
      {/* Pricing hero — mock .pricing-hero + .pp-hero */}
      <section
        className="relative overflow-hidden pb-14 pt-16 sm:pb-16 sm:pt-20 md:pb-[60px] md:pt-[80px]"
        style={{
          background: `
            radial-gradient(900px 500px at 80% 0%, var(--green-200), transparent 60%),
            radial-gradient(700px 400px at 0% 80%, #fef0d4, transparent 60%),
            var(--cream)`,
        }}
      >
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-[60px]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dk-line bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-dk-green-800 shadow-dk-sm">
                <span className="h-[7px] w-[7px] rounded-full bg-dk-green-500 shadow-[0_0_0_4px_var(--green-200)]" />
                {t('pricingPage.heroEyebrow')}
              </div>
              <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-dk-green-900">
                {t('pricingPage.heroTitle')}{' '}
                <em className="font-medium not-italic text-dk-green-700">
                  {t('pricingPage.heroTitleEm')}
                </em>
              </h1>
              <p className="mb-7 mt-5 max-w-[520px] text-lg text-dk-ink-2">
                {t('pricingPage.heroLead')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#published-cards"
                  className="inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-[18px] py-[11px] text-[14px] font-semibold text-white shadow-dk-sm transition-all hover:-translate-y-px hover:bg-dk-green-900 hover:shadow-dk-md"
                >
                  {t('pricingPage.ctaLive')}
                </a>
                <a
                  href="#how-pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-dk-line bg-white px-[18px] py-[11px] text-[14px] font-semibold text-dk-ink transition-all hover:border-dk-green-700 hover:text-dk-green-800"
                >
                  {t('pricingPage.ctaHow')}
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-dk-green-900 to-dk-green-700 p-8 text-white shadow-[0_30px_80px_rgba(15,58,46,0.25)] sm:p-10">
              <div
                className="pointer-events-none absolute -right-24 -top-20 h-[300px] w-[300px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(67,196,126,0.2), transparent 70%)',
                }}
              />
              <div className="relative mb-7 flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.08em] text-white/80">
                    {t('pricingPage.liveLabel')}
                  </div>
                  <h3 className="mt-1 font-serif text-2xl">{t('pricingPage.liveTitle')}</h3>
                  {refCard?.name && (
                    <p className="mt-1 text-xs text-white/70">{refCard.name}</p>
                  )}
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-dk-green-400">
                  <span className="h-2 w-2 rounded-full bg-dk-green-500 shadow-[0_0_0_4px_rgba(67,196,126,0.25)]" />
                  {t('pricingPage.liveBadge')}
                </span>
              </div>
              <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
                {tierPrices.map((tier, i) => {
                  const { w, frac } = splitPrice(tier.price)
                  const specKeys = [
                    'tierSpecAplus',
                    'tierSpecA',
                    'tierSpecB',
                    'tierSpecC',
                  ] as const
                  const labelKeys = ['tierAplus', 'tierA', 'tierB', 'tierC'] as const
                  const up = i < 2
                  return (
                    <div
                      key={tier.key}
                      className="rounded-[18px] border border-white/10 bg-white/[0.08] p-5 backdrop-blur-[10px]"
                    >
                      <div
                        className={`mb-3.5 grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-to-br text-base font-bold text-white ${tier.cls}`}
                      >
                        {t(`pricingPage.${labelKeys[i]}`)}
                      </div>
                      <div className="font-serif text-[32px] font-semibold leading-none">
                        ₹{w}
                        <small className="text-sm font-normal opacity-60">{frac}</small>
                      </div>
                      <div
                        className={`mt-1.5 flex items-center gap-1 text-[11px] font-medium ${
                          up ? 'text-dk-green-400' : 'text-dk-coral'
                        }`}
                      >
                        {up ? (
                          <HiArrowTrendingUp className="h-3 w-3" aria-hidden />
                        ) : (
                          <HiArrowTrendingDown className="h-3 w-3" aria-hidden />
                        )}
                        {up ? '+0.90' : '-0.30'}
                      </div>
                      <div className="mt-2.5 border-t border-white/10 pt-2.5 text-[11px] opacity-70">
                        {t(`pricingPage.${specKeys[i]}`)}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="relative mt-6 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-5 text-xs text-white/85">
                <span>{t('pricingPage.liveFooterLeft')}</span>
                <span className="text-dk-green-400">{t('pricingPage.liveFooterRight')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator + factors */}
      <section id="how-pricing" className="py-14 md:py-[60px]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-8">
          <div className="mx-auto mb-12 max-w-[720px] text-center md:mb-[60px]">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-dk-muted">
              {t('pricingPage.calcSectionEyebrow')}
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-dk-green-900">
              {t('pricingPage.calcSectionTitle')}{' '}
              <em className="font-medium not-italic text-dk-green-700">
                {t('pricingPage.calcSectionTitleEm')}
              </em>{' '}
              {t('pricingPage.calcSectionTitleEnd')}
            </h2>
            <p className="mt-4 text-[17px] text-dk-ink-2">{t('pricingPage.calcSectionLead')}</p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[30px]">
            <div className="rounded-3xl border border-dk-line bg-white p-8 shadow-dk-md md:p-9">
              <h3 className="font-serif text-2xl text-dk-green-900">{t('pricingPage.calcTitle')}</h3>
              <p className="mb-6 mt-2 text-sm text-dk-muted">{t('pricingPage.calcDesc')}</p>
              <div className="mb-6 flex flex-col gap-[18px]">
                <label className="flex flex-col gap-2">
                  <span className="flex justify-between text-[13px] font-semibold text-dk-ink-2">
                    {t('pricingPage.volume')}
                    <span className="font-serif text-lg font-bold text-dk-green-700">
                      {vol.toFixed(1)} L
                    </span>
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={0.1}
                    value={vol}
                    onChange={(e) => setVol(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded bg-dk-green-100 accent-dk-green-700"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="flex justify-between text-[13px] font-semibold text-dk-ink-2">
                    {t('pricingPage.snf')}
                    <span className="font-serif text-lg font-bold text-dk-green-700">
                      {snf.toFixed(1)}
                    </span>
                  </span>
                  <input
                    type="range"
                    min={7.5}
                    max={9.5}
                    step={0.1}
                    value={snf}
                    onChange={(e) => setSnf(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded bg-dk-green-100 accent-dk-green-700"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="flex justify-between text-[13px] font-semibold text-dk-ink-2">
                    {t('pricingPage.fat')}
                    <span className="font-serif text-lg font-bold text-dk-green-700">
                      {fat.toFixed(1)}%
                    </span>
                  </span>
                  <input
                    type="range"
                    min={3}
                    max={6}
                    step={0.1}
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded bg-dk-green-100 accent-dk-green-700"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 items-center gap-5 rounded-[18px] bg-gradient-to-br from-dk-green-100 to-dk-green-200 p-6 sm:grid-cols-[1fr_auto] sm:gap-5">
                <div className="flex flex-col gap-2 text-[13px] text-dk-ink-2">
                  <div className="flex justify-between">
                    <span>{t('pricingPage.baseRate')}</span>
                    <span>
                      ₹ {base.toFixed(2)} / L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('pricingPage.qualityBonus')}</span>
                    <span className="font-medium text-dk-green-700">
                      + ₹ {bonus.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('pricingPage.grade')}</span>
                    <span className="font-bold text-dk-green-800">{grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('pricingPage.perLitre')}</span>
                    <span>₹ {perL.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-[clamp(2rem,5vw,2.625rem)] font-semibold leading-none text-dk-green-800">
                    ₹ {Math.round(totalPayout)}
                  </div>
                  <small className="mt-1 block text-[13px] font-normal text-dk-muted">
                    {t('pricingPage.payoutToday')}
                  </small>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <h3 className="font-serif text-2xl text-dk-green-900">{t('pricingPage.factorsTitle')}</h3>
              <p className="mb-1 text-sm text-dk-muted">{t('pricingPage.factorsLead')}</p>
              {(
                [
                  ['factorFat', 35],
                  ['factorSnf', 28],
                  ['factorRegional', 15],
                  ['factorSeason', 10],
                  ['factorVendor', 7],
                  ['factorLoyalty', 5],
                ] as const
              ).map(([key, pct]) => (
                <div
                  key={key}
                  className="rounded-[14px] border border-dk-line bg-white px-[18px] py-3.5"
                >
                  <div className="mb-1.5 flex justify-between text-[11px] font-semibold uppercase tracking-[0.06em] text-dk-muted">
                    <span className="normal-case tracking-normal text-[13px] text-dk-green-900">
                      {t(`pricingPage.${key}`)}
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded bg-dk-green-100">
                    <div
                      className="h-full rounded bg-gradient-to-r from-dk-green-600 to-dk-green-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chart strip — mock green-100 section */}
      <section className="bg-dk-green-100 py-14 md:py-[60px]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-8">
          <div className="rounded-3xl border border-dk-line bg-white p-6 shadow-dk-sm md:p-8">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h3 className="font-serif text-[22px] text-dk-green-900">{t('pricingPage.chartTitle')}</h3>
                <div className="mt-1 text-[13px] text-dk-muted">{t('pricingPage.chartSubtitle')}</div>
              </div>
              <div className="flex gap-1.5 rounded-[10px] bg-dk-cream-2 p-1">
                {[t('pricingPage.chartTab7'), t('pricingPage.chartTab30'), t('pricingPage.chartTab90'), t('pricingPage.chartTab1Y')].map(
                  (lab, i) => (
                    <button
                      key={lab}
                      type="button"
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                        i === 1
                          ? 'bg-white text-dk-green-800 shadow-dk-sm'
                          : 'text-dk-muted'
                      }`}
                    >
                      {lab}
                    </button>
                  ),
                )}
              </div>
            </div>
            <svg className="h-[200px] w-full sm:h-[280px]" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--green-500)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--green-500)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="60" x2="800" y2="60" stroke="var(--line)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="800" y2="120" stroke="var(--line)" strokeDasharray="4 4" />
              <line x1="0" y1="180" x2="800" y2="180" stroke="var(--line)" strokeDasharray="4 4" />
              <line x1="0" y1="240" x2="800" y2="240" stroke="var(--line)" strokeDasharray="4 4" />
              <path
                d="M 0 200 L 30 195 L 60 190 L 90 185 L 120 175 L 150 180 L 180 170 L 210 160 L 240 165 L 270 150 L 300 145 L 330 140 L 360 130 L 390 125 L 420 135 L 450 120 L 480 110 L 510 115 L 540 100 L 570 95 L 600 105 L 630 90 L 660 85 L 690 75 L 720 80 L 750 70 L 780 65 L 800 60 L 800 280 L 0 280 Z"
                fill="url(#priceGrad)"
              />
              <path
                d="M 0 200 L 30 195 L 60 190 L 90 185 L 120 175 L 150 180 L 180 170 L 210 160 L 240 165 L 270 150 L 300 145 L 330 140 L 360 130 L 390 125 L 420 135 L 450 120 L 480 110 L 510 115 L 540 100 L 570 95 L 600 105 L 630 90 L 660 85 L 690 75 L 720 80 L 750 70 L 780 65 L 800 60"
                fill="none"
                stroke="var(--green-700)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="780" cy="65" r="6" fill="#fff" stroke="var(--green-700)" strokeWidth="3" />
              <circle cx="780" cy="65" r="12" fill="var(--green-700)" opacity="0.2" />
              <text x="6" y="65" fontSize="11" fill="var(--muted)" fontFamily="var(--font-sans)">
                ₹48
              </text>
              <text x="6" y="125" fontSize="11" fill="var(--muted)" fontFamily="var(--font-sans)">
                ₹44
              </text>
              <text x="6" y="185" fontSize="11" fill="var(--muted)" fontFamily="var(--font-sans)">
                ₹40
              </text>
              <text x="6" y="245" fontSize="11" fill="var(--muted)" fontFamily="var(--font-sans)">
                ₹36
              </text>
              <g transform="translate(720, 25)">
                <rect width="80" height="32" rx="6" fill="var(--green-900)" />
                <text x="10" y="14" fontSize="10" fill="#fff" opacity="0.7" fontFamily="var(--font-sans)">
                  Today
                </text>
                <text x="10" y="27" fontSize="13" fill="#fff" fontWeight="600" fontFamily="var(--font-serif)">
                  ₹{(() => {
                    const sp = splitPrice(perL)
                    return `${sp.w}${sp.frac}`
                  })()}
                </text>
              </g>
            </svg>
            <div className="mt-4 flex justify-between text-[11px] text-dk-muted">
              <span>—</span>
              <span>Today</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-dk-line pt-6 sm:grid-cols-4">
              {(
                [
                  ['chartHigh', '₹47.10'],
                  ['chartLow', '₹38.40'],
                  ['chartAvg', '₹42.80'],
                  ['chartPredicted', '₹48.00 ↗'],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-dk-muted">
                    {t(`pricingPage.${k}`)}
                  </div>
                  <div className="mt-1 font-serif text-[22px] font-semibold text-dk-green-800">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Published cards */}
      <section id="published-cards" className="py-14 md:py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-8">
          <div className="mx-auto mb-10 max-w-[720px] text-center">
            <h2 className="font-serif text-3xl font-bold text-dk-green-900 md:text-4xl">
              {t('pricingPage.publishedTitle')}
            </h2>
            <p className="mt-3 text-dk-muted">{t('pricingPage.publishedLead')}</p>
          </div>

          <div className="mb-8 rounded-[18px] border border-dk-line bg-white p-4 shadow-dk-sm sm:p-5 md:px-6 md:py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-dk-muted">{t('pricingPage.filterBy')}</span>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'Cow', 'Buffalo', 'Mixed'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedMilkType(type)}
                      className={`rounded-[10px] px-4 py-2 text-sm font-semibold transition-colors ${
                        selectedMilkType === type
                          ? 'bg-dk-green-800 text-white shadow-dk-sm'
                          : 'bg-dk-cream text-dk-ink-2 hover:bg-dk-green-100'
                      }`}
                    >
                      {type === 'all' ? t('milkPrices.allTypes') : `${type} Milk`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-dk-muted">
                <span>
                  {totalDairies} {t('milkPrices.dairies')}
                </span>
                <span aria-hidden>•</span>
                <span>
                  {totalRateCards} {t('milkPrices.rateCards')}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-dk-line bg-dk-cream-2 px-5 py-4 text-center sm:text-left">
            <p className="text-sm font-medium text-dk-green-800">{t('milkPrices.formula')}</p>
            <p className="font-mono-dk mt-1 text-sm text-dk-ink">
              Price = Base + (FAT × FAT_Rate × 10) + (SNF × SNF_Rate × 10)
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-dk-green-500 border-t-transparent" />
              <p className="text-dk-muted">{t('pricingPage.loading')}</p>
            </div>
          ) : dairyRates.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-dk-green-100">
                <svg className="h-10 w-10 text-dk-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-dk-green-900">{t('milkPrices.noRates')}</h3>
              <p className="mt-1 text-dk-muted">{t('milkPrices.noRatesDesc')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dairyRates.map((dairy) => (
                <DairyCard key={dairy.dairyId} dairy={dairy} onViewChart={viewPriceChart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {showModal && selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-dk-line bg-white shadow-dk-lg">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-dk-line bg-white px-6 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-serif text-xl font-bold text-dk-green-900">{selectedCard.name}</h2>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      selectedCard.milkType === 'Cow'
                        ? 'bg-[#e0eef9] text-[#345d80]'
                        : selectedCard.milkType === 'Buffalo'
                          ? 'bg-[#e7e0ff] text-[#5a3da6]'
                          : 'bg-[#fef0d4] text-[#a8761c]'
                    }`}
                  >
                    {selectedCard.milkType === 'Cow' && '🐄'}
                    {selectedCard.milkType === 'Buffalo' && '🐃'}
                    {selectedCard.milkType === 'Mixed' && '🥛'}
                    {selectedCard.milkType}
                  </span>
                </div>
                <p className="mt-1 text-sm text-dk-muted">
                  {selectedDairy?.dairyName || `Dairy ID: ${selectedCard.dairyId.slice(-6).toUpperCase()}`}
                  {' • '}
                  Effective from{' '}
                  {new Date(selectedCard.effectiveFrom).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-dk-muted transition hover:bg-dk-green-100"
                aria-label={t('common.close')}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-dk-line bg-dk-cream p-4 text-center">
                  <p className="text-sm text-dk-muted">Base Price</p>
                  <p className="font-serif text-2xl font-semibold text-dk-green-800">₹{selectedCard.basePrice}</p>
                </div>
                <div className="rounded-xl border border-dk-line bg-dk-cream p-4 text-center">
                  <p className="text-sm text-dk-muted">FAT Rate</p>
                  <p className="font-serif text-2xl font-semibold text-dk-green-800">₹{selectedCard.fatRate}</p>
                </div>
                <div className="rounded-xl border border-dk-line bg-dk-cream p-4 text-center">
                  <p className="text-sm text-dk-muted">SNF Rate</p>
                  <p className="font-serif text-2xl font-semibold text-dk-green-800">₹{selectedCard.snfRate}</p>
                </div>
              </div>

              <div className="mb-6 rounded-xl border border-dk-line bg-dk-green-100/50 p-4">
                <p className="text-sm text-dk-muted">Formula:</p>
                <p className="font-mono-dk text-sm text-dk-ink">
                  Price = {selectedCard.basePrice} + (FAT × {selectedCard.fatRate} × 10) + (SNF ×{' '}
                  {selectedCard.snfRate} × 10)
                </p>
              </div>

              <h3 className="mb-3 font-medium text-dk-green-900">
                {t('milkPrices.priceChart')} (₹/Liter)
              </h3>
              <div className="overflow-x-auto rounded-lg border border-dk-line">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-dk-cream-2">
                      <th className="px-3 py-2 text-left text-dk-muted">FAT↓ / SNF→</th>
                      {(() => {
                        const ranges = MILK_RANGES[selectedCard.milkType] || MILK_RANGES.Cow
                        const snfVals: number[] = []
                        for (let s = ranges.snfRange[0]; s <= ranges.snfRange[1]; s += 0.5) {
                          snfVals.push(s)
                        }
                        return snfVals.map((snfV) => (
                          <th key={snfV} className="px-3 py-2 text-center text-dk-muted">
                            {snfV.toFixed(1)}
                          </th>
                        ))
                      })()}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const ranges = MILK_RANGES[selectedCard.milkType] || MILK_RANGES.Cow
                      const fatVals: number[] = []
                      const snfVals: number[] = []
                      for (let f = ranges.fatRange[0]; f <= ranges.fatRange[1]; f += 0.5) {
                        fatVals.push(f)
                      }
                      for (let s = ranges.snfRange[0]; s <= ranges.snfRange[1]; s += 0.5) {
                        snfVals.push(s)
                      }
                      return fatVals.map((fatV) => (
                        <tr key={fatV} className="border-t border-dk-line">
                          <td className="bg-dk-cream px-3 py-2 font-medium text-dk-ink-2">
                            {fatV.toFixed(1)}
                          </td>
                          {snfVals.map((snfV) => {
                            const price = calculatePrice(
                              selectedCard.basePrice || 0,
                              selectedCard.fatRate || 0,
                              selectedCard.snfRate || 0,
                              fatV,
                              snfV,
                            )
                            return (
                              <td key={snfV} className="px-3 py-2 text-center text-dk-ink">
                                ₹{price.toFixed(0)}
                              </td>
                            )
                          })}
                        </tr>
                      ))
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DairyCard({
  dairy,
  onViewChart,
}: {
  dairy: DairyRates
  onViewChart: (card: RateCard, dairy: DairyRates) => void
}) {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : undefined}
      transition={{ ease: 'easeOut', duration: 0.6 }}
      className="overflow-hidden rounded-[22px] border border-dk-line bg-white shadow-dk-sm transition-shadow hover:border-dk-green-300 hover:shadow-dk-md"
    >
      <div className="bg-gradient-to-br from-dk-green-900 to-dk-green-700 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-serif text-lg font-bold text-white">
              {dairy.dairyName || 'Unknown Dairy'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span className="truncate">ID: {dairy.dairyId.slice(-6).toUpperCase()}</span>
              {dairy.village && (
                <>
                  <span>•</span>
                  <span className="truncate">{dairy.village}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {dairy.rateCards.map((card) => (
          <div key={card.id} className="rounded-xl border border-dk-line bg-dk-cream p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h4 className="font-medium text-dk-green-900">{card.name}</h4>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                    card.milkType === 'Cow'
                      ? 'bg-[#e0eef9] text-[#345d80]'
                      : card.milkType === 'Buffalo'
                        ? 'bg-[#e7e0ff] text-[#5a3da6]'
                        : 'bg-[#fef0d4] text-[#a8761c]'
                  }`}
                >
                  {card.milkType === 'Cow' && '🐄 '}
                  {card.milkType === 'Buffalo' && '🐃 '}
                  {card.milkType === 'Mixed' && '🥛 '}
                  {card.milkType}
                </span>
              </div>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-dk-line bg-white p-2">
                <p className="text-xs text-dk-muted">Base</p>
                <p className="font-semibold text-dk-ink">₹{card.basePrice}</p>
              </div>
              <div className="rounded-lg border border-dk-line bg-white p-2">
                <p className="text-xs text-dk-muted">FAT</p>
                <p className="font-semibold text-dk-ink">₹{card.fatRate}</p>
              </div>
              <div className="rounded-lg border border-dk-line bg-white p-2">
                <p className="text-xs text-dk-muted">SNF</p>
                <p className="font-semibold text-dk-ink">₹{card.snfRate}</p>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between rounded-lg border border-dk-green-200 bg-dk-green-100 px-3 py-2">
              <span className="text-xs text-dk-green-800">{t('pricingPage.exampleFatSnf')}</span>
              <span className="font-serif font-bold text-dk-green-800">
                ₹
                {calculatePrice(card.basePrice || 0, card.fatRate || 0, card.snfRate || 0, 4.0, 8.5).toFixed(0)}
                /L
              </span>
            </div>

            <button
              type="button"
              onClick={() => onViewChart(card, dairy)}
              className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-dk-green-800 px-4 py-2.5 text-sm font-semibold text-white shadow-dk-sm transition hover:bg-dk-green-900"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t('milkPrices.viewChart')}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
