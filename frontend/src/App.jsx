import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/Home/Home';
import More from './components/More/More';
import TopProgressBar from './components/TopProgressBar/TopProgressBar';

const PageFade = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFade><Home /></PageFade>} />
        <Route path="/more" element={<PageFade><More /></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Wake up the backend (e.g. Render) as soon as someone lands on the site,
  // so it has time to start before they submit the contact form.
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    if (api) {
      fetch(`${api}/api/health`, { method: 'GET' }).catch(() => {});
    }
  }, []);

  return (
    <Router>
      <TopProgressBar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
