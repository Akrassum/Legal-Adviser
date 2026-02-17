import React, { useState, useEffect } from 'react';
import { Folder, FileText, Calendar } from 'lucide-react';
import api from '../services/api';

function MyCases({ language }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const response = await api.get('/cases');
      setCases(response.data.cases || []);
    } catch (error) {
      console.error('Failed to load cases:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          📁 My Cases
        </h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        ) : cases.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Folder size={64} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>No cases yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Start by uploading a document or describing your situation
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {cases.map(caseItem => (
              <div key={caseItem.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', marginBottom: '1rem' }}>
                  <FileText size={24} color="var(--accent)" />
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: caseItem.status === 'open' ? '#d4edda' : '#f8f9fa',
                    color: caseItem.status === 'open' ? '#155724' : '#6c757d',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {caseItem.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {caseItem.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {caseItem.description}
                </p>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} />
                    {new Date(caseItem.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCases;
