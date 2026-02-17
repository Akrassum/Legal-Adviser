import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

class AIService {
  constructor() {
    // Initialize Gemini (primary)
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.geminiModel = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      console.log('✅ Gemini AI initialized');
    }

    // Initialize OpenAI (fallback)
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      console.log('✅ OpenAI initialized');
    }

    if (!this.genAI && !this.openai) {
      console.warn('⚠️  No AI service configured. Please set GEMINI_API_KEY or OPENAI_API_KEY');
    }
  }

  async generateResponse(prompt, options = {}) {
    const { language = 'en', maxTokens = 2000 } = options;

    // Try Gemini first
    if (this.geminiModel) {
      try {
        const result = await this.geminiModel.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.error('Gemini error:', error.message);
        // Fall through to OpenAI
      }
    }

    // Fallback to OpenAI
    if (this.openai) {
      try {
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: maxTokens,
          temperature: 0.7,
        });
        return completion.choices[0].message.content;
      } catch (error) {
        console.error('OpenAI error:', error.message);
        throw new Error('AI service unavailable');
      }
    }

    throw new Error('No AI service configured');
  }

  async analyzeLegalDocument(extractedText, userQuery = '') {
    const systemPrompt = `System role: You are a friendly Indian legal guide assistant. You do NOT give final legal representation or legal opinions — you provide general information, explain laws simply, and suggest options and follow-up steps. Always include a short, clear disclaimer that the user should consult a licensed lawyer for binding advice when needed.`;

    const prompt = `${systemPrompt}

Document Text:
${extractedText}

${userQuery ? `User Query: ${userQuery}` : ''}

Please analyze this document and provide:
1. A short plain-English summary (2-4 lines)
2. Possible legal issues involved (bulleted)
3. Practical next steps (3-6 items)
4. Documents/evidence to collect (checklist)
5. Typical timelines and outcomes
6. Yellow/Red flags: when to urgently consult a lawyer
7. Clear disclaimer

Format the response in JSON with these fields: summary, legalIssues (array), nextSteps (array), documentsNeeded (array), timeline, urgentFlags (array), disclaimer`;

    try {
      const response = await this.generateResponse(prompt);
      
      // Try to parse JSON response
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        // If JSON parsing fails, return structured format
      }

      // Fallback: return raw response with basic structure
      return {
        summary: response.split('\n')[0],
        legalIssues: ['Please review the detailed response below'],
        nextSteps: ['Consult with a licensed lawyer', 'Gather relevant documents'],
        documentsNeeded: ['Identity proof', 'Related correspondence'],
        timeline: 'Varies based on case complexity',
        urgentFlags: ['Consult a lawyer for specific advice'],
        disclaimer: 'This is general information only. Please consult a licensed lawyer for binding legal advice.',
        fullResponse: response
      };
    } catch (error) {
      throw error;
    }
  }

  async explainConstitutionalArticle(article, language = 'en') {
    const prompt = `Explain Article ${article} of the Indian Constitution in very simple ${language === 'hi' ? 'Hindi' : 'English'} language. Keep it to 4-5 short lines and give 2 everyday examples. Make it understandable for common people with no legal background.`;

    return await this.generateResponse(prompt);
  }

  async translateToHindi(text) {
    const prompt = `Translate the following text to simple Hindi suitable for common people. Keep sentences short and easy to understand:\n\n${text}`;
    return await this.generateResponse(prompt);
  }

  async findSimilarStories(caseData) {
    // For now, return mock similar stories
    // In production, this would query a vector database or search engine
    return [
      {
        id: 1,
        title: 'Similar Case: Property Dispute Resolution',
        summary: 'A family resolved their property dispute through mediation',
        outcome: 'Settlement reached in 6 months',
        relevance: 'Same issue type and location'
      }
    ];
  }

  async generateCaseChecklist(caseType) {
    const prompt = `Generate a practical checklist for someone dealing with a ${caseType} case in India. Include:
1. Documents to collect
2. Steps to take
3. Important deadlines
4. When to consult a lawyer

Format as a simple bullet list.`;

    return await this.generateResponse(prompt);
  }
}

export default new AIService();
