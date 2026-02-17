import express from 'express';

const router = express.Router();

// Mock stories database
const stories = [
  {
    id: 'story_1',
    title: 'Property Dispute Resolution',
    category: 'property',
    summary: 'A family successfully resolved their ancestral property dispute through mediation',
    timeline: '6 months',
    outcome: 'Amicable settlement reached',
    keyLessons: ['Documentation is crucial', 'Mediation can save time and money'],
    tags: ['property', 'family', 'mediation']
  },
  {
    id: 'story_2',
    title: 'Tenant Rights Enforcement',
    category: 'property',
    summary: 'Tenant successfully fought illegal eviction with proper legal channels',
    timeline: '4 months',
    outcome: 'Tenant rights upheld, compensation received',
    keyLessons: ['Know your rental agreement', 'Document all communications'],
    tags: ['tenant', 'property', 'rights']
  },
  {
    id: 'story_3',
    title: 'Consumer Complaint Success',
    category: 'consumer',
    summary: 'Won consumer court case against defective product',
    timeline: '3 months',
    outcome: 'Full refund and compensation',
    keyLessons: ['Keep all receipts', 'Consumer courts are accessible'],
    tags: ['consumer', 'complaint', 'refund']
  }
];

// Search stories
router.get('/search', (req, res) => {
  const { query, category, tags } = req.query;

  let filtered = [...stories];

  if (category) {
    filtered = filtered.filter(s => s.category === category);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) ||
      s.summary.toLowerCase().includes(lowerQuery)
    );
  }

  if (tags) {
    const tagArray = tags.split(',');
    filtered = filtered.filter(s => 
      tagArray.some(tag => s.tags.includes(tag))
    );
  }

  res.json({
    success: true,
    stories: filtered,
    total: filtered.length
  });
});

// Get all stories
router.get('/', (req, res) => {
  res.json({
    success: true,
    stories,
    total: stories.length
  });
});

// Get specific story
router.get('/:id', (req, res) => {
  const story = stories.find(s => s.id === req.params.id);
  
  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }

  res.json({
    success: true,
    story
  });
});

export default router;
