import { useTranslation } from 'react-i18next'

interface TestimonialCard {
  image: string;
  name: string;
  role: string;
  text: string;
}

export default function TestimonialSlider() {
  const { t } = useTranslation()
  
  const testimonials: TestimonialCard[] = [
    {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop',
      name: 'Rajesh Kumar',
      role: t('common.dairyOwner'),
      text: t('testimonials.testimonial1')
    },
    {
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&auto=format&fit=crop',
      name: 'Priya Sharma',
      role: t('common.milkSeller'),
      text: t('testimonials.testimonial2')
    },
    {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop',
      name: 'Sunita Devi',
      role: t('common.dairyManager'),
      text: t('testimonials.testimonial3')
    },
  ];

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialCard }) => (
  <div className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
    <div className="flex flex-col items-center px-5 py-4 relative">
      <img
        className="h-24 w-24 absolute -top-14 rounded-full object-cover"
        src={testimonial.image}
        alt={testimonial.name}
      />
      <div className="pt-8 text-center">
        <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
        <p className="text-gray-800/80">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-gray-500 px-6 text-center">{testimonial.text}</p>
    <div className="flex justify-center pt-4">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
    </div>
  </div>
);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 pt-14">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </div>
  );
}
