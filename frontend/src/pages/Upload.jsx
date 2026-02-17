import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Camera, FileText, Loader } from 'lucide-react';
import api from '../services/api';

const translations = {
  en: {
    title: 'Get Legal Help',
    subtitle: 'Upload a document or describe your situation',
    uploadTab: 'Upload Document',
    describeTab: 'Describe Situation',
    privacyNotice: 'Privacy Notice',
    privacyText: 'We will read your document to extract facts. Personal identifiers will be anonymized automatically. This platform provides general legal guidance and educational content — it is not a substitute for a licensed lawyer. If your matter is urgent, please contact a lawyer or emergency services.',
    consent: 'I understand and consent to processing',
    dragDrop: 'Drag and drop your document here, or click to browse',
    supportedFormats: 'Supported: JPEG, PNG, PDF (Max 10MB)',
    analyzing: 'Analyzing your document...',
    describePlaceholder: 'Describe your legal situation in detail...',
    additionalInfo: 'Additional Information (optional)',
    location: 'Location',
    dateOfIncident: 'Date of Incident',
    analyze: 'Analyze',
    upload: 'Upload & Analyze'
  },
  hi: {
    title: 'कानूनी सहायता प्राप्त करें',
    subtitle: 'दस्तावेज़ अपलोड करें या अपनी स्थिति का वर्णन करें',
    uploadTab: 'दस्तावेज़ अपलोड करें',
    describeTab: 'स्थिति का वर्णन करें',
    privacyNotice: 'गोपनीयता सूचना',
    privacyText: 'हम तथ्य निकालने के लिए आपके दस्तावेज़ को पढ़ेंगे। व्यक्तिगत पहचानकर्ताओं को स्वचालित रूप से गुमनाम किया जाएगा। यह प्लेटफ़ॉर्म सामान्य कानूनी मार्गदर्शन और शैक्षिक सामग्री प्रदान करता है — यह लाइसेंस प्राप्त वकील का विकल्प नहीं है।',
    consent: 'मैं समझता/समझती हूं और प्रसंस्करण के लिए सहमति देता/देती हूं',
    dragDrop: 'अपना दस्तावेज़ यहां खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
    supportedFormats: 'समर्थित: JPEG, PNG, PDF (अधिकतम 10MB)',
    analyzing: 'आपके दस्तावेज़ का विश्लेषण किया जा रहा है...',
    describePlaceholder: 'अपनी कानूनी स्थिति का विस्तार से वर्णन करें...',
    additionalInfo: 'अतिरिक्त जानकारी (वैकल्पिक)',
    location: 'स्थान',
    dateOfIncident: 'घटना की तारीख',
    analyze: 'विश्लेषण करें',
    upload: 'अपलोड और विश्लेषण करें'
  }
};

function Upload({ language }) {
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  
  const [mode, setMode] = useState('upload'); // 'upload' or 'describe'
  const [consented, setConsented] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfIncident, setDateOfIncident] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!consented) {
      setError('Please consent to privacy terms');
      return;
    }

    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Upload file
      const formData = new FormData();
      formData.append('document', file);

      const uploadResponse = await api.post('/upload/single', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { file: uploadedFile } = uploadResponse.data;

      // Step 2: Analyze document
      const analyzeResponse = await api.post('/analyze/document', {
        filePath: uploadedFile.path,
        query: description || '',
        language
      });

      // Navigate to results with analysis data
      navigate('/results/new', { 
        state: { 
          analysis: analyzeResponse.data,
          file: uploadedFile
        } 
      });

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Failed to process document');
    } finally {
      setLoading(false);
    }
  };

  const handleDescribeAndAnalyze = async () => {
    if (!consented) {
      setError('Please consent to privacy terms');
      return;
    }

    if (!description.trim()) {
      setError('Please describe your situation');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const analyzeResponse = await api.post('/analyze/text', {
        description,
        query: `Location: ${location}, Date: ${dateOfIncident}`,
        language
      });

      navigate('/results/new', { 
        state: { 
          analysis: analyzeResponse.data,
          description
        } 
      });

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.error || 'Failed to analyze description');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
          {t.title}
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {t.subtitle}
        </p>

        {/* Privacy Notice */}
        <div className="card" style={{ 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffc107',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#856404' }}>
            ⚠️ {t.privacyNotice}
          </h3>
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: '#856404', lineHeight: '1.5' }}>
            {t.privacyText}
          </p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#856404', fontWeight: '600' }}>
              {t.consent}
            </span>
          </label>
        </div>

        {/* Mode Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          borderBottom: '2px solid var(--border)'
        }}>
          <button
            onClick={() => setMode('upload')}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: mode === 'upload' ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: '600',
              cursor: 'pointer',
              borderBottom: mode === 'upload' ? '2px solid var(--accent)' : 'none',
              marginBottom: '-2px'
            }}
          >
            <UploadIcon size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            {t.uploadTab}
          </button>
          <button
            onClick={() => setMode('describe')}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: mode === 'describe' ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: '600',
              cursor: 'pointer',
              borderBottom: mode === 'describe' ? '2px solid var(--accent)' : 'none',
              marginBottom: '-2px'
            }}
          >
            <FileText size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            {t.describeTab}
          </button>
        </div>

        {/* Upload Mode */}
        {mode === 'upload' && (
          <div className="card">
            <div
              style={{
                border: '2px dashed var(--border)',
                borderRadius: '0.5rem',
                padding: '3rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
              onClick={() => document.getElementById('fileInput').click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onDragLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = 'var(--border)';
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile) {
                  setFile(droppedFile);
                }
              }}
            >
              <Camera size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                {file ? file.name : t.dragDrop}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {t.supportedFormats}
              </p>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {file && (
              <div style={{ marginTop: '1rem' }}>
                <label>{t.additionalInfo}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.describePlaceholder}
                  rows={4}
                  style={{ marginTop: '0.5rem' }}
                />
              </div>
            )}

            {error && (
              <div style={{ 
                color: 'var(--error)', 
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fee',
                borderRadius: '0.375rem'
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleUploadAndAnalyze}
              disabled={!consented || !file || loading}
              className="btn btn-primary btn-large"
              style={{ 
                marginTop: '1rem',
                width: '100%',
                opacity: (!consented || !file || loading) ? 0.5 : 1
              }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spinner" />
                  {t.analyzing}
                </>
              ) : (
                <>
                  <UploadIcon size={20} />
                  {t.upload}
                </>
              )}
            </button>
          </div>
        )}

        {/* Describe Mode */}
        {mode === 'describe' && (
          <div className="card">
            <div style={{ marginBottom: '1rem' }}>
              <label>{t.describePlaceholder}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.describePlaceholder}
                rows={8}
                style={{ marginTop: '0.5rem' }}
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label>{t.location}</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </div>
              <div>
                <label>{t.dateOfIncident}</label>
                <input
                  type="date"
                  value={dateOfIncident}
                  onChange={(e) => setDateOfIncident(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div style={{ 
                color: 'var(--error)', 
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fee',
                borderRadius: '0.375rem'
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleDescribeAndAnalyze}
              disabled={!consented || !description.trim() || loading}
              className="btn btn-primary btn-large"
              style={{ 
                width: '100%',
                opacity: (!consented || !description.trim() || loading) ? 0.5 : 1
              }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spinner" />
                  {t.analyzing}
                </>
              ) : (
                <>
                  <FileText size={20} />
                  {t.analyze}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
