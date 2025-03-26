import React, { useState } from 'react';
import Header from './Header';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\nEmail: ${email}\nMessage: ${message}`);
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} className="contact-form">
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
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default Contact;