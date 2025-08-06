
'use client';

import React from 'react';

// Defines the logos with correct local paths and descriptive alt text.
const logos = [
  { src: "/locales/images/logos/Amsterdam.svg", alt: "Amsterdam Logo" },
  { src: "/locales/images/logos/Colorado.svg", alt: "Colorado Logo" },
  { src: "/locales/images/logos/Nairobi.svg", alt: "Nairobi Logo" },
  { src: "/locales/images/logos/Hudon.svg", alt: "Hudon Logo" },
  { src: "/locales/images/logos/Aura.svg", alt: "Aura Logo" },
  { src: "/locales/images/logos/Aiken.svg", alt: "Aiken Logo" },
];

// A single track of logos. The seamless loop is created via CSS.
const MarqueeTrack = React.forwardRef<HTMLDivElement, { 'aria-hidden'?: boolean }>((props, ref) => (
    <div ref={ref} className="marquee__track" {...props}>
      {logos.map((logo, index) => (
        <div key={index} className="marquee__item" aria-label={logo.alt}>
           <div className="w-[120px] h-[60px] flex items-center justify-center">
            {/* Using standard <img> tag for reliability with local SVGs in this animation context. */}
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
