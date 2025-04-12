import express from 'express';
const router = express.Router();

router.get('/track', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers['referer'] || 'direct';
    const time = new Date().toISOString();

    // If you want to save the data to a database, you can add code here.
    // For example, if using MongoDB, you can save to a Visitor model.

    console.log('📥 Visitor Tracked:', { ip, userAgent, referrer, time });

    res.status(200).json({ message: 'Tracked successfully' });
  } catch (error) {
    console.error('Error occurred while tracking:', error);
    res.status(500).json({ message: 'Tracking failed' });
  }
});

export default router;
