"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";

export function ProjectModal({
   project,
   onClose,
}: {
   project: Project;
   onClose: () => void;
}) {
   const dialogRef = useRef<HTMLDivElement>(null);
   const closeRef = useRef<HTMLButtonElement>(null);

   useEffect(() => {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
      const onKey = (event: KeyboardEvent) => {
         if (event.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      const node = dialogRef.current;
      if (
         node &&
         !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
         gsap.fromTo(
            node,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
         );
      return () => {
         document.body.style.overflow = "";
         window.removeEventListener("keydown", onKey);
      };
   }, [onClose]);

   return (
      <div
         className="fixed inset-0 z-[80] overflow-hidden bg-ink/70 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-6"
         role="presentation"
         onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
         }}
      >
         <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="mx-auto flex h-[calc(100svh-1.5rem)] max-h-[calc(100svh-1.5rem)] max-w-6xl flex-col overflow-hidden bg-paper text-ink shadow-2xl sm:h-[calc(100svh-3rem)] sm:max-h-[calc(100svh-3rem)]"
         >
            <div className="z-10 flex shrink-0 items-center justify-between border-b border-line bg-paper/95 px-5 py-4 backdrop-blur sm:px-8">
               <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                  Case study / {project.year}
               </span>
               <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em]"
               >
                  Close{" "}
                  <span className="relative block h-4 w-4">
                     <i className="absolute left-0 top-2 block h-px w-full rotate-45 bg-ink" />
                     <i className="absolute left-0 top-2 block h-px w-full -rotate-45 bg-ink" />
                  </span>
               </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[.8fr_1.2fr] lg:overflow-hidden">
               <div className="p-6 sm:p-10 lg:min-h-0 lg:overflow-y-auto lg:p-14">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric">
                     {project.category}
                  </p>
                  <h2
                     id="project-title"
                     className="editorial-heading mt-5 text-6xl font-bold sm:text-8xl lg:text-7xl"
                  >
                     {project.title}
                     <span className="text-electric">.</span>
                  </h2>
                  <p className="mt-8 max-w-sm text-lg leading-relaxed text-black/60">
                     {project.description}
                  </p>
                  <dl className="mt-12 grid grid-cols-2 gap-y-6 border-t border-line pt-5 text-sm">
                     <div>
                        <dt className="text-[10px] uppercase tracking-[0.14em] text-black/40">
                           Role
                        </dt>
                        <dd className="mt-2 max-w-[12rem] leading-relaxed">
                           {project.role}
                        </dd>
                     </div>
                     <div>
                        <dt className="text-[10px] uppercase tracking-[0.14em] text-black/40">
                           Built with
                        </dt>
                        <dd className="mt-2 leading-relaxed">
                           {project.technologies.join(" · ")}
                        </dd>
                     </div>
                  </dl>
                  <div className="mt-12 flex gap-6 text-[10px] font-bold uppercase tracking-[0.14em]">
                     {project.liveUrl ? (
                        <a
                           href={project.liveUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="link-underline"
                        >
                           Live site ↗
                        </a>
                     ) : (
                        <span className="text-black/35">
                           Live site / pending
                        </span>
                     )}
                     {project.githubUrl ? (
                        <a
                           href={project.githubUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="link-underline"
                        >
                           GitHub ↗
                        </a>
                     ) : (
                        <span className="text-black/35">GitHub / pending</span>
                     )}
                  </div>
               </div>
               <div className="border-l-0 border-line lg:min-h-0 lg:overflow-y-auto lg:border-l">
                  <div className="relative aspect-[1.2] w-full overflow-hidden bg-black/5">
                     <Image
                        src={project.images[0]}
                        alt={`${project.title} primary screen`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                        priority
                     />
                  </div>
                  <div className="space-y-12 p-6 sm:p-10 lg:p-14">
                     <div>
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-electric">
                           The challenge
                        </p>
                        <p className="max-w-xl text-xl leading-relaxed">
                           {project.challenge}
                        </p>
                     </div>
                     <div>
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-electric">
                           The approach
                        </p>
                        <p className="max-w-xl text-base leading-relaxed text-black/60">
                           {project.solution}
                        </p>
                     </div>
                     <div>
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-electric">
                           Key features
                        </p>
                        <ul className="divide-y divide-line border-y border-line">
                           {project.features.map((feature) => (
                              <li
                                 key={feature}
                                 className="flex justify-between gap-4 py-4 text-sm"
                              >
                                 <span>{feature}</span>
                                 <span className="text-black/30">↗</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="space-y-5">
                        {project.images.slice(1).map((image, index) => (
                           <div
                              key={image}
                              className="relative aspect-[1.2] overflow-hidden bg-black/5"
                           >
                              <Image
                                 src={image}
                                 alt={`${project.title} detail ${index + 1}`}
                                 fill
                                 sizes="(max-width: 1024px) 100vw, 60vw"
                                 className="object-cover"
                                 loading="lazy"
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
