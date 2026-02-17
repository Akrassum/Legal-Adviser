class AnonymizationService {
  constructor() {
    // Common PII patterns for Indian context
    this.patterns = {
      // Aadhaar number: 12 digits, optionally with spaces
      aadhaar: /\b\d{4}\s?\d{4}\s?\d{4}\b/g,
      
      // PAN card: 5 letters, 4 digits, 1 letter
      pan: /\b[A-Z]{5}\d{4}[A-Z]\b/g,
      
      // Mobile numbers: 10 digits with optional country code
      mobile: /\b(?:\+91|0)?[6-9]\d{9}\b/g,
      
      // Email addresses
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      
      // Indian bank account numbers (9-18 digits)
      bankAccount: /\b\d{9,18}\b/g,
      
      // Names preceded by common titles (simple pattern)
      names: /\b(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g,
      
      // Addresses (street numbers and postal codes)
      postalCode: /\b\d{6}\b/g,
    };

    this.replacements = {
      aadhaar: '[AADHAAR-REDACTED]',
      pan: '[PAN-REDACTED]',
      mobile: '[PHONE-REDACTED]',
      email: '[EMAIL-REDACTED]',
      bankAccount: '[ACCOUNT-REDACTED]',
      names: '[NAME-REDACTED]',
      postalCode: '[PIN-REDACTED]'
    };

    this.redactedFields = [];
  }

  anonymize(text) {
    if (!text) return { anonymizedText: '', redactedFields: [] };

    let anonymizedText = text;
    this.redactedFields = [];

    // Apply each pattern
    for (const [key, pattern] of Object.entries(this.patterns)) {
      const matches = anonymizedText.match(pattern);
      
      if (matches && matches.length > 0) {
        this.redactedFields.push({
          type: key,
          count: matches.length
        });
        
        anonymizedText = anonymizedText.replace(pattern, this.replacements[key]);
      }
    }

    return {
      anonymizedText,
      redactedFields: this.redactedFields,
      wasAnonymized: this.redactedFields.length > 0
    };
  }

  getRedactionSummary() {
    if (this.redactedFields.length === 0) {
      return 'No personal information was detected or redacted.';
    }

    const summary = this.redactedFields
      .map(field => `${field.count} ${field.type}(s)`)
      .join(', ');

    return `Redacted: ${summary}`;
  }

  // Advanced anonymization for structured data
  anonymizeStructuredData(data) {
    const anonymized = { ...data };

    // Common fields that should be anonymized
    const fieldsToAnonymize = [
      'name', 'fullName', 'firstName', 'lastName',
      'email', 'phone', 'mobile',
      'aadhaar', 'pan', 'accountNumber',
      'address', 'street', 'city', 'pincode'
    ];

    for (const field of fieldsToAnonymize) {
      if (anonymized[field]) {
        anonymized[field] = `[${field.toUpperCase()}-REDACTED]`;
      }
    }

    return anonymized;
  }
}

export default new AnonymizationService();
