import { useTranslation } from 'react-i18next';
import ContactForm from '../../components/about/ContactForm';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-full bg-dk-cream pt-[72px] text-dk-ink md:pt-[76px]">
      <div className="dk-page-inner pb-20 pt-8 sm:pt-12 md:pt-14">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-dk-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-dk-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-dk-green-500 shadow-[0_0_0_4px_var(--green-200)]" aria-hidden />
            {t('contactPage.eyebrow')}
          </div>
          <h1 className="font-serif mt-5 text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.65rem]">
            {t('contactPage.title')}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-dk-muted sm:text-lg">{t('contactPage.lead')}</p>
        </header>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-dk-line bg-white shadow-dk-lg ring-1 ring-dk-line">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
