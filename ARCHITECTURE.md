# Architecture Overview - Legal Adviser Platform

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER DEVICES                            │
│  📱 Mobile Browser    💻 Desktop Browser    📱 Tablet Browser   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      FRONTEND (React + Vite)                    │
│  Port: 5173 (dev) / 80,443 (prod)                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │    Pages     │  │  Components  │  │   Services   │         │
│  │              │  │              │  │              │         │
│  │ • Home       │  │ • Header     │  │ • API Client │         │
│  │ • Upload     │  │ • Footer     │  │ • Auth       │         │
│  │ • Results    │  │ • Theme      │  │              │         │
│  │ • Learn      │  │ • Language   │  │              │         │
│  │ • Stories    │  │              │  │              │         │
│  │ • Lawyers    │  │              │  │              │         │
│  │ • Cases      │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND (Express.js)                         │
│  Port: 3001                                                     │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Security Middleware                        │   │
│  │  • Helmet  • CORS  • Rate Limiting  • Compression     │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    API Routes                            │ │
│  │                                                          │ │
│  │  /api/upload    - File upload (single/multiple)        │ │
│  │  /api/analyze   - Document & text analysis             │ │
│  │  /api/cases     - Case management (CRUD)               │ │
│  │  /api/stories   - Similar stories search               │ │
│  │  /api/lawyers   - Lawyer directory & booking           │ │
│  │  /api/learn     - Educational content                  │ │
│  │  /api/auth      - OTP authentication                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    Services Layer                        │ │
│  │                                                          │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │ AI Service   │  │ OCR Service  │  │ Anonymizer   │ │ │
│  │  │              │  │              │  │              │ │ │
│  │  │ • Gemini AI  │  │ • Tesseract  │  │ • PII Detect │ │ │
│  │  │ • OpenAI     │  │ • Text Extr. │  │ • Redaction  │ │ │
│  │  │ • Analysis   │  │ • Multi-lang │  │ • Patterns   │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────┬───────────────────────┬────────────────────┘
                     │                       │
          ┌──────────▼──────────┐ ┌─────────▼──────────┐
          │  External APIs      │ │  File Storage      │
          ├─────────────────────┤ ├────────────────────┤
          │                     │ │                    │
          │ • Google Gemini     │ │ • Local Storage    │
          │ • OpenAI GPT        │ │ • uploads/         │
          │                     │ │ (or S3/Cloud)      │
          └─────────────────────┘ └────────────────────┘

```

## Data Flow

### 1. Document Upload & Analysis Flow
```
User                Frontend              Backend              AI Service          OCR Service
 │                     │                     │                     │                    │
 │  Upload Document    │                     │                     │                    │
 ├────────────────────►│                     │                     │                    │
 │                     │  POST /upload       │                     │                    │
 │                     ├────────────────────►│                     │                    │
 │                     │                     │  Save File          │                    │
 │                     │                     ├─────────────────────┤                    │
 │                     │                     │                     │                    │
 │                     │  File Path         │                     │                    │
 │                     │◄────────────────────┤                     │                    │
 │                     │                     │                     │                    │
 │                     │  POST /analyze      │                     │                    │
 │                     ├────────────────────►│                     │                    │
 │                     │                     │  Extract Text       │                    │
 │                     │                     ├─────────────────────┼───────────────────►│
 │                     │                     │                     │  OCR Processing    │
 │                     │                     │◄────────────────────┼────────────────────┤
 │                     │                     │  Anonymize Data     │                    │
 │                     │                     ├──────┐              │                    │
 │                     │                     │      │ Redact PII   │                    │
 │                     │                     │◄─────┘              │                    │
 │                     │                     │  AI Analysis        │                    │
 │                     │                     ├────────────────────►│                    │
 │                     │                     │                     │  Generate Response │
 │                     │                     │◄────────────────────┤                    │
 │                     │                     │  Similar Stories    │                    │
 │                     │                     ├──────┐              │                    │
 │                     │                     │      │ Search DB    │                    │
 │                     │                     │◄─────┘              │                    │
 │                     │  Analysis Results  │                     │                    │
 │                     │◄────────────────────┤                     │                    │
 │  Display Results    │                     │                     │                    │
 │◄────────────────────┤                     │                     │                    │
 │                     │                     │                     │                    │
```

### 2. Text Description Analysis Flow
```
User → Frontend → Backend → Anonymizer → AI Service → Frontend → User
                                                ↓
                                          Similar Stories
```

### 3. Educational Content Flow
```
User → Frontend → Backend → Content DB → Frontend → User
                      ↓
                 AI Service (for translations/explanations)
```

### 4. Lawyer Booking Flow
```
User → Frontend → Backend → Lawyer DB → Booking System → Email/SMS → Lawyer
```

## Technology Stack Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│                                                          │
│  React 18, Vite, React Router, Axios, Lucide Icons     │
│  CSS Variables, Responsive Design, Dark/Light Themes    │
└────────────────────────┬─────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────┐
│                    Application Layer                     │
│                                                          │
│  Express.js, Node.js, REST API                          │
│  Middleware: Helmet, CORS, Rate Limit, Compression      │
└────────────────────────┬─────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────┐
│                     Business Logic                       │
│                                                          │
│  AI Service (Gemini/OpenAI)                             │
│  OCR Service (Tesseract.js)                             │
│  Anonymization Service                                   │
│  Case Management, Story Matching                         │
└────────────────────────┬─────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────┐
│                    Data/External Layer                   │
│                                                          │
│  File Storage, External APIs, Future: Database           │
└──────────────────────────────────────────────────────────┘
```

## Security Layers

```
┌──────────────────────────────────────────────┐
│         User Authentication (OTP)            │
├──────────────────────────────────────────────┤
│         Rate Limiting (100/15min)            │
├──────────────────────────────────────────────┤
│         Input Validation & Sanitization      │
├──────────────────────────────────────────────┤
│         CORS & Helmet Security Headers       │
├──────────────────────────────────────────────┤
│         PII Anonymization                    │
├──────────────────────────────────────────────┤
│         Encrypted File Storage               │
└──────────────────────────────────────────────┘
```

## Scalability Architecture (Future)

```
                      ┌──────────────┐
                      │ Load Balancer│
                      └───────┬──────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
         │ Server 1│    │ Server 2│    │ Server 3│
         └────┬────┘    └────┬────┘    └────┬────┘
              │               │               │
              └───────────────┼───────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              ┌─────▼─────┐      ┌─────▼─────┐
              │  Redis    │      │ Database  │
              │  Cache    │      │ MongoDB   │
              └───────────┘      └───────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│              CDN (Cloudflare/CloudFront)           │
│              Static Assets, Images                  │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│              Frontend (Vercel/Netlify)             │
│              React App                              │
└────────────────────┬────────────────────────────────┘
                     │
                     │ API Calls
                     │
┌────────────────────▼────────────────────────────────┐
│              Backend (Railway/Render)              │
│              Express.js API                         │
└───┬───────────────────────────────────────────┬────┘
    │                                           │
    │                                           │
┌───▼────────────────┐              ┌──────────▼──────┐
│ Gemini/OpenAI API  │              │ Cloud Storage   │
│ External Service   │              │ S3/GCS          │
└────────────────────┘              └─────────────────┘
```

## Component Interaction Map

```
Home Page ──┬──► Header (Navigation)
            ├──► Footer (Links)
            └──► Hero Section
                 │
                 ├──► Get Help Button ───► Upload Page
                 ├──► Categories ────────► Learn Page
                 └──► Features

Upload Page ─┬──► Privacy Consent
             ├──► File Upload Component
             ├──► Text Input Component
             └──► Submit ───► Results Page

Results Page ┬──► Analysis Display
             ├──► Similar Stories
             ├──► Lawyer Booking Button ───► Lawyers Page
             └──► Save Case ───► My Cases Page

Learn Page ──┬──► Category Filter
             ├──► Article List
             └──► Article Detail View

Lawyers Page ┬──► Filter Component
             ├──► Lawyer Cards
             └──► Booking Modal

Stories Page ┬──► Search Bar
             ├──► Category Filter
             └──► Story Cards
```

---

**Note**: This architecture is designed for scalability and can grow from a single server to a distributed system as user load increases.
