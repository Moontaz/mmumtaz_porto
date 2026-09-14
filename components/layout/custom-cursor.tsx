"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
   const cursor = useRef<HTMLDivElement>(null);
   const label = useRef<HTMLSpanElement>(null);

   useEffect(() => {
      if (
         window.matchMedia("(pointer: coarse)").matches ||
         window.innerWidth < 768
      )
         return;
      const node = cursor.current;
      if (!node) return;
      const updateTone = (clientX: number, clientY: number) => {
         const hovered = document
            .elementFromPoint(clientX, clientY)
            ?.closest("[data-cursor-tone]");
         node.dataset.cursorTone =
            hovered?.getAttribute("data-cursor-tone") || "default";
      };
      const move = (event: MouseEvent) => {
         updateTone(event.clientX, event.clientY);
         gsap.to(node, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.35,
            ease: "power3.out",
         });
      };
      const over = (event: Event) => {
         const target = event.currentTarget as HTMLElement;
         const toneTarget = target.closest("[data-cursor-tone]");
         node.dataset.active = "true";
         node.dataset.cursorTone =
            toneTarget?.getAttribute("data-cursor-tone") ||
            target.dataset.cursorTone ||
            "default";
         if (label.current)
            label.current.textContent = target.dataset.cursorLabel || "";
      };
      const out = () => {
         node.dataset.active = "false";
         node.dataset.cursorTone = "default";
         if (label.current) label.current.textContent = "";
      };
      window.addEventListener("mousemove", move);
      const targets = document.querySelectorAll<HTMLElement>(
         "[data-cursor], a, button",
      );
      targets.forEach((target) => {
         target.addEventListener("mouseenter", over);
         target.addEventListener("mouseleave", out);
      });
      return () => {
         window.removeEventListener("mousemove", move);
         targets.forEach((target) => {
            target.removeEventListener("mouseenter", over);
            target.removeEventListener("mouseleave", out);
         });
      };
   }, []);

   return (
      <div
         ref={cursor}
         aria-hidden="true"
         className="custom-cursor pointer-events-none fixed left-0 top-0 z-[120] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-electric mix-blend-multiply transition-[width,height,background-color] duration-300 md:flex"
         data-active="false"
         data-cursor-tone="default"
      >
         <span
            ref={label}
            className="text-[9px] font-bold uppercase tracking-[0.08em] text-white"
         />
      </div>
   );
}
