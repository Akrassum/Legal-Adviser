import Tesseract from 'tesseract.js';
import fs from 'fs/promises';
import path from 'path';

class OCRService {
  async extractText(imagePath, language = 'eng+hin') {
    try {
      console.log(`Starting OCR for ${imagePath}...`);
      
      const { data: { text, confidence } } = await Tesseract.recognize(
        imagePath,
        language,
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
            }
          }
        }
      );

      console.log(`OCR completed with ${confidence}% confidence`);
      
      return {
        text: text.trim(),
        confidence: confidence,
        language: language
      };
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  }

  async extractTextFromMultipleImages(imagePaths, language = 'eng+hin') {
    const results = [];
    
    for (const imagePath of imagePaths) {
      try {
        const result = await this.extractText(imagePath, language);
        results.push(result);
      } catch (error) {
        console.error(`Failed to process ${imagePath}:`, error);
        results.push({
          text: '',
          confidence: 0,
          error: error.message
        });
      }
    }

    return results;
  }

  combineExtractedText(results) {
    return results
      .filter(r => r.text)
      .map(r => r.text)
      .join('\n\n');
  }
}

export default new OCRService();
