import express from 'express';
import aiService from '../services/aiService.js';

const router = express.Router();

// Constants
const MAX_CONVERSATION_MESSAGES = 20;
const MAX_FOLLOW_UP_SUGGESTIONS = 4;

// Store conversation history in memory (in production, use database)
const conversations = new Map();

// Generate conversation ID
function generateConversationId() {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Chat endpoint with conversation history
router.post('/message', async (req, res) => {
  try {
    const { message, conversationId, language = 'en' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation
    let convId = conversationId;
    let history = [];
    
    if (convId && conversations.has(convId)) {
      history = conversations.get(convId);
    } else {
      convId = generateConversationId();
    }

    // Add user message to history
    history.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });

    // Build context-aware prompt
    const contextPrompt = history.length > 1
      ? `Previous conversation:\n${history.slice(0, -1).map(m => `${m.role}: ${m.content}`).join('\n')}\n\nCurrent question: ${message}`
      : message;

    const systemPrompt = `You are a friendly Indian legal guide assistant. Provide helpful, clear advice in simple language. Always include a brief disclaimer. Keep responses concise (3-5 paragraphs max).`;

    const fullPrompt = `${systemPrompt}\n\nUser: ${contextPrompt}`;

    // Get AI response
    const response = await aiService.generateResponse(fullPrompt, { language });

    // Add AI response to history
    history.push({
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    });

    // Store conversation (keep last MAX_CONVERSATION_MESSAGES messages)
    if (history.length > MAX_CONVERSATION_MESSAGES) {
      history = history.slice(-MAX_CONVERSATION_MESSAGES);
    }
    conversations.set(convId, history);

    // Generate follow-up suggestions
    const followUpSuggestions = await generateFollowUpSuggestions(message, response, language);

    res.json({
      success: true,
      conversationId: convId,
      message: response,
      followUpSuggestions,
      disclaimer: 'This is general legal information. Consult a licensed lawyer for specific advice.'
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error.message
    });
  }
});

// Generate follow-up question suggestions
async function generateFollowUpSuggestions(userMessage, aiResponse, language) {
  const suggestions = [];

  // Context-based suggestions
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('property') || lowerMessage.includes('land') || lowerMessage.includes('संपत्ति')) {
    suggestions.push(
      language === 'hi' 
        ? 'मुझे संपत्ति के दस्तावेज कैसे सत्यापित करने चाहिए?'
        : 'How do I verify property documents?',
      language === 'hi'
        ? 'संपत्ति विवाद में मध्यस्थता कैसे काम करती है?'
        : 'How does mediation work in property disputes?'
    );
  }

  if (lowerMessage.includes('divorce') || lowerMessage.includes('marriage') || lowerMessage.includes('तलाक')) {
    suggestions.push(
      language === 'hi'
        ? 'तलाक की प्रक्रिया में कितना समय लगता है?'
        : 'How long does the divorce process take?',
      language === 'hi'
        ? 'क्या मुझे वकील की जरूरत है?'
        : 'Do I need a lawyer for this?'
    );
  }

  if (lowerMessage.includes('consumer') || lowerMessage.includes('refund') || lowerMessage.includes('उपभोक्ता')) {
    suggestions.push(
      language === 'hi'
        ? 'मैं उपभोक्ता शिकायत कैसे दर्ज करूं?'
        : 'How do I file a consumer complaint?',
      language === 'hi'
        ? 'रिफंड में कितना समय लगता है?'
        : 'How long does a refund take?'
    );
  }

  // Generic follow-ups if no specific context
  if (suggestions.length === 0) {
    suggestions.push(
      language === 'hi'
        ? 'मुझे कौन से दस्तावेज चाहिए?'
        : 'What documents do I need?',
      language === 'hi'
        ? 'अगले कदम क्या हैं?'
        : 'What are the next steps?',
      language === 'hi'
        ? 'क्या मुझे वकील की जरूरत है?'
        : 'Do I need a lawyer?'
    );
  }

  // Always add these common follow-ups
  suggestions.push(
    language === 'hi'
      ? 'इसमें कितना समय लगेगा?'
      : 'How long will this take?'
  );

  return suggestions.slice(0, MAX_FOLLOW_UP_SUGGESTIONS); // Return max suggestions
}

// Get conversation history
router.get('/history/:conversationId', (req, res) => {
  const { conversationId } = req.params;

  if (!conversations.has(conversationId)) {
    return res.status(404).json({ error: 'Conversation not found' });
  }

  res.json({
    success: true,
    conversationId,
    history: conversations.get(conversationId)
  });
});

// Clear conversation
router.delete('/history/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  conversations.delete(conversationId);

  res.json({
    success: true,
    message: 'Conversation cleared'
  });
});

export default router;
