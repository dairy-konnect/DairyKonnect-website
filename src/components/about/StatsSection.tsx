import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { FaDownload, FaUsers, FaMobile, FaGlobe, FaHandshake, FaChartLine } from 'react-icons/fa';

// Hook for animated counting
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

function StatItem({ icon, value, suffix, label, color }: StatItemProps) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div className="text-center" ref={ref}>
      <div
        className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl ring-1 ring-dk-line ${color}`}
      >
        {icon}
      </div>
      <div className="font-serif text-3xl font-semibold tracking-tight text-dk-green-900 md:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-dk-muted">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <FaDownload className="h-6 w-6 text-dk-green-700" />,
      value: 50,
      suffix: 'K+',
      label: t('stats.totalDownloads'),
      color: 'bg-dk-green-100 text-dk-green-800',
    },
    {
      icon: <FaUsers className="h-6 w-6 text-dk-green-800" />,
      value: 10,
      suffix: 'K+',
      label: t('stats.activeUsers'),
      color: 'bg-dk-sky/30 text-dk-green-900',
    },
    {
      icon: <FaMobile className="h-6 w-6 text-dk-green-800" />,
      value: 4,
      suffix: '',
      label: t('stats.mobileApps'),
      color: 'bg-dk-gold/25 text-dk-green-900',
    },
    {
      icon: <FaGlobe className="h-6 w-6 text-dk-green-800" />,
      value: 5,
      suffix: '',
      label: t('stats.webApps'),
      color: 'bg-dk-green-200/60 text-dk-green-900',
    },
    {
      icon: <FaHandshake className="h-6 w-6 text-dk-green-800" />,
      value: 500,
      suffix: '+',
      label: t('stats.dairiesConnected'),
      color: 'bg-dk-gold/20 text-dk-green-900',
    },
    {
      icon: <FaChartLine className="h-6 w-6 text-dk-green-800" />,
      value: 1,
      suffix: 'M+',
      label: t('stats.transactionsProcessed'),
      color: 'bg-dk-coral/15 text-dk-green-900',
    },
  ];

  return (
    <section aria-labelledby="stats-heading" className="mb-16 md:mb-20">
      <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
        <h2 id="stats-heading" className="font-serif text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl">
          {t('stats.title')}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-dk-muted">{t('stats.description')}</p>
      </header>

      <div className="rounded-[28px] border border-dk-line bg-white p-8 shadow-dk-lg ring-1 ring-dk-line sm:p-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
