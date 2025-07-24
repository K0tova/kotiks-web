import React from 'react';
import styles from './AnimatedName.module.css';

const AnimatedName = ({ text }) => {
     return (
          <h2 className={styles.title} aria-label={text}>
               {text.split('').map((char, idx) => {
                    const isSpace = char === ' ';
                    return (
                         <span
                              key={idx}
                              className={isSpace ? `${styles.letter} ${styles.space}` : styles.letter}
                              style={{ animationDelay: `${idx * 0.06}s` }}
                         >
                              {isSpace ? '\u00A0' : char}
                         </span>
                    );
               })}
          </h2>
     );
};

export default AnimatedName;
