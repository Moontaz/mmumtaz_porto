"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePageTransition } from "@/components/layout/site-shell";

const links = [
   { label: "Home", href: "/" },
   { label: "Work", href: "/work" },
   { label: "About", href: "/#about" },
   { label: "Experience", href: "/#experience" },
];

export function SiteNav() {
   const pathname = usePathname();
   const router = useRouter();
   const { navigate } = usePageTransition();
   const [open, setOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const [hidden, setHidden] = useState(false);
   const lastScrollY = useRef(0);

   useEffect(() => setOpen(false), [pathname]);

   useEffect(() => {
      const updateHeader = () => {
         const currentY = window.scrollY;
         const previousY = lastScrollY.current;
         setScrolled(currentY > 24);
         if (currentY <= 24) {
            setHidden(false);
         } else if (currentY > previousY + 4 && currentY > 120) {
            setHidden(true);
         } else if (currentY < previousY - 4) {
            setHidden(false);
         }
         lastScrollY.current = currentY;
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
      return () => window.removeEventListener("scroll", updateHeader);
   }, []);

   const handleNavigate = (href: string) => {
      navigate(href.split("#")[0] || "/");
      setOpen(false);
      router.push(href);
   };

   const headerHidden = hidden && !open;

   return (
      <header
         className={`fixed inset-x-0 top-0 z-50 transition-[padding,transform,opacity] duration-500 ease-[cubic-bezier(.65,0,.35,1)] ${scrolled ? "px-3 pt-3 sm:px-5 lg:pt-4" : "px-6 pt-6 sm:px-10 lg:px-16"} ${headerHidden ? "pointer-events-none -translate-y-[calc(100%+2rem)] opacity-0" : "translate-y-0 opacity-100"}`}
      >
         <div
            className={`mx-auto flex h-12 max-w-shell items-center justify-between px-4 transition-[background-color,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(.65,0,.35,1)] sm:h-14 sm:px-5 ${scrolled ? "border border-black/10 bg-paper/95 shadow-[0_12px_35px_rgba(17,17,17,0.08)] backdrop-blur-md" : "bg-transparent"}`}
         >
            <Link
               href="/"
               onClick={(event) => {
                  event.preventDefault();
                  handleNavigate("/");
               }}
               className="group flex shrink-0 items-center gap-3 text-sm font-bold tracking-[-0.04em]"
               aria-label="M Mumtaz home"
            >
               <span className="relative grid h-4 w-4 place-items-center bg-electric transition-transform duration-500 ease-out group-hover:rotate-45">
                  <span className="h-1.5 w-1.5 bg-paper" />
               </span>
               <span>
                  AM<span className="text-black/30">/</span>26
               </span>
            </Link>
            <nav
               className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center gap-7 lg:flex"
               aria-label="Main navigation"
            >
               {links.map((link) => {
                  const route = link.href.split("#")[0] || "/";
                  const active =
                     pathname === route && (route === "/work" || route === "/");
                  return (
                     <Link
                        key={link.href}
                        href={link.href}
                        onClick={(event) => {
                           event.preventDefault();
                           handleNavigate(link.href);
                        }}
                        className={`group relative flex h-full items-center text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${active ? "text-ink" : "text-black/45 hover:text-ink"}`}
                     >
                        <span
                           className={`absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 bg-electric transition-transform duration-300 ${active ? "scale-100" : "scale-0 group-hover:scale-100"}`}
                        />
                        {link.label}
                     </Link>
                  );
               })}
            </nav>
            <div className="hidden items-center gap-5 lg:flex">
               <span className="text-[10px] uppercase tracking-[0.14em] text-black/35">
                  Available for select work
               </span>
               <Link
                  href="/#contact"
                  onClick={(event) => {
                     event.preventDefault();
                     handleNavigate("/#contact");
                  }}
                  className="group flex items-center gap-2 bg-ink px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] text-paper transition-colors duration-300 hover:bg-electric"
               >
                  Let&apos;s talk{" "}
                  <span className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                     ↗
                  </span>
               </Link>
            </div>
            <button
               type="button"
               aria-label={open ? "Close menu" : "Open menu"}
               aria-expanded={open}
               onClick={() => setOpen((value) => !value)}
               className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] lg:hidden"
            >
               <span>{open ? "Close" : "Menu"}</span>
               <span className="relative h-3 w-5">
                  <i
                     className={`absolute left-0 top-1 block h-px w-full bg-ink transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`}
                  />
                  <i
                     className={`absolute left-0 top-2.5 block h-px w-full bg-ink transition-transform duration-300 ${open ? "-translate-y-0.5 -rotate-45" : ""}`}
                  />
               </span>
            </button>
         </div>
         <div
            className={`fixed left-3 right-3 top-3 -z-10 overflow-hidden bg-ink text-paper transition-[clip-path,opacity] duration-500 ease-[cubic-bezier(.65,0,.35,1)] sm:left-5 sm:right-5 sm:top-4 lg:hidden ${open ? "pointer-events-auto min-h-[calc(100svh-1.5rem)] opacity-100 [clip-path:inset(0)]" : "pointer-events-none min-h-0 opacity-0 [clip-path:inset(0_0_100%_0)]"}`}
         >
            <nav
               className="flex min-h-[calc(100svh-1.5rem)] flex-col justify-center gap-4 px-5 pb-12 pt-24 sm:px-8"
               aria-label="Mobile navigation"
            >
               {links
                  .concat({ label: "Contact", href: "/#contact" })
                  .map((link, index) => (
                     <button
                        type="button"
                        key={link.href}
                        onClick={() => handleNavigate(link.href)}
                        className={`flex items-baseline gap-4 text-left transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
                        style={{ transitionDelay: `${index * 55 + 100}ms` }}
                     >
                        <span className="text-xs text-white/30">
                           0{index + 1}
                        </span>
                        <span className="editorial-heading text-5xl font-bold sm:text-7xl">
                           {link.label}
                        </span>
                     </button>
                  ))}
               <div className="absolute bottom-7 left-5 right-5 flex justify-between border-t border-white/20 pt-4 text-[9px] uppercase tracking-[0.15em] text-white/45 sm:left-8 sm:right-8">
                  <span>AM / Frontend developer</span>
                  <span>Menu / 05</span>
               </div>
            </nav>
         </div>
      </header>
   );
}
