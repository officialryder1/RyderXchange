<script>
  import { getCookie } from "$lib/handleCookies";
  import { onMount } from "svelte";
  import { pagination, getPageFromUrl } from "$lib/pagination";
  import { formatDateTime } from "$lib/dateFormat";

  let wallets = $state([]);
  let transactions = $state([]);
  let currentPage = $pagination.currentPage || 1;
  let showDropdown = $state(false); // State to control dropdown visibility

  const access = getCookie('access_token');

  const coins = [
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'ltc', label: 'Litecoin (LTC)' },
    { value: 'xrp', label: 'Ripple (XRP)' },
  ];

  async function fetchWallets() {
    const access = getCookie('access_token');
    const response = await fetch('http://localhost:8000/api/wallets/wallet/', {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    });
    wallets = await response.json();
  }

  let selectedCurrency = $state('BTC');
  let amount = $state(0);
  let transactionType = $state('deposit');

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    

    // Send data to your Django backend (replace with actual API call)
    const response = await fetch('http://127.0.0.1:8000/api/wallets/deposit_crypto/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`,
      },
      body: JSON.stringify({
        crypto_symbol: selectedCurrency,
        amount: amount
      }),
    });

    if (response.ok) {
      alert('Transaction submitted successfully!');
      setTimeout(() => {
        fetchWallets();
      }, 1000);
    } else {
      alert('Error submitting transaction.');
    }
  }

  async function transaction(url = 'http://localhost:8000/api/wallets/transactions/') {
    const access = getCookie('access_token');

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    });
    if (response.ok) {
      let data = await response.json();

      pagination.set({
        next: data.next,
        previous: data.previous,
        currentPage: getPageFromUrl(data.next || data.previous),
        totalPages: Math.ceil(data.count / data.results.length)
      });

      transactions = data?.results || data;
    } else {
      console.error("Failed fetch transactions");
    }
  }

  function goToPage(url) {
    if (url) {
      transaction(url);
    }
  }

  function toggleDropdown() {
    showDropdown = !showDropdown; // Toggle dropdown visibility
  }

  async function createWallet(coin) {
    const response = await fetch('http://localhost:8000/api/wallets/wallet/create_wallet/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`,
      },
      body: JSON.stringify({
        crypto_symbol: coin
      }),
    });

    if(response.ok){
      alert('Wallet created successfully!');
      setTimeout(() => {
        fetchWallets();
      }, 1000);
    } else {
      alert('Error creating wallet.');
    }
  }

  function selectCoin(coin) {
    selectedCurrency = coin; 
    createWallet(selectedCurrency);
    showDropdown = false; // Hide dropdown after selection
  }

  onMount(() => {
    fetchWallets();
    transaction();
  });
</script>

<div class="container mx-auto p-2">
  <!-- Page Header -->
  <header class="mb-8">
    <h1 class="text-3xl font-bold">My Wallets</h1>
    <p class="text-gray-600">Manage your cryptocurrency wallets and transactions.</p>
  </header>

  <!-- Wallet Balances Section -->
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Wallet Balances</h2>
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
      {#each wallets as wallet}
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">{wallet.crypto}</h3>
            <span class="text-gray-500 text-sm">{wallet.public_key}</span>
          </div>
          <p class="text-2xl font-bold mt-2">{wallet.balance} {wallet.crypto_symbol}</p>
          <p class="text-gray-600">≈ ${wallet.value} USD</p>
          <div class="mt-4 flex space-x-2">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Deposit</button>
            <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Withdraw</button>
            <a href="/dashboard/transfer" class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Transfer</a>
          </div>
        </div>
      {/each}

      <!-- Add Wallet Button -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-center relative">
        <button onclick={toggleDropdown} class="text-blue-500 hover:text-blue-600">
          <span class="text-2xl">+</span>
          <span class="ml-2">Add Wallet</span>
        </button>
        {#if showDropdown}
          <div class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {#each coins as coin}
              <div onclick={() => selectCoin(coin.value)} class="p-2 hover:bg-gray-100 cursor-pointer">
                {coin.label}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Deposit/Withdrawal Form Section -->
  <section class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Deposit/Withdraw Funds</h2>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <form onsubmit={handleSubmit}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Currency Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Currency</label>
            <select bind:value={selectedCurrency} class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              {#each wallets as wallet}
                <option value={wallet.crypto_symbol}>{wallet.crypto_symbol}</option>
              {/each}
            </select>
          </div>

          <!-- Amount Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" bind:value={amount} class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="0.00" />
          </div>
        </div>

        <!-- Transaction Type -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Transaction Type</label>
          <div class="mt-1">
            <label class="inline-flex items-center">
              <input type="radio" value="deposit" bind:group={transactionType} class="form-radio" />
              <span class="ml-2">Deposit</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="radio" value="withdrawal" bind:group={transactionType} class="form-radio" />
              <span class="ml-2">Withdraw</span>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>

  <!-- Transaction History Section -->
  <section>
    <h2 class="text-xl font-semibold mb-4">Transaction History</h2>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="text-left py-2">Date</th>
            <th class="text-left py-2">Type</th>
            <th class="text-left py-2">Amount</th>
            <th class="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each transactions as transaction}
            <tr class="border-t">
              <td class="py-3">{formatDateTime(transaction.created_at)}</td>
              <td class="py-3">{transaction.transaction_type}</td>
              <td class="py-3">{transaction.amount} {transaction.crypto}</td>
              <td class="py-3 {transaction.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}">
                {transaction.status}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>
<div class="flex items-center justify-center space-x-4 mt-4">
  <button 
    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
    onclick={() => goToPage($pagination.next)}
    disabled={!$pagination.next}>
    previous
  </button>
  <span class="font-bold">Page {$pagination.currentPage}</span>
  <button 
    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
    onclick={() => goToPage($pagination.previous)}
    disabled={!$pagination.previous}>
    Next
  </button>
</div>