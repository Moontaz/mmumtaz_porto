"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects, type Project } from "@/data/projects";
import { ProjectModal } from "@/components/projects/project-modal";
import { ProjectMedia } from "@/components/projects/project-media";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Position = { x: number; y: number };
type Layout = {
   cardWidth: number;
   cardHeight: number;
   stepX: number;
   stepY: number;
   columns: number;
   rows: number;
};

// Extra copies make it possible to wrap each tile without ever exposing an empty edge.
const tiles = Array.from(
   { length: 36 },
   (_, index) => projects[index % projects.length],
);

export function ProjectExplorer() {
   const reduced = useReducedMotion();
   const stageRef = useRef<HTMLDivElement>(null);
   const canvasRef = useRef<HTMLDivElement>(null);
   const positionsRef = useRef<Position[]>([]);
   const layoutRef = useRef<Layout | null>(null);
   const dragRef = useRef({
      active: false,
      didDrag: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      vx: 0,
      vy: 0,
   });
   const [selected, setSelected] = useState<Project | null>(null);
   const [dragging, setDragging] = useState(false);

   useEffect(() => {
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;

      const state = dragRef.current;
      const items = Array.from(
         canvas.querySelectorAll<HTMLElement>("[data-grid-item]"),
      );
      let momentum = { x: 0, y: 0 };
      let momentumTween: gsap.core.Tween | undefined;

      const measure = () => {
         const cardWidth = Math.min(
            240,
            Math.max(140, stage.clientWidth * 0.22),
         );
         const cardHeight = cardWidth * (4 / 3);
         const stepX = cardWidth * 1.55;
         const stepY = cardHeight * 1.42;
         const columns = Math.ceil(stage.clientWidth / stepX) + 3;
         const rows = Math.ceil(stage.clientHeight / stepY) + 3;
         layoutRef.current = {
            cardWidth,
            cardHeight,
            stepX,
            stepY,
            columns,
            rows,
         };
         positionsRef.current = items.map((_, index) => ({
            x: ((index % columns) - 1) * stepX,
            y: (Math.floor(index / columns) - 1) * stepY,
         }));
         items.forEach((item) => {
            item.style.width = `${cardWidth}px`;
            item.style.height = `${cardHeight}px`;
         });
         render();
      };

      const wrapPosition = (position: Position) => {
         const layout = layoutRef.current;
         if (!layout) return;
         const width = stage.clientWidth;
         const height = stage.clientHeight;
         const wrapWidth = layout.columns * layout.stepX;
         const wrapHeight = layout.rows * layout.stepY;
         while (position.x < -layout.stepX) position.x += wrapWidth;
         while (position.x > width + layout.stepX) position.x -= wrapWidth;
         while (position.y < -layout.stepY) position.y += wrapHeight;
         while (position.y > height + layout.stepY) position.y -= wrapHeight;
      };

      const render = () => {
         positionsRef.current.forEach(wrapPosition);
         positionsRef.current.forEach((position, index) => {
            const item = items[index];
            if (item)
               item.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
         });
      };

      const moveItems = (deltaX: number, deltaY: number) => {
         positionsRef.current.forEach((position) => {
            position.x += deltaX;
            position.y += deltaY;
         });
         render();
      };

      const down = (event: PointerEvent) => {
         momentumTween?.kill();
         state.active = true;
         state.didDrag = false;
         state.startX = event.clientX;
         state.startY = event.clientY;
         state.lastX = event.clientX;
         state.lastY = event.clientY;
         state.vx = 0;
         state.vy = 0;
         setDragging(true);
      };

      const move = (event: PointerEvent) => {
         if (!state.active) return;
         const deltaX = event.clientX - state.lastX;
         const deltaY = event.clientY - state.lastY;
         state.vx = deltaX;
         state.vy = deltaY;
         state.lastX = event.clientX;
         state.lastY = event.clientY;
         const distanceFromStart = Math.hypot(
            event.clientX - state.startX,
            event.clientY - state.startY,
         );
         if (!state.didDrag && distanceFromStart > 8) {
            state.didDrag = true;
            stage.setPointerCapture(event.pointerId);
         }
         moveItems(deltaX, deltaY);
      };

      const up = (event: PointerEvent) => {
         if (!state.active) return;
         state.active = false;
         setDragging(false);
         if (stage.hasPointerCapture(event.pointerId))
            stage.releasePointerCapture(event.pointerId);
         if (reduced || !state.didDrag) return;

         const previous = { x: 0, y: 0 };
         momentum = { x: 0, y: 0 };
         momentumTween = gsap.to(momentum, {
            x: state.vx * 16,
            y: state.vy * 16,
            duration: 0.9,
            ease: "power3.out",
            onUpdate: () => {
               const deltaX = momentum.x - previous.x;
               const deltaY = momentum.y - previous.y;
               previous.x = momentum.x;
               previous.y = momentum.y;
               moveItems(deltaX, deltaY);
            },
         });
      };

      const wheel = (event: WheelEvent) => {
         event.preventDefault();
         moveItems(-event.deltaX * 0.4, -event.deltaY * 0.4);
      };

      measure();
      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(stage);
      stage.addEventListener("pointerdown", down);
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerup", up);
      stage.addEventListener("pointercancel", up);
      stage.addEventListener("wheel", wheel, { passive: false });

      return () => {
         momentumTween?.kill();
         resizeObserver.disconnect();
         stage.removeEventListener("pointerdown", down);
         stage.removeEventListener("pointermove", move);
         stage.removeEventListener("pointerup", up);
         stage.removeEventListener("pointercancel", up);
         stage.removeEventListener("wheel", wheel);
      };
   }, [reduced]);

   return (
      <main className="min-h-screen overflow-hidden bg-paper px-6 pb-16 pt-32 sm:px-10 lg:px-16">
         <div className="mx-auto max-w-shell">
            <div className="flex flex-col justify-between gap-10 border-b border-line pb-10 md:flex-row md:items-end">
               <div>
                  <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-electric">
                     Archive / 2025 — 2026
                  </p>
                  <h1 className="editorial-heading max-w-4xl text-6xl font-bold sm:text-8xl">
                     Work in
                     <br />
                     <span className="text-black/35">motion.</span>
                  </h1>
               </div>
               <p className="max-w-xs text-sm leading-relaxed text-black/55">
                  Drag or scroll the canvas to explore a selection of projects.
                  Click any piece for the full story.
               </p>
            </div>
            <div
               ref={stageRef}
               className={`relative mt-8 h-[68svh] min-h-[560px] touch-none select-none overflow-hidden border-b border-line ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
               data-cursor-label="Drag"
            >
               <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(244,244,241,.3)_100%)]" />
               <div ref={canvasRef} className="absolute inset-0">
                  {tiles.map((project, index) => (
                     <button
                        type="button"
                        data-grid-item
                        data-cursor-tone="light"
                        data-cursor-label="View"
                        key={`${project.slug}-${index}`}
                        onClick={() => {
                           if (!dragRef.current.didDrag) setSelected(project);
                        }}
                        className="group absolute left-0 top-0 overflow-hidden text-left will-change-transform"
                     >
                        <ProjectMedia
                           src={project.thumbnail}
                           alt={`${project.title} project preview`}
                           sizes="(max-width: 768px) 42vw, 240px"
                           className="transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-end justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 text-white transition-transform duration-500 group-hover:translate-y-0">
                           <span>
                              <strong className="block text-base">
                                 {project.title}
                              </strong>
                              <small className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-white/60">
                                 {project.category}
                              </small>
                           </span>
                           <span className="text-lg">↗</span>
                        </span>
                     </button>
                  ))}
               </div>
            </div>
            <div className="flex flex-col justify-between gap-3 pt-5 text-[10px] uppercase tracking-[0.16em] text-black/40 sm:flex-row">
               <span>Pointer / touch / wheel enabled</span>
               <span>{projects.length} case studies / infinite canvas</span>
            </div>
         </div>
         {selected && (
            <ProjectModal
               project={selected}
               onClose={() => setSelected(null)}
            />
         )}
      </main>
   );
}
