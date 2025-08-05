
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const logos = [
  { src: "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0eeeb860f66063130cc_Amsterdam-colored.svg", alt: "Amsterdam" },
  { src: "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09591135411dbf1f686_colorado-colored.svg", alt: "Colorado" },
  { src: "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/65609f775edfd6ba4a3c3af7_Nairobi-colored.svg", alt: "Nairobi" },
  { src: "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/656093f6591bba4a6757b985_Hudon-colored.svg", alt: "Hudon" },
  { src: "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/6560817610fbd2b58993793c_Aura-colored.svg", alt: "Aura" },
  { src: "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/65607df9d46a61fcef7c719f_Aiken-colored.svg", alt: "Aiken" },
];

const MarqueeTrack = ({ 'aria-hidden': ariaHidden }: { 'aria-hidden'?: boolean }) => (
  <div className="marquee__track" aria-hidden={ariaHidden}>
    {logos.map((logo, index) => (
      <div key={index} className="marquee__item">
        <Image src={logo.src} alt={logo.alt} width={120} height={60} />
      </div>
    ))}
  </div>
);

export default function LogoMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    let start: number | null = null;
    let pos = 0;
    
    if (!container || !track) return;

    const trackWidth = track.getBoundingClientRect().width;
    container.style.width = `${trackWidth}px`;
    const speed = 80;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      pos = -(elapsed / 1000) * speed;

      if (Math.abs(pos) >= trackWidth) {
        start = timestamp;
        pos = 0;
      }
      
      container.style.transform = `translateX(${pos}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);


  return (
    <section className="bg-background py-12 md:py-16">
        <div className="marquee">
            <div ref={containerRef} className="marquee__ctn">
              <MarqueeTrack />
              <MarqueeTrack aria-hidden={true} />
            </div>
        </div>
    </section>
  );
}
