"use client";

import {
   createContext,
   useContext,
   useEffect,
   useRef,
   useState,
   type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { SiteNav } from "@/components/navigation/site-nav";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type TransitionContextValue = { navigate: (href: string) => void };
const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
   const context = useContext(TransitionContext);
   if (!context)
      throw new Error("usePageTransition must be used inside SiteShell");
   return context;
}

export function SiteShell({ children }: { children: ReactNode }) {
   const pathname = usePathname();
   const reduced = useReducedMotion();
   const [loading, setLoading] = useState(true);
   const [transitioning, setTransitioning] = useState(false);
   const layerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const timeout = window.setTimeout(
         () => setLoading(false),
         reduced ? 120 : 1450,
      );
      return () => window.clearTimeout(timeout);
   }, [reduced]);

   useEffect(() => {
      if (!transitioning || !layerRef.current) return;
      const layer = layerRef.current;
      const timeline = gsap.timeline({
         onComplete: () => {
            gsap.set(layer, { yPercent: 100 });
            setTransitioning(false);
         },
      });
      timeline
         .set(layer, { yPercent: 100 })
         .to(layer, {
            yPercent: 0,
            duration: reduced ? 0 : 0.35,
            ease: "power3.inOut",
         })
         .to(layer, {
            yPercent: -100,
            duration: reduced ? 0 : 0.35,
            delay: reduced ? 0 : 0.05,
            ease: "power3.inOut",
         });
      return () => {
         timeline.kill();
      };
   }, [transitioning, reduced]);

   const navigate = (href: string) => {
      if (href === pathname || reduced) return;
      setTransitioning(true);
   };

   return (
      <TransitionContext.Provider value={{ navigate }}>
         <div className="min-h-screen overflow-x-hidden bg-paper">
            <SiteNav />
            <CustomCursor />
            {transitioning && (
               <div
                  ref={layerRef}
                  aria-hidden="true"
                  className="pointer-events-none fixed inset-0 z-[100] bg-electric will-change-transform"
               />
            )}
            <div
               className={
                  loading
                     ? "pointer-events-auto fixed inset-0 z-[110] bg-ink text-paper"
                     : "pointer-events-none fixed inset-0 z-[110] -translate-y-full bg-ink text-paper opacity-0"
               }
            >
               <div className="mx-auto flex h-full w-full max-w-shell flex-col justify-between px-6 py-7 sm:px-10 lg:px-16">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                     <span>AM / 2026</span>
                     <span>Independent frontend developer</span>
                  </div>
                  <div>
                     <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/50">
                        <span className="h-2 w-2 bg-electric" />
                        Preparing the interface
                     </div>
                     <div className="h-px w-full bg-white/15">
                        <div className="loader-bar h-px w-full bg-electric" />
                     </div>
                     <div className="mt-5 flex justify-between text-[11px] uppercase tracking-[0.2em] text-white/45">
                        <span>Loading experience</span>
                        <span>01 — 04</span>
                     </div>
                  </div>
               </div>
            </div>
            {children}
         </div>
      </TransitionContext.Provider>
   );
}
