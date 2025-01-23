<script>
    
    let { form } = $props()

    let errorMessage = form?.error

    
</script>

<main class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">KYC Verification</h1>

    <!-- {#if successMessage}
        <div class="bg-green-100 text-green-800 p-4 rounded mb-6">
            {successMessage}
        </div>
    {/if} -->

    {#if errorMessage}
        <div class="bg-red-100 text-red-800 p-4 rounded mb-6">
            {errorMessage}
        </div>
    {/if}

    <form
        method="POST"
        class="bg-white shadow p-6 rounded-lg"
    >
        <label class="block mb-4">
            <span class="text-gray-700">Full Name</span>
            <input
                type="text"
                name = "full_name"
                required
                class="w-full mt-1 border-gray-300 rounded shadow-sm"
            />
        </label>

        <label class="block mb-4">
            <span class="text-gray-700">Date of Birth</span>
            <input
                type="date"
                name = "date_of_birth"
                required
                class="w-full mt-1 border-gray-300 rounded shadow-sm"
            />
        </label>

        <label class="block mb-4">
            <span class="text-gray-700">Address</span>
            <textarea
                name="address"
                required
                class="w-full mt-1 border-gray-300 rounded shadow-sm"
            ></textarea>
        </label>

        <label class="block mb-4">
            <span class="text-gray-700">Identification Type</span>
            <select
                name="identification_type"
                required
                class="w-full mt-1 border-gray-300 rounded shadow-sm"
            >
                <option value="passport">Passport</option>
                <option value="national_id">National ID</option>
                <option value="driver_license">Driver's License</option>
            </select>
        </label>

        <label class="block mb-4">
            <span class="text-gray-700">Identification Number</span>
            <input
                type="text"
                name="identification_number"
                required
                class="w-full mt-1 border-gray-300 rounded shadow-sm"
            />
        </label>

        <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Submit KYC
        </button>
    </form>
</main>

<style>
    main {
        max-width: 600px;
    }
</style>
