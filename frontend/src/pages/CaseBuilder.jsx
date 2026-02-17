import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CaseBuilder({ language }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [caseData, setCaseData] = useState({
    caseType: '',
    description: '',
    parties: '',
    date: '',
    location: '',
    amount: ''
  });

  const caseTypes = [
    'Property Dispute',
    'Family Matter',
    'Consumer Complaint',
    'Employment Issue',
    'Contract Dispute',
    'Criminal Matter',
    'Other'
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/upload');
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '700px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
          📋 Case Builder
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Step {step} of 3
        </p>

        <div className="card">
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>What type of case is this?</h2>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {caseTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setCaseData({ ...caseData, caseType: type })}
                    style={{
                      padding: '1rem',
                      textAlign: 'left',
                      border: `2px solid ${caseData.caseType === type ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: '0.5rem',
                      backgroundColor: caseData.caseType === type ? 'rgba(49, 130, 206, 0.1)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tell us more details</h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <label>Describe the situation</label>
                <textarea
                  rows={6}
                  value={caseData.description}
                  onChange={(e) => setCaseData({ ...caseData, description: e.target.value })}
                  placeholder="Provide as much detail as possible..."
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>When did this happen?</label>
                <input
                  type="date"
                  value={caseData.date}
                  onChange={(e) => setCaseData({ ...caseData, date: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Location</label>
                <input
                  type="text"
                  value={caseData.location}
                  onChange={(e) => setCaseData({ ...caseData, location: e.target.value })}
                  placeholder="City, State"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Review & Continue</h2>
              
              <div style={{ 
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong>Case Type:</strong> {caseData.caseType}
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong>Date:</strong> {caseData.date || 'Not specified'}
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong>Location:</strong> {caseData.location || 'Not specified'}
                </div>
                <div>
                  <strong>Description:</strong> {caseData.description || 'Not provided'}
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Next, you can upload supporting documents or continue to get AI analysis.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={step === 1 && !caseData.caseType}
            >
              {step === 3 ? 'Continue to Upload' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseBuilder;
