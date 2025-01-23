import { writable } from "svelte/store";

export const googleAuthToken = writable(null);

export async function initializeGoogleAuth(clientId) {
  return new Promise((resolve, reject) => {
    // Load Google's gapi library
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          googleAuthToken.set(response.credential); // Save token in Svelte store
          resolve(response.credential);
        },
      });
      resolve(true);
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export function showGoogleSignInButton() {
  window.google.accounts.id.renderButton(
    document.getElementById("googleSignInButton"),
    { theme: "outline", size: "large" } // Customize button style
  );
}
