import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import CaseBuilder from './pages/CaseBuilder';
import Results from './pages/Results';
import Learn from './pages/Learn';
import Stories from './pages/Stories';
import Lawyers from './pages/Lawyers';
import MyCases from './pages/MyCases';
import About from './pages/About';
import Privacy from './pages/Privacy';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme}
          language={language}
          changeLanguage={changeLanguage}
        />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/upload" element={<Upload language={language} />} />
            <Route path="/case-builder" element={<CaseBuilder language={language} />} />
            <Route path="/results/:id" element={<Results language={language} />} />
            <Route path="/learn" element={<Learn language={language} />} />
            <Route path="/stories" element={<Stories language={language} />} />
            <Route path="/lawyers" element={<Lawyers language={language} />} />
            <Route path="/my-cases" element={<MyCases language={language} />} />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/privacy" element={<Privacy language={language} />} />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;
