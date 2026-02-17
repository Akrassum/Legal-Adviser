import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Send, Sparkles, TrendingUp, BookOpen, MessageCircle, ArrowRight, Loader } from 'lucide-react';
import api from '../services/api';

const translations = {
  en: {
    hero: 'Your AI Legal Assistant for India',
    subhead: 'Ask any legal question and get instant, clear answers',
    placeholder: 'Ask me anything about Indian law...',
    askButton: 'Ask',
    trending: 'Trending Legal News',
    popularQuestions: 'Popular Questions',
    howCanHelp: 'How can I help you today?',
    exampleQuestions: [
      'How do I file a consumer complaint?',
      'What are my rights as a tenant?',
      'How to register a property?',
      'What is the divorce process in India?'
    ],
    categories: 'Browse by Topic',
    viewAll: 'View All',
    whyChoose: 'Why Choose Legal Adviser?',
    feature1: 'Instant AI Responses',
    feature1Text: 'Get answers to your legal questions in seconds',
    feature2: 'Follow-up Questions',
    feature2Text: 'Continue the conversation with smart suggestions',
    feature3: 'Real Stories',
    feature3Text: 'Learn from real case outcomes and experiences',
    feature4: 'Verified Lawyers',
    feature4Text: 'Connect with verified legal professionals when needed'
  },
  hi: {
    hero: 'भारत के लिए आपका AI कानूनी सहायक',
    subhead: 'कोई भी कानूनी प्रश्न पूछें और तुरंत स्पष्ट उत्तर प्राप्त करें',
    placeholder: 'भारतीय कानून के बारे में कुछ भी पूछें...',
    askButton: 'पूछें',
    trending: 'ट्रेंडिंग कानूनी समाचार',
    popularQuestions: 'लोकप्रिय प्रश्न',
    howCanHelp: 'मैं आज आपकी कैसे मदद कर सकता हूं?',
    exampleQuestions: [
      'मैं उपभोक्ता शिकायत कैसे दर्ज करूं?',
      'किरायेदार के रूप में मेरे अधिकार क्या हैं?',
      'संपत्ति कैसे पंजीकृत करें?',
      'भारत में तलाक की प्रक्रिया क्या है?'
    ],
    categories: 'विषय से खोजें',
    viewAll: 'सभी देखें',
    whyChoose: 'लीगल एडवाइजर क्यों चुनें?',
    feature1: 'तुरंत AI उत्तर',
    feature1Text: 'सेकंडों में अपने कानूनी प्रश्नों के उत्तर प्राप्त करें',
    feature2: 'फॉलो-अप प्रश्न',
    feature2Text: 'स्मार्ट सुझावों के साथ बातचीत जारी रखें',
    feature3: 'वास्तविक कहानियां',
    feature3Text: 'वास्तविक मामले के परिणामों और अनुभवों से सीखें',
    feature4: 'सत्यापित वकील',
    feature4Text: 'जरूरत पड़ने पर सत्यापित कानूनी पेशेवरों से जुड़ें'
  }
};

const categories = [
  { id: 'constitution', name: 'Constitution', nameHi: 'संविधान', icon: '📜', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'family', name: 'Family Law', nameHi: 'पारिवारिक कानून', icon: '👨‍👩‍👧‍👦', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'property', name: 'Property', nameHi: 'संपत्ति', icon: '🏠', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'consumer', name: 'Consumer Rights', nameHi: 'उपभोक्ता अधिकार', icon: '🛒', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 'criminal', name: 'Criminal Law', nameHi: 'आपराधिक कानून', icon: '⚖️', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'business', name: 'Business', nameHi: 'व्यवसाय', icon: '💼', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
];

function Home({ language }) {
  const t = translations[language] || translations.en;
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [followUpSuggestions, setFollowUpSuggestions] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadTrendingNews();
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadTrendingNews = async () => {
    try {
      const response = await api.get('/news/trending', { params: { language, limit: 4 } });
      setTrendingNews(response.data.news || []);
    } catch (error) {
      console.error('Failed to load trending news:', error);
    }
  };

  const handleAsk = async (questionText = null) => {
    const q = questionText || question;
    if (!q.trim()) return;

    setQuestion('');
    setLoading(true);

    // Add user message
    const userMessage = { role: 'user', content: q };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await api.post('/chat/message', {
        message: q,
        conversationId,
        language
      });

      if (response.data.success) {
        const aiMessage = {
          role: 'assistant',
          content: response.data.message,
          disclaimer: response.data.disclaimer
        };
        setMessages(prev => [...prev, aiMessage]);
        setConversationId(response.data.conversationId);
        setFollowUpSuggestions(response.data.followUpSuggestions || []);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const handleExampleQuestion = (q) => {
    setQuestion(q);
    handleAsk(q);
  };

  return (
    <div>
      {/* Hero Section with Chat */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles size={32} />
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
                {t.hero}
              </h1>
            </div>
            <p style={{ fontSize: '1.25rem', opacity: 0.95 }}>
              {t.subhead}
            </p>
          </div>

          {/* Interactive Chat Box */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden'
          }}>
            {/* Chat Messages */}
            {messages.length > 0 ? (
              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-secondary)'
              }}>
                {messages.map((msg, idx) => (
                  <div key={idx} style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{
                      maxWidth: '80%',
                      padding: '1rem',
                      borderRadius: '1rem',
                      backgroundColor: msg.role === 'user' ? '#667eea' : 'white',
                      color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {msg.content}
                      </div>
                      {msg.disclaimer && (
                        <div style={{
                          marginTop: '0.75rem',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid var(--border)',
                          fontSize: '0.75rem',
                          opacity: 0.7
                        }}>
                          ⚠️ {msg.disclaimer}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{
                      padding: '1rem',
                      borderRadius: '1rem',
                      backgroundColor: 'white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <Loader size={20} className="spinner" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-primary)'
              }}>
                <MessageCircle size={48} color="#667eea" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  {t.howCanHelp}
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  {t.popularQuestions}
                </p>
                <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '500px', margin: '0 auto' }}>
                  {t.exampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleQuestion(q)}
                      style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        border: '1px solid var(--border)',
                        borderRadius: '0.5rem',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '0.875rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up Suggestions */}
            {followUpSuggestions.length > 0 && (
              <div style={{
                padding: '1rem 1.5rem',
                backgroundColor: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Suggested follow-ups:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {followUpSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAsk(suggestion)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        border: '1px solid #667eea',
                        borderRadius: '2rem',
                        backgroundColor: 'white',
                        color: '#667eea',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#667eea';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#667eea';
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Box */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderTop: messages.length > 0 ? '1px solid var(--border)' : 'none'
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.placeholder}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '2px solid var(--border)',
                    borderRadius: '0.75rem',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
                <button
                  onClick={() => handleAsk()}
                  disabled={loading || !question.trim()}
                  style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    opacity: loading || !question.trim() ? 0.5 : 1,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && question.trim()) {
                      e.currentTarget.style.backgroundColor = '#5568d3';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#667eea';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {loading ? <Loader size={20} className="spinner" /> : <Send size={20} />}
                  <span>{t.askButton}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending News Section */}
      {trendingNews.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={28} color="#667eea" />
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                  {t.trending}
                </h2>
              </div>
              <Link to="/learn" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {t.viewAll} <ArrowRight size={18} />
              </Link>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {trendingNews.map(news => (
                <div key={news.id} className="card" style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px var(--shadow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)';
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{news.icon}</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {news.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                    {news.summary}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{new Date(news.date).toLocaleDateString()}</span>
                    <span>{news.views.toLocaleString()} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <BookOpen size={28} color="#667eea" />
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              {t.categories}
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/learn?category=${cat.id}`}
                style={{
                  textDecoration: 'none',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  background: cat.gradient,
                  color: 'white',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white' }}>
                  {language === 'hi' ? cat.nameHi : cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
            {t.whyChoose}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.feature1}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.feature1Text}
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
                <MessageCircle size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.feature2}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.feature2Text}
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
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.feature3}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                {t.feature3Text}
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#d69e2e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white'
              }}>
                <TrendingUp size={28} />
              </div>
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
    </div>
  );
}

export default Home;
