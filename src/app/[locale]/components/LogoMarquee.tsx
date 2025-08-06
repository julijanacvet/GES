
'use client';

import React from 'react';
import Image from 'next/image';

const logos = [
  { src: "/locales/images/logos/Amsterdam.svg", alt: "Amsterdam" },
  { src: "/locales/images/logos/Colorado.svg", alt: "Colorado" },
  { src: "/locales/images/logos/Nairobi.svg", alt: "Nairobi" },
  { src: "/locales/images/logos/Hudon.svg", alt: "Hudon" },
  { src: "/locales/images/logos/Aura.svg", alt: "Aura" },
  { src: "/locales/images/logos/Aiken.svg", alt: "Aiken" },
];

const MarqueeTrack = React.forwardRef<HTMLDivElement, { 'aria-hidden'?: boolean }>((props, ref) => (
    <div ref={ref} className="marquee__track" {...props}>
      {logos.map((logo, index) => (
        <div key={index} className="marquee__item">
           <div style={{ width: '120px', height: '60px', position: 'relative' }}>
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              fill
              style={{ objectFit: 'contain' }}
              sizes="120px"
            />
          </div>
        </div>
      ))}
    </div>
));
MarqueeTrack.displayName = 'MarqueeTrack';


export default function LogoMarquee() {
  return (
    <section className="bg-background py-12 md:py-16">
        <div className="marquee">
            <div className="marquee__ctn">
              <MarqueeTrack />
              <MarqueeTrack aria-hidden={true} />
            </div>
        </div>
    </section>
  );
}

    