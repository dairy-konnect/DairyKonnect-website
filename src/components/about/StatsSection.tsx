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
      <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <FaDownload className="w-6 h-6 text-green-600" />,
      value: 50,
      suffix: 'K+',
      label: t('stats.totalDownloads'),
      color: 'bg-green-100',
    },
    {
      icon: <FaUsers className="w-6 h-6 text-blue-600" />,
      value: 10,
      suffix: 'K+',
      label: t('stats.activeUsers'),
      color: 'bg-blue-100',
    },
    {
      icon: <FaMobile className="w-6 h-6 text-purple-600" />,
      value: 4,
      suffix: '',
      label: t('stats.mobileApps'),
      color: 'bg-purple-100',
    },
    {
      icon: <FaGlobe className="w-6 h-6 text-indigo-600" />,
      value: 5,
      suffix: '',
      label: t('stats.webApps'),
      color: 'bg-indigo-100',
    },
    {
      icon: <FaHandshake className="w-6 h-6 text-orange-600" />,
      value: 500,
      suffix: '+',
      label: t('stats.dairiesConnected'),
      color: 'bg-orange-100',
    },
    {
      icon: <FaChartLine className="w-6 h-6 text-red-600" />,
      value: 1,
      suffix: 'M+',
      label: t('stats.transactionsProcessed'),
      color: 'bg-red-100',
    },
  ];

  return (
    <section aria-labelledby="stats-heading" className="mb-16">
      <div className="text-center mb-10">
        <h2 id="stats-heading" className="text-3xl font-semibold text-gray-900 mb-4">
          {t('stats.title')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('stats.description')}
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 p-8 sm:p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
