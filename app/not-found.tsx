"use client";

import Link from "next/link";

export default function NotFound() {
   return (
      <main className="grid min-h-screen place-items-center px-6 pb-20 pt-32">
         <div className="w-full max-w-shell">
            <p className="mb-10 text-[11px] uppercase tracking-[0.24em] text-black/50">
               Error / 404
            </p>
            <h1 className="editorial-heading max-w-4xl text-[clamp(5rem,18vw,15rem)] font-bold">
               Lost<span className="text-electric">.</span>
            </h1>
            <div className="mt-12 flex flex-col justify-between gap-8 border-t border-line pt-6 sm:flex-row sm:items-end">
               <p className="max-w-sm text-lg leading-relaxed text-black/60">
                  This page wandered off. Let&apos;s get you back to something
                  useful.
               </p>
               <Link
                  href="/"
                  className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]"
               >
                  Back to home{" "}
                  <span
                     aria-hidden="true"
                     className="text-lg transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  >
                     ↗
                  </span>
               </Link>
            </div>
         </div>
      </main>
   );
}
