<script>

	import { onMount } from "svelte";
    import { Pencil, Check, Shield, Verified, CheckCircle, XCircle } from "lucide-svelte";

    let {data} = $props()

    const user = data?.user
    let editMode = $state(false);
    let form = { name: '', email: '' }
    
    async function saveChanges() {
        alert('Work in progress')
    }

    async function toggleTwoFactor() {
        alert('Work in progress ')
    }
</script>

<main class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Account Settings</h1>

    <section class="bg-white shadow p-6 rounded-lg mb-6">
        <h2 class="text-lg font-semibold mb-4">Profile Information</h2>
        {#if editMode}
            <form onsubmit={saveChanges}>
                <label class="block mb-4">
                    <span class="text-gray-700">Name</span>
                    <input
                        type="text"
                        bind:value={form.name}
                        class="w-full mt-1 border-gray-300 rounded shadow-sm"
                        required
                    />
                </label>
                <label class="block mb-4">
                    <span class="text-gray-700">Email</span>
                    <input
                        type="email"
                        bind:value={form.email}
                        class="w-full mt-1 border-gray-300 rounded shadow-sm"
                        required
                    />
                </label>
                <button
                    type="button"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onclick={saveChanges}
                >
                    <Check class="inline w-4 h-4 mr-2" /> Save Changes
                </button>
                <button
                    type="button"
                    class="ml-4 text-gray-500"
                    onclick={() => (editMode = false)}
                >
                    Cancel
                </button>
            </form>
        {:else}
            <div class="flex justify-between items-center">
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <span>
                        {#if user.is_verify}
                        <Verified class="text-green-500">Verified</Verified>
                        {:else}
                        <Verified class="text-gray-400">Not Verified</Verified>
                        {/if}
                    </span>
                </div>
                <button
                    class="text-blue-500 hover:text-blue-600"
                    onclick={() => (editMode = !editMode)}
                >
                    <Pencil class="inline w-4 h-4 mr-2" /> Edit
                </button>
            </div>
        {/if}
    </section>

    <section class="bg-white shadow p-6 rounded-lg mb-6">
        <h2 class="text-lg font-semibold mb-4">KYC Status</h2>
        <div class="flex items-center">
            <p>
                <strong>Status:</strong> {user.kyc_status}
            </p>
            {#if user.kyc_status === 'Verified'}
                <CheckCircle class="w-5 h-5 text-green-500 ml-2" />
            {:else}
                <XCircle class="w-5 h-5 text-red-500 ml-2" />
            {/if}
        </div>
        <div>
            {#if user.kyc_status !== 'Verified'}
                <a href="/kyc" class="bg-orange-500 text-white px-5 py-1 rounded-full text-sm hover:bg-orange-600 transition duration-300 mb-8">upload Kyc</a>
            {/if}
        </div>
    </section>
    
    <section class="bg-white shadow p-6 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">Security Settings</h2>
        <div class="flex justify-between items-center">
            <p>
                <strong>Two-Factor Authentication:</strong>
                {user.twoFactorEnabled ? ' Enabled' : ' Disabled'}
            </p>
            <button
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onclick={toggleTwoFactor}
            >
                <Shield class="inline w-4 h-4 mr-2" />
                {user.twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
        </div>
    </section>
</main>

<style>
    main {
        max-width: 600px;
    }
</style>