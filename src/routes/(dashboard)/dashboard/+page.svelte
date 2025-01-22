<script>
    import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-svelte';
    import { onMount } from 'svelte';

    let {data} = $props()
    const user = data?.user
    let marketData = $state([])

    let refreshInterval = $state(null)

    onMount(() => {
        refreshInterval = setInterval(async () => {
            marketData = data?.marketData
        },1000) 

        return () => clearInterval(refreshInterval)
    })
    
    let recentTransactions = [
        { id: 1, type: 'Buy', amount: 0.01, crypto: 'BTC', price: 267.50 },
        { id: 2, type: 'Sell', amount: 2.5, crypto: 'ADA', price: 1.37 },
        { id: 3, type: 'Buy', amount: 0.1, crypto: 'ETH', price: 185.01 },
    ];
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
                    {#each recentTransactions as { id, type, amount, crypto, price }}
                        <tr class="border-t">
                            <td class="p-4">{type}</td>
                            <td class="p-4">{amount}</td>
                            <td class="p-4">{crypto}</td>
                            <td class="p-4">${price.toLocaleString()}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>
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