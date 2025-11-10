const http = require('http');

// Test the search page
const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/search/cool-bio-for-instagram',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  res.on('data', (chunk) => {
    console.log(`Body: ${chunk}`);
  });
  
  res.on('end', () => {
    console.log('Request completed');
  });
});

req.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

req.end();