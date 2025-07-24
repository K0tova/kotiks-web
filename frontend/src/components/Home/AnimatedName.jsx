import React from 'react';
import styles from './AnimatedName.module.css';

const AnimatedName = ({ text }) => {
     return (
          <h2 className={styles.title} aria-label={text}>
               {text.split('').map((char, idx) => {
                    const isSpace = char === ' ';
                    if (isSpace) {
                         return (
                              <React.Fragment key={idx}>
                                   <span
                                        className={`${styles.letter} ${styles.space}`}
                                        style={{ animationDelay: `${idx * 0.06}s` }}
                                   >
                                        &nbsp;
                                   </span>
                                   <wbr />
                              </React.Fragment>
                         );
                    }
                    return (
                         <span
                              key={idx}
                              className={styles.letter}
                              style={{ animationDelay: `${idx * 0.06}s` }}
                         >
                              {char}
                         </span>
                    );
               })}
          </h2>
     );
};

export default AnimatedName;
