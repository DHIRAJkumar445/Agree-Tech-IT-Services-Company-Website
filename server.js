/**
 * Agreetech Solution - Node.js Express Server
 * Serves static files and provides API endpoints
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// ========== API Routes ==========

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address'
    });
  }

  const messagesDir = path.join(__dirname, 'messages');
  if (!fs.existsSync(messagesDir)) {
    fs.mkdirSync(messagesDir, { recursive: true });
  }

  const entry = {
    date: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim()
  };

  const filename = `contact_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(path.join(messagesDir, filename), JSON.stringify(entry, null, 2));

  res.json({
    success: true,
    message: 'Thank you! Your message has been sent.'
  });
});

// Weather API (optional - returns mock data)
app.get('/api/weather', (req, res) => {
  const weather = {
    temp: Math.floor(Math.random() * 10) + 25,
    humidity: Math.floor(Math.random() * 40) + 40,
    rain: Math.floor(Math.random() * 70),
    wind: Math.floor(Math.random() * 15) + 5
  };
  res.json(weather);
});

// Crop recommendation API
app.post('/api/recommend-crop', (req, res) => {
  const { soil, season, water } = req.body;

  if (!soil || !season || !water) {
    return res.status(400).json({
      success: false,
      crop: null,
      message: 'Please select all options'
    });
  }

  let crop = '🥬 Vegetables (Tomato, Brinjal, etc.)';
  if (soil === 'clay' && season === 'monsoon' && water === 'high') crop = '🌾 Rice';
  else if (soil === 'loamy' && season === 'winter' && water === 'medium') crop = '🌾 Wheat';
  else if (soil === 'sandy' && season === 'summer' && water === 'low') crop = '🌻 Millet (Bajra)';
  else if (soil === 'loamy' && season === 'summer' && water === 'medium') crop = '🌽 Maize';
  else if (soil === 'clay' && season === 'winter' && water === 'medium') crop = '🥔 Potato';
  else if (soil === 'sandy' && season === 'winter' && water === 'low') crop = '🥜 Groundnut';

  res.json({ success: true, crop });
});

// Serve HTML files
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path === '/' ? 'index.html' : req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(PORT, () => {
  console.log(`🌱 Agreetech Solution server running at http://localhost:${PORT}`);
});
