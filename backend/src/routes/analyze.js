import express from 'express';
import ocrService from '../services/ocrService.js';
import aiService from '../services/aiService.js';
import anonymizationService from '../services/anonymizationService.js';

const router = express.Router();

// Analyze uploaded document
router.post('/document', async (req, res) => {
  try {
    const { filePath, query, language = 'en' } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: 'File path is required' });
    }

    // Step 1: Extract text using OCR
    console.log('Starting OCR extraction...');
    const ocrResult = await ocrService.extractText(filePath, 'eng+hin');

    if (!ocrResult.text) {
      return res.status(400).json({ 
        error: 'Could not extract text from document',
        confidence: ocrResult.confidence 
      });
    }

    // Step 2: Anonymize extracted text
    console.log('Anonymizing extracted text...');
    const { anonymizedText, redactedFields, wasAnonymized } = 
      anonymizationService.anonymize(ocrResult.text);

    // Step 3: Analyze with AI
    console.log('Analyzing with AI...');
    const analysis = await aiService.analyzeLegalDocument(anonymizedText, query);

    // Step 4: Find similar stories
    const similarStories = await aiService.findSimilarStories({
      text: anonymizedText,
      query
    });

    res.json({
      success: true,
      analysis,
      ocrConfidence: ocrResult.confidence,
      anonymization: {
        wasAnonymized,
        redactedFields,
        summary: anonymizationService.getRedactionSummary()
      },
      similarStories,
      disclaimer: 'This is general information only. Please consult a licensed lawyer for binding legal advice.'
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed',
      details: error.message 
    });
  }
});

// Analyze text description (no document)
router.post('/text', async (req, res) => {
  try {
    const { description, query, language = 'en' } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    // Anonymize user input
    const { anonymizedText, redactedFields, wasAnonymized } = 
      anonymizationService.anonymize(description);

    // Analyze with AI
    const analysis = await aiService.analyzeLegalDocument(anonymizedText, query);

    // Find similar stories
    const similarStories = await aiService.findSimilarStories({
      text: anonymizedText,
      query
    });

    res.json({
      success: true,
      analysis,
      anonymization: {
        wasAnonymized,
        redactedFields,
        summary: anonymizationService.getRedactionSummary()
      },
      similarStories,
      disclaimer: 'This is general information only. Please consult a licensed lawyer for binding legal advice.'
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed',
      details: error.message 
    });
  }
});

// Get case checklist
router.post('/checklist', async (req, res) => {
  try {
    const { caseType, language = 'en' } = req.body;

    if (!caseType) {
      return res.status(400).json({ error: 'Case type is required' });
    }

    const checklist = await aiService.generateCaseChecklist(caseType);

    res.json({
      success: true,
      caseType,
      checklist,
      language
    });

  } catch (error) {
    console.error('Checklist error:', error);
    res.status(500).json({ 
      error: 'Failed to generate checklist',
      details: error.message 
    });
  }
});

export default router;
