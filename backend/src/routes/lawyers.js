import express from 'express';

const router = express.Router();

// Mock lawyers database
const lawyers = [
  {
    id: 'lawyer_1',
    name: 'Advocate Rajesh Kumar',
    specializations: ['Property Law', 'Family Law'],
    experience: '15 years',
    rating: 4.8,
    location: 'Delhi',
    verified: true,
    languages: ['English', 'Hindi'],
    consultationFee: 1500,
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: 'lawyer_2',
    name: 'Advocate Priya Sharma',
    specializations: ['Consumer Rights', 'Civil Law'],
    experience: '10 years',
    rating: 4.9,
    location: 'Mumbai',
    verified: true,
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 2000,
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: 'lawyer_3',
    name: 'Advocate Amit Patel',
    specializations: ['Criminal Law', 'Corporate Law'],
    experience: '12 years',
    rating: 4.7,
    location: 'Bangalore',
    verified: true,
    languages: ['English', 'Hindi', 'Kannada'],
    consultationFee: 1800,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  }
];

// Mock bookings
const bookings = [];

// Get all lawyers
router.get('/', (req, res) => {
  const { specialization, location, language } = req.query;

  let filtered = lawyers.filter(l => l.verified);

  if (specialization) {
    filtered = filtered.filter(l => 
      l.specializations.some(s => 
        s.toLowerCase().includes(specialization.toLowerCase())
      )
    );
  }

  if (location) {
    filtered = filtered.filter(l => 
      l.location.toLowerCase() === location.toLowerCase()
    );
  }

  if (language) {
    filtered = filtered.filter(l => 
      l.languages.some(lang => 
        lang.toLowerCase() === language.toLowerCase()
      )
    );
  }

  res.json({
    success: true,
    lawyers: filtered,
    total: filtered.length
  });
});

// Get specific lawyer
router.get('/:id', (req, res) => {
  const lawyer = lawyers.find(l => l.id === req.params.id);
  
  if (!lawyer) {
    return res.status(404).json({ error: 'Lawyer not found' });
  }

  res.json({
    success: true,
    lawyer
  });
});

// Book consultation
router.post('/:id/book', (req, res) => {
  const { date, time, description } = req.body;
  const lawyer = lawyers.find(l => l.id === req.params.id);

  if (!lawyer) {
    return res.status(404).json({ error: 'Lawyer not found' });
  }

  const booking = {
    id: `booking_${Date.now()}`,
    lawyerId: req.params.id,
    lawyerName: lawyer.name,
    date,
    time,
    description,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  res.status(201).json({
    success: true,
    booking,
    message: 'Consultation booked successfully. Lawyer will confirm shortly.'
  });
});

// Get user bookings
router.get('/bookings/mine', (req, res) => {
  res.json({
    success: true,
    bookings: bookings.slice(0, 10),
    total: bookings.length
  });
});

export default router;
