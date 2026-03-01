import { useState, useRef } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaGlobe, FaTruck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface Dealer { 
  id: number; 
  name: string; 
  phone: string; 
  address: string; 
  website: string; 
  delivery: string; 
  logo: string;
  description?: string;
}

const dealers: Dealer[] = [
  { 
    id: 1, 
    name: 'Sunny Dairy Supplies', 
    phone: '+1 (555) 123-4567', 
    address: '123 Dairy Lane, Farmville, CA', 
    website: 'https://images-platform.99static.com/SClPwlOFZar557w0LSepf01MrbI=/500x500/top/smart/99designs-contests-attachments/41/41345/attachment_41345533', 
    delivery: 'Fast delivery within 2-3 business days', 
    logo: 'https://images-platform.99static.com/SClPwlOFZar557w0LSepf01MrbI=/500x500/top/smart/99designs-contests-attachments/41/41345/attachment_41345533',
    description: 'Leading supplier of premium dairy feed solutions with over 20 years of experience.'
  },
  { 
    id: 2, 
    name: 'Green Pastures Feed Co.', 
    phone: '+1 (555) 234-5678', 
    address: '456 Feed Street, Grassville, TX', 
    website: 'https://images-platform.99static.com/SClPwlOFZar557w0LSepf01MrbI=/500x500/top/smart/99designs-contests-attachments/41/41345/attachment_41345533', 
    delivery: 'Next-day delivery available', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLvP8XmLMEcTMlMQFffUVloDuVfvbZG2CcRI4yC5poXjpwbWOBQjB9Idzgg&s',
    description: 'Specializing in organic and sustainable feed options for healthy livestock.'
  },
  { 
    id: 3, 
    name: 'Harvest Nutrition', 
    phone: '+1 (555) 345-6789', 
    address: '789 Harvest Road, Crop City, FL', 
    website: 'https://images-platform.99static.com/SClPwlOFZar557w0LSepf01MrbI=/500x500/top/smart/99designs-contests-attachments/41/41345/attachment_41345533', 
    delivery: 'Standard delivery within 5-7 business days', 
    logo: 'https://images-workbench.99static.com/Hdn1Cng0mRCfJ1bStIci4Edwr5A=/99designs-contests-attachments/144/144178/attachment_144178775',
    description: 'Committed to providing high-quality nutritional feed for optimal dairy production.'
  },
];

interface DealerCardProps {
  dealer: Dealer;
}

function DealerCard({ dealer }: DealerCardProps) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current) {
      const bounds = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-full h-[500px] rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer border border-gray-200"
    >
      {visible && (
        <div
          className="pointer-events-none blur-xl bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 size-60 absolute z-0 transition-opacity duration-300"
          style={{ top: position.y - 120, left: position.x - 120 }}
        />
      )}
      <div className="relative z-10 bg-white p-6 h-full w-full rounded-[10px] flex flex-col text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={dealer.logo}
            alt={`${dealer.name} logo`}
            className="w-24 h-24 rounded-full shadow-md object-cover border-2 border-gray-100"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{dealer.name}</h2>
        
        {/* Subtitle */}
        <p className="text-sm text-green-500 font-medium mb-3">{t('common.trustedFeedSupplier')}</p>
        
        {/* Description */}
        <p className="text-sm text-gray-500 mb-6 px-2 leading-relaxed">
          {dealer.description || t('common.qualityFeedSolutions')}
        </p>
        
        {/* Contact Information */}
        <div className="w-full space-y-3 mb-6 text-sm flex-grow">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <FaPhoneAlt className="text-green-500 flex-shrink-0" />
            <span>{dealer.phone}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-green-500 flex-shrink-0" />
            <span className="break-words text-center">{dealer.address}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <FaTruck className="text-green-500 flex-shrink-0" />
            <span className="break-words text-center">{dealer.delivery}</span>
          </div>
        </div>

        {/* Globe Icon */}
        <div className="flex justify-center mb-4">
          <a
            href={dealer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600 hover:-translate-y-0.5 transition inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGlobe className="size-6" />
          </a>
        </div>

        {/* Visit Website Button */}
        <a
          href={dealer.website}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full px-4 py-2.5 bg-green-500 text-white rounded-lg transition text-sm font-medium overflow-hidden group"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <FaGlobe className="size-4" />
            <span>{t('common.visitWebsite')}</span>
          </span>
          <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
        </a>
      </div>
    </div>
  );
}

export default function DealerList() {
  const { t } = useTranslation()
  return (
    <section className="mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {t('common.ourTrustedDealers')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <DealerCard key={dealer.id} dealer={dealer} />
          ))}
        </div>
      </div>
    </section>
  );
}
