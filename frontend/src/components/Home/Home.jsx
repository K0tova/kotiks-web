import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Popup from '../Popup/Popup';
import Contact from '../Contact/Contact';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { FiChevronDown } from 'react-icons/fi';
import { Briefcase, BookOpen, FileText, Rocket } from 'lucide-react';
import SectionSeparator from '../SectionSeparator/SectionSeparator';
import Footer from '../Footer/Footer';
import AnimatedName from './AnimatedName';

const Home = () => {
  const [popup, setPopup] = useState(null);
  const cardsRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const aboutSepId = 'about-sep';
  const contactSepId = 'contact-sep';

  const content = {
    'Work Experience': `I am a Data Science expert with nearly **4 years experience** in top-tier management consulting firm (BCG).<br /><br />
    As a Senior Data Scientist at BCG, I operate at the intersection of <small>advanced analytics, machine learning and strategic consulting</small>-collaborating with cross-functional teams to not only develop data-driven solutions, but also to shape and execute the long-term technology vision for our clients.<br /><br />
    I partner closely with stakeholders to <small>define technical strategies, design scalable solutions</small>, and <small>ensure seamless integration into business operations</small>, driving tangible and assessable impact.`,

    'Education': `• **BSc in Physics** – Lomonosov Moscow State University (2016–2020). GPA (5.0/5.0).
    <span class="indented"> **Thesis**: Determined photophysical parameters of NaGdF₄:Eu solid solutions using the Judd–Ofelt Theory.
    <small>_Gained hands-on experience in laser spectroscopy and adaptive data processing with artificial neural networks modelling._</small></span>
    • **MSc in Social Data Science** – University of Oxford (2020–2021). Interdisciplinary program combining computer science, statistics, and social sciences.
    <span class="indented"> **Thesis**: Analysed e-governance and corruption in procurement with network analysis.
    <small>_Developed expertise in computational social science, data ethics, and causal inference._</small></span>`,
    'Scientific Publications':
      '**TEDDY: A Family Of Foundation Models For Understanding Single Cell Biology**<br />arXiv · Mar 5, 2025.\n\n' +
      '**Clinical trials are becoming more complex: a machine learning analysis of data from over 16,000 trials**<br />Nature Scientific Reports · Feb 12, 2024.\n\n' +
      '**Determining the Photophysical Parameters of NaGdF4:Eu Solid Solutions in Suspensions Using the Judd—Ofelt Theory**<br />Maik Nauka/Interperiodica · Jan 1, 2020.\n\n' +
      '**In vitro temperature sensing with up-conversion NaYF4:Yb3+/Tm3+-based nanocomposites: Peculiarities and pitfalls**<br />Pergamon Press / ScienceDirect · Jan 1, 2020.\n\n' +
      '**Определение фотофизических параметров твердых растворов NaGdF4:Eu в суспензиях с помощью теории Джадда-Офельта**<br />ЖЭТФ Письма · Jan 1, 2020.\n\n' +
      '**Application of Wavelet Neural Networks for Monitoring of Extraction of Carbon Multi-Functional Medical Nano-Agents from the Body**<br />Elsevier · Jan 1, 2018.',
    'Aspirations':
      'I’m passionate about building technology that doesn’t just work — but works for people. My aspiration is to continue operating at the intersection of data science, strategy, and societal impact.\n\n' +
      'I’m especially drawn to the role of technology in public good — in fields like **health**, **sustainability-driven innovation across critical infrastructure sectors**, **governance**, and **education**. \n\nThis drive extends beyond my professional life: I’ve created a [free school for children at the Physics Faculty of MSU](http://ffactorial.phys.msu.ru/) during my university years, tutored orphans English through the [Amicus foundation](https://mgimo.ru/about/structure/student-org/amicus/?utm_source=google.com&utm_medium=organic&utm_campaign=google.com&utm_referrer=google.com), and I’ve been actively supporting initiatives to bring more women into STEM and consulting. I’ve also had the chance to speak publicly about education and opportunities after studies, including [interviewing Mr.Jack Ma(Alibaba founder)](https://www.youtube.com/watch?v=g25jcvtjZjA&t=1s) and giving multiple interviews on the topic — such as my [Oxford experience](https://www.youtube.com/watch?v=9SrI1BID21A&t=58s) and [how to get into Oxford & Cambridge](https://www.youtube.com/watch?v=iN04O1R5dN0&t=321s).\n\n' +
      'As I grow, I aim to take on leadership roles that allow me to shape responsible tech development, mentor the next generation of talent, and contribute to a future where data empowers rather than excludes.'

  };

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <AnimatedName text="Olga Kotova" />
            <p className="spaced-text">I help turn Data into Decisions <br />
              and Strategy into Action</p>

            {/* CTA buttons */}
            <div className={styles.ctaRow}>
              <button onClick={() => cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                About me
              </button>
              <button onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Contact</button>
              <button onClick={() => navigate('/more')}>More</button>
            </div>
          </motion.div>
          <button
            aria-label="Scroll to content"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className={styles.scrollBtn}
          >
            <FiChevronDown size={32} />
          </button>
        </section>

        {/* Separator between Home and About (line only) */}
        <SectionSeparator id={aboutSepId} label="" />

        {/* Cards Section */}
        <section ref={cardsRef} className={styles.cardsSection}>
          <h2 className={styles.sectionHeading}>About Me</h2>
          <div className={styles.buttons}>
            {Object.keys(content).map((key) => (
              <button
                data-aos="zoom-out-up"
                key={key}
                onClick={() =>
                  setPopup({
                    title: key,
                    text: content[key],
                    showImage: key === 'Work Experience' // Only show image for "Work Experience"
                  })
                }
              >
                {(() => {
                  const Icon = {
                    'Work Experience': Briefcase,
                    'Education': BookOpen,
                    'Scientific Publications': FileText,
                    'Aspirations': Rocket,
                  }[key];
                  return <Icon size={28} />;
                })()}
                <span>{key}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Separator between About and Contact (line only) */}
        <SectionSeparator id={contactSepId} label="" />

        {popup && (
          <Popup
            title={popup.title}
            text={popup.text}
            showImage={popup.showImage} // Pass the showImage property
            onClose={() => setPopup(null)}
          />
        )}

        {/* Contact Section */}
        <section ref={contactRef} className={styles.contactSection}>
          <h2 className={styles.sectionHeading}>Contact Me</h2>
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
