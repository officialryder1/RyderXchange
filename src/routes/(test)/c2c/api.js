export async function fetchTrades() {
    const response = await fetch('http://localhost:8000/api/c2c/trade/');
    
    return response.json();
  }
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3MzE4NTMwLCJpYXQiOjE3MzczMTgyMzAsImp0aSI6ImZlYThjZWYxOTQwNjQ3NzRhMWZlNDk4ZWI4ZjIxZjZhIiwidXNlcl9pZCI6MX0.trr52aC-bdXluDcM71G9xJY9Yg6LFI-svoAknDMxkHM"

  export async function createTrade(tradeData) {
    const response = await fetch('http://localhost:8000/api/c2c/trade/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(tradeData),
    });
    return response.json();
  }
  
  export async function completeTrade(tradeId) {
    const response = await fetch(`http://127.0.0.1:8000/api/c2c/trade/${tradeId}/completed_trade/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.json();
  }
  