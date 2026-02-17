# Deployment Guide - Legal Adviser Platform

## Overview

This guide covers deploying the Legal Adviser platform to various hosting services. The platform consists of:
- **Frontend**: React + Vite static site
- **Backend**: Express.js Node.js API
- **Storage**: File uploads (can use local or cloud storage)
- **AI**: External API (Gemini/OpenAI)

## Quick Deploy Options

### Option 1: Railway (Recommended for Full-Stack)

**Pros**: Easy setup, free tier, supports full-stack, automatic SSL
**Cons**: Free tier limits, cold starts

1. **Sign up**: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Select repository**: Akrassum/Legal-Adviser
4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   GEMINI_API_KEY=your_key
   FRONTEND_URL=your_frontend_url
   ```
5. **Deploy**: Railway auto-detects and deploys both services
6. **Custom Domain** (optional): Add in settings

### Option 2: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel**

1. Go to https://vercel.com
2. Import Git Repository
3. Select `frontend` folder as root directory
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=your_backend_url
   ```
7. Deploy

**Backend on Railway** (same as Option 1)

### Option 3: Render

**Frontend**
1. Go to https://render.com
2. New Static Site
3. Connect repository
4. Build command: `cd frontend && npm install && npm run build`
5. Publish directory: `frontend/dist`

**Backend**
1. New Web Service
2. Build command: `cd backend && npm install`
3. Start command: `cd backend && npm start`
4. Add environment variables

### Option 4: Docker Deployment

**Create Dockerfile**
```dockerfile
# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/
COPY package*.json ./

# Install dependencies
RUN npm install
RUN cd backend && npm install

# Copy source
COPY backend ./backend
COPY package*.json ./

EXPOSE 3001

CMD ["npm", "start"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    volumes:
      - uploads:/app/uploads

  frontend:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./frontend/dist:/usr/share/nginx/html

volumes:
  uploads:
```

**Deploy**
```bash
docker-compose up -d
```

## Environment Variables

### Backend (.env)
```env
# Required
NODE_ENV=production
PORT=3001
GEMINI_API_KEY=your_gemini_key

# Optional
OPENAI_API_KEY=your_openai_key
FRONTEND_URL=https://your-frontend.com
MAX_FILE_SIZE=10485760
SESSION_SECRET=random_secret_key_change_this
```

### Frontend
```env
VITE_API_URL=https://your-backend.com/api
```

## Build Commands

### Frontend
```bash
cd frontend
npm install
npm run build
# Output: frontend/dist/
```

### Backend
```bash
cd backend
npm install
# No build needed (plain JavaScript)
```

## File Storage Options

### Option 1: Local Storage (Simple)
- Default configuration
- Files stored in `uploads/` directory
- Good for: Small deployments, testing
- Note: May not persist on some cloud platforms

### Option 2: AWS S3
```javascript
// Install: npm install aws-sdk multer-s3
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    }
  })
});
```

### Option 3: Google Cloud Storage
```javascript
// Install: npm install @google-cloud/storage multer-cloud-storage
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE
});
```

## Database Setup (Optional)

### MongoDB Atlas (Recommended)

1. Create cluster at https://cloud.mongodb.com
2. Get connection string
3. Install: `npm install mongodb`
4. Add to .env:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/legaladviser
   ```

### PostgreSQL
1. Create database (e.g., on Heroku Postgres)
2. Install: `npm install pg`
3. Add to .env:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```

## Production Checklist

### Security
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS everywhere
- [ ] Set strong SESSION_SECRET
- [ ] Configure proper CORS origins
- [ ] Enable rate limiting
- [ ] Add authentication
- [ ] Sanitize inputs
- [ ] Keep dependencies updated
- [ ] Set up security headers (helmet)
- [ ] Implement CSP (Content Security Policy)

### Performance
- [ ] Enable compression
- [ ] Set up CDN (Cloudflare, CloudFront)
- [ ] Optimize images
- [ ] Enable caching
- [ ] Minify assets
- [ ] Use lazy loading
- [ ] Monitor performance (New Relic, DataDog)

### Reliability
- [ ] Set up error monitoring (Sentry)
- [ ] Configure logging (Winston, Pino)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure health checks
- [ ] Implement retry logic
- [ ] Set up backups
- [ ] Test error scenarios
- [ ] Plan for scaling

### Data
- [ ] Configure file storage
- [ ] Set up database if needed
- [ ] Implement data backup
- [ ] Plan data retention policy
- [ ] Add data export feature
- [ ] Implement GDPR compliance

### Monitoring
- [ ] Set up analytics (Google Analytics)
- [ ] Configure error tracking
- [ ] Monitor API usage
- [ ] Track AI API costs
- [ ] Set up alerts
- [ ] Monitor server resources

## Scaling Considerations

### Vertical Scaling
- Increase server resources (RAM, CPU)
- Good for: Initial growth
- Limitation: Hardware limits

### Horizontal Scaling
- Add more server instances
- Use load balancer
- Good for: High traffic
- Requires: Stateless design

### Caching Strategies
```javascript
// Install: npm install redis
import redis from 'redis';

const client = redis.createClient({
  url: process.env.REDIS_URL
});

// Cache AI responses
const cacheKey = `analysis:${hash(text)}`;
const cached = await client.get(cacheKey);
if (cached) return JSON.parse(cached);

const result = await aiService.analyze(text);
await client.setEx(cacheKey, 3600, JSON.stringify(result));
```

## Cost Estimation

### Free Tier (Development)
- Frontend: Vercel/Netlify (Free)
- Backend: Railway/Render (Free tier)
- AI: Gemini (Free tier: 60 req/min)
- **Total: $0/month**

### Small Scale (100-1000 users)
- Frontend: $0 (static hosting)
- Backend: $5-10/month (Railway/Render)
- AI: $10-50/month (Gemini paid tier)
- Storage: $5/month (if using S3)
- **Total: $20-65/month**

### Medium Scale (1000-10000 users)
- Frontend: $0-20/month (CDN + hosting)
- Backend: $25-100/month (multiple instances)
- AI: $100-500/month (higher usage)
- Database: $15-50/month (MongoDB Atlas)
- Storage: $20-50/month
- **Total: $160-720/month**

## Troubleshooting

### Deployment Fails
- Check build logs
- Verify package.json scripts
- Ensure all dependencies listed
- Check Node.js version compatibility

### App Crashes
- Check error logs
- Verify environment variables
- Check memory limits
- Review recent changes

### High Latency
- Enable caching
- Optimize database queries
- Use CDN for static files
- Consider edge functions

### API Rate Limits
- Implement request queuing
- Add caching layer
- Upgrade AI API tier
- Optimize prompt sizes

## Support

Need help with deployment?
- Check platform documentation
- Review error logs
- Open GitHub issue
- Contact support

---

Good luck with your deployment! 🚀
