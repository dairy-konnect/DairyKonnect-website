import { useTranslation } from 'react-i18next';

export default function HeroStats() {
  const { t } = useTranslation();
  const items = [
    { value: t('hero.stat1Value'), label: t('hero.stat1Label') },
    { value: t('hero.stat2Value'), label: t('hero.stat2Label') },
    { value: t('hero.stat3Value'), label: t('hero.stat3Label') },
    { value: t('hero.stat4Value'), label: t('hero.stat4Label') },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-xl w-full mt-10 sm:mt-12"
      aria-label={t('hero.statsAriaLabel')}
    >
      {items.map((row) => (
        <div key={row.label} className="text-center md:text-left">
          <div className="font-serif text-2xl sm:text-3xl font-semibold text-dk-green-800 leading-none tabular-nums">
            {row.value}
          </div>
          <div className="mt-1.5 text-xs font-medium uppercase tracking-wider text-dk-muted">
            {row.label}
          </div>
        </div>
      ))}
    </div>
  );
}
