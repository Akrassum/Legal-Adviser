# Legal Adviser - AI-Powered Legal Help Platform for Indians

A modern, production-ready web platform that makes legal help accessible to all Indians through AI-powered document analysis, educational content, and verified lawyer connections.

## 🌟 Features

### Core Features
- **📄 Document Analysis**: Upload legal documents with automatic OCR extraction
- **🔒 Privacy First**: Automatic anonymization of personal information (Aadhaar, PAN, phone numbers, etc.)
- **🤖 AI-Powered Guidance**: Get clear explanations and next steps using Gemini/OpenAI
- **📚 Legal Education**: Learn about Indian Constitution and laws in simple language
- **👥 Real Stories**: Browse anonymized case outcomes and experiences
- **⚖️ Verified Lawyers**: Book consultations with verified legal professionals
- **🌍 Multilingual**: Support for English, Hindi, Marathi, and Tamil
- **🌓 Dark/Light Theme**: User-friendly interface with theme toggle
- **📱 Mobile-First**: Responsive design optimized for all devices

### Technical Features
- **Modern Stack**: React + Vite frontend, Express.js backend
- **AI Integration**: Google Gemini API (primary) with OpenAI fallback
- **OCR**: Tesseract.js for document text extraction
- **Security**: Rate limiting, CORS, helmet, encryption
- **Privacy**: Automated PII detection and redaction

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Gemini API key (free from https://aistudio.google.com/app/apikey) OR OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Akrassum/Legal-Adviser.git
cd Legal-Adviser
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

3. **Configure environment variables**
```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Edit backend/.env and add your API keys:
# GEMINI_API_KEY=your_actual_gemini_api_key
# or
# OPENAI_API_KEY=your_actual_openai_api_key
```

4. **Start the development servers**

Option A - Start both backend and frontend together:
```bash
npm run dev
```

Option B - Start separately:
```bash
# Terminal 1 - Start backend (http://localhost:3001)
cd backend
npm run dev

# Terminal 2 - Start frontend (http://localhost:5173)
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🔑 Getting API Keys

### Google Gemini API (Recommended - Free Tier Available)
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add to `backend/.env` as `GEMINI_API_KEY`

### OpenAI API (Fallback)
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Create a new API key
4. Copy the key and add to `backend/.env` as `OPENAI_API_KEY`

## 📁 Project Structure

```
Legal-Adviser/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── server.js          # Main server file
│   │   ├── routes/            # API routes
│   │   └── services/          # Business logic
│   └── package.json
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   └── services/          # API client
│   └── package.json
│
└── README.md                  # This file
```

## 🔧 Key API Endpoints

- `POST /api/upload/single` - Upload document
- `POST /api/analyze/document` - Analyze document
- `POST /api/analyze/text` - Analyze text description
- `GET /api/stories` - Get case stories
- `GET /api/lawyers` - Get verified lawyers
- `GET /api/learn/articles` - Get educational content

## 🎨 Key Technologies

**Frontend:** React 18, Vite, React Router, Axios
**Backend:** Express.js, Gemini AI/OpenAI, Tesseract.js, Multer
**Security:** Helmet, CORS, Rate Limiting, PII Anonymization

## ⚠️ Important Disclaimers

**This platform provides general legal information and educational content only.**

- Not a substitute for professional legal advice
- Does not create an attorney-client relationship
- Always consult a licensed lawyer for specific advice
- For urgent matters, contact a lawyer or emergency services immediately

## 📄 License

MIT License

---

**Made with ❤️ for legal accessibility in India**