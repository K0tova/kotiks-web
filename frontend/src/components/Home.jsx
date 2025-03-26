import React, { useState } from 'react';
import Header from './Header';
import Popup from './Popup';

const Home = () => {
  const [popup, setPopup] = useState(null);

  const content = {
    'Work Experience': 'Details about my work in data science consulting...',
    'Education': 'Educational background including degrees and courses...',
    'Publications': 'List and summary of papers/articles published...',
    'Aspirations': 'Future goals and interests in AI and data science...'
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Hello, I'm Olga</h2>
        <p>Senior Data Scientist in Consulting</p>
        <div className="buttons">
          {Object.keys(content).map((key) => (
            <button key={key} onClick={() => setPopup({ title: key, text: content[key] })}>{key}</button>
          ))}
        </div>
        {popup && (
          <Popup title={popup.title} text={popup.text} onClose={() => setPopup(null)} />
        )}
      </main>
    </div>
  );
};

export default Home;