import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { X } from 'lucide-react';
import styles from './Popup.module.css';
import profileImage from '../../../assets/images/profile.jpeg';

const Popup = ({ title, text, showImage, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={styles['popup-overlay']} onClick={handleOverlayClick}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        {showImage && (
          <img src={profileImage} alt="Profile" className={styles['popup-img']} />
        )}

        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            small: ({ node, ...props }) => <small {...props} className="small-text" />,
          }}
        >
          {text}
        </ReactMarkdown>

        {title === 'Work Experience' && (
          <div className={styles['cv-download-container']}>
            <a
              href="/public/Olga_Kotova_CV_Mar_2025.pdf"
              download
              className={styles['cv-download-button']}
            >
              <span>Download CV</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles['download-icon']}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M5 20h14v-2H5v2zm7-18v12l4-4h-3V4h-2v6H8l4 4z" />
              </svg>
            </a>
          </div>
        )}

        <button className={styles['close-button']} onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default Popup;
