# Legal Adviser - Setup & Testing Guide

## Complete Setup Instructions

### 1. Initial Setup

```bash
# Clone repository
git clone https://github.com/Akrassum/Legal-Adviser.git
cd Legal-Adviser

# Install all dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Configure API Keys

**Option A: Using Gemini API (Recommended - Free)**

1. Visit https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Create `backend/.env` file:

```env
# Copy from backend/.env.example
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Add your Gemini API key here
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Optional: OpenAI as fallback
# OPENAI_API_KEY=your_openai_key_here
```

**Option B: Using OpenAI API**

1. Visit https://platform.openai.com/api-keys
2. Create account and API key
3. Add to `backend/.env`:

```env
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 3. Start Development Servers

**Option A - Both servers at once (Recommended):**
```bash
npm run dev
```

**Option B - Separate terminals:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 4. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## Testing the Platform

### Test 1: Home Page
1. Open http://localhost:5173
2. Verify the hero section loads
3. Check all navigation links work
4. Test theme toggle (dark/light)
5. Test language selector (English/Hindi/Marathi/Tamil)

### Test 2: Document Upload & Analysis
1. Click "Get Help Now" or navigate to Upload
2. Accept privacy consent checkbox
3. Upload a sample document (image or PDF)
4. Wait for OCR extraction
5. Verify analysis results display with:
   - Summary
   - Legal issues
   - Next steps
   - Documents needed
   - Similar stories
   - Lawyer booking option

### Test 3: Text Description Analysis
1. Go to Upload page
2. Switch to "Describe Situation" tab
3. Enter a legal situation description
4. Fill optional location and date
5. Click "Analyze"
6. Verify results page shows AI-generated guidance

### Test 4: Educational Content
1. Navigate to "Learn" section
2. Browse articles by category
3. Click on an article
4. Verify content displays properly
5. Test category filtering

### Test 5: Stories Explorer
1. Navigate to "Stories" section
2. Search for stories
3. Filter by category
4. Verify story cards display correctly
5. Check timeline and outcomes

### Test 6: Lawyer Directory
1. Navigate to "Lawyers" section
2. Filter by specialization
3. Filter by location
4. Filter by language
5. Click "Book Consultation"
6. Fill booking form
7. Submit booking

### Test 7: Mobile Responsiveness
1. Open browser dev tools (F12)
2. Toggle device toolbar (mobile view)
3. Test on various screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. Verify responsive layout works

### Test 8: Privacy & Anonymization
1. Upload a document with PII:
   - Phone number: 9876543210
   - Aadhaar: 1234 5678 9012
   - Email: test@example.com
2. Verify redaction notice appears
3. Check that PII is anonymized in results

## API Testing with curl

### Health Check
```bash
curl http://localhost:3001/health
```

### Upload Document
```bash
curl -X POST http://localhost:3001/api/upload/single \
  -F "document=@/path/to/your/document.jpg"
```

### Analyze Text
```bash
curl -X POST http://localhost:3001/api/analyze/text \
  -H "Content-Type: application/json" \
  -d '{
    "description": "I received a legal notice about property dispute",
    "language": "en"
  }'
```

### Get Lawyers
```bash
curl http://localhost:3001/api/lawyers?specialization=property&location=Mumbai
```

### Get Stories
```bash
curl http://localhost:3001/api/stories/search?category=property
```

### Get Articles
```bash
curl http://localhost:3001/api/learn/articles?language=en
```

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify Node.js version (18+)
- Check `.env` file exists
- Review console for errors

### Frontend won't start
- Check if port 5173 is available
- Clear node_modules and reinstall
- Check Vite config

### AI Analysis fails
- Verify API key is correctly set in `.env`
- Check API key is valid and has credits
- Review backend console for error messages
- Try switching between Gemini/OpenAI

### OCR not working
- Ensure uploaded file is image or PDF
- Check file size (max 10MB)
- Verify Tesseract.js installed correctly

### Upload fails
- Check file type (JPEG, PNG, PDF only)
- Verify file size under 10MB
- Check uploads folder exists and has write permissions

## Development Tips

### Hot Reload
- Frontend: Saves automatically trigger reload
- Backend: Uses `--watch` flag for auto-restart

### Debugging
- Check browser console (F12) for frontend errors
- Check terminal output for backend errors
- Use `console.log` for debugging
- Check Network tab for API requests

### Adding New Features
1. Backend: Add route in `backend/src/routes/`
2. Frontend: Add page in `frontend/src/pages/`
3. Update navigation in Header component
4. Test thoroughly

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use production API URLs
- [ ] Enable HTTPS
- [ ] Set strong session secrets
- [ ] Configure proper CORS origins
- [ ] Set up database (if needed)
- [ ] Configure file storage (S3/Cloud Storage)
- [ ] Set up error monitoring (Sentry)
- [ ] Enable logging
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables securely
- [ ] Test all features in production environment
- [ ] Set up backup strategy
- [ ] Configure auto-scaling
- [ ] Set up monitoring and alerts

## Performance Optimization

### Frontend
- Lazy load routes
- Optimize images
- Enable code splitting
- Use React.memo for expensive components
- Implement pagination for large lists

### Backend
- Add database indexing
- Implement caching (Redis)
- Use CDN for static files
- Optimize API queries
- Implement request queueing for AI

## Security Recommendations

- [ ] Keep dependencies updated
- [ ] Use helmet for security headers
- [ ] Implement proper authentication (JWT)
- [ ] Add CSRF protection
- [ ] Sanitize all inputs
- [ ] Use parameterized queries
- [ ] Implement proper session management
- [ ] Add security monitoring
- [ ] Regular security audits
- [ ] Implement rate limiting per user
- [ ] Add IP whitelisting for admin
- [ ] Use HTTPS everywhere
- [ ] Implement proper logging
- [ ] Add backup encryption

## Need Help?

- Check README.md for general information
- Review code comments for implementation details
- Open GitHub issue for bugs
- Contact support for urgent issues

## Next Steps

1. Get an API key (Gemini recommended)
2. Follow setup instructions
3. Test all features locally
4. Customize content for your needs
5. Deploy to production
6. Monitor and improve

---

Happy coding! 🚀
