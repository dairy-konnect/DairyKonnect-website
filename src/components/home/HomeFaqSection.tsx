import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type FaqItem = { q: string; a: string };

export default function HomeFaqSection() {
  const { t } = useTranslation();
  const faq = t('homePage.faq', { returnObjects: true }) as {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    sidebarLead: string;
    talkCta: string;
    items: FaqItem[];
  };

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="home-faq" className="w-full py-16 sm:py-20 md:py-24" aria-labelledby="faq-heading">
      <div className="home-section-inner grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <span className="inline-block rounded-full bg-dk-green-100 px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 sm:text-[13px]">
            {faq.eyebrow}
          </span>
          <h2
            id="faq-heading"
            className="font-serif mt-3.5 text-3xl font-semibold leading-[1.05] tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.875rem]"
          >
            {faq.titleBefore}
            <em className="not-italic text-dk-green-700">{faq.titleEm}</em>
            {faq.titleAfter}
          </h2>
          <p className="mt-4 text-base text-dk-ink-2">{faq.sidebarLead}</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-5 py-3 text-sm font-semibold text-white shadow-dk-sm transition hover:brightness-110"
          >
            {faq.talkCta}
            <FaArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="flex flex-col gap-3.5">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border bg-white transition hover:border-dk-green-300 ${
                  open ? 'border-dk-green-300' : 'border-dk-line'
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                >
                  <span className="text-base font-semibold text-dk-green-900">{item.q}</span>
                  <FaPlus
                    className={`h-[18px] w-[18px] shrink-0 text-dk-green-800 transition-transform ${open ? 'rotate-45' : ''}`}
                    aria-hidden
                  />
                </button>
                {open && (
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-dk-ink-2 sm:px-6">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
