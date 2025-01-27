<script>
	let { children } = $props();
    import '../../../app.css'
    import { Home, TrendingUp, User, LogOut, ChartBarIncreasingIcon, ContactRound, Wallet} from 'lucide-svelte'
</script>

<div class="flex h-full bg-gray-100 ">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-gray-100">
        <div class="p-4 text-2xl font-bold">RyderX</div>
        <nav class="space-y-2 mt-4">
            <a href="/dashboard" class="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <Home class="w-5 h-5 mr-3" /> Dashboard
            </a>
            <a href="/dashboard/market" class="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <TrendingUp class="w-5 h-5 mr-3" /> Markets
            </a>
            <a href="/dashboard/wallet" class="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <Wallet class="w-5 h-5 mr-3" /> Wallet
            </a>
            <a href="/c2c" class="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <ChartBarIncreasingIcon class="w-5 h-5 mr-3" /> C2C
            </a>
            <a href="/dashboard/customer-care" class="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <ContactRound class="w-5 h-5 mr-3" /> Customer Care
            </a>
            <a href="/dashboard/account" class="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <User class="w-5 h-5 mr-3" /> Account
            </a>
            <a href="/logout" class="flex items-center px-4 py-2 hover:bg-gray-700 rounded text-red-500">
                <LogOut class="w-5 h-5 mr-3" /> Logout
            </a>
        </nav>
    </aside>
    <main class="flex-1 p-6">
        {@render children()}
    </main>
</div>
