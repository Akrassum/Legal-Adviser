import React from 'react';
import { Shield, Users, Heart, Award } from 'lucide-react';

function About({ language }) {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
          About Legal Adviser
        </h1>
        <p style={{ fontSize: '1.125rem', textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Making legal help accessible to every Indian
        </p>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Our Mission
          </h2>
          <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
            Legal Adviser is built to bridge the gap between ordinary citizens and the complex legal system. 
            We believe that everyone deserves access to clear legal information and guidance, regardless of 
            their background or financial status.
          </p>
          <p style={{ lineHeight: '1.8' }}>
            Our platform uses AI technology to make legal information simple, while always emphasizing the 
            importance of consulting licensed professionals for serious matters.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <Shield size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Privacy First
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Automatic anonymization of personal data to protect your privacy
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Users size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Community Driven
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Learn from real stories and experiences of others
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Heart size={48} color="var(--error)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Simple & Clear
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Complex laws explained in plain language everyone can understand
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Award size={48} color="var(--warning)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Verified Experts
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Connect with verified lawyers when you need professional help
            </p>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Important Note
          </h2>
          <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
            Legal Adviser provides general legal information and educational content. It is <strong>not</strong> a 
            substitute for professional legal advice from a licensed lawyer.
          </p>
          <p style={{ lineHeight: '1.8' }}>
            If you have a serious legal matter, we strongly recommend consulting with a qualified attorney 
            who can provide personalized advice based on your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
