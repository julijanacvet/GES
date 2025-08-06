
'use client';

import React from 'react';

// Defines the logos with correct local paths and descriptive alt text.
const logos = [
  { src: "/locales/images/logos/bovietSolar-600x247.png", alt: "Boviet Solar Logo" },
  { src: "/locales/images/logos/canadian-solar-600x300.png", alt: "Canadian Solar Logo" },
  { src: "/locales/images/logos/Fox-600x308.png", alt: "Fox Logo" },
  { src: "/locales/images/logos/Franklin-600x46.png", alt: "Franklin Logo" },
  { src: "/locales/images/logos/HaitaiSolar.png", alt: "Haitai Solar Logo" },
  { src: "/locales/images/logos/HengdianSolar.png", alt: "Hengdian Solar Logo" },
  { src: "/locales/images/logos/hyperion-600x169.png", alt: "Hyperion Logo" },
  { src: "/locales/images/logos/Imperial-600x95.png", alt: "Imperial Logo" },
  { src: "/locales/images/logos/JASolar.png", alt: "JA Solar Logo" },
  { src: "/locales/images/logos/JinkoSolar-1.png", alt: "Jinko Solar Logo" },
  { src: "/locales/images/logos/LongiSolar.png", alt: "Longi Solar Logo" },
  { src: "/locales/images/logos/nsolar-600x271.png", alt: "nSolar Logo" },
  { src: "/locales/images/logos/PhonoSolar.png", alt: "Phono Solar Logo" },
  { src: "/locales/images/logos/risenSolar.png", alt: "Risen Solar Logo" },
  { src: "/locales/images/logos/Sunpower-600x56.png", alt: "Sunpower Logo" },
  { src: "/locales/images/logos/TrinaSolar-1.png", alt: "Trina Solar Logo" },
  { src: "/locales/images/logos/ulicaSolar.png", alt: "Ulica Solar Logo" },
  { src: "/locales/images/logos/VSUNSolar.png", alt: "VSUN Solar Logo" },
  { src: "/locales/images/logos/waaree-600x203.png", alt: "Waaree Logo" },
  { src: "/locales/images/logos/znshineSolar-600x300.png", alt: "Znshine Solar Logo" },
];

const MarqueeTrack = React.forwardRef<HTMLDivElement, { 'aria-hidden'?: boolean }>((props, ref) => (
    <div ref={ref} className="marquee__track" {...props}>
      {logos.map((logo, index) => (
        <div key={index} className="marquee__item" aria-label={logo.alt}>
           <div className="w-[120px] h-[60px] flex items-center justify-center">
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
