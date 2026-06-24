exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
 
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
 
  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjUzMjEyOTEyMywiYWFpIjoxMSwidWlkIjo0ODc5NDE3NiwiaWFkIjoiMjAyNS0wNi0yN1QxNzo0NDozNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE4NTM5NTcsInJnbiI6InVzZTEifQ.9E3pk4W1mnSMxtcVr1VSTCda15mpL2A17kY5oHUWx1s',
        'API-Version': '2024-01'
      },
      body: event.body
    });
    const data = await response.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
 
export const config = { path: '/.netlify/functions/monday' };
