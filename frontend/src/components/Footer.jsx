import React from 'react';
import { Link } from 'react-router-dom';

const translations = {
  en: {
    about: 'About',
    privacy: 'Privacy',
    contact: 'Contact',
    disclaimer: 'Disclaimer',
    disclaimerText: 'This platform provides general legal information and educational content. It is not a substitute for professional legal advice from a licensed lawyer.',
    copyright: '© 2024 Legal Adviser. Made for the people of India.'
  },
  hi: {
    about: 'के बारे में',
    privacy: 'गोपनीयता',
    contact: 'संपर्क',
    disclaimer: 'अस्वीकरण',
    disclaimerText: 'यह प्लेटफ़ॉर्म सामान्य कानूनी जानकारी और शैक्षिक सामग्री प्रदान करता है। यह लाइसेंस प्राप्त वकील से पेशेवर कानूनी सलाह का विकल्प नहीं है।',
    copyright: '© 2024 लीगल एडवाइजर। भारत के लोगों के लिए बनाया गया।'
  }
};

function Footer({ language }) {
  const t = translations[language] || translations.en;

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
              ⚖️ Legal Adviser
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Simple legal help for all Indians. Get clear guidance, learn your rights, and connect with verified lawyers.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                {t.about}
              </Link>
              <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                {t.privacy}
              </Link>
              <Link to="/learn" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Learn
              </Link>
              <Link to="/lawyers" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Lawyers
              </Link>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>{t.disclaimer}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4' }}>
              {t.disclaimerText}
            </p>
          </div>
        </div>

        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.875rem'
        }}>
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
