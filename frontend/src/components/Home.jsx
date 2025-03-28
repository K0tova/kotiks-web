import React, { useState } from 'react';
import Header from './Header';
import Popup from './Popup';

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
    'Publications': 'List and summary of papers/articles published...',
    'Aspirations': 'Future goals and interests in AI and data science...'
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Hello, I'm Olga</h2>
        <p>Data Science and Business consultant</p>
        <div className="buttons">
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