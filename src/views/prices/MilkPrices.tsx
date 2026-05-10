import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Illustrative ₹/L (legacy-style): base + (FAT% × fatRate × 10) + (SNF% × snfRate × 10). */
function demoPricePerLiter(
  basePrice: number,
  fatRate: number,
  snfRate: number,
  fat: number,
  snf: number,
): number {
  return basePrice + fat * fatRate * 10 + snf * snfRate * 10
}

const DEMO_BASE = 38
const DEMO_FAT_R = 0.05
const DEMO_SNF_R = 0.07

export default function MilkPrices() {
  const { t } = useTranslation()
  const [vol, setVol] = useState(14.6)
  const [snf, setSnf] = useState(8.7)
  const [fat, setFat] = useState(4.5)

  const perL = useMemo(
    () => demoPricePerLiter(DEMO_BASE, DEMO_FAT_R, DEMO_SNF_R, fat, snf),
    [fat, snf],
  )
  const total = perL * vol

  return (
    <div className="min-h-screen bg-dk-cream text-dk-ink">
      <section
        className="relative overflow-hidden pb-14 pt-16 sm:pb-16 sm:pt-20 md:pb-[60px] md:pt-[80px]"
        style={{
          background: `
            radial-gradient(900px 500px at 80% 0%, var(--green-200), transparent 60%),
            radial-gradient(700px 400px at 0% 80%, #fef0d4, transparent 60%),
            var(--cream)`,
        }}
      >
        <div className="dk-page-inner">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="text-center lg:text-left">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-dk-line bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-dk-green-800 shadow-dk-sm">
                <span className="h-[7px] w-[7px] rounded-full bg-dk-green-500 shadow-[0_0_0_4px_var(--green-200)]" />
                {t('milkPricesGuide.eyebrow', { defaultValue: 'For farmers & vendors' })}
              </p>
              <h1 className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-dk-green-900">
                {t('milkPricesGuide.title', { defaultValue: 'How milk pricing works' })}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-dk-ink-2 lg:mx-0">
                {t('milkPricesGuide.lead', {
                  defaultValue:
                    'FAT and SNF drive most cooperative payouts. Below we explain the common formulas and show one demo calculation — not live dairy rates.',
                })}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm text-dk-muted lg:mx-0">
                {t('milkPricesGuide.heroDemoLine', {
                  defaultValue: `Demo only: base ₹${DEMO_BASE}, FAT rate ${DEMO_FAT_R}, SNF rate ${DEMO_SNF_R}.`,
                })}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href="#formula"
                  className="inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-[18px] py-[11px] text-[14px] font-semibold text-white shadow-dk-sm transition hover:-translate-y-px hover:bg-dk-green-900 hover:shadow-dk-md"
                >
                  {t('milkPricesGuide.ctaFormula', { defaultValue: 'See formula & code' })}
                </a>
                <a
                  href="#calculator"
                  className="inline-flex items-center gap-2 rounded-xl border border-dk-line bg-white px-[18px] py-[11px] text-[14px] font-semibold text-dk-ink transition hover:border-dk-green-700 hover:text-dk-green-800"
                >
                  {t('milkPricesGuide.ctaCalc', { defaultValue: 'Try calculator' })}
                </a>
              </div>
            </div>

            <div
              id="calculator"
              className="relative scroll-mt-24 overflow-hidden rounded-[28px] bg-gradient-to-br from-dk-green-900 to-dk-green-700 p-7 text-white shadow-[0_30px_80px_rgba(15,58,46,0.22)] sm:p-9"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-16 h-[260px] w-[260px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(67,196,126,0.2), transparent 70%)',
                }}
              />
              <div className="relative mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                    {t('milkPricesGuide.heroRangeEyebrow', { defaultValue: 'Illustrative example' })}
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-bold sm:text-2xl">
                    {t('milkPricesGuide.calcTitle', { defaultValue: 'Try the example formula' })}
                  </h2>
                  <p className="mt-1 max-w-[320px] text-xs leading-snug text-white/70">
                    {t('milkPricesGuide.heroRangeSub', {
                      defaultValue:
                        'Move FAT, SNF, and volume. Uses the demo base and rates from the left — not your dairy’s live card.',
                    })}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-dk-green-300">
                  {t('milkPricesGuide.heroRangeBadge', { defaultValue: 'Demo' })}
                </span>
              </div>
              <div className="relative">
                <p className="mb-4 text-xs leading-snug text-white/65">
                  {t('milkPricesGuide.calcHint', {
                    defaultValue: 'Drag the sliders to see per-litre price and estimated total payout.',
                  })}
                </p>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="flex justify-between text-[12px] font-semibold text-white/90">
                      {t('milkPricesGuide.volume', { defaultValue: 'Volume (L)' })}
                      <span className="font-serif text-base font-bold text-dk-green-300">{vol.toFixed(1)} L</span>
                    </span>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      step={0.1}
                      value={vol}
                      onChange={(e) => setVol(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer accent-dk-green-400"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="flex justify-between text-[12px] font-semibold text-white/90">
                      {t('milkPricesGuide.snf', { defaultValue: 'SNF %' })}
                      <span className="font-serif text-base font-bold text-dk-green-300">{snf.toFixed(1)}</span>
                    </span>
                    <input
                      type="range"
                      min={7.5}
                      max={9.5}
                      step={0.1}
                      value={snf}
                      onChange={(e) => setSnf(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer accent-dk-green-400"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="flex justify-between text-[12px] font-semibold text-white/90">
                      {t('milkPricesGuide.fat', { defaultValue: 'FAT %' })}
                      <span className="font-serif text-base font-bold text-dk-green-300">{fat.toFixed(1)}%</span>
                    </span>
                    <input
                      type="range"
                      min={3}
                      max={6}
                      step={0.1}
                      value={fat}
                      onChange={(e) => setFat(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer accent-dk-green-400"
                    />
                  </label>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 text-dk-ink shadow-lg sm:grid-cols-2 sm:p-6">
                  <div className="space-y-2 text-sm text-dk-ink-2">
                    <div className="flex justify-between">
                      <span>{t('milkPricesGuide.base', { defaultValue: 'Base / L' })}</span>
                      <span>₹{DEMO_BASE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('milkPricesGuide.fatTerm', { defaultValue: 'FAT term (×10)' })}</span>
                      <span>₹{(fat * DEMO_FAT_R * 10).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('milkPricesGuide.snfTerm', { defaultValue: 'SNF term (×10)' })}</span>
                      <span>₹{(snf * DEMO_SNF_R * 10).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-dk-line/60 pt-2 font-medium text-dk-green-900">
                      <span>{t('milkPricesGuide.perL', { defaultValue: 'Per litre' })}</span>
                      <span>₹{perL.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-center sm:text-right">
                    <div className="font-serif text-3xl font-semibold text-dk-green-800 sm:text-4xl">
                      ₹{Math.round(total)}
                    </div>
                    <div className="mt-1 text-xs text-dk-muted sm:text-sm">
                      {t('milkPricesGuide.totalHint', { defaultValue: 'Estimated total for this volume' })}
                    </div>
                  </div>
                </div>
              </div>

              <p className="relative mt-5 text-center text-[11px] text-white/65 sm:text-left">
                {t('milkPricesGuide.heroRangeFoot', {
                  defaultValue: 'Scroll down for how other pricing styles work.',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="formula" className="border-t border-dk-line bg-white py-12 md:py-16">
        <div className="dk-page-inner">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold text-dk-green-900 md:text-3xl">
                {t('milkPricesGuide.modalTitle', { defaultValue: 'Formula & typical ranges' })}
              </h2>
              <p className="mt-2 text-sm text-dk-muted">
                {t('milkPricesGuide.formulaIntroInline', {
                  defaultValue: 'Short notes on other ways dairies price milk — the hero calculator uses the legacy-style demo above.',
                })}
              </p>
            </div>

            <div className="rounded-2xl border border-dk-line bg-white p-6 shadow-dk-sm md:p-8">
              <h3 className="font-semibold text-dk-green-900">
                {t('milkPricesGuide.modalH2', { defaultValue: 'Kg-style FAT + SNF' })}
              </h3>
              <p className="mt-2 font-mono-dk rounded-lg bg-dk-cream-2 px-3 py-2 text-sm text-dk-ink">
                {t('milkPricesGuide.modalKgFormula', {
                  defaultValue: 'Price/L = (kgFatRate × FAT%) + (kgSnfRate × SNF%)',
                })}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dk-ink-2">
                {t('milkPricesGuide.modalKgExplain', {
                  defaultValue:
                    'Some dairies publish rupees per 1% FAT and per 1% SNF instead of base + legacy rates. Your cooperative’s app or notice board will show which version they use.',
                })}
              </p>
            </div>

            <div className="rounded-2xl border border-dk-line bg-white p-6 shadow-dk-sm md:p-8">
              <h3 className="font-semibold text-dk-green-900">
                {t('milkPricesGuide.modalH3', { defaultValue: 'Slab (band) pricing' })}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dk-ink-2">
                {t('milkPricesGuide.modalSlabExplain', {
                  defaultValue:
                    'A dairy can instead fix one price per litre for each rectangle of (FAT, SNF) values. If your sample falls in a band, you get that band’s price; if it falls between bands, the dairy’s rules decide.',
                })}
              </p>
            </div>

            <div className="rounded-2xl border border-dk-line bg-dk-cream p-6 md:p-8">
              <h3 className="font-semibold text-dk-green-900">
                {t('milkPricesGuide.modalH4', { defaultValue: 'Typical quality bands (rough guide)' })}
              </h3>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-dk-ink-2">
                <li>{t('milkPricesGuide.bandAplus', { defaultValue: 'A+: higher FAT & SNF — strongest bonus.' })}</li>
                <li>{t('milkPricesGuide.bandA', { defaultValue: 'A: solid SNF with good FAT.' })}</li>
                <li>{t('milkPricesGuide.bandB', { defaultValue: 'B: acceptable for many cooperatives.' })}</li>
                <li>{t('milkPricesGuide.bandC', { defaultValue: 'C: lower band; price often tracks closer to base.' })}</li>
              </ul>
            </div>

            <p className="rounded-xl border border-dk-line bg-white px-4 py-3 text-center text-xs text-dk-muted">
              {t('milkPricesGuide.modalDisclaimer', {
                defaultValue:
                  'This page is educational only. For the exact rate that applies to your pour, use your dairy’s official rate card, collection slip, or app.',
              })}
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
