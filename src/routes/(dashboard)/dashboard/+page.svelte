<script>
    import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import { pagination, getPageFromUrl } from '$lib/pagination';
    import { getCookie } from '$lib/handleCookies';
    import { formatDateTime } from '$lib/dateFormat';

    let {data} = $props()
    const user = data?.user
    let marketData = $state([])
    let transactions = $state([])

    let refreshInterval = $state(null)

    onMount(() => {
        refreshInterval = setInterval(async () => {
            marketData = data?.marketData
        },1000),
        transaction()

        return () => clearInterval(refreshInterval)
    })
    
    let recentTransactions = [
        { id: 1, type: 'Buy', amount: 0.01, crypto: 'BTC', price: 267.50 },
        { id: 2, type: 'Sell', amount: 2.5, crypto: 'ADA', price: 1.37 },
        { id: 3, type: 'Buy', amount: 0.1, crypto: 'ETH', price: 185.01 },
    ];

    async function transaction(url='http://localhost:8000/api/wallets/transactions/') {
    const access = getCookie('access_token')
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    });
    if (response.ok) {
      let data = await response.json()
      
      pagination.set({
        next: data.next,
        previous: data.previous,
        currentPage: getPageFromUrl(data.next || data.previous),
        totalPages: Math.ceil(data.count / data.results.length)
      })
      
      transactions = data?.results || data
    } else {
      console.error("Failed fetch transactions")
    }
  }
</script>

<div>
    <!-- Account Summary -->
    <section class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Account Summary</h2>
        <div class="bg-white shadow rounded-lg p-6 flex justify-between items-center">
            <div>
                <h3 class="text-lg font-medium">Total Balance</h3>
                <p class="text-2xl font-bold text-green-500">${user.wallet_balance.toLocaleString()}</p>
            </div>
            <DollarSign class="w-12 h-12 text-green-500" />
        </div>
    </section>

    <!-- Crypto Markets -->
    <main class="p-4">
        <h1 class="text-2xl font-bold mb-4">Crypto Market Overview</h1>
        <table class="w-full table-auto border-collapse text-sm">
            <thead>
                <tr class="bg-gray-200">
                    <th class="p-2 border">#</th>
                    <th class="p-2 border">Name</th>
                    <th class="p-2 border">Price (USD)</th>
                    <th class="p-2 border">24h Change</th>
                </tr>
            </thead>
            <tbody>
                {#each marketData as coin, index}
                    <tr class="text-center hover:bg-gray-100">
                        <td class="p-2 border">{index + 1}</td>
                        <td class="p-2 border flex items-center justify-start gap-2">
                            <img src="{coin.image}" alt="{coin.name}" class="w-6 h-6 rounded-full" />
                            {coin.name} ({coin.symbol.toUpperCase()})
                        </td>
                        <td class="p-2 border">${coin.current_price.toFixed(2)}</td>
                        <td
                            class="p-2 border"
                            class:positive="{coin.price_change_percentage_24h >= 0}"
                            class:negative="{coin.price_change_percentage_24h < 0}"
                        >
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </main>

    <!-- Recent Transactions -->
    <section>
        <h2 class="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div class="bg-white shadow rounded-lg">
            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-gray-100 text-left">
                        <th class="p-4">Type</th>
                        <th class="p-4">Amount</th>
                        <th class="p-4">Crypto</th>
                        <th class="p-4">Price</th>
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

<style>
    table {
        border: 1px solid #ddd;
    }

    .positive {
        color: green;
    }

    .negative {
        color: red;
    }
</style>