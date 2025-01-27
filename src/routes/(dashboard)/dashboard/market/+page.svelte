<script>
    import { onMount } from 'svelte';
    import { fetchMarketData } from './api'; // API logic from previous example

    let marketData = $state([]);
    let searchQuery = $state('');
    

    // Fetch market data and initialize
    onMount(async () => {
        marketData = await fetchMarketData();
        filteredData = marketData; // Initialize filtered data
    });

    // Filter data based on search query
    let filteredData =$derived( marketData.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    ));
</script>

<main class="p-6 h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center">Crypto Market</h1>

    <!-- Search Input -->
    <div class="mb-4">
        <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search cryptocurrency..."
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>

    <!-- Market Table -->
    <table class="w-full table-auto border-collapse text-sm bg-white shadow-md rounded-lg">
        <thead>
            <tr class="bg-gray-200">
                <th class="p-2 border text-left">#</th>
                <th class="p-2 border text-left">Name</th>
                <th class="p-2 border text-right">Price (USD)</th>
                <th class="p-2 border text-right">24h Change</th>
            </tr>
        </thead>
        <tbody>
            {#if filteredData.length > 0}
                {#each filteredData as coin, index}
                    <tr class="hover:bg-gray-100">
                        <td class="p-2 border">{index + 1}</td>
                        <td class="p-2 border flex items-center gap-2">
                            <img
                                src="{coin.image}"
                                alt="{coin.name}"
                                class="w-6 h-6 rounded-full"
                            />
                            {coin.name} ({coin.symbol.toUpperCase()})
                        </td>
                        <td class="p-2 border text-right">
                            ${coin.current_price.toFixed(2)}
                        </td>
                        <td
                            class="p-2 border text-right"
                            class:positive="{coin.price_change_percentage_24h >= 0}"
                            class:negative="{coin.price_change_percentage_24h < 0}"
                        >
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="4" class="p-4 text-center">
                        No results found.
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</main>

<style>
    .positive {
        color: green;
    }
    .negative {
        color: red;
    }
</style>
