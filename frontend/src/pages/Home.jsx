import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, BookOpen, Users, Scale, Search } from 'lucide-react';

const translations = {
  en: {
    hero: 'Legal help made simple for all Indians',
    subhead: 'Upload a document or tell us your situation — get clear steps, similar stories, and verified lawyers to help.',
    cta: 'Get help now — it\'s free to start',
    howItWorks: 'How It Works',
    step1Title: 'Upload or Describe',
    step1Text: 'Take a photo of your document or describe your legal situation',
    step2Title: 'AI Analysis',
    step2Text: 'Our AI extracts facts, anonymizes data, and provides clear guidance',
    step3Title: 'Get Help',
    step3Text: 'View similar cases, download checklists, or book a verified lawyer',
    categories: 'Browse by Category',
    whyChoose: 'Why Choose Legal Adviser?',
    feature1: 'Simple Language',
    feature1Text: 'Complex laws explained in plain Hindi and English',
    feature2: 'Privacy First',
    feature2Text: 'Automatic anonymization of personal information',
    feature3: 'Real Stories',
    feature3Text: 'Learn from real case outcomes and experiences',
    feature4: 'Verified Lawyers',
    feature4Text: 'Book consultations with verified legal professionals'
  },
  hi: {
    hero: 'सभी भारतीयों के लिए कानूनी सहायता सरल बनाई गई',
    subhead: 'दस्तावेज़ अपलोड करें या अपनी स्थिति बताएं — स्पष्ट कदम, समान कहानियां और सत्यापित वकील प्राप्त करें।',
    cta: 'अभी मदद लें — शुरू करना मुफ़्त है',
    howItWorks: 'यह कैसे काम करता है',
    step1Title: 'अपलोड या वर्णन करें',
    step1Text: 'अपने दस्तावेज़ की फोटो लें या अपनी कानूनी स्थिति का वर्णन करें',
    step2Title: 'एआई विश्लेषण',
    step2Text: 'हमारा एआई तथ्य निकालता है, डेटा को गुमनाम करता है और स्पष्ट मार्गदर्शन प्रदान करता है',
    step3Title: 'मदद प्राप्त करें',
    step3Text: 'समान मामले देखें, चेकलिस्ट डाउनलोड करें, या सत्यापित वकील बुक करें',
    categories: 'श्रेणी द्वारा ब्राउज़ करें',
    whyChoose: 'लीगल एडवाइजर क्यों चुनें?',
    feature1: 'सरल भाषा',
    feature1Text: 'जटिल कानून सरल हिंदी और अंग्रेजी में समझाए गए',
    feature2: 'गोपनीयता पहले',
    feature2Text: 'व्यक्तिगत जानकारी का स्वचालित गुमनामीकरण',
    feature3: 'वास्तविक कहानियां',
    feature3Text: 'वास्तविक मामले के परिणामों और अनुभवों से सीखें',
    feature4: 'सत्यापित वकील',
    feature4Text: 'सत्यापित कानूनी पेशेवरों के साथ परामर्श बुक करें'
  }
};

const categories = [
  { id: 'constitution', name: 'Constitution', nameHi: 'संविधान', icon: '📜', color: '#3182ce' },
  { id: 'family', name: 'Family Law', nameHi: 'पारिवारिक कानून', icon: '👨‍👩‍👧‍👦', color: '#805ad5' },
  { id: 'property', name: 'Property', nameHi: 'संपत्ति', icon: '🏠', color: '#38a169' },
  { id: 'consumer', name: 'Consumer Rights', nameHi: 'उपभोक्ता अधिकार', icon: '🛒', color: '#d69e2e' },
  { id: 'criminal', name: 'Criminal Law', nameHi: 'आपराधिक कानून', icon: '⚖️', color: '#e53e3e' },
  { id: 'business', name: 'Business', nameHi: 'व्यवसाय', icon: '💼', color: '#319795' },
];

function Home({ language }) {
  const t = translations[language] || translations.en;

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>
            {t.hero}
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95, maxWidth: '800px', margin: '0 auto 2rem' }}>
            {t.subhead}
          </p>
          <Link to="/upload" className="btn btn-large" style={{
            backgroundColor: 'white',
            color: '#667eea',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Upload size={24} />
            {t.cta}
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            {t.howItWorks}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#667eea',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white'
              }}>
                <Upload size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.step1Title}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.step1Text}
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#38a169',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white'
              }}>
                <Search size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.step2Title}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.step2Text}
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#805ad5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white'
              }}>
                <Scale size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.step3Title}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.step3Text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            {t.categories}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/learn?category=${cat.id}`}
                className="card"
                style={{
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {language === 'hi' ? cat.nameHi : cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            {t.whyChoose}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card">
              <BookOpen size={32} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.feature1}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.feature1Text}
              </p>
            </div>

            <div className="card">
              <FileText size={32} color="#38a169" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.feature2}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.feature2Text}
              </p>
            </div>

            <div className="card">
              <Users size={32} color="#805ad5" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.feature3}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.feature3Text}
              </p>
            </div>

            <div className="card">
              <Scale size={32} color="#d69e2e" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.feature4}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.feature4Text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Get clear legal guidance in minutes
          </p>
          <Link to="/upload" className="btn btn-primary btn-large">
            <Upload size={24} />
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
