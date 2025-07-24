import React, { useEffect, useRef, useState } from 'react';
import styles from './SectionSeparator.module.css';

/**
 * Horizontal separator that fades/draws in when it reaches the middle of the viewport.
 * Props:
 *  - label: string text rendered at the centre of the line.
 */
export default function SectionSeparator({ label = '', id }) {
     const ref = useRef(null);
     const [visible, setVisible] = useState(false);

     useEffect(() => {
          const observer = new IntersectionObserver(
               (entries) => {
                    entries.forEach((entry) => {
                         setVisible(entry.isIntersecting);
                    });
               },
               {
                    // Element is considered in view when it sits roughly in the middle of the viewport.
                    threshold: 0.5,
               }
          );

          if (ref.current) observer.observe(ref.current);
          return () => observer.disconnect();
     }, []);

     return (
          <div id={id} ref={ref} className={`${styles.separator} ${visible ? styles.visible : ''}`}>
               {label && <span className={styles.label}>{label}</span>}
          </div>
     );
}
