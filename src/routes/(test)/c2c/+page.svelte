<script>
    import { onMount } from 'svelte';
    import { fetchTrades, createTrade, completeTrade } from './api'; // Assume these API functions are implemented
  
    let trades = $state([]);
    let crypto = $state('');
    let amount = $state('');
    let price = $state('');
    
  
    onMount(async () => {
      trades = await fetchTrades();
    });
  
    async function handleCreateTrade(e) {
      e.preventDefault();
      await createTrade({ crypto, amount, price });
      trades = await fetchTrades(); // Refresh trades list
    }
  
    async function handleCompleteTrade(tradeId) {
      await completeTrade(tradeId);
      trades = await fetchTrades(); // Refresh trades list
    }
  
    function calculateCryptoAmount(amount, pricePerUnit) {
      if (pricePerUnit <= 0) {
        return 'Invalid price';
      }
      const cryptoAmount = amount / pricePerUnit;
      return cryptoAmount.toFixed(8); // 8 decimal places
    }
  
    let cryptoAmount = $derived(calculateCryptoAmount(amount, price))
  </script>
  
  <main>
    <div class="container">
      <h1>C2C Crypto Exchange</h1>
  
      <!-- Trade Creation Form -->
      <section class="trade-form">
        <h2>Create a New Trade</h2>
        <form onsubmit={handleCreateTrade}>
          <div class="form-group">
            <label for="crypto">Cryptocurrency:</label>
            <input type="text" id="crypto" bind:value={crypto} placeholder="e.g., BTC" required />
          </div>
          <div class="form-group">
            <label for="amount">Amount in USD:</label>
            <input type="number" id="amount" bind:value={amount} placeholder="e.g., 1000" required />
          </div>
          <div class="form-group">
            <label for="price">Price per Unit:</label>
            <input type="number" id="price" bind:value={price} placeholder="e.g., 50000" required />
          </div>
          <p class="calculation">
            You will receive approximately <strong>{cryptoAmount}</strong> {crypto}
          </p>
          <button type="submit" class="btn btn-primary">Create Trade</button>
        </form>
      </section>
  
      <!-- Trade Listing -->
      <section class="trade-list">
        <h2>Available Trades</h2>
        <table>
          <thead>
            <tr>
              <th>Cryptocurrency</th>
              <th>Amount (USD)</th>
              <th>Price per Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {#each trades as trade (trade.id)}
              <tr>
                <td>{trade.crypto}</td>
                <td>{trade.amount}</td>
                <td>{trade.price}</td>
                <td>
                  <button class="btn btn-secondary" onclick={() => handleCompleteTrade(trade.id)}>Complete Trade</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
    </div>
  </main>
  
  <style>
    main {
      background-color: #1a1a2e;
      color: #fff;
      font-family: 'Poppins', sans-serif;
      padding: 2rem;
      min-height: 100vh;
    }
    
    h1, h2 {
      text-align: center;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .trade-form, .trade-list {
      background-color: #16213e;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    input {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .calculation {
      margin-top: 1rem;
      font-style: italic;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-primary {
      background-color: #3a86ff;
      color: #fff;
    }
    
    .btn-secondary {
      background-color: #ffbe0b;
      color: #1a1a2e;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #555;
    }
    
    th {
      background-color: #222;
    }
    
    tr:nth-child(even) {
      background-color: #1e1e2d;
    }
  </style>
  