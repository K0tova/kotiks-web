import React, { useEffect, useState } from 'react';
import styles from './TopProgressBar.module.css';

export default function TopProgressBar() {
     const [progress, setProgress] = useState(0);

     useEffect(() => {
          const handleScroll = () => {
               const doc = document.documentElement;
               const scrollTop = window.scrollY || doc.scrollTop;
               const scrollHeight = doc.scrollHeight - window.innerHeight;
               const p = scrollHeight === 0 ? 0 : scrollTop / scrollHeight;
               setProgress(p);
          };

          handleScroll();
          window.addEventListener('scroll', handleScroll);
          window.addEventListener('resize', handleScroll);
          return () => {
               window.removeEventListener('scroll', handleScroll);
               window.removeEventListener('resize', handleScroll);
          };
     }, []);

     return (
          <div className={styles.track}>
               {/* background gradient changes based on scroll progress */}
               <div
                    className={styles.bar}
                    style={{
                         background: `linear-gradient(to right, rgba(0,193,193,0.9) 0%, rgba(0,193,193,0.9) ${progress * 100}%, rgba(0,193,193,0.15) ${progress * 100}%, rgba(0,193,193,0.15) 100%)`
                    }}
               />
          </div>
     );
}
