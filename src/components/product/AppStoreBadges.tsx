import { FaApple, FaGooglePlay } from 'react-icons/fa';

type Props = {
  appleLabel: string;
  appleTitle: string;
  googleLabel: string;
  googleTitle: string;
  /** When set, badges act as one action (e.g. launching-soon modal) instead of static visuals. */
  onPress?: () => void;
};

const badgeClass =
  'flex w-full items-center gap-3 rounded-2xl border border-dk-line bg-white px-4 py-3 text-left shadow-dk-sm transition hover:border-dk-green-300 sm:w-auto';

export default function AppStoreBadges({ appleLabel, appleTitle, googleLabel, googleTitle, onPress }: Props) {
  const apple = (
    <>
      <FaApple className="h-7 w-7 shrink-0 text-dk-ink" aria-hidden />
      <div className="text-left leading-tight">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-dk-muted">{appleLabel}</span>
        <strong className="font-serif text-base text-dk-green-900">{appleTitle}</strong>
      </div>
    </>
  );
  const google = (
    <>
      <FaGooglePlay className="h-6 w-6 shrink-0 text-dk-green-700" aria-hidden />
      <div className="text-left leading-tight">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-dk-muted">{googleLabel}</span>
        <strong className="font-serif text-base text-dk-green-900">{googleTitle}</strong>
      </div>
    </>
  );

  return (
    <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
      {onPress ? (
        <>
          <button type="button" onClick={onPress} className={badgeClass}>
            {apple}
          </button>
          <button type="button" onClick={onPress} className={badgeClass}>
            {google}
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 rounded-2xl border border-dk-line bg-white px-4 py-3 shadow-dk-sm">{apple}</div>
          <div className="flex items-center gap-3 rounded-2xl border border-dk-line bg-white px-4 py-3 shadow-dk-sm">{google}</div>
        </>
      )}
    </div>
  );
}
