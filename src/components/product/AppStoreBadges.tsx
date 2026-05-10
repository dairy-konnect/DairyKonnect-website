import { FaApple, FaGooglePlay } from 'react-icons/fa';

type Props = {
  appleLabel: string;
  appleTitle: string;
  googleLabel: string;
  googleTitle: string;
};

export default function AppStoreBadges({ appleLabel, appleTitle, googleLabel, googleTitle }: Props) {
  return (
    <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-dk-line bg-white px-4 py-3 shadow-dk-sm">
        <FaApple className="h-7 w-7 shrink-0 text-dk-ink" aria-hidden />
        <div className="text-left leading-tight">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-dk-muted">{appleLabel}</span>
          <strong className="font-serif text-base text-dk-green-900">{appleTitle}</strong>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-dk-line bg-white px-4 py-3 shadow-dk-sm">
        <FaGooglePlay className="h-6 w-6 shrink-0 text-dk-green-700" aria-hidden />
        <div className="text-left leading-tight">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-dk-muted">{googleLabel}</span>
          <strong className="font-serif text-base text-dk-green-900">{googleTitle}</strong>
        </div>
      </div>
    </div>
  );
}
