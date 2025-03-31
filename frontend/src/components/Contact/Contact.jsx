import React, { useState } from 'react';
import Header from '../Header/Header';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './Contact.module.css';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <main className={styles["contact-main"]}>
        <div className={styles["contact-card"]}>
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit} className={styles["contact-form"]}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
            />
            <button type="submit">Send Message</button>
          </form>
          {status && <p>{status}</p>} {/* Display success/error messages */}
          <div className={styles["social-links"]}>
            <a href="https://www.linkedin.com/in/olga-kotova-899089204/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/olyakotiks" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;