# Chat Feature Setup Guide

## 🎉 New Interactive Chat Feature

Your Legal Adviser platform now has a fully interactive AI chat interface on the home page!

---

## ✅ What's New

### Interactive Chat Interface
- **Real-time AI conversation** on the home page
- **Follow-up question suggestions** (Perplexity-style)
- **Trending legal news** section
- **Popular question cards** for quick start
- **Modern, beautiful UI** with gradient backgrounds

---

## 🔑 Setting Up AI (Required for Chat to Work)

The chat feature requires a Gemini API key to function. Here's how to set it up:

### Step 1: Get Your Free Gemini API Key

1. Visit: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated API key

**Note:** Gemini offers a **FREE tier** with generous limits - perfect for development and small-scale use!

### Step 2: Configure Your Backend

1. Open the file: `backend/.env`
2. Find this line:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Replace `your_gemini_api_key_here` with your actual API key:
   ```env
   GEMINI_API_KEY=AIzaSyABC123def456GHI789jkl012MNO345pqr
   ```
4. Save the file

### Step 3: Restart Backend Server

```bash
# Stop the current backend server (Ctrl+C if running in terminal)

# Start it again
cd backend
npm run dev
```

### Step 4: Test the Chat

1. Open your browser to http://localhost:5173
2. Click one of the example questions or type your own
3. You should now see AI responses!

---

## 🎯 How to Use the Chat

### Quick Start with Example Questions

On the home page, you'll see 4 popular questions:
- "How do I file a consumer complaint?"
- "What are my rights as a tenant?"
- "How to register a property?"
- "What is the divorce process in India?"

**Just click any question** to start a conversation!

### Ask Your Own Questions

1. Type your question in the input box at the bottom of the chat interface
2. Press **Enter** or click the **Ask** button
3. Wait for the AI response (a spinner will show while processing)
4. Continue the conversation with follow-up questions!

### Follow-up Suggestions

After you get an answer, the chat will show **smart follow-up suggestions** like:
- "What documents do I need?"
- "What are the next steps?"
- "How long will this take?"
- "Do I need a lawyer?"

These suggestions are **context-aware** - they change based on your question topic!

---

## 📊 Features Overview

### Chat Features
- ✅ Conversational AI with memory (remembers last 20 messages)
- ✅ Context-aware responses
- ✅ Smart follow-up suggestions
- ✅ Real-time message display
- ✅ Loading indicators
- ✅ Error handling
- ✅ Bilingual support (English/Hindi)

### Trending News
- ✅ 4 trending legal news articles
- ✅ View counts and dates
- ✅ Category icons
- ✅ Bilingual content
- ✅ Links to full articles

### UI/UX
- ✅ Beautiful gradient backgrounds
- ✅ Smooth animations and transitions
- ✅ Mobile-responsive design
- ✅ Chat message bubbles (user vs AI styling)
- ✅ Disclaimer display in AI responses
- ✅ Dark/Light theme support

---

## 🛠️ Troubleshooting

### Chat shows "No AI service configured" error

**Cause:** Gemini API key is not set or invalid

**Solution:**
1. Check `backend/.env` has your actual API key (not the placeholder)
2. Ensure there are no extra spaces around the API key
3. Restart the backend server
4. Check backend console logs for confirmation: "✅ Gemini AI initialized"

### Chat shows "Failed to process message" error

**Cause:** API request failed or rate limit exceeded

**Solution:**
1. Check your internet connection
2. Verify your API key is valid
3. Check if you've exceeded the free tier limits
4. Wait a few minutes and try again
5. Check backend console for detailed error logs

### Trending news not showing

**Cause:** News API route may not be registered

**Solution:**
1. Ensure backend is running
2. Test manually: `curl http://localhost:3001/api/news/trending`
3. Check backend logs for errors
4. Restart backend server

### Follow-up suggestions not appearing

**Cause:** AI response may have failed

**Solution:**
1. Ensure the previous message got a successful AI response
2. Check backend logs for errors
3. Try asking another question

---

## 🌍 Language Support

The chat interface supports multiple languages:
- **English** (default)
- **Hindi** (हिन्दी)
- **Marathi** (मराठी)
- **Tamil** (தமிழ்)

To change language:
1. Click the language dropdown in the header
2. Select your preferred language
3. The UI will update immediately
4. AI responses will also be in the selected language

---

## 💡 Tips for Best Results

### Writing Good Questions

**Good:**
- "What are my rights as a tenant in case of illegal eviction?"
- "How do I file a consumer complaint against an e-commerce company?"
- "What documents do I need to register property in Maharashtra?"

**Not so good:**
- "tenant rights" (too vague)
- "help" (not specific enough)
- Very long questions with multiple topics

### Using Follow-up Questions

Instead of starting a new conversation, use follow-up questions to:
- Get more details on specific points
- Clarify confusing information
- Ask about related topics
- Get practical next steps

### Understanding AI Responses

- AI provides **general legal information**, not legal advice
- Always check the **disclaimer** at the bottom of responses
- For specific cases, **consult a licensed lawyer**
- Use the **"Book verified lawyer"** feature for professional help

---

## 📈 Usage Limits (Free Tier)

### Gemini API Free Tier
- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

This is more than enough for:
- Personal use
- Testing and development
- Small-scale deployment (100-500 users/day)

For higher limits, check Google's pricing plans.

---

## 🔒 Privacy & Security

### Data Handling
- Conversations stored **in-memory only** (not saved to disk)
- Automatic **PII anonymization** before sending to AI
- No chat history persists after server restart
- Each conversation gets a unique ID

### What's Anonymized
- Aadhaar numbers
- PAN card numbers
- Phone numbers
- Email addresses
- Bank account numbers
- Personal names (with titles)

---

## 📞 Need Help?

If you encounter issues:

1. **Check Console Logs:**
   - Backend: Terminal where you ran `npm run dev`
   - Frontend: Browser DevTools (F12) → Console tab

2. **Test APIs Manually:**
   ```bash
   # Test chat endpoint
   curl -X POST http://localhost:3001/api/chat/message \
     -H "Content-Type: application/json" \
     -d '{"message": "What are tenant rights?", "language": "en"}'

   # Test news endpoint
   curl http://localhost:3001/api/news/trending
   ```

3. **Common Issues:**
   - API key not working? → Regenerate a new key
   - Server won't start? → Check port 3001 is available
   - Chat not loading? → Check browser console for errors
   - Slow responses? → Check internet connection

---

## 🎊 Enjoy Your New Chat Feature!

You now have a fully functional AI legal assistant on your home page. Users can:
- Ask questions and get instant answers
- Explore trending legal news
- Browse by topic with beautiful category cards
- Get follow-up suggestions
- Connect with verified lawyers when needed

**The platform is now more interactive, modern, and user-friendly!** 🚀

---

## 📝 Next Steps

Want to enhance further?

1. **Add database** for persistent conversation history
2. **Implement user authentication** for personalized chat
3. **Add voice input** for accessibility
4. **Create chat history page** to review past conversations
5. **Add file upload in chat** for document analysis
6. **Implement rating system** for AI responses
7. **Add export chat** feature to PDF

Check the documentation for implementation guides!
