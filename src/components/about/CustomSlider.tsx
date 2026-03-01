import { useEffect, useState } from 'react';

interface Testimonial { id:number; image:string; name:string; testimonial:string }

const testimonials: Testimonial[] = [
  { id:1, image:'https://via.placeholder.com/50x50', name:'Alex B.', testimonial:'This platform has transformed the way we handle our dairy transactions. It\'s user-friendly and highly efficient.' },
  { id:2, image:'https://via.placeholder.com/50x50', name:'Priya S.', testimonial:'The automated billing and payment tracking features have made managing our business much easier.' },
  { id:3, image:'https://via.placeholder.com/50x50', name:'Raj M.', testimonial:'An invaluable tool for our daily operations. The reporting tools help with informed decisions.' },
  { id:4, image:'https://via.placeholder.com/50x50', name:'Nina T.', testimonial:'Seamless integration into workflow has been a game-changer.' }
];

export default function CustomSlider(){
  const [current, setCurrent] = useState(0);

  useEffect(()=>{ const t = setInterval(()=> setCurrent(p=> (p+1)%testimonials.length), 3000); return ()=> clearInterval(t); },[]);

  const next = ()=> setCurrent(p=> (p+1)%testimonials.length);
  const prev = ()=> setCurrent(p=> (p-1+testimonials.length)%testimonials.length);

  return (
    <div>
      <div style={{ transform:`translateX(-${current*100}%)` }}>
        {testimonials.map(t => (
          <div key={t.id}>
            <img src={t.image} alt={t.name} />
            <div>
              <p>{t.name}</p>
              <p>{t.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button aria-label="Previous" onClick={prev}>&lt;</button>
        <button aria-label="Next" onClick={next}>&gt;</button>
      </div>
    </div>
  );
}
