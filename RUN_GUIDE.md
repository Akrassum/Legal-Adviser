# Running the Legal Adviser Platform

## Quick Start Commands

### Option 1: Run Both Servers Together (Recommended)
```bash
cd /home/runner/work/Legal-Adviser/Legal-Adviser
npm run dev
```

This will start:
- Backend on http://localhost:3001
- Frontend on http://localhost:5173

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd /home/runner/work/Legal-Adviser/Legal-Adviser/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /home/runner/work/Legal-Adviser/Legal-Adviser/frontend
npm run dev
```

---

## Current Status (As of this test)

✅ **Backend is running on port 3001**
- Health check: http://localhost:3001/health
- API base: http://localhost:3001/api

✅ **Frontend is running on port 5173**
- UI: http://localhost:5173

---

## Stopping the Servers

If you need to stop the servers that are currently running:

```bash
# Find and kill the processes
pkill -f "node.*server.js"
pkill -f "vite"
```

Or use Ctrl+C in the terminal where they're running.

---

## Environment Configuration

The `.env` file has been created at:
```
/home/runner/work/Legal-Adviser/Legal-Adviser/backend/.env
```

**To enable AI features:**
1. Get free Gemini API key: https://aistudio.google.com/app/apikey
2. Edit `backend/.env` and replace:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Restart the backend server

---

## Testing the Application

### 1. Test Backend APIs
```bash
# Health check
curl http://localhost:3001/health

# Get categories
curl http://localhost:3001/api/learn/categories

# Get stories
curl http://localhost:3001/api/stories

# Get lawyers
curl http://localhost:3001/api/lawyers
```

### 2. Test Frontend
Open in your browser:
- http://localhost:5173

### 3. Test Full Flow
1. Open http://localhost:5173
2. Click "Get Help Now"
3. Try uploading a document or describing a situation
4. Explore other pages (Learn, Stories, Lawyers)

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill the process if needed
kill -9 <PID>
```

### Frontend won't start
```bash
# Check if port 5173 is in use
lsof -i :5173

# Kill the process if needed
kill -9 <PID>
```

### Dependencies issues
```bash
# Reinstall all dependencies
cd /home/runner/work/Legal-Adviser/Legal-Adviser
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
cd backend && npm install
cd ../frontend && npm install
```

---

## Development Tips

### Hot Reload
- Backend: Uses Node.js `--watch` flag (automatic restart on file changes)
- Frontend: Uses Vite HMR (instant updates in browser)

### Logs
- Backend logs appear in the terminal where you started it
- Frontend logs appear in browser console (F12)

### Making Changes
1. Edit files in `backend/src/` or `frontend/src/`
2. Changes auto-reload (backend restarts, frontend hot-reloads)
3. Refresh browser if needed

---

## All Systems Operational! ✅

Both servers are running and ready to use.
Visit http://localhost:5173 to see the application.
