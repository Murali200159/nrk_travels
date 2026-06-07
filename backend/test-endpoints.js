const http = require('http');

const endpoints = [
  '/api/',
  '/api/tours',
  '/api/group-tours',
  '/api/fleet',
  '/api/dashboard'
];

async function testEndpoints() {
  for (const ep of endpoints) {
    await new Promise((resolve) => {
      http.get('http://localhost:5000' + ep, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`[${res.statusCode}] ${ep} - ${data.substring(0, 100)}`);
          resolve();
        });
      }).on('error', (err) => {
        console.log(`[ERROR] ${ep} - ${err.message}`);
        resolve();
      });
    });
  }
}
testEndpoints();
