import { useEffect, useMemo, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchMarketPrices, type MarketPriceRecord, convertLitreToGallon } from '../../services/marketService'
import { FaSearch, FaArrowUp, FaArrowDown, FaMinus, FaMapMarkerAlt, FaTint, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa'

interface Row extends MarketPriceRecord {
  trend?: 'up' | 'down' | 'flat'
}

interface CustomDropdownProps {
  label: string
  selected: string
  options: string[]
  onSelect: (value: string) => void
  icon?: React.ReactNode
  placeholder?: string
}

function CustomDropdown({ label, selected, options, onSelect, icon, placeholder = 'Select' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <div className="relative flex w-full flex-col text-sm" ref={dropdownRef}>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-dk-ink">
        {icon}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2.5 text-left text-dk-ink shadow-dk-sm transition hover:border-dk-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-dk-green-700"
      >
        <span>{selected || placeholder}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-dk-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute top-full z-50 mt-1 max-h-56 w-full overflow-auto rounded-[10px] border border-dk-line bg-white py-1 shadow-dk-lg dark:bg-dk-cream-2">
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer px-4 py-2 text-dk-ink-2 transition hover:bg-dk-green-100 hover:text-dk-green-900"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function MarketPrice() {
  const { t } = useTranslation()
  const [region, setRegion] = useState<string>('')
  const [milkType, setMilkType] = useState<'All' | 'Cow' | 'Buffalo'>('All')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Row[]>([])
  const [unit, setUnit] = useState<'L' | 'GAL'>('L')
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)

  const regions = useMemo(() => Array.from(new Set(data.map((d) => d.region))), [data])

  useEffect(() => {
    const loadMarketPrices = async () => {
      try {
        setLoading(true)
        setError(null)

        const results = await fetchMarketPrices({
          region: region || undefined,
          milkType,
        })

        const withTrend: Row[] = results.map((record) => {
          const delta = Math.random() * 2 - 1
          const prev = record.pricePerLitre - delta
          let trend: Row['trend'] = 'flat'

          if (record.pricePerLitre > prev) trend = 'up'
          else if (record.pricePerLitre < prev) trend = 'down'

          return { ...record, trend }
        })

        setData(withTrend)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load market prices'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadMarketPrices()
  }, [region, milkType])

  const filteredData = useMemo(() => {
    return data.filter((item) => item.region.toLowerCase().includes(search.toLowerCase()))
  }, [data, search])

  const renderTrendIcon = (trend?: Row['trend']) => {
    switch (trend) {
      case 'up':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-dk-green-100 px-2 py-0.5 text-sm font-semibold text-dk-green-800">
            <FaArrowUp className="text-xs" aria-hidden />
            {t('marketPage.trendUp')}
          </span>
        )
      case 'down':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ffe2da] px-2 py-0.5 text-sm font-semibold text-[#b34a2c]">
            <FaArrowDown className="text-xs" aria-hidden />
            {t('marketPage.trendDown')}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-dk-cream-2 px-2 py-0.5 text-sm font-semibold text-dk-muted">
            <FaMinus className="text-xs" aria-hidden />
            {t('marketPage.trendFlat')}
          </span>
        )
    }
  }

  const formatPrice = (pricePerLitre: number) => {
    const price = unit === 'GAL' ? convertLitreToGallon(pricePerLitre) : pricePerLitre
    return `₹${price.toFixed(2)}/${unit}`
  }

  const regionOptions = useMemo(() => [t('marketPage.allRegions'), ...regions], [regions, t])
  const milkTypeOptions = ['All Types', 'Cow', 'Buffalo']
  const unitOptions = [t('marketPage.perLitre'), t('marketPage.perGallon')]

  const handleRegionSelect = (value: string) => {
    setRegion(value === t('marketPage.allRegions') ? '' : value)
  }

  const handleMilkTypeSelect = (value: string) => {
    const mappedValue = value === 'All Types' ? 'All' : (value as 'Cow' | 'Buffalo')
    setMilkType(mappedValue)
  }

  const handleUnitSelect = (value: string) => {
    setUnit(value === t('marketPage.perLitre') ? 'L' : 'GAL')
  }

  const getDisplayRegion = () => region || t('marketPage.allRegions')
  const getDisplayMilkType = () => (milkType === 'All' ? 'All Types' : milkType)
  const getDisplayUnit = () => (unit === 'L' ? t('marketPage.perLitre') : t('marketPage.perGallon'))

  return (
    <div className="min-h-full bg-dk-cream text-dk-ink">
      {/* Hero — mock marketplace-hero: cream + warm radial washes */}
      <section className="relative overflow-hidden border-b border-dk-line/80 px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-14 md:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.97]"
          style={{
            background:
              'radial-gradient(800px 500px at 80% 0%, #fef0d4, transparent 60%), radial-gradient(600px 400px at 0% 70%, var(--green-200), transparent 60%), var(--cream)',
          }}
        />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-dk-line bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 shadow-dk-sm dark:bg-dk-cream-2/90">
            <span className="h-2 w-2 rounded-full bg-dk-green-500 shadow-[0_0_0_3px_var(--green-200)]" aria-hidden />
            {t('marketPage.eyebrow')}
          </div>
          <h1 className="max-w-3xl font-semibold leading-[1.05] tracking-tight text-dk-green-900 sm:text-4xl md:text-5xl lg:text-[2.75rem]">
            {t('marketPage.title')}{' '}
            <em className="font-medium not-italic text-dk-green-700">{t('marketPage.titleAccent')}</em>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-dk-ink-2 sm:text-lg">
            {t('marketPage.subtitle')}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 md:px-8 md:py-10">
        {/* Filters — mock .ls-filters */}
        <div className="mb-8 flex flex-wrap items-end gap-4 rounded-[18px] border border-dk-line bg-white p-5 shadow-dk-sm dark:bg-dk-cream-2 md:gap-5 md:p-6">
          <div className="min-w-[min(100%,220px)] flex-1">
            <label htmlFor="market-search" className="mb-2 flex items-center gap-2 text-sm font-semibold text-dk-ink">
              <FaSearch className="text-dk-green-700" aria-hidden />
              {t('marketPage.searchLabel')}
            </label>
            <div className="relative flex items-center gap-2 rounded-[10px] border border-dk-line bg-dk-cream px-3 py-2 shadow-inner">
              <FaSearch className="pointer-events-none shrink-0 text-dk-muted" aria-hidden />
              <input
                id="market-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('marketPage.searchPlaceholder')}
                className="min-w-0 flex-1 bg-transparent text-sm text-dk-ink placeholder:text-dk-muted focus:outline-none"
              />
            </div>
          </div>

          <div className="w-full min-w-[140px] flex-1 sm:max-w-[200px]">
            <CustomDropdown
              label={t('marketPage.region')}
              selected={getDisplayRegion()}
              options={regionOptions}
              onSelect={handleRegionSelect}
              icon={<FaMapMarkerAlt className="text-dk-green-700" aria-hidden />}
              placeholder={t('marketPage.allRegions')}
            />
          </div>

          <div className="w-full min-w-[140px] flex-1 sm:max-w-[200px]">
            <CustomDropdown
              label={t('marketPage.milkType')}
              selected={getDisplayMilkType()}
              options={milkTypeOptions}
              onSelect={handleMilkTypeSelect}
              icon={<FaTint className="text-dk-green-700" aria-hidden />}
              placeholder="All Types"
            />
          </div>

          <div className="w-full min-w-[140px] flex-1 sm:max-w-[200px]">
            <CustomDropdown
              label={t('marketPage.priceUnit')}
              selected={getDisplayUnit()}
              options={unitOptions}
              onSelect={handleUnitSelect}
              icon={<FaRupeeSign className="text-dk-green-700" aria-hidden />}
              placeholder={t('marketPage.perLitre')}
            />
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-dk-green-200 border-t-dk-green-800" />
            <p className="text-dk-ink-2">{t('marketPage.loading')}</p>
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-[18px] border border-dk-coral/40 bg-dk-cream-2 p-6 shadow-dk-sm">
            <h3 className="mb-1 font-semibold text-dk-green-900">{t('marketPage.errorTitle')}</h3>
            <p className="text-sm text-dk-ink-2">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-[18px] border border-dk-line bg-white shadow-dk-sm dark:bg-dk-cream-2">
            {filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-dk-green-800 text-white">
                    <tr>
                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        <span className="inline-flex items-center gap-2">
                          <FaMapMarkerAlt className="opacity-90" aria-hidden />
                          {t('marketPage.tableRegion')}
                        </span>
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        <span className="inline-flex items-center gap-2">
                          <FaTint className="opacity-90" aria-hidden />
                          {t('marketPage.tableMilkType')}
                        </span>
                      </th>
                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        <span className="inline-flex items-center gap-2">
                          <FaRupeeSign className="opacity-90" aria-hidden />
                          {t('marketPage.tablePrice')}
                        </span>
                      </th>
                      <th className="px-5 py-4 text-center text-sm font-semibold">{t('marketPage.tableTrend')}</th>
                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        <span className="inline-flex items-center gap-2">
                          <FaCalendarAlt className="opacity-90" aria-hidden />
                          {t('marketPage.tableUpdated')}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dk-line">
                    {filteredData.map((item) => (
                      <tr
                        key={`${item.region}-${item.milkType}`}
                        className="transition-colors hover:bg-dk-green-100/50"
                      >
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="text-sm font-medium text-dk-green-900">{item.region}</span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="inline-flex rounded-full bg-dk-green-100 px-3 py-1 text-xs font-semibold text-dk-green-800">
                            {item.milkType}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="font-semibold text-dk-green-900">{formatPrice(item.pricePerLitre)}</div>
                          <div className="mt-1 text-xs text-dk-muted">
                            {t('marketPage.composition', { fat: item.fat, snf: item.snf })}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-center">{renderTrendIcon(item.trend)}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-dk-ink-2">
                          {new Date(item.updatedAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 px-6 py-20 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-dk-green-100">
                  <FaSearch className="h-9 w-9 text-dk-green-700/60" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-dk-green-900">{t('marketPage.noDataTitle')}</h3>
                <p className="max-w-sm text-sm text-dk-muted">{t('marketPage.noDataDesc')}</p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && filteredData.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-[18px] border border-dk-line bg-white p-6 text-center shadow-dk-sm dark:bg-dk-cream-2">
              <div className="text-xs font-semibold uppercase tracking-[0.06em] text-dk-muted">{t('marketPage.statsRecords')}</div>
              <div className="mt-2 font-semibold leading-none text-dk-green-800" style={{ fontSize: '1.75rem' }}>
                {filteredData.length}
              </div>
            </div>
            <div className="rounded-[18px] border border-dk-line bg-white p-6 text-center shadow-dk-sm dark:bg-dk-cream-2">
              <div className="text-xs font-semibold uppercase tracking-[0.06em] text-dk-muted">{t('marketPage.statsAvg')}</div>
              <div className="mt-2 font-semibold leading-none text-dk-green-800" style={{ fontSize: '1.75rem' }}>
                ₹
                {(filteredData.reduce((sum, item) => sum + item.pricePerLitre, 0) / filteredData.length).toFixed(2)}
                /L
              </div>
            </div>
            <div className="rounded-[18px] border border-dk-line bg-white p-6 text-center shadow-dk-sm dark:bg-dk-cream-2">
              <div className="text-xs font-semibold uppercase tracking-[0.06em] text-dk-muted">{t('marketPage.statsRegions')}</div>
              <div className="mt-2 font-semibold leading-none text-dk-green-800" style={{ fontSize: '1.75rem' }}>
                {new Set(filteredData.map((d) => d.region)).size}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
