'use client';

import React from 'react';

// Correctly points to the new local image paths.
// Assumes the filenames are as per the original URLs.
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
        <div key={index} className="marquee__item" aria-label={logo.alt}>
           <div className="w-[120px] h-[60px] flex items-center justify-center">
            {/* Using standard <img> tag as per user guidance for reliability */}
            <img src={logo.src} alt={logo.alt} className="h-[60px] w-auto object-contain" />
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
              {/* The second track is duplicated by CSS animation for a seamless loop */}
              <MarqueeTrack aria-hidden={true} />
            </div>
        </div>
    </section>
  );
}
