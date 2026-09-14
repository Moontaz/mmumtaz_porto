'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

export function Magnetic({ children, className = '', strength = 0.18 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return;
    const node = ref.current;
    const move = (event: MouseEvent) => {
      const bounds = node.getBoundingClientRect();
      gsap.to(node, { x: (event.clientX - (bounds.left + bounds.width / 2)) * strength, y: (event.clientY - (bounds.top + bounds.height / 2)) * strength, duration: .35, ease: 'power3.out' });
    };
    const leave = () => gsap.to(node, { x: 0, y: 0, duration: .55, ease: 'elastic.out(1, .35)' });
    node.addEventListener('mousemove', move);
    node.addEventListener('mouseleave', leave);
    return () => { node.removeEventListener('mousemove', move); node.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return <div ref={ref} className={className}>{children}</div>;
}
