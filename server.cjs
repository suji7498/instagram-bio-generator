const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle routing for SPA
app.get('/', (req, res) => {
  console.log('Serving home page');
  res.sendFile(path.join(__dirname, 'dist/home/index.html'));
});

app.get('/instagram-bio', (req, res) => {
  console.log('Serving instagram-bio page');
  res.sendFile(path.join(__dirname, 'dist/instagram-bio/index.html'));
});

app.get('/search/:keyword', (req, res) => {
  console.log(`Serving search page for keyword: ${req.params.keyword}`);
  res.sendFile(path.join(__dirname, 'dist/search/index.html'));
});

app.get('/results', (req, res) => {
  console.log('Serving results page');
  res.sendFile(path.join(__dirname, 'dist/result/index.html'));
});

// Handle all other routes
app.get(/.*/, (req, res) => {
  console.log('Serving default home page');
  res.sendFile(path.join(__dirname, 'dist/home/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});