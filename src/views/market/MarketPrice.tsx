import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FaArrowRight,
  FaBookmark,
  FaFilter,
  FaHeart,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaStore,
  FaStethoscope,
  FaUpload,
  FaUser,
} from 'react-icons/fa'
import {
  MarketplacePublicAPIService,
  resolveListingMediaUrl,
  type AnimalListingOut,
  type MarketplaceListingType,
} from '../../services/MarketplacePublicAPIService'
import { inferImageKey, listingImageClass } from '../../utils/marketplaceUi'

type AnimalFilter = 'all' | 'cow' | 'buffalo' | 'calf' | 'bull'
type PriceBucket = 'any' | 'lt50' | '50to1L' | '1to2L' | 'gt2L'
type ListingKindFilter = 'all' | MarketplaceListingType

const PAGE_SIZE = 24

function matchesPriceBucket(rupees: number, bucket: PriceBucket): boolean {
  switch (bucket) {
    case 'any':
      return true
    case 'lt50':
      return rupees < 50_000
    case '50to1L':
      return rupees >= 50_000 && rupees <= 100_000
    case '1to2L':
      return rupees > 100_000 && rupees <= 200_000
    case 'gt2L':
      return rupees > 200_000
    default:
      return true
  }
}

function matchesPriceBucketRow(price: number | null, bucket: PriceBucket): boolean {
  if (price == null) return bucket === 'any'
  return matchesPriceBucket(price, bucket)
}

function matchesAnimalFilter(row: AnimalListingOut, f: AnimalFilter): boolean {
  if (f === 'all') return true
  const blob = `${row.animal_type} ${row.breed || ''}`.toLowerCase()
  if (f === 'buffalo')
    return /\bbuffalo|bhains|murrah|jaffarabadi|nili|pandharpuri|mehsana/.test(blob)
  if (f === 'calf')
    return (
      /\bcalf|heifer|pada|months?\s*old|age\s*\d+\s*m/.test(blob) ||
      (row.age_months != null && row.age_months <= 20)
    )
  if (f === 'bull') return /\bbull\b|nar\b|बैल/.test(blob)
  if (f === 'cow') {
    if (/\bbuffalo|bhains|murrah/.test(blob)) return false
    return (
      /\bcow|gir|holstein|jersey|sahiwal|hf|cross|dairy|deshi|indigenous|native|गाय/.test(blob) ||
      /\b(cow|cattle)\b/.test(blob)
    )
  }
  return true
}

function formatInr(amount: number | null): string {
  if (amount == null || Number.isNaN(amount)) return '—'
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
      amount,
    )
  } catch {
    return `₹${Math.round(amount)}`
  }
}

function ageLabel(row: AnimalListingOut, t: (k: string, o?: Record<string, string | number>) => string): string {
  if (row.age_months == null) return t('marketPage.ageUnknown')
  const y = Math.floor(row.age_months / 12)
  const m = row.age_months % 12
  if (y <= 0) return m > 0 ? `${m} mo` : t('marketPage.ageUnknown')
  return t('marketPage.ageYrs', { n: y })
}

function initials(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean)
  if (p.length === 0) return '?'
  if (p.length === 1) return p[0].slice(0, 2).toUpperCase()
  return (p[0][0] + p[p.length - 1][0]).toUpperCase()
}

function CowSilhouette() {
  return (
    <div className="relative h-[120px] w-[140px]" aria-hidden>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 50px 30px at 30% 50%, rgba(255,255,255,.4), transparent), radial-gradient(ellipse 30px 20px at 70% 40%, rgba(255,255,255,.3), transparent), radial-gradient(ellipse 40px 25px at 60% 70%, rgba(255,255,255,.35), transparent)',
        }}
      />
    </div>
  )
}

function MarketplacePhonePreview() {
  const { t } = useTranslation()
  return (
    <div
      className="relative mx-auto w-full max-w-[300px] rounded-[36px] border-[10px] border-dk-ink bg-dk-ink p-1 shadow-[0_40px_80px_rgba(58,34,16,0.2)]"
      aria-hidden
    >
      <div className="mx-auto mb-2 mt-1 h-5 w-24 rounded-full bg-dk-ink" />
      <div className="overflow-hidden rounded-[26px] bg-dk-cream">
        <div
          className="rounded-b-2xl px-3 pb-3 pt-2 text-white"
          style={{ background: 'linear-gradient(135deg,#7a4a1a,#3a2210)' }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[10px] font-medium opacity-90">{t('marketPage.phoneMarketLabel')}</div>
              <div className="font-serif text-[13px] font-semibold leading-tight">{t('marketPage.phoneMarketTitle')}</div>
            </div>
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15">
              <FaFilter className="h-3 w-3" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-[11px] text-white/90">
            <FaSearch className="h-3 w-3 shrink-0 opacity-80" />
            <span className="truncate">{t('marketPage.phoneSearchPlaceholder')}</span>
          </div>
        </div>
        <div className="max-h-[320px] space-y-2 overflow-y-auto p-2.5">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {(['All', 'Cows', 'Buffalo', 'Calves'] as const).map((chip, i) => (
              <span
                key={chip}
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  i === 0 ? 'bg-dk-green-700 text-white' : 'border border-dk-line bg-white text-dk-ink-2'
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border border-dk-line bg-white">
            <div className="relative grid h-[100px] place-items-center bg-gradient-to-br from-[#fde2cf] to-[#7a4a1a]">
              <span className="absolute left-2 top-2 rounded bg-[rgba(67,196,126,.95)] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                ✓ {t('marketPage.tagVerifiedShort')}
              </span>
              <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white/95 text-dk-coral">
                <FaHeart className="h-3 w-3" />
              </span>
              <span className="font-serif text-sm italic text-white drop-shadow">{t('marketPage.phoneCard1Breed')}</span>
            </div>
            <div className="flex items-start justify-between gap-2 p-2.5 text-[11px]">
              <div>
                <div className="font-semibold text-dk-green-900">{t('marketPage.phoneCard1Name')}</div>
                <div className="text-dk-muted">{t('marketPage.phoneCard1Meta')}</div>
              </div>
              <div className="font-serif font-semibold text-dk-green-800">{t('marketPage.phoneCard1Price')}</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-dk-line bg-white">
            <div className="relative grid h-[100px] place-items-center bg-gradient-to-br from-[#444444] to-[#0a0a0a]">
              <span className="absolute left-2 top-2 rounded bg-[rgba(200,155,58,.95)] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                ★ {t('marketPage.tagFeaturedShort')}
              </span>
              <span className="font-serif text-sm italic text-white drop-shadow">{t('marketPage.phoneCard2Breed')}</span>
            </div>
            <div className="flex items-start justify-between gap-2 p-2.5 text-[11px]">
              <div>
                <div className="font-semibold text-dk-green-900">{t('marketPage.phoneCard2Name')}</div>
                <div className="text-dk-muted">{t('marketPage.phoneCard2Meta')}</div>
              </div>
              <div className="font-serif font-semibold text-dk-green-800">{t('marketPage.phoneCard2Price')}</div>
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-dk-green-800 py-2.5 text-center text-[12px] font-semibold text-white"
          >
            {t('marketPage.phoneSellCta')}
          </button>
          <div className="flex border-t border-dk-line bg-white px-1 pt-2 text-[9px] text-dk-muted">
            {[
              { ic: FaHome, l: t('marketPage.tabHome') },
              { ic: FaStethoscope, l: t('marketPage.tabVets') },
              { ic: FaStore, l: t('marketPage.tabMarket'), active: true },
              { ic: FaUser, l: t('marketPage.tabProfile') },
            ].map(({ ic: Icon, l, active }) => (
              <div
                key={l}
                className={`flex flex-1 flex-col items-center gap-0.5 py-1 ${active ? 'font-semibold text-dk-green-800' : ''}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="truncate">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ApiListingCard({ row }: { row: AnimalListingOut }) {
  const { t } = useTranslation()
  const [imgFailed, setImgFailed] = useState(false)
  const imgKey = inferImageKey(row.animal_type, row.breed)
  const imgClass = listingImageClass(imgKey)
  const rawCover = row.image_urls?.length ? resolveListingMediaUrl(row.image_urls[0]) : ''
  const cover = rawCover && !imgFailed ? rawCover : ''

  return (
    <article className="overflow-hidden rounded-[22px] border border-dk-line bg-white shadow-dk-sm transition-all hover:-translate-y-1 hover:border-dk-green-300 hover:shadow-dk-md dark:bg-dk-cream-2">
      <div className={`relative grid h-[220px] place-items-center overflow-hidden ${cover ? '' : imgClass}`}>
        {cover ? (
          <img
            src={cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <CowSilhouette />
        )}
        <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold backdrop-blur-md ${
              row.listing_type === 'sell' ? 'bg-dk-green-700 text-white' : 'bg-dk-gold text-dk-green-900'
            }`}
          >
            {row.listing_type === 'sell' ? t('marketPage.listingKindSell') : t('marketPage.listingKindBuy')}
          </span>
        </div>
        <div
          className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-dk-muted shadow-sm backdrop-blur-md dark:bg-dk-cream-2/95"
          title={t('marketPage.saveInAppOnly')}
        >
          <FaBookmark className="h-[16px] w-[16px]" aria-hidden />
        </div>
      </div>
      <div className="p-5 sm:p-[22px]">
        <h3 className="font-serif text-xl font-semibold leading-snug text-dk-green-900">{row.title}</h3>
        <div className="mb-2 mt-1 flex flex-wrap items-center gap-2 text-xs text-dk-muted">
          <span className="inline-flex items-center gap-1">
            <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-dk-green-700" aria-hidden />
            {row.location_text}
          </span>
          <span className="text-dk-ink-2">{ageLabel(row, t)}</span>
          {row.breed ? <span className="rounded-full bg-dk-green-100 px-2 py-0.5 font-medium text-dk-green-800">{row.breed}</span> : null}
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-dk-ink-2">{row.description}</p>
        <div className="mb-4 mt-3 grid grid-cols-3 gap-2 rounded-xl bg-dk-green-100 p-3">
          <div className="text-center">
            <div className="font-serif text-base font-semibold text-dk-green-800">{row.quantity}</div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-dk-muted">{t('marketPage.qtyHead')}</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-base font-semibold text-dk-green-800">{row.animal_type}</div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-dk-muted">{t('marketPage.animalColumn')}</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-base font-semibold text-dk-green-800">{formatInr(row.price_inr)}</div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-dk-muted">
              {row.price_negotiable ? t('marketPage.priceNegotiable') : t('marketPage.priceFixed')}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-dk-line/80 pt-3">
          <div className="flex items-center gap-2 text-[11.5px] text-dk-muted">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-dk-green-500 to-dk-green-800 font-serif text-[10px] font-semibold text-white">
              {initials(row.seller_name)}
            </div>
            <span className="font-medium text-dk-ink">{row.seller_name}</span>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-dk-line bg-dk-cream/80 p-3 text-sm dark:bg-dk-cream-2/50">
          {row.contact_locked || !row.contact_phone ? (
            <p className="leading-snug text-dk-ink-2">{t('marketPage.contactLockedHint')}</p>
          ) : (
            <a
              href={`tel:${row.contact_phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 font-semibold text-dk-green-800 hover:text-dk-green-900"
            >
              <FaPhone className="h-3.5 w-3.5" aria-hidden />
              {t('marketPage.callSeller')}
            </a>
          )}
        </div>
        <p className="mt-2 text-center text-[11px] text-dk-muted">{t('marketPage.saveInAppOnly')}</p>
      </div>
    </article>
  )
}

export default function MarketPrice() {
  const { t } = useTranslation()
  const [listingKind, setListingKind] = useState<ListingKindFilter>('all')
  const [search, setSearch] = useState('')
  const [animalType, setAnimalType] = useState<AnimalFilter>('all')
  const [breed, setBreed] = useState('Any')
  const [region, setRegion] = useState('All India')
  const [priceBucket, setPriceBucket] = useState<PriceBucket>('any')
  const [items, setItems] = useState<AnimalListingOut[]>([])
  const [networkTotal, setNetworkTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nearCoords, setNearCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [geoBusy, setGeoBusy] = useState(false)

  const breedOptions = useMemo(
    () => ['Any', 'Holstein', 'Gir', 'Sahiwal', 'Murrah', 'Jersey', 'Crossbreed'],
    [],
  )
  const regionOptions = useMemo(() => ['All India', 'Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'Haryana'], [])

  const typeOptions: { value: AnimalFilter; labelKey: string }[] = [
    { value: 'all', labelKey: 'filterTypeAll' },
    { value: 'cow', labelKey: 'filterTypeCows' },
    { value: 'buffalo', labelKey: 'filterTypeBuffalo' },
    { value: 'calf', labelKey: 'filterTypeCalves' },
    { value: 'bull', labelKey: 'filterTypeBulls' },
  ]

  const loadPage = useCallback(
    async (skip: number, append: boolean) => {
      if (append) setLoadingMore(true)
      else setLoading(true)
      setError(null)
      try {
        const data = await MarketplacePublicAPIService.getPublicListings({
          listingType: listingKind,
          skip,
          limit: PAGE_SIZE,
          lat: nearCoords?.lat,
          lng: nearCoords?.lng,
          maxKm: nearCoords ? 150 : undefined,
        })
        setNetworkTotal(data.total)
        setItems((prev) => (append ? [...prev, ...data.items] : data.items))
      } catch (e) {
        setError(e instanceof Error ? e.message : t('marketPage.apiError'))
        if (!append) setItems([])
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [listingKind, nearCoords, t],
  )

  useEffect(() => {
    void loadPage(0, false)
  }, [loadPage])

  const hasMore = useMemo(() => {
    if (networkTotal == null) return false
    return items.length < networkTotal
  }, [items.length, networkTotal])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((row) => {
      if (q) {
        const blob = `${row.title} ${row.location_text} ${row.seller_name} ${row.description}`.toLowerCase()
        if (!blob.includes(q)) return false
      }
      if (!matchesAnimalFilter(row, animalType)) return false
      if (breed !== 'Any' && (row.breed || '').toLowerCase() !== breed.toLowerCase()) return false
      if (region !== 'All India' && !row.location_text.toLowerCase().includes(region.toLowerCase())) return false
      if (!matchesPriceBucketRow(row.price_inr, priceBucket)) return false
      return true
    })
  }, [items, search, animalType, breed, region, priceBucket])

  const onNearMe = () => {
    if (!navigator.geolocation) return
    setGeoBusy(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setNearCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoBusy(false)
      },
      () => {
        setGeoBusy(false)
        alert(t('marketPage.nearMeDenied'))
      },
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 60_000 },
    )
  }

  const statHero = useMemo(() => {
    const live = networkTotal != null ? String(networkTotal) : '—'
    return [
      { value: live, label: t('marketPage.statLiveListings'), sub: '' },
      {
        value: t('marketPage.statAppUnlockValue'),
        label: t('marketPage.statAppUnlockLabel'),
        sub: t('marketPage.statAppUnlockSub'),
      },
      nearCoords
        ? {
            value: t('marketPage.statNearYouValue'),
            label: t('marketPage.statNearYouLabel'),
            sub: t('marketPage.statNearYouSub'),
          }
        : {
            value: t('marketPage.statBrowseAllValue'),
            label: t('marketPage.statBrowseAllLabel'),
            sub: t('marketPage.statBrowseAllSub'),
          },
    ]
  }, [networkTotal, nearCoords, t])

  return (
    <div className="min-h-full bg-dk-cream text-dk-ink">
      <section className="relative overflow-hidden border-b border-dk-line/80 pb-14 pt-12 sm:pb-20 sm:pt-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.97]"
          style={{
            background:
              'radial-gradient(800px 500px at 80% 0%, #fef0d4, transparent 60%), radial-gradient(600px 400px at 0% 70%, var(--green-200), transparent 60%), var(--cream)',
          }}
        />
        <div className="dk-page-inner relative">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-dk-line bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#7a4a1a] shadow-dk-sm dark:bg-dk-cream-2/90">
                <span className="h-2 w-2 rounded-full bg-[#a17a26] shadow-[0_0_0_4px_#fef0d4]" aria-hidden />
                {t('marketPage.eyebrow')}
              </div>
              <h1 className="feeds-hero-title max-w-xl">
                {t('marketPage.heroTitleBefore')}
                <em className="feeds-hero-em not-italic"> {t('marketPage.heroTitleEm')}</em>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-dk-ink-2 sm:text-lg">{t('marketPage.heroSubtitle')}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#browse-cattle"
                  className="inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-5 py-3 text-sm font-semibold text-white shadow-dk-sm transition hover:bg-dk-green-900"
                >
                  <FaSearch className="h-4 w-4" aria-hidden />
                  {t('marketPage.ctaBrowse')}
                </a>
                <Link
                  to="/vet"
                  className="inline-flex items-center gap-2 rounded-xl border border-dk-line bg-white px-5 py-3 text-sm font-semibold text-dk-green-900 shadow-dk-sm transition hover:border-dk-green-400 dark:bg-dk-cream-2"
                >
                  <FaUpload className="h-4 w-4 text-dk-green-700" aria-hidden />
                  {t('marketPage.ctaList')}
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <MarketplacePhonePreview />
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-14">
            {statHero.map((s) => (
              <div
                key={s.label}
                className="rounded-[18px] border border-dk-line bg-white py-5 text-center shadow-dk-sm dark:bg-dk-cream-2"
              >
                <div className="px-2 font-serif text-2xl font-semibold leading-none text-dk-green-800 sm:text-3xl">{s.value}</div>
                <div className="mt-1.5 px-2 text-xs font-semibold uppercase tracking-[0.06em] text-dk-muted">{s.label}</div>
                {s.sub ? <div className="mt-1 px-2 text-[11px] leading-snug text-dk-ink-2">{s.sub}</div> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="browse-cattle" className="scroll-mt-24 py-16 md:py-20">
        <div className="dk-page-inner">
          <div className="mb-8 max-w-none text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-dk-green-700">{t('marketPage.browseEyebrow')}</div>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-dk-green-900 md:text-[42px]">
              {t('marketPage.browseTitleBefore')}
              <em className="feeds-hero-em not-italic"> {t('marketPage.browseTitleEm')}.</em>
            </h2>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onNearMe}
              disabled={geoBusy}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                nearCoords
                  ? 'border-dk-green-600 bg-dk-green-100 text-dk-green-900'
                  : 'border-dk-line bg-white text-dk-green-900 hover:border-dk-green-400 dark:bg-dk-cream-2'
              }`}
            >
              {nearCoords ? t('marketPage.nearMeActive') : t('marketPage.nearMe')}
            </button>
            {nearCoords ? (
              <button
                type="button"
                onClick={() => setNearCoords(null)}
                className="rounded-full border border-dk-line bg-dk-cream px-4 py-2 text-sm font-medium text-dk-ink-2 hover:bg-dk-cream-2"
              >
                {t('marketPage.nearMeOff')}
              </button>
            ) : null}
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-[18px] border border-dk-line bg-white p-4 shadow-dk-sm dark:bg-dk-cream-2 md:gap-3.5 md:p-6">
            <div className="flex min-w-[min(100%,220px)] flex-1 items-center gap-2 rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2 text-sm text-dk-muted dark:bg-dk-cream-2/80">
              <FaSearch className="h-4 w-4 shrink-0" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('marketPage.filterSearchPlaceholder')}
                className="min-w-0 flex-1 bg-transparent text-dk-ink placeholder:text-dk-muted focus:outline-none"
              />
            </div>
            <label className="flex items-center gap-2 text-[13px] text-dk-ink-2">
              <span className="whitespace-nowrap font-semibold text-dk-ink">{t('marketPage.filterListingKind')}</span>
              <select
                value={listingKind}
                onChange={(e) => setListingKind(e.target.value as ListingKindFilter)}
                className="rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2 text-[13px] dark:bg-dk-cream-2"
              >
                <option value="all">{t('marketPage.listingKindAll')}</option>
                <option value="sell">{t('marketPage.listingKindSell')}</option>
                <option value="buy">{t('marketPage.listingKindBuy')}</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-[13px] text-dk-ink-2">
              <span className="whitespace-nowrap font-semibold text-dk-ink">{t('marketPage.filterType')}</span>
              <select
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value as AnimalFilter)}
                className="rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2 text-[13px] text-dk-ink dark:bg-dk-cream-2"
              >
                {typeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(`marketPage.${o.labelKey}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-[13px] text-dk-ink-2">
              <span className="whitespace-nowrap font-semibold text-dk-ink">{t('marketPage.filterBreed')}</span>
              <select
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2 text-[13px] dark:bg-dk-cream-2"
              >
                {breedOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-[13px] text-dk-ink-2">
              <span className="whitespace-nowrap font-semibold text-dk-ink">{t('marketPage.filterRegion')}</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2 text-[13px] dark:bg-dk-cream-2"
              >
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-[13px] text-dk-ink-2">
              <span className="whitespace-nowrap font-semibold text-dk-ink">{t('marketPage.filterPrice')}</span>
              <select
                value={priceBucket}
                onChange={(e) => setPriceBucket(e.target.value as PriceBucket)}
                className="rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2 text-[13px] dark:bg-dk-cream-2"
              >
                <option value="any">{t('marketPage.priceAny')}</option>
                <option value="lt50">{t('marketPage.priceLt50')}</option>
                <option value="50to1L">{t('marketPage.price50to1L')}</option>
                <option value="1to2L">{t('marketPage.price1to2L')}</option>
                <option value="gt2L">{t('marketPage.priceGt2L')}</option>
              </select>
            </label>
          </div>

          {error && !loading ? (
            <div className="mb-6 rounded-[18px] border border-dk-coral/40 bg-dk-cream-2 p-4 text-sm text-dk-ink-2">{error}</div>
          ) : null}

          {loading ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-dk-green-200 border-t-dk-green-800" />
              <p className="text-dk-muted">{t('marketPage.loadingListings')}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[18px] border border-dk-line bg-white py-16 text-center dark:bg-dk-cream-2">
              <FaSearch className="mx-auto mb-3 h-10 w-10 text-dk-green-700/40" aria-hidden />
              <p className="font-semibold text-dk-green-900">{t('marketPage.noListingsTitle')}</p>
              <p className="mt-1 text-sm text-dk-muted">{t('marketPage.noListingsDesc')}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((row) => (
                <ApiListingCard key={row.id} row={row} />
              ))}
            </div>
          )}

          {!loading && hasMore ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                disabled={loadingMore}
                onClick={() => void loadPage(items.length, true)}
                className="rounded-xl border border-dk-line bg-white px-6 py-3 text-sm font-semibold text-dk-green-900 shadow-dk-sm transition hover:border-dk-green-400 disabled:opacity-60 dark:bg-dk-cream-2"
              >
                {loadingMore ? t('marketPage.loadingListings') : t('marketPage.loadMore')}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="dk-page-inner">
          <div className="mx-auto max-w-3xl rounded-3xl border border-dk-line bg-gradient-to-br from-dk-green-900 to-dk-green-800 px-8 py-12 text-center text-white shadow-dk-lg md:px-12">
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">{t('marketPage.bottomCtaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-lg text-base opacity-90">{t('marketPage.bottomCtaBody')}</p>
            <Link
              to="/vet"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-dk-green-900 shadow-dk-sm transition hover:bg-dk-cream"
            >
              {t('marketPage.bottomCtaButton')}
              <FaArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
