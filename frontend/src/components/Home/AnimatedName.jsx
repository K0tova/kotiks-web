import React from 'react';
import styles from './AnimatedName.module.css';

const AnimatedName = ({ text }) => {
     let delay = 0;
     return (
          <h2 className={styles.title} aria-label={text}>
               {text.split(' ').map((word, wIdx) => {
                    const wordLetters = word.split('');
                    return (
                         <span key={wIdx} className={styles.word}>
                              {wordLetters.map((char, idx) => {
                                   const d = delay;
                                   delay += 0.06;
                                   return (
                                        <span
                                             key={idx}
                                             className={styles.letter}
                                             style={{ animationDelay: `${d}s` }}
                                        >
                                             {char}
                                        </span>
                                   );
                              })}
                              {/* space between words */}
                              {wIdx !== text.split(' ').length - 1 && (
                                   <span
                                        className={`${styles.letter} ${styles.space}`}
                                        style={{ animationDelay: `${delay}s` }}
                                   >
                                        &nbsp;
                                   </span>
                              )}
                         </span>
                    );
               })}
          </h2>
     );
};

export default AnimatedName;
