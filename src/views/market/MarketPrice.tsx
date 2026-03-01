import { useEffect, useMemo, useState, useRef } from 'react'
import { fetchMarketPrices, type MarketPriceRecord, convertLitreToGallon } from '../../services/marketService'
import { FaSearch, FaArrowUp, FaArrowDown, FaMinus, FaMapMarkerAlt, FaTint, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa'

interface Row extends MarketPriceRecord {
  trend?: 'up' | 'down' | 'flat'
}

// Custom Dropdown Component
interface CustomDropdownProps {
  label: string
  selected: string
  options: string[]
  onSelect: (value: string) => void
  icon?: React.ReactNode
  placeholder?: string
}

function CustomDropdown({ label, selected, options, onSelect, icon, placeholder = "Select" }: CustomDropdownProps) {
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
    <div className="flex flex-col w-full text-sm relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <span className="inline mr-2">{icon}</span>}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 pr-2 py-2.5 border rounded-lg bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
      >
        <span>{selected || placeholder}</span>
        <svg
          className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6B7280"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 py-2 z-50 absolute top-full">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-green-500 hover:text-white cursor-pointer transition"
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
  const [region, setRegion] = useState<string>('')
  const [milkType, setMilkType] = useState<'All' | 'Cow' | 'Buffalo'>('All')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Row[]>([])
  const [unit, setUnit] = useState<'L' | 'GAL'>('L')
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)

  const regions = useMemo(() => Array.from(new Set(data.map(d => d.region))), [data])

  useEffect(() => {
    const loadMarketPrices = async () => {
      try {
        setLoading(true)
        setError(null)

        const results = await fetchMarketPrices({
          region: region || undefined,
          milkType
        })

        // For demo, randomize previous price to compute a fake trend
        const withTrend: Row[] = results.map(record => {
          const delta = Math.random() * 2 - 1 // -1 to +1
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
    return data.filter(item =>
      item.region.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  const renderTrendIcon = (trend?: Row['trend']) => {
    switch (trend) {
      case 'up':
        return (
          <span className="flex items-center gap-1 text-green-500 font-semibold">
            <FaArrowUp className="text-sm" />
            <span>Up</span>
          </span>
        )
      case 'down':
        return (
          <span className="flex items-center gap-1 text-red-500 font-semibold">
            <FaArrowDown className="text-sm" />
            <span>Down</span>
          </span>
        )
      default:
        return (
          <span className="flex items-center gap-1 text-slate-500 font-semibold">
            <FaMinus className="text-sm" />
            <span>Flat</span>
          </span>
        )
    }
  }

  const formatPrice = (pricePerLitre: number) => {
    const price = unit === 'GAL' ? convertLitreToGallon(pricePerLitre) : pricePerLitre
    return `₹${price.toFixed(2)}/${unit}`
  }

  const regionOptions = useMemo(() => ['All Regions', ...regions], [regions])
  const milkTypeOptions = ['All Types', 'Cow', 'Buffalo']
  const unitOptions = ['Per Litre', 'Per Gallon']

  const handleRegionSelect = (value: string) => {
    setRegion(value === 'All Regions' ? '' : value)
  }

  const handleMilkTypeSelect = (value: string) => {
    const mappedValue = value === 'All Types' ? 'All' : value as 'Cow' | 'Buffalo'
    setMilkType(mappedValue)
  }

  const handleUnitSelect = (value: string) => {
    setUnit(value === 'Per Litre' ? 'L' : 'GAL')
  }

  const getDisplayRegion = () => region || 'All Regions'
  const getDisplayMilkType = () => milkType === 'All' ? 'All Types' : milkType
  const getDisplayUnit = () => unit === 'L' ? 'Per Litre' : 'Per Gallon'

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-green-50 to-[#f7f9ff] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-center text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl mx-auto leading-tight mb-2">
            Market Prices
          </h1>
          <p className="text-center text-gray-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Current milk prices across different regions and types
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                <FaSearch className="inline mr-2" />
                Search Region
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Enter region or state..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Region Filter */}
            <CustomDropdown
              label="Region"
              selected={getDisplayRegion()}
              options={regionOptions}
              onSelect={handleRegionSelect}
              icon={<FaMapMarkerAlt />}
              placeholder="All Regions"
            />

            {/* Milk Type Filter */}
            <CustomDropdown
              label="Milk Type"
              selected={getDisplayMilkType()}
              options={milkTypeOptions}
              onSelect={handleMilkTypeSelect}
              icon={<FaTint />}
              placeholder="All Types"
            />

            {/* Unit Toggle */}
            <CustomDropdown
              label="Price Unit"
              selected={getDisplayUnit()}
              options={unitOptions}
              onSelect={handleUnitSelect}
              icon={<FaRupeeSign />}
              placeholder="Per Litre"
            />
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 text-lg">Loading market prices...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-red-800 font-semibold mb-1">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-500 to-green-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <FaMapMarkerAlt className="inline mr-2" />
                        Region
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <FaTint className="inline mr-2" />
                        Milk Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <FaRupeeSign className="inline mr-2" />
                        Price
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                        Trend
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <FaCalendarAlt className="inline mr-2" />
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr
                        key={`${item.region}-${item.milkType}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.region}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {item.milkType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            {formatPrice(item.pricePerLitre)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Fat: {item.fat}% | SNF: {item.snf}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {renderTrendIcon(item.trend)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {new Date(item.updatedAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaSearch className="w-10 h-10 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      No market data found
                    </h3>
                    <p className="text-gray-600">
                      No market data found for the selected filters. Try adjusting your search criteria.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {!loading && !error && filteredData.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Total Records</div>
              <div className="text-2xl font-bold text-gray-900">{filteredData.length}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Average Price</div>
              <div className="text-2xl font-bold text-green-500">
                ₹{(
                  filteredData.reduce((sum, item) => sum + item.pricePerLitre, 0) / filteredData.length
                ).toFixed(2)}/L
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Regions</div>
              <div className="text-2xl font-bold text-gray-900">
                {new Set(filteredData.map(d => d.region)).size}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
