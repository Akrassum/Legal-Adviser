import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, Globe } from 'lucide-react';

const translations = {
  en: {
    home: 'Home',
    learn: 'Learn',
    stories: 'Stories',
    lawyers: 'Lawyers',
    myCases: 'My Cases',
    getHelp: 'Get Help'
  },
  hi: {
    home: 'होम',
    learn: 'सीखें',
    stories: 'कहानियां',
    lawyers: 'वकील',
    myCases: 'मेरे मामले',
    getHelp: 'सहायता प्राप्त करें'
  }
};

function Header({ theme, toggleTheme, language, changeLanguage }) {
  const t = translations[language] || translations.en;

  return (
    <header style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px var(--shadow)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        gap: '1rem'
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'var(--accent)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          ⚖️ Legal Adviser
        </Link>

        <nav style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {t.home}
            </Link>
            <Link to="/learn" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {t.learn}
            </Link>
            <Link to="/stories" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {t.stories}
            </Link>
            <Link to="/lawyers" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {t.lawyers}
            </Link>
            <Link to="/my-cases" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {t.myCases}
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
              <option value="ta">தமிழ்</option>
            </select>

            <button
              onClick={toggleTheme}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <Link to="/upload" className="btn btn-primary">
            {t.getHelp}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
