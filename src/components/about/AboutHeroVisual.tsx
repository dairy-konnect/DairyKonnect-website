import { useTranslation } from 'react-i18next';
import { FaDesktop, FaMobileAlt } from 'react-icons/fa';

/**
 * Static product snapshot for About — farmer web + mobile (no video).
 */
export default function AboutHeroVisual() {
  const { t } = useTranslation();
  const v = (key: string) => t(`about.visual.${key}`);

  return (
    <div
      className="relative w-full max-w-md md:max-w-none"
      role="img"
      aria-label={v('ariaLabel')}
    >
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[36px] opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(67,196,126,.22), transparent 55%)' }}
        aria-hidden
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-2xl border border-dk-line bg-white p-5 shadow-dk-lg ring-1 ring-dk-line">
          <div className="mb-3 flex items-center gap-2 text-dk-green-800">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-dk-green-100 ring-1 ring-dk-green-200/60">
              <FaDesktop className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide">{v('webBadge')}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-dk-green-900">{v('webTitle')}</h3>
          <p className="mt-1 text-xs leading-relaxed text-dk-muted">{v('webSub')}</p>
          <dl className="mt-4 space-y-2.5 border-t border-dk-line/80 pt-4 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-dk-muted">{v('row1Label')}</dt>
              <dd className="font-mono text-sm font-semibold tabular-nums text-dk-green-900">{v('row1Value')}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-dk-muted">{v('row2Label')}</dt>
              <dd className="font-mono text-sm font-semibold tabular-nums text-dk-green-900">{v('row2Value')}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-dk-muted">{v('row3Label')}</dt>
              <dd className="font-mono text-sm font-semibold tabular-nums text-dk-green-900">{v('row3Value')}</dd>
            </div>
          </dl>
          <p className="mt-3 rounded-xl bg-dk-cream/80 px-3 py-2 text-[11px] font-medium leading-snug text-dk-ink-2 ring-1 ring-dk-line/60">
            {v('vendorTag')}
          </p>
        </div>

        <div className="relative flex flex-col rounded-2xl border border-dk-line bg-gradient-to-b from-dk-green-900 to-dk-green-800 p-1.5 shadow-dk-lg ring-1 ring-dk-green-700/40">
          <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-dk-ink/25" aria-hidden />
          <div className="mt-4 flex flex-1 flex-col rounded-[18px] bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-dk-green-800">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-dk-green-100 ring-1 ring-dk-green-200/60">
                <FaMobileAlt className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide">{v('appBadge')}</span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-dk-green-900">{v('appTitle')}</h3>
            <p className="mt-1 text-xs leading-relaxed text-dk-muted">{v('appSub')}</p>
            <dl className="mt-4 space-y-2.5 border-t border-dk-line/80 pt-4 text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-dk-muted">{v('row1Label')}</dt>
                <dd className="font-mono text-sm font-semibold tabular-nums text-dk-green-900">{v('row1Value')}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-dk-muted">{v('row2Label')}</dt>
                <dd className="font-mono text-sm font-semibold tabular-nums text-dk-green-900">{v('row2Value')}</dd>
              </div>
            </dl>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-dk-green-100 px-2.5 py-1 text-[10px] font-semibold text-dk-green-800 ring-1 ring-dk-green-200/80">
                {v('statusPaid')}
              </span>
              <span className="rounded-full bg-dk-cream-2 px-2.5 py-1 text-[10px] font-semibold text-dk-ink-2 ring-1 ring-dk-line">
                {v('statusPending')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
