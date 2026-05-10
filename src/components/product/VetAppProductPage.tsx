import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaArrowRight,
  FaBrain,
  FaCalendarCheck,
  FaCertificate,
  FaClipboardList,
  FaExclamationTriangle,
  FaFileAlt,
  FaFolderOpen,
  FaMagic,
  FaMapMarkerAlt,
  FaPhoneVolume,
  FaRobot,
  FaStore,
  FaSyringe,
  FaStethoscope,
  FaTractor,
  FaVideo,
  FaWallet,
} from 'react-icons/fa';
import AppStoreBadges from './AppStoreBadges';
import FeatureHighlightGrid from './FeatureHighlightGrid';

const farmerBulletIcons = [FaVideo, FaRobot, FaSyringe, FaStore, FaPhoneVolume, FaClipboardList];
const doctorBulletIcons = [FaCalendarCheck, FaFolderOpen, FaFileAlt, FaCertificate, FaWallet, FaMapMarkerAlt];

type SignInMode = 'farmer' | 'doctor';

function VetHeroPanel({
  mode,
  farmerBullets,
  doctorBullets,
}: {
  mode: SignInMode;
  farmerBullets: string[];
  doctorBullets: string[];
}) {
  const { t } = useTranslation();
  const isFarmer = mode === 'farmer';
  const bullets = isFarmer ? farmerBullets : doctorBullets;
  const icons = isFarmer ? farmerBulletIcons : doctorBulletIcons;

  return (
    <div
      id="vet-hero-preview"
      className={`relative mx-auto w-full max-w-xl overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(15,58,46,0.12),0_8px_20px_rgba(15,58,46,0.06)] ring-1 ring-black/5 transition-[box-shadow,transform] duration-300 lg:max-w-none ${
        isFarmer
          ? 'border border-[#f5d78a] bg-gradient-to-br from-white via-[#fffdf9] to-[#fef3e0]'
          : 'border border-dk-green-800/40 bg-gradient-to-br from-[#0a2a22] via-dk-green-900 to-dk-green-700 text-white'
      }`}
      role="tabpanel"
      aria-labelledby={isFarmer ? 'vet-tab-farmer' : 'vet-tab-doctor'}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full opacity-55 blur-3xl"
        style={{
          background: isFarmer
            ? 'radial-gradient(circle, rgba(196,82,26,.18), transparent 72%)'
            : 'radial-gradient(circle, rgba(124,224,168,.28), transparent 72%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full opacity-40 blur-3xl"
        style={{
          background: isFarmer
            ? 'radial-gradient(circle, rgba(31,122,77,.12), transparent 70%)'
            : 'radial-gradient(circle, rgba(0,0,0,.35), transparent 65%)',
        }}
        aria-hidden
      />
      <div className="relative p-6 sm:p-9">
        <div className="flex flex-wrap items-start gap-5">
          <div
            className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl shadow-md ${
              isFarmer
                ? 'bg-gradient-to-br from-[#fef0d4] to-[#f5d78a] text-[#8b5a12] ring-1 ring-[#f9d97a]/80'
                : 'bg-white/12 text-white ring-1 ring-white/15 backdrop-blur-sm'
            }`}
          >
            {isFarmer ? <FaTractor className="h-8 w-8" aria-hidden /> : <FaStethoscope className="h-8 w-8" aria-hidden />}
          </div>
          <div className="min-w-0 flex-1 border-b border-dk-line/50 pb-6 sm:pb-7">
            <p
              className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                isFarmer
                  ? 'border border-[#f5d78a]/90 bg-white/80 text-[#a8761c] shadow-sm'
                  : 'border border-white/15 bg-white/10 text-dk-green-200'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isFarmer ? 'bg-[#c4521a]' : 'bg-dk-green-400'}`}
                aria-hidden
              />
              {isFarmer ? t('vetAppPage.farmerRole') : t('vetAppPage.doctorRole')}
            </p>
            <h2
              className={`font-serif mt-3 text-[1.65rem] font-semibold leading-tight tracking-tight sm:text-[1.85rem] ${
                isFarmer ? 'text-dk-green-900' : 'text-white'
              }`}
            >
              {isFarmer ? t('vetAppPage.farmerCardTitle') : t('vetAppPage.doctorCardTitle')}
            </h2>
            <p className={`mt-3 max-w-prose text-[15px] leading-relaxed ${isFarmer ? 'text-dk-ink-2' : 'text-white/88'}`}>
              {isFarmer ? t('vetAppPage.farmerCardBody') : t('vetAppPage.doctorCardBody')}
            </p>
          </div>
        </div>

        <ul className="mt-2 flex flex-col gap-3">
          {bullets.map((text, i) => {
            const Icon = icons[i] ?? FaVideo;
            return (
              <li
                key={text}
                className={`flex items-start gap-3.5 rounded-2xl px-4 py-3.5 text-[14px] leading-snug transition duration-200 ${
                  isFarmer
                    ? 'border border-dk-line/60 bg-white/95 text-dk-ink-2 shadow-sm hover:border-dk-green-200 hover:shadow-md'
                    : 'border border-white/12 bg-white/[0.08] text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.12]'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    isFarmer
                      ? 'bg-gradient-to-br from-[#fff0e6] to-[#fee9d6] text-[#c4521a] ring-1 ring-[#f5d78a]/50'
                      : 'bg-white/10 text-dk-green-300 ring-1 ring-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 pt-0.5">{text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function VetAppProductPage() {
  const { t } = useTranslation();
  const [signIn, setSignIn] = useState<SignInMode>('farmer');
  const sharedRaw = t('vetAppPage.sharedFeatures', { returnObjects: true }) as { title: string; body: string }[];
  const sharedItems = [
    { ...sharedRaw[0], Icon: FaVideo },
    { ...sharedRaw[1], Icon: FaBrain },
    { ...sharedRaw[2], Icon: FaCalendarCheck },
    { ...sharedRaw[3], Icon: FaExclamationTriangle },
  ];
  const farmerBullets = t('vetAppPage.farmerBullets', { returnObjects: true }) as string[];
  const doctorBullets = t('vetAppPage.doctorBullets', { returnObjects: true }) as string[];
  const marketStats = t('vetAppPage.marketStats', { returnObjects: true }) as { value: string; label: string }[];

  return (
    <div className="min-h-full bg-dk-cream pb-20 pt-[72px] md:pt-[76px]">
      <section className="dk-page-inner">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fee9d6] px-3 py-1.5 text-xs font-semibold text-[#c4521a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4521a] shadow-[0_0_0_4px_#fee9d6]" aria-hidden />
              {t('vetAppPage.eyebrow')}
            </div>
            <h1 className="font-serif mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.5rem]">
              {t('vetAppPage.titleBefore')}
              <em className="not-italic text-[#c4521a]">{t('vetAppPage.titleEm')}</em>
              {t('vetAppPage.titleAfter')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-dk-ink-2 sm:text-[17px]">{t('vetAppPage.intro')}</p>

            <div
              id="vet-signin-tabs"
              className="mt-6 inline-flex gap-1 rounded-2xl bg-dk-cream-2 p-1.5"
              role="tablist"
              aria-label={t('vetAppPage.toggleAria')}
            >
              <button
                type="button"
                role="tab"
                aria-selected={signIn === 'farmer'}
                id="vet-tab-farmer"
                aria-controls="vet-hero-preview"
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition ${
                  signIn === 'farmer' ? 'bg-white text-[#c4521a] shadow-dk-sm' : 'text-dk-muted hover:text-dk-ink-2'
                }`}
                onClick={() => setSignIn('farmer')}
              >
                <FaTractor className="h-4 w-4 shrink-0" aria-hidden />
                {t('vetAppPage.pillFarmer')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={signIn === 'doctor'}
                id="vet-tab-doctor"
                aria-controls="vet-hero-preview"
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition ${
                  signIn === 'doctor' ? 'bg-white text-dk-green-900 shadow-dk-sm' : 'text-dk-muted hover:text-dk-ink-2'
                }`}
                onClick={() => setSignIn('doctor')}
              >
                <FaStethoscope className="h-4 w-4 shrink-0" aria-hidden />
                {t('vetAppPage.pillDoctor')}
              </button>
            </div>

            <p className="mt-4 max-w-xl text-sm text-dk-muted">
              {signIn === 'farmer' ? t('vetAppPage.toggleHintFarmer') : t('vetAppPage.toggleHintDoctor')}
            </p>

            <AppStoreBadges
              appleLabel={t('vetAppPage.storeAppleLabel')}
              appleTitle={t('vetAppPage.storeAppleTitle')}
              googleLabel={t('vetAppPage.storeGoogleLabel')}
              googleTitle={t('vetAppPage.storeGoogleTitle')}
            />
          </div>

          <VetHeroPanel mode={signIn} farmerBullets={farmerBullets} doctorBullets={doctorBullets} />
        </div>

        <div className="mx-auto mt-20 max-w-[720px] text-center">
          <div className="inline-flex rounded-full bg-[#fee9d6] px-3 py-1.5 text-xs font-semibold text-[#c4521a]">{t('vetAppPage.dualEyebrow')}</div>
          <h2 className="font-serif mt-3 text-3xl font-semibold leading-tight text-dk-green-900 sm:text-[2.35rem]">
            {t('vetAppPage.dualTitleBefore')}
            <em className="not-italic text-[#c4521a]">{t('vetAppPage.dualTitleEm')}</em>
          </h2>
          <p className="mt-3 text-base text-dk-ink-2">{t('vetAppPage.dualLead')}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          <button
            type="button"
            onClick={() => setSignIn('farmer')}
            className={`rounded-[28px] border bg-gradient-to-br from-white to-[#fef0d4] p-8 text-left shadow-dk-sm transition hover:brightness-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c4521a] focus-visible:ring-offset-2 ${
              signIn === 'farmer' ? 'border-[#c4521a] ring-2 ring-[#c4521a]/35 ring-offset-2 ring-offset-dk-cream' : 'border-[#f9d97a]'
            }`}
          >
            <div className="mb-5 flex items-center gap-3.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef0d4] text-[#a8761c]">
                <FaTractor className="h-7 w-7" aria-hidden />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#a8761c]">{t('vetAppPage.farmerRole')}</div>
                <h3 className="font-serif text-2xl font-semibold text-dk-green-900">{t('vetAppPage.farmerCardTitle')}</h3>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-dk-ink-2">{t('vetAppPage.farmerCardBody')}</p>
            <ul className="mb-6 flex flex-col gap-2.5">
              {farmerBullets.map((text, i) => {
                const Icon = farmerBulletIcons[i] ?? FaVideo;
                return (
                  <li
                    key={text}
                    className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-[13.5px] text-dk-ink-2 shadow-sm"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#c4521a]" aria-hidden />
                    {text}
                  </li>
                );
              })}
            </ul>
          </button>

          <button
            type="button"
            onClick={() => setSignIn('doctor')}
            className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br from-dk-green-900 to-dk-green-600 p-8 text-left text-white shadow-dk-lg transition hover:brightness-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-dk-green-300 focus-visible:ring-offset-2 ${
              signIn === 'doctor' ? 'ring-2 ring-dk-green-300/80 ring-offset-2 ring-offset-dk-cream' : ''
            }`}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-20 h-[300px] w-[300px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(67,196,126,.22), transparent 70%)' }}
              aria-hidden
            />
            <div className="relative mb-5 flex items-center gap-3.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <FaStethoscope className="h-7 w-7" aria-hidden />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-dk-green-300">{t('vetAppPage.doctorRole')}</div>
                <h3 className="font-serif text-2xl font-semibold">{t('vetAppPage.doctorCardTitle')}</h3>
              </div>
            </div>
            <p className="relative mb-6 text-sm leading-relaxed text-white/80">{t('vetAppPage.doctorCardBody')}</p>
            <ul className="relative mb-6 flex flex-col gap-2.5">
              {doctorBullets.map((text, i) => {
                const Icon = doctorBulletIcons[i] ?? FaCalendarCheck;
                return (
                  <li
                    key={text}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-[13.5px] text-white/95"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-dk-green-300" aria-hidden />
                    {text}
                  </li>
                );
              })}
            </ul>
          </button>
        </div>

        <div className="mx-auto mt-20 max-w-[680px] text-center">
          <div className="inline-flex rounded-full bg-dk-green-100 px-3 py-1.5 text-xs font-semibold text-dk-green-800">{t('vetAppPage.sharedEyebrow')}</div>
          <h2 className="font-serif mt-3 text-3xl font-semibold text-dk-green-900 sm:text-[2.1rem]">{t('vetAppPage.sharedTitle')}</h2>
        </div>
        <FeatureHighlightGrid items={sharedItems} />

        <div className="relative mt-16 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#7a4a1a] to-[#3a2210] p-8 text-white shadow-dk-lg md:grid md:grid-cols-[1.25fr_1fr] md:items-center md:gap-10 md:p-12">
          <div
            className="pointer-events-none absolute -right-32 -top-24 h-[400px] w-[400px] rounded-full opacity-90"
            style={{ background: 'radial-gradient(circle, rgba(200,155,58,.22), transparent 70%)' }}
            aria-hidden
          />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
              <FaMagic className="h-3.5 w-3.5 text-[#f9d97a]" aria-hidden />
              {t('vetAppPage.marketEyebrow')}
            </div>
            <h3 className="font-serif text-3xl font-semibold leading-tight sm:text-[2.1rem]">
              {t('vetAppPage.marketTitle')}
              <em className="not-italic text-[#f9d97a]">{t('vetAppPage.marketTitleEm')}</em>
            </h3>
            <p className="mt-4 max-w-xl text-base text-white/85">{t('vetAppPage.marketBody')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/market"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#3a2210] shadow-dk-sm transition hover:bg-dk-cream-2"
              >
                {t('vetAppPage.marketCtaOpen')}
                <FaArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <button
                type="button"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t('vetAppPage.marketCtaLearn')}
              </button>
            </div>
          </div>
          <div className="relative mt-8 grid grid-cols-2 gap-2.5 md:mt-0">
            {marketStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-center backdrop-blur-sm"
              >
                <div className="font-serif text-2xl font-semibold text-[#f9d97a]">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
