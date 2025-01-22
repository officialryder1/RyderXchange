<script>
    import { goto } from "$app/navigation";
    import { Wallet } from 'lucide-svelte'

    let email = $state('');
    let password = $state('');
    let fund_password = $state('');
    let invitation_code = $state('');
    let maxLength = 6;

    function handleInput(event) {
        let value = event.target.value
        if(value.length > maxLength){
            event.target.value = value.slice(0, maxLength)
            alert('Maximum of 6 number')
        }
    }

    async function login() {
        try {
        const res = await fetch('http://localhost:8000/api/users/register/', {
            method: "POST",
            headers: {
            'Content-Type': "application/json"
            },
            body: JSON.stringify({
            email: email,
            fund_password: fund_password,
            invitation_code: invitation_code,
            password: password
            })
        });

        if (!res.ok) {
            alert('registration failed')
            throw new Error('Registration failed');
        }

        const response = await res.json();
        console.log(response);
        
        goto('/validate_mail')
        // Handle successful login (e.g., store token, redirect user)
        } catch (error) {
        console.error('Error:', error);
        alert(error)
        // Handle error (e.g., show error message to user)
        }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h1 class="text-3xl pb-10 font-bold text-orange-500"><Wallet></Wallet>RyderX</h1>
    <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
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
    <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="email">Fund Password</label>
        <input
          type="number"
          id="fund_password"
          bind:value={fund_password}
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter fund password"
          max="999999"
          oninput={handleInput}

        />
    </div>
    <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="email">Invitation Code (Optional)</label>
        <input
          type="text"
          id="fund_password"
          bind:value={invitation_code}
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Invitation Code"
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
    <button onclick={login} class="w-full p-2 bg-blue-500 text-white rounded-lg">Register</button>
  </div>
</div>
