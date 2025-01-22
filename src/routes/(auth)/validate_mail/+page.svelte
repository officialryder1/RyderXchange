<script>
	import { goto } from "$app/navigation";
    import { Wallet } from "lucide-svelte";
    let verification_code = $state('');

    async function handleSubmit(e) {
        if (e.key === 'Enter'){
            try{
                const res = await fetch('http://localhost:8000/api/verify-email/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'token': verification_code
                    })
                })

                if (res.ok){
                    goto('/')
                }
                console.log(res.statusText)
            } catch(err) {
                console.error(err)
            }
        }
    }
</script>

<div class=" min-h-screen flex justify-center items-center flex-col">
    <div class="">
        <h1 class="text-2xl pb-10 font-bold text-orange-500"><Wallet></Wallet>RyderExchange</h1>
    </div>
    <div class="max-w-md w-full shadow-lg p-8 bg-gray-500 rounded-lg">
        <h1 class="text-2xl font-semibold text-gray-400 mb-5">Verification Code.</h1>
        <input
            type="text"
            placeholder="Enter verification code"
            bind:value = {verification_code}
            class="w-full mb-3 rounded-lg border-black p-5 font-bold"
            onkeydown={handleSubmit}
        >
    </div>
</div>
