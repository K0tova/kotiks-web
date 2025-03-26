import React from 'react';
import { X } from 'lucide-react';

const Popup = ({ title, text, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <img src="/images/profile.jpeg" alt="Profile" className="popup-img" />
        <p>{text}</p>
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default Popup;