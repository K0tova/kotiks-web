import React, { useState } from 'react';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import styles from './Home.module.css';

const Home = () => {
  const [popup, setPopup] = useState(null);

  const content = {
    'Work Experience': `I am a Data Science expert with nearly **4 years experience** in top-tier management consulting firm (BCG).<br /><br />
    As a Senior Data Scientist at BCG, I operate at the intersection of <small>advanced analytics, machine learning and strategic consulting</small>-collaborating with cross-functional teams to not only develop data-driven solutions, but also to shape and execute the long-term technology vision for our clients.<br /><br />
    I partner closely with stakeholders to <small>define tech strategies, design scalable solutions</small>, and <small>ensure seamless integration into business operations</small>, driving tangible and assessable impact.`,

    'Education': `• **BSc in Physics** – Lomonosov Moscow State University (2016–2020). GPA (5.0/5.0).  
    <span class="indented"> **Thesis**: Determined photophysical parameters of NaGdF₄:Eu solid solutions using the Judd–Ofelt Theory.  
    <small>_Gained hands-on experience in laser spectroscopy and adaptive data processing with artificial neural networks modelling._</small></span>  
    • **MSc in Social Data Science** – University of Oxford (2020–2021). Interdisciplinary program combining computer science, statistics, and social sciences.  
    <span class="indented"> **Thesis**: Analysed e-governance and corruption in procurement with network analysis.   
    <small>_Developed expertise in computational social science, data ethics, and causal inference._</small></span>`,
    'Scientific Publications':
      '• **TEDDY: A Family Of Foundation Models For Understanding Single Cell Biology** – [arXiv](https://arxiv.org/abs/2503.03485) · Mar 5, 2025.\n\n' +
      '• **Clinical trials are becoming more complex: a machine learning analysis of data from over 16,000 trials** – [Nature Scientific Reports](https://www.nature.com/articles/s41598-024-53211-z) · Feb 12, 2024.\n\n' +
      '• **Determining the Photophysical Parameters of NaGdF4:Eu Solid Solutions in Suspensions Using the Judd—Ofelt Theory** – [Maik Nauka/Interperiodica](https://link.springer.com/article/10.1134/S0021364020090064) · Jan 1, 2020.\n\n' +
      '• **In vitro temperature sensing with up-conversion NaYF4:Yb3+/Tm3+-based nanocomposites: Peculiarities and pitfalls** – [Pergamon Press / ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1386142520306065?via%3Dihub) · Jan 1, 2020.\n\n' +
      '• **Определение фотофизических параметров твердых растворов NaGdF4:Eu в суспензиях с помощью теории Джадда-Офельта** – [ЖЭТФ Письма](https://elibrary.ru/item.asp?id=42846085) · Jan 1, 2020.\n\n' +
      '• **Application of Wavelet Neural Networks for Monitoring of Extraction of Carbon Multi-Functional Medical Nano-Agents from the Body** – [Elsevier](https://www.sciencedirect.com/science/article/pii/S1877050918323226?via%3Dihub) · Jan 1, 2018.',
    'Aspirations':
      'I’m passionate about building technology that doesn’t just work — but works for people. My aspiration is to continue operating at the intersection of data science, strategy, and societal impact.\n\n' +
      'I’m especially drawn to the role of technology in public good — in fields like **health**, **sustainability-driven innovation across critical infrastructure sectors**, **governance**, and **education**. \n\nThis drive extends beyond my professional life: I’ve created a [free school for children at the Physics Faculty of MSU](http://ffactorial.phys.msu.ru/) during my university years, tutored orphans English through the [Amicus foundation](https://mgimo.ru/about/structure/student-org/amicus/?utm_source=google.com&utm_medium=organic&utm_campaign=google.com&utm_referrer=google.com), and actively supported initiatives to bring more women into STEM and consulting. I’ve also had the chance to speak publicly about education and opportunities after studies, including [interviewing Mr. Jack Ma (Alibaba founder)](https://www.youtube.com/watch?v=g25jcvtjZjA&t=1s) and giving multiple interviews on the topic — such as my [Oxford experience](https://www.youtube.com/watch?v=9SrI1BID21A&t=58s) and [how to get into Oxford & Cambridge](https://www.youtube.com/watch?v=iN04O1R5dN0&t=321s).\n\n' +
      'As I grow, I aim to take on leadership roles that allow me to shape responsible tech development, mentor the next generation of talent, and contribute to a future where data empowers rather than excludes.'

  };

  return (
    <div>
      <Header />
      <main>
        <h2 className={styles["home-title"]}>Olga Kotova</h2>        <p className="spaced-text">I help turn Data into Decisions <br />
          and Strategy into Action</p>
        <div className={styles.buttons}>
          {Object.keys(content).map((key) => (
            <button
              key={key}
              onClick={() =>
                setPopup({
                  title: key,
                  text: content[key],
                  showImage: key === 'Work Experience' // Only show image for "Work Experience"
                })
              }
            >
              {key}
            </button>
          ))}
        </div>
        {popup && (
          <Popup
            title={popup.title}
            text={popup.text}
            showImage={popup.showImage} // Pass the showImage property
            onClose={() => setPopup(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Home;