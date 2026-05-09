import { useState, useCallback } from 'react'
import FeedDetailModal from '../../components/feeds/FeedDetailModal'
import FeedsHero from './components/FeedsHero'
import FeedShowcaseGrid from './components/FeedShowcaseGrid'
import FeedSubscriptionBanner from './components/FeedSubscriptionBanner'
import type { FeedProduct } from '../../data/feedProducts'

export default function Feeds() {
  const [detailProduct, setDetailProduct] = useState<FeedProduct | null>(null)

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-dk-cream pb-16 font-sans text-dk-ink antialiased">
      <FeedsHero
        onBrowseCatalog={() => scrollToId('feed-showcase')}
        onSubscribeScroll={() => scrollToId('feed-subscribe')}
      />

      <div id="feed-showcase">
        <FeedShowcaseGrid onOpenProduct={setDetailProduct} />
      </div>

      <div id="feed-subscribe">
        <FeedSubscriptionBanner />
      </div>

      <FeedDetailModal product={detailProduct} onClose={() => setDetailProduct(null)} />
    </div>
  )
}
