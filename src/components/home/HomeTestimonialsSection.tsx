import { useTranslation } from 'react-i18next';

type Item = { quote: string; initials: string; name: string; role: string };

const avatarGradients = [
  'from-dk-green-500 to-dk-green-800',
  'from-dk-coral to-[#c4521a]',
  'from-[#5a3da6] to-[#3a2570]',
];

export default function HomeTestimonialsSection() {
  const { t } = useTranslation();
  const block = t('homePage.testimonials', { returnObjects: true }) as {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    items: Item[];
  };

  return (
    <section
      id="home-testimonials"
      className="w-full bg-dk-cream py-16 sm:py-20 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="home-section-inner">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-14">
          <span className="inline-block rounded-full bg-dk-green-100 px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 sm:text-[13px]">
            {block.eyebrow}
          </span>
          <h2
            id="testimonials-heading"
            className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-dk-green-900 sm:text-4xl md:text-5xl"
          >
            {block.titleBefore}
            <em className="not-italic font-medium text-dk-green-700">{block.titleEm}</em>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {block.items.map((item, i) => (
            <blockquote
              key={item.name}
              className="flex flex-col rounded-[22px] border border-dk-line bg-white p-7 shadow-dk-sm sm:p-8"
            >
              <p className="font-serif text-lg italic leading-snug text-dk-green-900 sm:text-[19px]">{item.quote}</p>
              <footer className="mt-6 flex items-center gap-3.5 border-t border-dk-line/0 pt-2">
                <div
                  className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-serif text-lg font-bold text-white ${avatarGradients[i] ?? avatarGradients[0]}`}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <cite className="not-italic block text-[15px] font-semibold text-dk-green-900">{item.name}</cite>
                  <span className="mt-0.5 block text-[13px] text-dk-muted">{item.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
