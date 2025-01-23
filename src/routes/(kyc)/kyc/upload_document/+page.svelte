<script>
    import { goto } from "$app/navigation";
   

    let { form } = $props()

    let error = form?.error
    // let success = form?.success
    
</script>

<main class="p-4 max-w-lg mx-auto flex flex-col h-screen justify-center ">
    <!-- {#if success}
        <p class="bg-gray-200 text-green-800 p-4 rounded mb-6">{success}</p>
    {/if} -->
    <h1 class="text-2xl font-bold text-center">Upload Document</h1>

    <p class="text-sm text-gray-500 mt-2 text-center">
        Please upload a clear image of your identification document to complete your KYC process.
    </p>

    {#if error}
        <p class="text-red-500 mt-4">{error}</p>
    {/if}

    


    <form
        class="mt-6 space-y-4"
        method="POST"
        enctype="multipart/form-data"
        
    >
        <div>
            <label for="document" class="block text-sm font-medium text-gray-700">
                Upload Document
            </label>
            <input
                name="document"
                type="file"
               
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
                
                required
            />
        </div>

        <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            Submit
        </button>
    </form>
</main>

<style>
    main {
        font-family: Arial, sans-serif;
    }
</style>