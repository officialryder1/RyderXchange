<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</svelte:head>
<main>
	{@render children()}
</main>

<style>
	:global(body){
		font-family: "Montserrat", serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
</style>