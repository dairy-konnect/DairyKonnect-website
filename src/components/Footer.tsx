import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LOGO from '../assets/logo.png';

const FOOTER_BG = '#0f3a2e';

function FootLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block py-1.5 text-sm text-white/70 transition hover:text-[#7ce0a8]"
    >
      {children}
    </Link>
  );
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="mb-[18px] text-[13px] font-semibold uppercase tracking-[0.1em] text-white">
        {title}
      </h5>
      <nav className="flex flex-col">{children}</nav>
    </div>
  );
}

const socialLinks = [
  { Icon: FaTwitter, href: 'https://x.com', label: 'X' },
  { Icon: FaInstagram, href: 'https://www.instagram.com', label: 'Instagram' },
  { Icon: FaYoutube, href: 'https://www.youtube.com', label: 'YouTube' },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com', label: 'LinkedIn' },
] as const;

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full text-white/75"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <div className="mx-auto max-w-[1320px] px-4 pb-8 pt-14 sm:px-6 md:px-8 md:pb-10">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))] lg:gap-x-10 lg:gap-y-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={t('common.ourDairy')}
            >
              <img
                src={LOGO}
                alt={t('common.ourDairy')}
                className="h-10 w-auto max-w-[220px] object-contain object-left sm:h-11"
              />
            </Link>
            <h4 className="mt-3.5 font-semibold text-[22px] leading-snug text-white sm:text-xl">
              {t('footer.tagline')}
            </h4>
            <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-white/75">
              {t('footer.description')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] text-white/90 transition hover:bg-[#1f7a4d]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <FootCol title={t('nav.dashboards')}>
            <FootLink to="/dairy">{t('nav.dairyDashTitle')}</FootLink>
            <FootLink to="/vendor">{t('nav.vendorDashTitle')}</FootLink>
            <FootLink to="/farmer">{t('nav.farmerDashTitle')}</FootLink>
          </FootCol>

          <FootCol title={t('footer.appsAndTools')}>
            <FootLink to="/farmer">{t('nav.farmerAppTitle')}</FootLink>
            <FootLink to="/vet">{t('nav.vetAppTitle')}</FootLink>
            <FootLink to="/market">{t('footer.marketplace')}</FootLink>
            <FootLink to="/milk-prices">{t('footer.milkPrices')}</FootLink>
            <FootLink to="/feeds">{t('common.feeds')}</FootLink>
          </FootCol>

          <FootCol title={t('footer.byRole')}>
            <FootLink to="/dairy">{t('footer.forDairies')}</FootLink>
            <FootLink to="/vendor">{t('footer.forVendors')}</FootLink>
            <FootLink to="/farmer">{t('footer.forFarmers')}</FootLink>
            <FootLink to="/vet">{t('footer.forVets')}</FootLink>
          </FootCol>

          <FootCol title={t('common.company')}>
            <FootLink to="/about">{t('footer.aboutUs')}</FootLink>
            <FootLink to="/news">{t('footer.newsArticles')}</FootLink>
            <FootLink to="/contact?topic=careers">{t('footer.careers')}</FootLink>
            <FootLink to="/contact?topic=press">{t('footer.press')}</FootLink>
            <FootLink to="/contact">{t('common.contactUs')}</FootLink>
          </FootCol>

          <FootCol title={t('footer.legal')}>
            <FootLink to="/privacy-policy">{t('footer.privacy')}</FootLink>
            <FootLink to="/terms">{t('footer.termsShort')}</FootLink>
            <FootLink to="/privacy-policy">{t('footer.cookies')}</FootLink>
            <FootLink to="/privacy-policy">{t('footer.security')}</FootLink>
          </FootCol>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {t('common.copyright', { year })}{' '}
            <span className="text-white/50">·</span>{' '}
            {t('footer.madeInIndia')}
          </span>
          <span className="inline-flex flex-wrap items-center gap-2">
            <span>{t('footer.statusLabel')}</span>
            <span className="text-[#7ce0a8]" aria-hidden>
              ●
            </span>
            <span>{t('footer.statusOperational')}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
