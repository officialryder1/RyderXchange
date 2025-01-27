<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { setCookie, deleteCookie } from "$lib/handleCookies";
    import { PUBLIC_GOOGLE_CLIENT_ID} from "$env/static/public";
  
    let googleClientId = PUBLIC_GOOGLE_CLIENT_ID; // Replace with your Google Client ID

   
    let googleError = $state(null);
  
    onMount(() => {
      // Initialize Google API
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleResponse,
        });
  
        // Render the Google button
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large" } // Button customization
        );
      };
      document.body.appendChild(script);
    });
  
    async function handleGoogleResponse(response) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/users/google-login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: response.credential }),
        });
  
        if (!res.ok) {
          throw new Error("Login failed");
        }
  
        const data = await res.json();
        // localStorage.setItem("refreshToken", data.refresh);
        // localStorage.setItem("accessToken", data.access);
        
        document.cookie = `access_token=${data.access}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24}`

        document.cookie = `refresh_token=${data.refresh}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24}`
        
        if (data.is_new_user) {
            console.log("Welcome, new user!");
            goto("/dashboard"); // Redirect to a welcome page (optional)
        } else {
            console.log("Welcome back!");
            goto("/dashboard"); // Redirect to the dashboard
        }
        // Navigate to the dashboard or homepage
    } catch (error) {
        googleError = "Failed to authenticate with Google. Please try again.";
        console.error(error);
    }
    goto("/dashboard");
    }
  </script>
  
  <div>
    <div id="googleSignInButton"></div>
    {#if googleError}
      <p style="color: red;">{googleError}</p>
    {/if}
  </div>
  