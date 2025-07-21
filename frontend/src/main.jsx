import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';
import './styles/utilities.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialise scroll animations
AOS.init({ duration: 600, easing: 'ease-out', once: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
