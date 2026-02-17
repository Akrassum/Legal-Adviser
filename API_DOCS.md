# API Documentation - Legal Adviser Platform

## Base URL
- Development: `http://localhost:3001/api`
- Production: `https://your-domain.com/api`

## Authentication

Currently using simple token-based auth. For production, implement JWT.

**Request OTP**
```http
POST /api/auth/request-otp
Content-Type: application/json

{
  "phone": "9876543210"
}
```

**Verify OTP**
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phone": "9876543210",
  "otp": "123456"
}
```

## Upload Endpoints

### Upload Single Document
```http
POST /api/upload/single
Content-Type: multipart/form-data

document: [file]
```

**Response:**
```json
{
  "success": true,
  "file": {
    "id": "uuid",
    "filename": "document.jpg",
    "originalName": "my-document.jpg",
    "path": "uploads/uuid.jpg",
    "size": 1024000,
    "mimeType": "image/jpeg"
  },
  "message": "File uploaded successfully"
}
```

### Upload Multiple Documents
```http
POST /api/upload/multiple
Content-Type: multipart/form-data

documents: [file1, file2, ...]
```

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "id": "uuid1",
      "filename": "doc1.jpg",
      "originalName": "document1.jpg",
      "path": "uploads/uuid1.jpg",
      "size": 1024000,
      "mimeType": "image/jpeg"
    }
  ],
  "count": 2,
  "message": "2 file(s) uploaded successfully"
}
```

## Analysis Endpoints

### Analyze Document
```http
POST /api/analyze/document
Content-Type: application/json

{
  "filePath": "uploads/uuid.jpg",
  "query": "What should I do?",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "summary": "This appears to be a legal notice regarding...",
    "legalIssues": [
      "Property dispute",
      "Boundary encroachment"
    ],
    "nextSteps": [
      "Consult a property lawyer",
      "Gather property documents",
      "Review boundary records"
    ],
    "documentsNeeded": [
      "Property title deed",
      "Survey reports",
      "Previous correspondence"
    ],
    "timeline": "Typically 3-6 months for resolution",
    "urgentFlags": [
      "Court date mentioned - urgent action needed"
    ],
    "disclaimer": "This is general information. Consult a lawyer."
  },
  "ocrConfidence": 85.5,
  "anonymization": {
    "wasAnonymized": true,
    "redactedFields": [
      { "type": "phone", "count": 1 },
      { "type": "names", "count": 2 }
    ],
    "summary": "Redacted: 1 phone(s), 2 names(s)"
  },
  "similarStories": [
    {
      "id": 1,
      "title": "Similar Case: Property Dispute",
      "summary": "Resolution through mediation",
      "outcome": "Settled in 6 months",
      "relevance": "Same issue type"
    }
  ],
  "disclaimer": "Consult a licensed lawyer for legal advice"
}
```

### Analyze Text Description
```http
POST /api/analyze/text
Content-Type: application/json

{
  "description": "I received a notice about property dispute...",
  "query": "Location: Mumbai, Date: 2024-01-15",
  "language": "en"
}
```

**Response:** Same as document analysis

### Generate Case Checklist
```http
POST /api/analyze/checklist
Content-Type: application/json

{
  "caseType": "property dispute",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "caseType": "property dispute",
  "checklist": "1. Property documents...\n2. Survey reports...",
  "language": "en"
}
```

## Cases Endpoints

### Get All Cases
```http
GET /api/cases
```

**Response:**
```json
{
  "success": true,
  "cases": [
    {
      "id": "case_123",
      "title": "Property Dispute",
      "description": "Boundary issue with neighbor",
      "caseType": "property",
      "documents": ["doc1.jpg"],
      "status": "open",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 1
}
```

### Get Specific Case
```http
GET /api/cases/:id
```

### Create Case
```http
POST /api/cases
Content-Type: application/json

{
  "title": "Property Dispute",
  "description": "Boundary issue",
  "caseType": "property",
  "documents": ["doc1.jpg"]
}
```

### Update Case
```http
PUT /api/cases/:id
Content-Type: application/json

{
  "status": "closed"
}
```

### Delete Case
```http
DELETE /api/cases/:id
```

## Stories Endpoints

### Get All Stories
```http
GET /api/stories
```

### Search Stories
```http
GET /api/stories/search?query=property&category=property&tags=mediation
```

**Response:**
```json
{
  "success": true,
  "stories": [
    {
      "id": "story_1",
      "title": "Property Dispute Resolution",
      "category": "property",
      "summary": "Family resolved dispute through mediation",
      "timeline": "6 months",
      "outcome": "Amicable settlement",
      "keyLessons": [
        "Documentation is crucial",
        "Mediation saves time"
      ],
      "tags": ["property", "family", "mediation"]
    }
  ],
  "total": 1
}
```

### Get Specific Story
```http
GET /api/stories/:id
```

## Lawyers Endpoints

### Get All Lawyers
```http
GET /api/lawyers?specialization=property&location=Mumbai&language=hindi
```

**Response:**
```json
{
  "success": true,
  "lawyers": [
    {
      "id": "lawyer_1",
      "name": "Advocate Rajesh Kumar",
      "specializations": ["Property Law", "Family Law"],
      "experience": "15 years",
      "rating": 4.8,
      "location": "Delhi",
      "verified": true,
      "languages": ["English", "Hindi"],
      "consultationFee": 1500,
      "availability": ["Mon", "Wed", "Fri"]
    }
  ],
  "total": 1
}
```

### Get Specific Lawyer
```http
GET /api/lawyers/:id
```

### Book Consultation
```http
POST /api/lawyers/:id/book
Content-Type: application/json

{
  "date": "2024-02-01",
  "time": "10:00",
  "description": "Need consultation on property matter"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "booking_123",
    "lawyerId": "lawyer_1",
    "lawyerName": "Advocate Rajesh Kumar",
    "date": "2024-02-01",
    "time": "10:00",
    "description": "Need consultation...",
    "status": "pending",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  "message": "Consultation booked successfully"
}
```

### Get User Bookings
```http
GET /api/lawyers/bookings/mine
```

## Learn Endpoints

### Get All Articles
```http
GET /api/learn/articles?category=constitution&language=en
```

**Response:**
```json
{
  "success": true,
  "articles": [
    {
      "id": "article_1",
      "title": "Fundamental Rights",
      "category": "constitution",
      "language": "en",
      "summary": "A simple guide to fundamental rights"
    }
  ],
  "total": 1
}
```

### Get Specific Article
```http
GET /api/learn/articles/:id
```

**Response:**
```json
{
  "success": true,
  "article": {
    "id": "article_1",
    "title": "Fundamental Rights",
    "category": "constitution",
    "language": "en",
    "summary": "A simple guide",
    "content": "# Full article content in markdown..."
  }
}
```

### Get Categories
```http
GET /api/learn/categories
```

**Response:**
```json
{
  "success": true,
  "categories": [
    { "id": "constitution", "name": "Constitution", "icon": "📜" },
    { "id": "family", "name": "Family Law", "icon": "👨‍👩‍👧‍👦" }
  ]
}
```

### Explain Constitutional Article
```http
POST /api/learn/explain/article
Content-Type: application/json

{
  "articleNumber": "21",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "articleNumber": "21",
  "explanation": "Article 21 protects the right to life...",
  "language": "en"
}
```

### Translate to Hindi
```http
POST /api/learn/translate
Content-Type: application/json

{
  "text": "The Constitution guarantees fundamental rights",
  "targetLanguage": "hi"
}
```

**Response:**
```json
{
  "success": true,
  "original": "The Constitution guarantees...",
  "translated": "संविधान मौलिक अधिकारों की गारंटी देता है",
  "targetLanguage": "hi"
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: 
  - `X-RateLimit-Limit`: Total limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

## Webhooks (Future)

Coming soon:
- Case status updates
- Lawyer booking confirmations
- Document processing completion

## SDKs (Future)

Coming soon:
- JavaScript/TypeScript SDK
- Python SDK
- Mobile SDKs (React Native)

## Support

For API questions:
- GitHub Issues: https://github.com/Akrassum/Legal-Adviser/issues
- Email: api-support@legaladviser.example.com

---

**API Version**: 1.0.0  
**Last Updated**: 2024
