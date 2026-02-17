# 🚀 Quick Start Card - Legal Adviser Platform

## Get Running in 5 Minutes!

### Prerequisites
- ✅ Node.js 18+ installed
- ✅ npm or yarn
- ✅ A web browser

### Step 1: Clone & Install (2 minutes)
```bash
git clone https://github.com/Akrassum/Legal-Adviser.git
cd Legal-Adviser
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### Step 2: Get Free API Key (1 minute)
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### Step 3: Configure (1 minute)
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit backend/.env and replace:
GEMINI_API_KEY=paste_your_key_here
```

### Step 4: Start Application (1 minute)
```bash
npm run dev
```

### Step 5: Open Browser
```
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

## 🎉 You're Done!

### Try These Features:
1. **Upload a Document** → Click "Get Help Now"
2. **Describe a Situation** → Switch to "Describe" tab
3. **Learn About Laws** → Click "Learn" in navigation
4. **Browse Stories** → Click "Stories"
5. **Find Lawyers** → Click "Lawyers"
6. **Toggle Theme** → Click moon/sun icon
7. **Change Language** → Select from dropdown

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill process if needed
kill -9 <PID>

# Restart
cd backend && npm run dev
```

### Frontend Won't Start
```bash
# Check if port 5173 is in use
lsof -i :5173

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart
cd frontend && npm run dev
```

### AI Analysis Fails
- ✅ Verify API key is correct in `backend/.env`
- ✅ Check API key has no extra spaces
- ✅ Ensure backend is running
- ✅ Check backend console for errors

## 📚 Next Steps

### Explore Documentation
- 📖 `README.md` - Overview
- 🧪 `SETUP_GUIDE.md` - Testing guide
- 🌐 `DEPLOYMENT.md` - Production deployment
- 📚 `API_DOCS.md` - API reference
- 🤝 `CONTRIBUTING.md` - How to contribute

### Deploy to Production
See `DEPLOYMENT.md` for:
- Railway (recommended)
- Vercel + Railway
- Render
- Docker

### Customize
- Add your own content
- Modify styling
- Add features
- Translate to more languages

## 🆘 Need Help?

- **Documentation**: Check the 5 guide files
- **Issues**: https://github.com/Akrassum/Legal-Adviser/issues
- **Questions**: Open a discussion on GitHub

## ⭐ Key Commands

```bash
# Development (both servers)
npm run dev

# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev

# Production build
npm run build

# Check health
curl http://localhost:3001/health
```

## 🎯 What You Have

✅ Full-stack application
✅ AI-powered analysis
✅ Document OCR
✅ Privacy protection
✅ Lawyer directory
✅ Educational content
✅ Mobile responsive
✅ Dark/Light themes
✅ Multilingual UI
✅ Production ready

---

**Happy coding! Made with ❤️ for India** 🇮🇳
