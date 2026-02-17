import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Languages, Calendar } from 'lucide-react';
import api from '../services/api';

function Lawyers({ language }) {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    language: ''
  });
  const [bookingLawyer, setBookingLawyer] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    description: ''
  });

  useEffect(() => {
    loadLawyers();
  }, [filters]);

  const loadLawyers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/lawyers', { params: filters });
      setLawyers(response.data.lawyers || []);
    } catch (error) {
      console.error('Failed to load lawyers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (lawyerId) => {
    try {
      const response = await api.post(`/lawyers/${lawyerId}/book`, bookingForm);
      alert(response.data.message);
      setBookingLawyer(null);
      setBookingForm({ date: '', time: '', description: '' });
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          👨‍⚖️ Verified Lawyers
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Book consultations with verified legal professionals
        </p>

        {/* Filters */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <label>Specialization</label>
            <select
              value={filters.specialization}
              onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
            >
              <option value="">All</option>
              <option value="property">Property Law</option>
              <option value="family">Family Law</option>
              <option value="consumer">Consumer Rights</option>
              <option value="criminal">Criminal Law</option>
              <option value="corporate">Corporate Law</option>
            </select>
          </div>

          <div>
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g., Mumbai"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>

          <div>
            <label>Language</label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
            >
              <option value="">Any</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
              <option value="tamil">Tamil</option>
            </select>
          </div>
        </div>

        {/* Lawyers Grid */}
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
            {lawyers.map(lawyer => (
              <div key={lawyer.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                      {lawyer.name}
                    </h3>
                    {lawyer.verified && (
                      <span style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        color: 'var(--success)',
                        fontWeight: '600'
                      }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    <span style={{ fontWeight: '600' }}>{lawyer.rating}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {lawyer.specializations.map((spec, idx) => (
                      <span key={idx} style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <MapPin size={14} />
                      {lawyer.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <Languages size={14} />
                      {lawyer.languages.join(', ')}
                    </div>
                    <div>
                      <strong>Experience:</strong> {lawyer.experience}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    ₹{lawyer.consultationFee} per consultation
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Available: {lawyer.availability.join(', ')}
                  </div>
                </div>

                <button 
                  onClick={() => setBookingLawyer(lawyer)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Calendar size={18} />
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && lawyers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>
              No lawyers found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingLawyer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Book Consultation
            </h2>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
              with {bookingLawyer.name}
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label>Date</label>
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label>Time</label>
              <input
                type="time"
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label>Brief Description of Your Case</label>
              <textarea
                rows={4}
                value={bookingForm.description}
                onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                placeholder="Please provide a brief overview..."
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => handleBooking(bookingLawyer.id)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Confirm Booking
              </button>
              <button 
                onClick={() => setBookingLawyer(null)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lawyers;
