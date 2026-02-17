import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, FileText, Download, Share, BookmarkPlus } from 'lucide-react';

function Results({ language }) {
  const location = useLocation();
  const { analysis, file, description } = location.state || {};

  if (!analysis) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2>No analysis data found</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
            Please upload a document or describe your situation first.
          </p>
          <Link to="/upload" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Start Analysis
          </Link>
        </div>
      </div>
    );
  }

  const { analysis: analysisData, anonymization, similarStories, disclaimer } = analysis;

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Legal Analysis Results
        </h1>

        {/* Anonymization Notice */}
        {anonymization?.wasAnonymized && (
          <div className="card" style={{ 
            backgroundColor: '#d4edda', 
            border: '1px solid #28a745',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <CheckCircle size={20} color="#28a745" />
              <strong style={{ color: '#155724' }}>Privacy Protected</strong>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#155724' }}>
              {anonymization.summary}
            </p>
          </div>
        )}

        {/* Summary */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            📝 Summary
          </h2>
          <p style={{ lineHeight: '1.8' }}>
            {analysisData.summary || analysisData.fullResponse?.split('\n')[0]}
          </p>
        </div>

        {/* Legal Issues */}
        {analysisData.legalIssues && analysisData.legalIssues.length > 0 && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              ⚖️ Possible Legal Issues
            </h2>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
              {analysisData.legalIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Steps */}
        {analysisData.nextSteps && analysisData.nextSteps.length > 0 && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              ✅ Recommended Next Steps
            </h2>
            <ol style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
              {analysisData.nextSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Documents Needed */}
        {analysisData.documentsNeeded && analysisData.documentsNeeded.length > 0 && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              📋 Documents to Collect
            </h2>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
              {analysisData.documentsNeeded.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Timeline */}
        {analysisData.timeline && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              ⏱️ Typical Timeline
            </h2>
            <p>{analysisData.timeline}</p>
          </div>
        )}

        {/* Urgent Flags */}
        {analysisData.urgentFlags && analysisData.urgentFlags.length > 0 && (
          <div className="card" style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffc107',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <AlertTriangle size={24} color="#856404" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#856404', margin: 0 }}>
                Important Warnings
              </h2>
            </div>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', color: '#856404' }}>
              {analysisData.urgentFlags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Similar Stories */}
        {similarStories && similarStories.length > 0 && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              📚 Similar Cases
            </h2>
            {similarStories.map((story, idx) => (
              <div key={idx} style={{ 
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{story.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {story.summary}
                </p>
                <p style={{ fontSize: '0.875rem' }}>
                  <strong>Outcome:</strong> {story.outcome}
                </p>
                {story.relevance && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Why relevant: {story.relevance}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Full Response (if structured parsing failed) */}
        {analysisData.fullResponse && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              📄 Detailed Analysis
            </h2>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
              {analysisData.fullResponse}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="card" style={{ 
          backgroundColor: '#f8f9fa', 
          border: '1px solid var(--border)',
          marginBottom: '2rem'
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            <strong>⚠️ Legal Disclaimer:</strong> {disclaimer}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <Link to="/lawyers" className="btn btn-primary">
            Book a Lawyer
          </Link>
          <button className="btn btn-secondary">
            <Download size={20} />
            Download Report
          </button>
          <button className="btn btn-secondary">
            <Share size={20} />
            Share
          </button>
          <button className="btn btn-secondary">
            <BookmarkPlus size={20} />
            Save Case
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/upload" className="btn btn-secondary">
            Analyze Another Document
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;
