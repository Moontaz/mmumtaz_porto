"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredProjects } from "@/data/projects";
import { Magnetic } from "@/components/animations/magnetic";
import { ProjectMedia } from "@/components/projects/project-media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Arrow({ className = "" }: { className?: string }) {
   return (
      <span
         className={`inline-block text-xl leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${className}`}
         aria-hidden="true"
      >
         ↗
      </span>
   );
}
function SectionLabel({
   number,
   children,
}: {
   number: string;
   children: string;
}) {
   return (
      <div className="mb-12 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">
         <span className="text-electric">{number}</span>
         <span className="h-px w-8 bg-line" />
         {children}
      </div>
   );
}

function Hero() {
   const ref = useRef<HTMLElement>(null);
   useGSAP(
      () => {
         const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
         ).matches;
         const words = ref.current?.querySelectorAll("[data-hero-word]");
         if (!words) return;
         gsap.fromTo(
            words,
            { yPercent: reduced ? 0 : 110, opacity: reduced ? 1 : 0 },
            {
               yPercent: 0,
               opacity: 1,
               duration: reduced ? 0 : 0.9,
               stagger: reduced ? 0 : 0.07,
               delay: reduced ? 0 : 0.2,
               ease: "power4.out",
            },
         );
         gsap.fromTo(
            "[data-hero-meta]",
            { opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 },
            {
               opacity: 1,
               y: 0,
               duration: reduced ? 0 : 0.7,
               delay: reduced ? 0 : 0.75,
               stagger: 0.08,
               ease: "power3.out",
            },
         );
      },
      { scope: ref },
   );
   return (
      <section
         ref={ref}
         className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-end px-6 pb-16 pt-32 sm:px-10 sm:pb-20 lg:min-h-screen lg:px-16 lg:pb-24"
      >
         <div className="mx-auto w-full max-w-shell">
            <div
               className="mb-10 flex items-start justify-between text-[11px] uppercase tracking-[0.18em] text-black/45"
               data-hero-meta
            >
               <span>
                  Frontend developer
                  <br />& interaction engineer
               </span>
               <span className="hidden text-right sm:block">
                  Based anywhere
                  <br />
                  working everywhere
               </span>
            </div>
            <h1 className="editorial-heading max-w-6xl text-[clamp(3.8rem,10.5vw,10rem)] font-bold">
               <span className="block overflow-hidden">
                  <span data-hero-word className="block">
                     Interfaces
                  </span>
               </span>
               <span className="block overflow-hidden">
                  <span data-hero-word className="block text-black/35">
                     with intent<span className="text-electric">.</span>
                  </span>
               </span>
            </h1>
            <div
               className="mt-12 flex flex-col justify-between gap-8 border-t border-line pt-5 sm:flex-row sm:items-end"
               data-hero-meta
            >
               <p className="max-w-md text-lg leading-relaxed text-black/65 sm:text-xl">
                  I build digital experiences where clear thinking, expressive
                  motion, and resilient code meet.
               </p>
               <Magnetic>
                  <a
                     href="#work"
                     className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.13em]"
                  >
                     Scroll to explore{" "}
                     <span className="grid h-10 w-10 place-items-center border border-ink text-lg transition-colors group-hover:bg-ink group-hover:text-paper">
                        ↓
                     </span>
                  </a>
               </Magnetic>
            </div>
         </div>
         <div className="absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.18em] text-black/35 sm:left-10 lg:left-16">
            01 — 04
         </div>
      </section>
   );
}

function WorkSection() {
   const sectionRef = useRef<HTMLElement>(null);
   useGSAP(
      () => {
         if (
            !sectionRef.current ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
         )
            return;
         gsap.fromTo(
            sectionRef.current.querySelectorAll("[data-card]"),
            { y: 45, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               stagger: 0.12,
               duration: 0.8,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 72%",
                  once: true,
               },
            },
         );
      },
      { scope: sectionRef },
   );
   return (
      <section
         id="work"
         ref={sectionRef}
         className="border-t border-line px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
      >
         <div className="mx-auto max-w-shell">
            <SectionLabel number="01">Selected work</SectionLabel>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
               <h2 className="editorial-heading max-w-3xl text-5xl font-bold sm:text-7xl">
                  Small details.
                  <br />
                  <span className="text-black/35">Meaningful difference.</span>
               </h2>
               <p className="max-w-xs text-sm leading-relaxed text-black/55">
                  A selection of interface systems, editorial platforms, and
                  digital products shaped through code.
               </p>
            </div>
            <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
               {featuredProjects.map((project, index) => (
                  <Link
                     data-card
                     data-cursor-tone="light"
                     data-cursor-label="View"
                     href={`/work#${project.slug}`}
                     key={project.slug}
                     className={`group block ${index === 1 ? "md:mt-24" : ""}`}
                  >
                     <div className="relative aspect-[1.26] overflow-hidden bg-black/5">
                        <ProjectMedia
                           src={project.thumbnail}
                           alt={`${project.title} project preview`}
                           sizes="(max-width: 768px) 100vw, 50vw"
                           className="transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        />
                     </div>
                     <div className="mt-5 flex items-start justify-between gap-5">
                        <div>
                           <h3 className="text-2xl font-bold tracking-[-0.04em]">
                              {project.title}
                           </h3>
                           <p className="mt-2 max-w-xs text-sm leading-relaxed text-black/55">
                              {project.description}
                           </p>
                        </div>
                        <Arrow />
                     </div>
                     <div className="mt-5 flex gap-3 text-[10px] uppercase tracking-[0.15em] text-black/40">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                     </div>
                  </Link>
               ))}
            </div>
            <div data-card className="mt-16 border-t border-line pt-6">
               <Link
                  href="/work"
                  className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.13em]"
               >
                  View all projects <Arrow />
               </Link>
            </div>
         </div>
      </section>
   );
}

function AboutSection() {
   return (
      <section
         id="about"
         data-cursor-tone="light"
         className="bg-ink px-6 py-24 text-paper sm:px-10 lg:px-16 lg:py-36"
      >
         <div className="mx-auto max-w-shell">
            <SectionLabel number="02">About the work</SectionLabel>
            <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
               <h2 className="editorial-heading text-5xl font-bold sm:text-7xl">
                  The web is a <span className="text-electric">material</span>{" "}
                  worth caring about.
               </h2>
               <div className="lg:pt-3">
                  <p className="max-w-md text-xl leading-relaxed text-white/70">
                     I&apos;m Mumtaz, a frontend-focused developer interested in
                     the space between an idea and the way it feels to use.
                  </p>
                  <p className="mt-8 max-w-md text-base leading-relaxed text-white/45">
                     My practice sits across interface engineering, interaction
                     design, and motion. I like systems that are thoughtful
                     under the hood and quietly memorable on the surface.
                  </p>
                  <a
                     href="mailto:hello@example.com"
                     className="group mt-12 inline-flex items-center gap-3 border-b border-white/30 pb-3 text-sm font-bold uppercase tracking-[0.13em] transition-colors hover:border-electric hover:text-electric"
                  >
                     Let&apos;s talk <Arrow />
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
}

function SkillsSection() {
   const skills = [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue",
      "Tailwind CSS",
      "GSAP",
      "Node.js",
      "Accessibility",
      "Design systems",
   ];
   return (
      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
         <div className="mx-auto max-w-shell">
            <SectionLabel number="03">Tools & approach</SectionLabel>
            <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
               <h2 className="editorial-heading max-w-md text-5xl font-bold sm:text-7xl">
                  Curious by default<span className="text-electric">.</span>
               </h2>
               <div>
                  <p className="mb-10 max-w-xl text-xl leading-relaxed text-black/60">
                     The toolkit changes with the problem. The constants are
                     clarity, accessibility, and a respect for the browser.
                  </p>
                  <div className="flex flex-wrap gap-x-0 border-l border-t border-line">
                     {skills.map((skill, index) => (
                        <div
                           key={skill}
                           className="group flex w-1/2 items-center justify-between border-b border-r border-line px-4 py-5 text-sm sm:w-1/3"
                        >
                           <span className="text-black/70 transition-colors group-hover:text-electric">
                              {skill}
                           </span>
                           <span className="text-[10px] text-black/30">
                              0{index + 1}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

function ExperienceSection() {
   return (
      <section
         id="experience"
         className="border-t border-line px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
      >
         <div className="mx-auto max-w-shell">
            <SectionLabel number="04">Experience</SectionLabel>
            <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
               <h2 className="editorial-heading text-5xl font-bold sm:text-7xl">
                  Selected
                  <br />
                  <span className="text-black/35">chapters.</span>
               </h2>
               <div className="border-t border-ink">
                  {[
                     [
                        "Independent practice",
                        "Frontend developer / interaction engineer",
                        "2022 — now",
                        "Building interfaces, prototypes, and digital experiences for teams with something meaningful to say.",
                     ],
                     [
                        "PT Bramantya Peninta Indonesia",
                        "Frontend developer [Freelance]",
                        "Jun 2026 — August 2026",
                        "Developed and maintained the frontend of a SaaS ticketing platform using Vue, TypeScript, and Tailwind CSS, building core workflows including authentication, dashboards, ticket management, and user-facing interfaces.",
                     ],
                     [
                        "Your next chapter",
                        "Open to considered collaborations",
                        "Available",
                        "This is a placeholder for your experience. Replace it with a concise, truthful account of the work you are proud of.",
                     ],
                  ].map(([title, role, period, description]) => (
                     <article
                        key={title}
                        className="grid gap-5 border-b border-line py-7 sm:grid-cols-[1fr_1.4fr_auto] sm:gap-8"
                     >
                        <div>
                           <h3 className="text-lg font-bold tracking-[-0.03em]">
                              {title}
                           </h3>
                           <p className="mt-1 text-sm text-black/50">{role}</p>
                        </div>
                        <p className="max-w-md text-sm leading-relaxed text-black/60">
                           {description}
                        </p>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-black/40">
                           {period}
                        </span>
                     </article>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

function ContactSection() {
   return (
      <section
         id="contact"
         data-cursor-tone="light"
         className="bg-electric px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-36"
      >
         <div className="mx-auto max-w-shell">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
               <span>05</span>
               <span className="h-px w-8 bg-white/35" />
               Start a conversation
            </div>
            <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end">
               <h2 className="editorial-heading max-w-5xl text-6xl font-bold sm:text-8xl lg:text-[9.5rem]">
                  Have a good
                  <br />
                  problem<span className="text-ink">?</span>
               </h2>
               <div className="lg:pb-3">
                  <a
                     href="mailto:hello@example.com"
                     className="group inline-flex items-center gap-4 text-xl font-bold"
                  >
                     hello@example.com <Arrow />
                  </a>
                  <div className="mt-10 flex gap-6 text-[11px] uppercase tracking-[0.14em] text-white/65">
                     <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline hover:text-white"
                     >
                        GitHub
                     </a>
                     <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline hover:text-white"
                     >
                        LinkedIn
                     </a>
                     <a href="#" className="link-underline hover:text-white">
                        Résumé
                     </a>
                  </div>
               </div>
            </div>
            <div className="mt-24 flex justify-between border-t border-white/25 pt-5 text-[10px] uppercase tracking-[0.16em] text-white/55">
               <span>M Mumtaz / Frontend developer</span>
               <span>© 2026</span>
            </div>
         </div>
      </section>
   );
}

export function HomeContent() {
   return (
      <main>
         <Hero />
         <WorkSection />
         <AboutSection />
         <SkillsSection />
         <ExperienceSection />
         <ContactSection />
      </main>
   );
}
