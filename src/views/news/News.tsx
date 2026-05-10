import QuesCards from '../../components/news/QuesCards'

export default function News() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-dk-cream via-dk-green-100/35 to-dk-cream-2 py-10 sm:py-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(67,196,126,0.22),transparent_65%)]"
        aria-hidden
      />
      <div className="dk-page-inner relative">
        <QuesCards />
      </div>
    </div>
  )
}
