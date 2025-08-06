
'use client';

import React, { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;
    
    const track = container.querySelector('.marquee__track');
    if (!track) return;

    let start: number | null = null;
    let pos = 0;

    const trackWidth = track.getBoundingClientRect().width;
    const clone = track.cloneNode(true) as HTMLDivElement;
    clone.setAttribute('aria-hidden', 'true');
    container.appendChild(clone);

    const speed = 80;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      pos = -(elapsed / 1000) * speed;

      if (Math.abs(pos) >= trackWidth) {
        start = timestamp;
        pos = 0;
      }
      
      if (container) {
          container.style.transform = `translateX(${pos}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
       if (clone && container && container.contains(clone)) {
        container.removeChild(clone);
      }
    };
  }, []);


  return (
    <section className="bg-background py-12 md:py-16">
        <div className="marquee">
            <div ref={containerRef} className="marquee__ctn">
              <MarqueeTrack />
            </div>
        </div>
    </section>
  );
}
