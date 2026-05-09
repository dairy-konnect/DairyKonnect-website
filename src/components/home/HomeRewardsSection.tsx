import { FaGift, FaLeaf, FaUsers } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type Tier = { badge: string; title: string; desc: string };

const tierBadgeClass: Record<number, string> = {
  0: 'bg-gradient-to-br from-[#bd9b6b] to-[#8c6f3c]',
  1: 'bg-gradient-to-br from-[#c0c0c0] to-[#7a7a7a]',
  2: 'bg-gradient-to-br from-[#ffd44d] to-dk-gold',
  3: 'bg-gradient-to-br from-dk-green-500 to-dk-green-800',
};

export default function HomeRewardsSection() {
  const { t } = useTranslation();
  const rw = t('homePage.rewards', { returnObjects: true }) as Record<string, string> & { tiers: Tier[] };
  const tiers = rw.tiers as Tier[];

  const rewardRows = [
    { icon: FaGift, title: rw.r1Title, sub: rw.r1Pts, cta: rw.r1Cta, gold: false },
    { icon: FaLeaf, title: rw.r2Title, sub: rw.r2Pts, cta: rw.r2Cta, gold: false },
    { icon: FaUsers, title: rw.r3Title, sub: rw.r3Pts, cta: rw.r3Cta, gold: true },
  ];

  return (
    <section
      className="w-full bg-gradient-to-br from-[#fff8e6] to-[#fef0d4] py-16 sm:py-20 md:py-24"
      aria-labelledby="rewards-heading"
    >
      <div className="home-section-inner grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <span className="inline-block rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-dk-gold shadow-dk-sm sm:text-[13px]">
            {rw.eyebrow}
          </span>
          <h2
            id="rewards-heading"
            className="font-serif mt-3.5 text-3xl font-semibold leading-[1.05] tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem]"
          >
            {rw.titleBefore}
            <em className="not-italic text-dk-gold">{rw.titleEm}</em>
            {rw.titleAfter}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-dk-ink-2 sm:text-[17px]">{rw.lead}</p>

          <div className="mt-8 grid gap-3.5">
            {tiers.map((tier, i) => (
              <div
                key={tier.badge}
                className="flex items-center gap-3.5 rounded-2xl border border-dk-gold/20 bg-white/50 p-4 sm:gap-3.5 sm:p-4"
              >
                <div
                  className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px] font-serif text-lg font-bold text-white ${tierBadgeClass[i] ?? tierBadgeClass[0]}`}
                >
                  {tier.badge}
                </div>
                <div>
                  <strong className="font-serif block text-lg text-dk-green-900">{tier.title}</strong>
                  <span className="mt-0.5 block text-[13px] text-dk-ink-2">{tier.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-dk-line bg-white p-6 shadow-dk-md sm:p-8">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg text-dk-green-900">{rw.walletTitle}</h3>
              <p className="mt-0.5 text-xs text-dk-muted">{rw.walletSubtitle}</p>
            </div>
            <div className="text-right">
              <div className="font-serif text-3xl font-semibold text-dk-gold">{rw.pointsValue}</div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-dk-muted">{rw.pointsLabel}</div>
            </div>
          </div>
          <div className="mb-2 h-2.5 overflow-hidden rounded-full bg-dk-green-100">
            <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-dk-gold to-[#e3b85b]" />
          </div>
          <div className="mb-5 flex justify-between text-xs text-dk-muted">
            <span>{rw.progressFrom}</span>
            <span>{rw.progressTo}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {rewardRows.map((row) => (
              <div
                key={row.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dk-line px-3 py-3 sm:px-3 sm:py-3"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-dk-green-100 text-dk-green-800">
                    <row.icon className="h-[18px] w-[18px]" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-[13px] text-dk-green-900">{row.title}</strong>
                    <span className="text-[11.5px] text-dk-muted">{row.sub}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110 ${
                    row.gold ? 'bg-dk-gold' : 'bg-dk-green-700'
                  }`}
                >
                  {row.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
