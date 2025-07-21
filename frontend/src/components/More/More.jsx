import React from 'react';
import Header from '../Header/Header';
import { Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './More.module.css';

export default function More() {
     return (
          <>
               <Header />
               <main className={styles.wrapper}>
                    <div className={styles.card}>
                         <Hammer size={48} strokeWidth={1.5} />
                         <h2>Page in progress</h2>
                         <p>I’m polishing this section—check back soon!</p>
                         <Link to="/" className="primary-btn">Back home</Link>
                    </div>
               </main>
          </>
     );
}
