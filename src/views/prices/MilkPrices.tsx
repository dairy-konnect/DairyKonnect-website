import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'
import pricingService, { 
  type DairyRates, 
  type RateCard, 
  type MilkType,
  MILK_RANGES,
  calculatePrice 
} from '../../services/PricingService'

export default function MilkPrices() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [dairyRates, setDairyRates] = useState<DairyRates[]>([])
  const [selectedMilkType, setSelectedMilkType] = useState<MilkType | 'all'>('all')
  const [selectedCard, setSelectedCard] = useState<RateCard | null>(null)
  const [selectedDairy, setSelectedDairy] = useState<DairyRates | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchRates()
  }, [selectedMilkType])

  const fetchRates = async () => {
    try {
      setLoading(true)
      const milkType = selectedMilkType === 'all' ? undefined : selectedMilkType
      const rates = await pricingService.getAllDairyRates(milkType)
      setDairyRates(rates)
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch milk prices')
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

  // Get unique dairy count
  const totalDairies = dairyRates.length
  const totalRateCards = dairyRates.reduce((acc, d) => acc + d.rateCards.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-green-50 to-[#f7f9ff] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h3 className="text-sm text-green-500 font-medium mb-2">
            {t('milkPrices.tagline', 'Compare & Choose')}
          </h3>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
            {t('milkPrices.title', 'Milk Prices')}
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-6">
            {t('milkPrices.subtitle', 'Compare milk prices from different dairies based on FAT & SNF values')}
          </p>
          
          {/* Formula Info */}
          <div className="inline-block bg-white border border-gray-200 rounded-xl px-6 py-4 text-left max-w-2xl shadow-sm">
            <p className="text-sm font-medium text-green-600 mb-1">
              💡 {t('milkPrices.formula', 'Price Formula')}
            </p>
            <p className="text-sm text-gray-700 font-mono">
              Price = Base + (FAT × FAT_Rate × 10) + (SNF × SNF_Rate × 10)
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <div className="flex gap-2">
                {(['all', 'Cow', 'Buffalo', 'Mixed'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMilkType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedMilkType === type
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'all' ? t('milkPrices.allTypes', 'All Types') : `${type} Milk`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{totalDairies} {t('milkPrices.dairies', 'Dairies')}</span>
              <span>•</span>
              <span>{totalRateCards} {t('milkPrices.rateCards', 'Rate Cards')}</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 text-lg">Loading milk prices...</p>
            </div>
          </div>
        ) : dairyRates.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t('milkPrices.noRates', 'No Rate Cards Available')}
                </h3>
                <p className="text-gray-600">
                  {t('milkPrices.noRatesDesc', 'No dairies have published their milk prices yet.')}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Dairy Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dairyRates.map((dairy) => (
              <DairyCard 
                key={dairy.dairyId} 
                dairy={dairy} 
                onViewChart={viewPriceChart}
              />
            ))}
          </div>
        )}

        {/* Price Chart Modal */}
        {showModal && selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">{selectedCard.name}</h2>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                      selectedCard.milkType === 'Cow' 
                        ? 'bg-blue-100 text-blue-700'
                        : selectedCard.milkType === 'Buffalo'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {selectedCard.milkType === 'Cow' && '🐄'}
                      {selectedCard.milkType === 'Buffalo' && '🐃'}
                      {selectedCard.milkType === 'Mixed' && '🥛'}
                      {selectedCard.milkType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedDairy?.dairyName || `Dairy ID: ${selectedCard.dairyId.slice(-6).toUpperCase()}`}
                    {' • '}Effective from {new Date(selectedCard.effectiveFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {/* Rate Summary */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-blue-600">Base Price</p>
                    <p className="text-2xl font-bold text-blue-700">₹{selectedCard.basePrice}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-purple-600">FAT Rate</p>
                    <p className="text-2xl font-bold text-purple-700">₹{selectedCard.fatRate}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-orange-600">SNF Rate</p>
                    <p className="text-2xl font-bold text-orange-700">₹{selectedCard.snfRate}</p>
                  </div>
                </div>

                {/* Formula */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Formula:</p>
                  <p className="font-mono text-gray-900">
                    Price = {selectedCard.basePrice} + (FAT × {selectedCard.fatRate} × 10) + (SNF × {selectedCard.snfRate} × 10)
                  </p>
                </div>

                {/* Full Price Table */}
                <h3 className="font-medium text-gray-900 mb-3">
                  {t('milkPrices.priceChart', 'Complete Price Chart')} (₹/Liter)
                </h3>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-3 py-2 text-left text-gray-600">FAT↓ / SNF→</th>
                        {(() => {
                          const ranges = MILK_RANGES[selectedCard.milkType] || MILK_RANGES.Cow
                          const snfVals: number[] = []
                          for (let s = ranges.snfRange[0]; s <= ranges.snfRange[1]; s += 0.5) {
                            snfVals.push(s)
                          }
                          return snfVals.map(snf => (
                            <th key={snf} className="px-3 py-2 text-center text-gray-600">
                              {snf.toFixed(1)}
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
                        return fatVals.map(fat => (
                          <tr key={fat} className="border-t border-gray-200">
                            <td className="px-3 py-2 font-medium bg-gray-50 text-gray-700">
                              {fat.toFixed(1)}
                            </td>
                            {snfVals.map(snf => {
                              const price = calculatePrice(
                                selectedCard.basePrice || 0,
                                selectedCard.fatRate || 0,
                                selectedCard.snfRate || 0,
                                fat,
                                snf
                              )
                              return (
                                <td key={snf} className="px-3 py-2 text-center text-gray-900">
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
    </div>
  )
}

// Dairy Card Component with animation
function DairyCard({ dairy, onViewChart }: { dairy: DairyRates; onViewChart: (card: RateCard, dairy: DairyRates) => void }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : undefined}
      transition={{ ease: 'easeOut', duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Dairy Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-lg truncate">
              {dairy.dairyName || 'Unknown Dairy'}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
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

      {/* Rate Cards List */}
      <div className="p-5 space-y-4">
        {dairy.rateCards.map((card) => (
          <div
            key={card.id}
            className="bg-gray-50 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{card.name}</h4>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                  card.milkType === 'Cow'
                    ? 'bg-blue-100 text-blue-700'
                    : card.milkType === 'Buffalo'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {card.milkType === 'Cow' && '🐄 '}
                  {card.milkType === 'Buffalo' && '🐃 '}
                  {card.milkType === 'Mixed' && '🥛 '}
                  {card.milkType}
                </span>
              </div>
            </div>

            {/* Rate Summary */}
            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="bg-white rounded-lg p-2 border border-gray-100">
                <p className="text-xs text-gray-500">Base</p>
                <p className="font-semibold text-gray-900">₹{card.basePrice}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-gray-100">
                <p className="text-xs text-gray-500">FAT</p>
                <p className="font-semibold text-gray-900">₹{card.fatRate}</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-gray-100">
                <p className="text-xs text-gray-500">SNF</p>
                <p className="font-semibold text-gray-900">₹{card.snfRate}</p>
              </div>
            </div>

            {/* Example Price */}
            <div className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2 mb-3 border border-green-100">
              <span className="text-xs text-green-700">
                Example (FAT 4.0, SNF 8.5):
              </span>
              <span className="font-bold text-green-700">
                ₹{calculatePrice(card.basePrice || 0, card.fatRate || 0, card.snfRate || 0, 4.0, 8.5).toFixed(0)}/L
              </span>
            </div>

            <button
              onClick={() => onViewChart(card, dairy)}
              className="relative w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg transition text-sm font-medium overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Full Price Chart</span>
              </span>
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
