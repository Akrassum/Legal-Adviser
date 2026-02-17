import express from 'express';

const router = express.Router();

// Mock database for cases (in production, use a real database)
const cases = [];

// Get all user cases
router.get('/', (req, res) => {
  res.json({
    success: true,
    cases: cases.slice(0, 20), // Return latest 20
    total: cases.length
  });
});

// Get specific case
router.get('/:id', (req, res) => {
  const caseData = cases.find(c => c.id === req.params.id);
  
  if (!caseData) {
    return res.status(404).json({ error: 'Case not found' });
  }

  res.json({
    success: true,
    case: caseData
  });
});

// Create new case
router.post('/', (req, res) => {
  const { title, description, caseType, documents } = req.body;

  const newCase = {
    id: `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title,
    description,
    caseType,
    documents: documents || [],
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  cases.unshift(newCase);

  res.status(201).json({
    success: true,
    case: newCase
  });
});

// Update case
router.put('/:id', (req, res) => {
  const index = cases.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Case not found' });
  }

  cases[index] = {
    ...cases[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    case: cases[index]
  });
});

// Delete case
router.delete('/:id', (req, res) => {
  const index = cases.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Case not found' });
  }

  cases.splice(index, 1);

  res.json({
    success: true,
    message: 'Case deleted successfully'
  });
});

export default router;
