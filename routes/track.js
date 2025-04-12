const express = require('express');
const router = express.Router();

// Your track route
router.get('/track', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const referrer = req.headers['referer'] || 'direct';
  const time = new Date().toISOString();

  console.log('📥 Visitor Tracked:', { ip, userAgent, referrer, time });

  res.status(200).json({ message: 'Tracked successfully' });
});

module.exports = router;
