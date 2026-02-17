import React from 'react';

function Privacy({ language }) {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Privacy Policy & Disclaimers
        </h1>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Data Collection & Privacy
          </h2>
          <div style={{ lineHeight: '1.8' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>
              What We Collect
            </h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Documents you upload for analysis</li>
              <li>Text descriptions of your legal situations</li>
              <li>Usage information to improve our service</li>
            </ul>

            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>
              How We Protect Your Data
            </h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>All uploads are encrypted in transit and at rest</li>
              <li>Personal identifiers are automatically anonymized</li>
              <li>Data is stored securely and access is restricted</li>
              <li>Optional data deletion available on request</li>
            </ul>

            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>
              Your Rights
            </h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Request access to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of data collection</li>
              <li>Export your data</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#856404' }}>
            ⚠️ Legal Disclaimer
          </h2>
          <div style={{ lineHeight: '1.8', color: '#856404' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>This platform provides general legal information and educational content only.</strong>
            </p>
            <p style={{ marginBottom: '1rem' }}>
              The information provided through this platform does not constitute legal advice and should not be 
              relied upon as such. The use of this platform does not create an attorney-client relationship.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Laws vary by jurisdiction and individual circumstances. What applies in one situation may not 
              apply in another. Always consult with a licensed attorney for advice specific to your situation.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>For urgent matters</strong> such as impending court deadlines, criminal charges, or 
              situations involving immediate danger, contact a lawyer or appropriate emergency services immediately.
            </p>
            <p>
              By using this platform, you acknowledge that you understand these limitations and agree to 
              seek appropriate professional legal counsel when needed.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Contact Us
          </h2>
          <p style={{ lineHeight: '1.8', marginBottom: '0.5rem' }}>
            For privacy-related questions or to exercise your data rights, please contact us at:
          </p>
          <p style={{ fontWeight: '600' }}>
            privacy@legaladviser.example.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
