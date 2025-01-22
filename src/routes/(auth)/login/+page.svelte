<script>
    import { goto } from "$app/navigation";
    import { Wallet } from 'lucide-svelte'

    let email = '';
    let password = '';

    async function login() {
        try {
        const res = await fetch('http://localhost:8000/api/token/', {
            method: "POST",
            headers: {
            'Content-Type': "application/json"
            },
            body: JSON.stringify({
            email: email,
            password: password
            })
        });

        if (!res.ok) {
            throw new Error('Login failed');
        }

        const response = await res.json();
        
        document.cookie = `access_token=${response.access}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24}`

        document.cookie = `refresh_token=${response.refresh}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24}`

        goto('/')
        // Handle successful login (e.g., store token, redirect user)
        } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show error message to user)
        }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h1 class="text-3xl pb-10 font-bold text-orange-500"><Wallet></Wallet>RyderX</h1>
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
    <div class="mb-4">
      <label class="block text-gray-700 mb-2" for="email">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        class="w-full p-2 border border-gray-300 rounded-lg"
        placeholder="Enter your email"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 mb-2" for="password">Password</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        class="w-full p-2 border border-gray-300 rounded-lg"
        placeholder="Enter your password"
      />
    </div>
    <button on:click={login} class="w-full p-2 bg-blue-500 text-white rounded-lg">Login</button>
  </div>
</div>
