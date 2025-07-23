import React, { useEffect, useRef, useState } from 'react';
import styles from './ScrollIndicator.module.css';

// Simple scroll indicator: wavy SVG path + section dots.
// Expects refs array [{name, ref}] passed as props.
export default function ScrollIndicator({ sections = [] }) {
     const pathRef = useRef(null);
     const [progress, setProgress] = useState(0);
     const [activeIdx, setActiveIdx] = useState(0);

     useEffect(() => {
          const onScroll = () => {
               const docHeight = document.body.scrollHeight - window.innerHeight;
               const p = window.scrollY / docHeight;
               setProgress(p);
          };

          window.addEventListener('scroll', onScroll);
          return () => window.removeEventListener('scroll', onScroll);
     }, []);

     // Observe sections to activate dot
     useEffect(() => {
          const observer = new IntersectionObserver(
               (entries) => {
                    entries.forEach((entry) => {
                         if (entry.isIntersecting) {
                              const idx = sections.findIndex((s) => s.ref.current === entry.target);
                              if (idx !== -1) setActiveIdx(idx);
                         }
                    });
               },
               { threshold: 0.4 }
          );
          sections.forEach((s) => s.ref.current && observer.observe(s.ref.current));
          return () => observer.disconnect();
     }, [sections]);

     return (
          <div className={styles.container} aria-hidden="true">
               {/* vertical line that scales as you scroll */}
               <div
                    className={styles.line}
                    style={{ transform: `scaleY(${progress})` }}
               />
               {sections.map((s, idx) => (
                    <div
                         key={s.name}
                         className={`${styles.bubble} ${idx <= activeIdx ? styles.visible : ''} ${idx === activeIdx ? styles.active : ''}`}
                         style={{ top: `${100 + idx * 300}px` }}
                    >
                         {s.name}
                    </div>
               ))}
          </div>
     );
}
