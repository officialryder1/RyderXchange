<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { Zap, Lock, BarChart2, Wallet, TrendingUp, Share2, Users, PiggyBank } from 'lucide-svelte';
	import { goto } from '$app/navigation';
  
    let showContent = false;
    let coins = [
      {image: '/images/btc.svg', name: 'Bitcoin', symbol: 'BTC', price: 39876.54, change: 2.5 },
      {image: '/images/eth.svg', name: 'Ethereum', symbol: 'ETH', price: 2654.32, change: -1.2 },
      {image: '/images/ena.svg', name: 'Cardano', symbol: 'ADA', price: 1.23, change: 5.7 },
      {image: '/images/sol.svg', name: 'Solana', symbol: 'SOL', price: 98.76, change: 3.8 },
      {image: '/images/xrp.svg', name: 'Ripple', symbol: 'XRP', price: 0.75, change: -0.5 },
    ];

    let features = [
    {
      icon: Zap,
      title: "Lightning-Fast Execution",
      description: "Execute trades in microseconds with our cutting-edge matching engine."
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "Your assets are protected by state-of-the-art security measures."
    },
    {
      icon: BarChart2,
      title: "Advanced Trading Tools",
      description: "Access professional-grade charts, order types, and risk management tools."
    }
    ];

    let options = [
    { name: 'Deposit', href: '/dashboard/wallet', icon: Wallet },
    { name: 'Futures', href: '/dashboard/market', icon: TrendingUp },
    { name: 'Share', href: '/dashboard', icon: Share2 },
    { name: 'C2C', href: '/c2c', icon: Users },
    { name: 'Finance', href: '/dashboard', icon: PiggyBank },
    ];
    
    async function createSession(){
        goto('/customer-care')
    }
    
    onMount(() => {
      showContent = true;
    });
  </script>
  
  <svelte:head>
    <title>RyderX - Your Gateway to Digital Assets</title>
  </svelte:head>
  
  <main class="bg-gray-900 text-white min-h-screen mx-auto lg:px-52" >
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold">RyderX</div>
      <div class="hidden md:flex space-x-4">
        <a href="/dashboard/market" class="hover:text-orange-400 font-bold tracking-wide">Markets</a>
        <a href="/dashboard" class="hover:text-orange-400 font-bold tracking-wide">Trade</a>
        <a href="/dashboard" class="hover:text-orange-400 font-bold tracking-wide">Derivatives</a>
        <a href="/dashboard" class="hover:text-orange-400 font-bold tracking-wide">Earn</a>
      </div>
      <a href="/register" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600" >Sign Up</a>
    </nav>
  
    {#if showContent}
      <section class="hero container mx-auto px-6 py-16" in:fly="{{ y: 50, duration: 500 }}">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-4">Trade Crypto with Confidence</h1>
          <p class="text-xl mb-8">Experience lightning-fast trades, deep liquidity, and industry-leading security.</p>
          <a href="/dashboard" class="bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600 transition duration-300 mb-8">
            Start Trading Now
          </a>
          <div class="mt-12 max-w-4xl mx-auto">
            <img 
              src="/images/banner-img.svg" 
              alt="Trading Chart" 
              class="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
  
      <section class="coin-prices container mx-auto px-7 py-16" in:fly="{{ y: 50, duration: 500, delay: 200 }}">
        <h2 class="text-3xl font-bold text-center mb-8">Live Crypto Prices</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-800">
                <th class="p-4">Coin</th>
                <th class="p-4">Price</th>
                <th class="p-4">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {#each coins as coin}
                <tr class="border-b border-gray-700">
                  <td class="p-4">
                    <div class="flex items-center">
                      <img src={coin.image} alt={coin.name} class="w-8 h-8 mr-3 rounded-full bg-gray-700" />
                      <div>
                        <div class="font-semibold">{coin.name}</div>
                        <div class="text-sm text-gray-400">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">${coin.price.toLocaleString()}</td>
                  <td class="p-4">
                    <span class={coin.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {coin.change >= 0 ? '+' : ''}{coin.change}%
                    </span>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
      
      <section class="options container mx-auto px-6 py-16" in:fly="{{ y: 50, duration: 500, delay: 300 }}">
        <div class="flex flex-wrap justify-center gap-4">
          {#each options as option}
            <a
              href={option.href}
              class="bg-orange-500 text-white px-6 py-3 rounded-full text-lg hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg flex items-center"
            >
              <svelte:component this={option.icon} class="w-5 h-5 mr-2" />
              {option.name}
            </a>
          {/each}
        </div>
      </section>

      <section class="features container mx-auto px-6 py-16" in:fly="{{ y: 50, duration: 500, delay: 400 }}">
        <h2 class="text-3xl font-bold text-center mb-12">Why Choose CryptoExchange?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          {#each features as feature}
            <div class="bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div class="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <svelte:component this={feature.icon} class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-semibold mb-2">{feature.title}</h3>
              <p class="text-gray-300">{feature.description}</p>
            </div>
          {/each}
        </div>
      </section>
  
      <section class="cta bg-orange-600 py-16" in:fly="{{ y: 50, duration: 500, delay: 600 }}">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p class="text-xl mb-8">Join millions of traders and investors on CryptoExchange today.</p>
          <button class="bg-white text-orange-600 px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition duration-300">
            Create Your Free Account
          </button>
        </div>
      </section>
  
      <footer class="container mx-auto px-6 py-8">
        <div class="flex justify-between items-center">
          <div class="text-sm">&copy; 2025 RyderX. All rights reserved.</div>
          <div class="flex space-x-4">
            <a href="/" class="hover:text-blue-400">Terms of Service</a>
            <a href="/" class="hover:text-blue-400">Privacy Policy</a>
          </div>
        </div>
      </footer>
    {/if}
  </main>
  
  <style>
    /* You can add any additional global styles here */
  </style>