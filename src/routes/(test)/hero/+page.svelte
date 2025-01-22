<script>
    // Any necessary script logic goes here
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</svelte:head>

<header>
    <div class="overlay"></div>
    <nav class="container">
        <p>Picker✈️</p>
        <ul>
            <li style="color: #f92f30">Home</li>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
        <div class="btn-div">
            <button class="btn">Travel Guide</button>
        </div>
    </nav>
    <main class="content">
        <div class="user-container">
            <dt class="sr-only">Users</dt>
            <dd class="user-list">
                <!-- Example user avatars -->
                <img src="user1.jpg" alt="User 1" class="user-avatar">
                <img src="user2.jpg" alt="User 2" class="user-avatar">
                <img src="user3.jpg" alt="User 3" class="user-avatar">
            </dd>
        </div>
    </main>
</header>

<style>
    :global(body) {
        font-family: "Montserrat", serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
        background-color: #fff;
    }

    header {
        background: url('/images/aeroplane-bg.webp');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 100vh; /* Set a visible height */
        width: 100%;
        position: relative;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    nav {
        display: flex;
        justify-content: space-between;
     
        font-size: small;
        height: 100%;
        position: relative;
        z-index: 2;
    }

    p {
        flex-grow: 5;
        color: white; /* Make sure text is readable over the background */
        z-index: 2;
    }

    ul {
        display: flex;
        justify-content: space-around;
        flex-grow: 0.5;
    }

    li {
        text-align: end;
        color: white; /* Ensures visibility over the overlay */
    }

    .btn-div {
        flex-grow: 0.5;
    }

    .btn {
        padding: 5px 13px;
        background-color: #f92f30;
        border-radius: 15px;
        border: none;
        color: white;
        font-size: small;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 25px 15px;
    }
</style>
