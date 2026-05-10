import type { IconType } from 'react-icons';

type Item = { title: string; body: string; Icon: IconType };

export default function FeatureHighlightGrid({ items }: { items: Item[] }) {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {items.map(({ title, body, Icon }) => (
        <div
          key={title}
          className="rounded-[18px] border border-dk-line bg-white p-5 shadow-dk-sm transition hover:-translate-y-0.5 hover:shadow-dk-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-dk-green-100 text-dk-green-800">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
          <h3 className="font-serif text-lg font-semibold text-dk-green-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-dk-ink-2">{body}</p>
        </div>
      ))}
    </div>
  );
}
