import React, { useState, useEffect } from 'react';
import { BookOpen, Search } from 'lucide-react';
import api from '../services/api';

function Learn({ language }) {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadArticles();
  }, [language, selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await api.get('/learn/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadArticles = async () => {
    try {
      setLoading(true);
      const params = { language };
      if (selectedCategory) params.category = selectedCategory;
      
      const response = await api.get('/learn/articles', { params });
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewArticle = async (articleId) => {
    try {
      const response = await api.get(`/learn/articles/${articleId}`);
      setSelectedArticle(response.data.article);
    } catch (error) {
      console.error('Failed to load article:', error);
    }
  };

  if (selectedArticle) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <button 
            onClick={() => setSelectedArticle(null)}
            className="btn btn-secondary"
            style={{ marginBottom: '2rem' }}
          >
            ← Back to Articles
          </button>
          
          <article>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {selectedArticle.title}
            </h1>
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              lineHeight: '1.8',
              fontSize: '1.0625rem'
            }}>
              {selectedArticle.content}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📚 Learn About Indian Laws
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Simple explanations of laws and your rights
        </p>

        {/* Categories */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setSelectedCategory('')}
            className={selectedCategory === '' ? 'btn btn-primary' : 'btn btn-secondary'}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={selectedCategory === cat.id ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {articles.map(article => (
              <div 
                key={article.id} 
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => viewArticle(article.id)}
              >
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '1rem' 
                }}>
                  📖
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem' 
                }}>
                  {article.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '0.875rem' 
                }}>
                  {article.summary}
                </p>
                <button 
                  className="btn btn-primary"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              No articles found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Learn;
