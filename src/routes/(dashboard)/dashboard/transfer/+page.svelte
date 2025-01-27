<script>
    import { getCookie } from "$lib/handleCookies";

    let recipient = $state('');
    let currency = $state('BTC');
    let amount = $state(0);
    let fee = $state(0);
    let message = $state('');
    let show
  
    async function calculateFee() {
      const response = await fetch('http://127.0.0.1:8000/api/transfer/calculate_fee/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ currency, amount }),
      });
      const data = await response.json();
      fee = data.fee;
    }
  
    async function handleTransfer() {
      const access = getCookie('access_token')
      console.log(access)
      const payload = {
        receiver_identifier: recipient,
        currency,
        amount,
      };
      let coinAmount = Number(amount);
   
      const response = await fetch('http://127.0.0.1:8000/api/transfer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify({
            recipient,
            currency,
            amount: coinAmount
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        message = `Transfer successful! Fee: ${data.fee} ${currency}`;
      } else {
        message = `Error: ${data.message}`;
      }
    }
  </script>
  
  <div class="container mx-auto p-4 h-screen">
    <h1 class="text-3xl font-bold mb-4">Transfer Funds</h1>
    <form onsubmit={handleTransfer}>
      <div class="mb-4">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm font-medium text-gray-700">Recipient (Email)</label>
        <input type="text" bind:value={recipient} class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm font-medium text-gray-700">Currency</label>
        <select bind:value={currency} class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          <option value="btc">BTC</option>
          <option value="eth">ETH</option>
        </select>
      </div>
      <div class="mb-4">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="block text-sm font-medium text-gray-700">Amount</label>
        <input type="number" bind:value={amount} oninput={calculateFee} class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div class="mb-4">
        <p class="text-sm text-gray-600">Transaction Fee: {fee} {currency}</p>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Transfer
      </button>
    </form>
    {#if message}
      <p class="mt-4 text-green-500 font-bold">{message}</p>
    {/if}
  </div>