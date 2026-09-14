"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
   children: ReactNode;
   className?: string;
   delay?: number;
   y?: number;
   duration?: number;
   once?: boolean;
};

export function Reveal({
   children,
   className = "",
   delay = 0,
   y = 28,
   duration = 0.8,
   once = true,
}: RevealProps) {
   const ref = useRef<HTMLDivElement>(null);

   useGSAP(
      () => {
         if (!ref.current) return;
         const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
         ).matches;
         gsap.fromTo(
            ref.current,
            { autoAlpha: reduced ? 1 : 0, y: reduced ? 0 : y },
            {
               autoAlpha: 1,
               y: 0,
               duration: reduced ? 0 : duration,
               delay: reduced ? 0 : delay,
               ease: "power3.out",
               scrollTrigger: reduced
                  ? undefined
                  : { trigger: ref.current, start: "top 88%", once },
            },
         );
      },
      { scope: ref },
   );

   return (
      <div ref={ref} className={className}>
         {children}
      </div>
   );
}

export function LineReveal({
   children,
   className = "",
   delay = 0,
}: RevealProps) {
   const ref = useRef<HTMLDivElement>(null);
   useGSAP(
      () => {
         if (!ref.current) return;
         const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
         ).matches;
         gsap.fromTo(
            ref.current.querySelector("[data-line]"),
            { yPercent: reduced ? 0 : 105 },
            {
               yPercent: 0,
               duration: reduced ? 0 : 0.9,
               delay: reduced ? 0 : delay,
               ease: "power4.out",
               scrollTrigger: reduced
                  ? undefined
                  : { trigger: ref.current, start: "top 90%", once: true },
            },
         );
      },
      { scope: ref },
   );
   return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
         <div data-line>{children}</div>
      </div>
   );
}
