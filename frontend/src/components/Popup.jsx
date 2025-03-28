import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { X } from 'lucide-react';

const Popup = ({ title, text, showImage, onClose }) => { // Destructure showImage
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        {showImage && ( // Conditionally render the image
          <img src="/images/profile.jpeg" alt="Profile" className="popup-img" />
        )}
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]} // Enable raw HTML rendering
          components={{
            small: ({ node, ...props }) => <small {...props} className="small-text" />
          }}
        >
          {text}
        </ReactMarkdown>
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default Popup;