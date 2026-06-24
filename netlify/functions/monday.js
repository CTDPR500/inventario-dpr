export default async (request, context) => {
  if (request.method === 'OPTIONS') {
    return new Response('', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
 
  try {
    const body = await request.text();
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjUzMjEyOTEyMywiYWFpIjoxMSwidWlkIjo0ODc5NDE3NiwiaWFkIjoiMjAyNS0wNi0yN1QxNzo0NDozNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE4NTM5NTcsInJnbiI6InVzZTEifQ.9E3pk4W1mnSMxtcVr1VSTCda15mpL2A17kY5oHUWx1s',
        'API-Version': '2024-01'
      },
      body
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};
 
export const config = { path: '/.netlify/functions/monday' };
