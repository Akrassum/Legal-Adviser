import express from 'express';
import aiService from '../services/aiService.js';

const router = express.Router();

// Educational content database
const articles = [
  {
    id: 'article_1',
    title: 'Fundamental Rights under the Indian Constitution',
    category: 'constitution',
    language: 'en',
    summary: 'A simple guide to understanding your fundamental rights',
    content: `# Fundamental Rights under the Indian Constitution

## Introduction
The Indian Constitution guarantees six fundamental rights to every citizen. These are the basic rights that protect our freedom and dignity.

## The Six Fundamental Rights

### 1. Right to Equality (Articles 14-18)
Everyone is equal before the law. No discrimination based on religion, race, caste, sex, or place of birth.

**Example:** A person from any background can apply for government jobs.

### 2. Right to Freedom (Articles 19-22)
Freedom of speech, assembly, movement, and choice of profession.

**Example:** You can express your opinions freely, start any lawful business.

### 3. Right against Exploitation (Articles 23-24)
Protection against human trafficking and forced labor. Child labor is prohibited.

**Example:** No one can force you to work without proper wages.

### 4. Right to Freedom of Religion (Articles 25-28)
Freedom to practice, profess, and propagate any religion.

**Example:** You can follow any religion of your choice.

### 5. Cultural and Educational Rights (Articles 29-30)
Protection of interests of minorities to preserve their culture and language.

**Example:** Linguistic minorities can establish educational institutions.

### 6. Right to Constitutional Remedies (Article 32)
Right to move to Supreme Court if fundamental rights are violated.

**Example:** You can file a case in court if your rights are violated.

## FAQ

**Q: What if my fundamental rights are violated?**
A: You can approach the courts. The Supreme Court and High Courts can issue writs to protect your rights.

**Q: Are these rights absolute?**
A: No, reasonable restrictions can be imposed in the interest of public order, morality, and security.

**Q: Can fundamental rights be suspended?**
A: During a national emergency, some rights can be suspended, except the Right to Life and Personal Liberty.

## Practical Tip
If you feel your rights are violated, document everything, take photos/videos if possible, and consult a lawyer immediately. You can also approach legal aid services for free assistance.`
  },
  {
    id: 'article_2',
    title: 'भारतीय संविधान के मौलिक अधिकार',
    category: 'constitution',
    language: 'hi',
    summary: 'अपने मौलिक अधिकारों को समझने के लिए एक सरल मार्गदर्शिका',
    content: `# भारतीय संविधान के मौलिक अधिकार

## परिचय
भारतीय संविधान हर नागरिक को छह मौलिक अधिकार देता है। ये मूल अधिकार हैं जो हमारी स्वतंत्रता और गरिमा की रक्षा करते हैं।

## छह मौलिक अधिकार

### 1. समानता का अधिकार (अनुच्छेद 14-18)
कानून के समक्ष सभी समान हैं। धर्म, जाति, लिंग या जन्म स्थान के आधार पर कोई भेदभाव नहीं।

### 2. स्वतंत्रता का अधिकार (अनुच्छेद 19-22)
बोलने, एकत्रित होने, आवागमन और व्यवसाय चुनने की स्वतंत्रता।

### 3. शोषण के विरुद्ध अधिकार (अनुच्छेद 23-24)
मानव तस्करी और जबरन श्रम से सुरक्षा। बाल श्रम निषिद्ध है।

### 4. धार्मिक स्वतंत्रता का अधिकार (अनुच्छेद 25-28)
किसी भी धर्म का पालन करने की स्वतंत्रता।

### 5. सांस्कृतिक और शैक्षिक अधिकार (अनुच्छेद 29-30)
अपनी संस्कृति और भाषा को संरक्षित करने का अधिकार।

### 6. संवैधानिक उपचारों का अधिकार (अनुच्छेद 32)
यदि मौलिक अधिकारों का उल्लंघन हो तो सुप्रीम कोर्ट जाने का अधिकार।

## सुझाव
यदि आपके अधिकारों का उल्लंघन हो, तो सब कुछ दर्ज करें और तुरंत वकील से सलाह लें।`
  }
];

// Get all articles
router.get('/articles', (req, res) => {
  const { category, language = 'en' } = req.query;

  let filtered = [...articles];

  if (category) {
    filtered = filtered.filter(a => a.category === category);
  }

  if (language) {
    filtered = filtered.filter(a => a.language === language);
  }

  res.json({
    success: true,
    articles: filtered.map(a => ({
      id: a.id,
      title: a.title,
      category: a.category,
      language: a.language,
      summary: a.summary
    })),
    total: filtered.length
  });
});

// Get specific article
router.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json({
    success: true,
    article
  });
});

// Explain constitutional article
router.post('/explain/article', async (req, res) => {
  try {
    const { articleNumber, language = 'en' } = req.body;

    if (!articleNumber) {
      return res.status(400).json({ error: 'Article number is required' });
    }

    const explanation = await aiService.explainConstitutionalArticle(
      articleNumber,
      language
    );

    res.json({
      success: true,
      articleNumber,
      explanation,
      language
    });

  } catch (error) {
    console.error('Explanation error:', error);
    res.status(500).json({ 
      error: 'Failed to explain article',
      details: error.message 
    });
  }
});

// Translate to Hindi
router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage = 'hi' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const translated = await aiService.translateToHindi(text);

    res.json({
      success: true,
      original: text,
      translated,
      targetLanguage
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ 
      error: 'Translation failed',
      details: error.message 
    });
  }
});

// Get categories
router.get('/categories', (req, res) => {
  const categories = [
    { id: 'constitution', name: 'Constitution', icon: '📜' },
    { id: 'family', name: 'Family Law', icon: '👨‍👩‍👧‍👦' },
    { id: 'property', name: 'Property Law', icon: '🏠' },
    { id: 'consumer', name: 'Consumer Rights', icon: '🛒' },
    { id: 'criminal', name: 'Criminal Law', icon: '⚖️' },
    { id: 'business', name: 'Business Law', icon: '💼' }
  ];

  res.json({
    success: true,
    categories
  });
});

export default router;
