import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import api from '../services/api';

function Stories({ language }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.query = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      
      const response = await api.get('/stories/search', { params });
      setStories(response.data.stories || []);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadStories();
  };

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📖 Real Stories & Case Outcomes
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Learn from others' legal experiences
        </p>

        {/* Search */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          maxWidth: '600px'
        }}>
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1 }}
          />
          <button 
            onClick={handleSearch}
            className="btn btn-primary"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Categories Filter */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => { setSelectedCategory(''); loadStories(); }}
            className={selectedCategory === '' ? 'btn btn-primary' : 'btn btn-secondary'}
          >
            All
          </button>
          {['property', 'consumer', 'family', 'criminal'].map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); loadStories(); }}
              className={selectedCategory === cat ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {stories.map(story => (
              <div key={story.id} className="card">
                <div style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {story.category}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.75rem' 
                }}>
                  {story.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  {story.summary}
                </p>

                <div style={{ 
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Timeline:</strong> {story.timeline}
                  </div>
                  <div>
                    <strong>Outcome:</strong> {story.outcome}
                  </div>
                </div>

                {story.keyLessons && (
                  <div>
                    <strong style={{ fontSize: '0.875rem' }}>Key Lessons:</strong>
                    <ul style={{ 
                      fontSize: '0.875rem', 
                      paddingLeft: '1.5rem',
                      marginTop: '0.5rem',
                      color: 'var(--text-muted)'
                    }}>
                      {story.keyLessons.map((lesson, idx) => (
                        <li key={idx}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && stories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              No stories found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stories;
