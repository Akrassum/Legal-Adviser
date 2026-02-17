import express from 'express';

const router = express.Router();

// Mock user sessions
const sessions = new Map();

// Simple OTP generation (in production, use proper SMS gateway)
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Request OTP
router.post('/request-otp', (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return res.status(400).json({ error: 'Valid 10-digit phone number is required' });
  }

  const otp = generateOTP();
  
  // In production, send OTP via SMS
  console.log(`OTP for ${phone}: ${otp}`);

  // Store OTP (expires in 5 minutes)
  sessions.set(phone, {
    otp,
    createdAt: Date.now(),
    verified: false
  });

  res.json({
    success: true,
    message: 'OTP sent successfully',
    // For development only - remove in production
    ...(process.env.NODE_ENV === 'development' && { otp })
  });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }

  const session = sessions.get(phone);

  if (!session) {
    return res.status(400).json({ error: 'No OTP request found for this number' });
  }

  // Check if OTP expired (5 minutes)
  if (Date.now() - session.createdAt > 5 * 60 * 1000) {
    sessions.delete(phone);
    return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
  }

  if (session.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // Mark as verified
  session.verified = true;
  sessions.set(phone, session);

  // Generate session token (in production, use JWT)
  const token = `token_${phone}_${Date.now()}`;

  res.json({
    success: true,
    message: 'Phone verified successfully',
    token,
    user: {
      phone,
      verified: true
    }
  });
});

// Check authentication (middleware)
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // In production, verify JWT token
  next();
}

export default router;
