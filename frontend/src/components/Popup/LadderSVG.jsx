import React from 'react';
import styles from './LadderSVG.module.css';

const LadderSVG = ({ className = '' }) => {
     const size = 20;           // width/height of each square
     const baseRows = 7;        // size of triangular pyramid
     const extraBottomRows = 1; // additional identical bottom layer
     const totalRows = baseRows + extraBottomRows;
     const svgWidth = size * baseRows;
     const svgHeight = size * totalRows;

     let delay = 0;
     const squares = [];

     // Extra bottom row first (so it animates first)
     const bottomY = (totalRows - 1) * size;
     for (let c = 0; c < baseRows; c++) {
          const x = c * size;
          const dark = Math.random() < 0.3;
          squares.push(
               <rect
                    key={`extra-${c}`}
                    x={x}
                    y={bottomY}
                    width={size}
                    height={size}
                    className={dark ? `${styles.square} ${styles.squareDark}` : styles.square}
                    style={{ animationDelay: `${delay}s` }}
               />
          );
          delay += 0.08;
     }

     // Triangular section (original pyramid) builds above
     for (let r = 0; r < baseRows; r++) {
          const squaresInRow = baseRows - r;          // decreasing count towards top
          const y = (totalRows - 2 - r) * size;       // position row above bottom
          const xOffset = r * size;                   // shift row so apex on right

          for (let c = 0; c < squaresInRow; c++) {
               const x = xOffset + c * size;
               const dark = Math.random() < 0.3; // 30% chance darker
               squares.push(
                    <rect
                         key={`${r}-${c}`}
                         x={x}
                         y={y}
                         width={size}
                         height={size}
                         className={dark ? `${styles.square} ${styles.squareDark}` : styles.square}
                         style={{ animationDelay: `${delay}s` }}
                    />
               );
               delay += 0.08;
          }
     }

     return (
          <svg
               className={`${styles.ladder} ${className}`}
               viewBox={`0 0 ${svgWidth} ${svgHeight}`}
               width={svgWidth}
               height={svgHeight}
               xmlns="http://www.w3.org/2000/svg"
          >
               {squares}
          </svg>
     );
};

export default LadderSVG;
