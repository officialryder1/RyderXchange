<script>
  import { onMount } from 'svelte';
  import Pusher from 'pusher-js';
  import { getCookie } from '$lib/handleCookies';

  let messages = $state([])
  let newMessages = $state('')
  let sessionId = $state(null)
  
  $inspect(messages)
  async function startChatSession() {
    let access = getCookie('access_token')
    const res = await fetch('http://localhost:8000/api/customer-care/chat/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      }
    })

    const data = await res.json()
    sessionId = data.chat_session_id

    subscribeToPusher(sessionId)
  }

  function subscribeToPusher(sessionId) {
    const pusher = new Pusher('2d9060f8f7ec2034a519', {
      cluster: 'eu'
    })

    const channel = pusher.subscribe(`chat_${sessionId}`)

    channel.bind('new_message', function (data) {
      messages = [...messages, data]
    })
  }


  async function sendMessage() {
    let access = getCookie('access_token')
    if (sessionId && newMessages.trim()) {
      await fetch(`http://localhost:8000/api/customer-care/chat/${sessionId}/send/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify({message: newMessages, is_customer_care: false})
      })

      newMessages = ''
    }
  }

  onMount(() => {
    startChatSession()
  })
</script>

<div class="flex flex-col h-screen text-black">
  <h1 class="tracking-wider text-center">Online Service <b class="text-green-300 text-5xl">.</b></h1>
  <p class="font-bold text-center">Session ID: {sessionId}</p>
  <!-- Message Display Section -->
  <div class="flex-1 overflow-y-auto p-5">
      {#each messages as message}
      <div class="mb-2">
       
          <div
              class="p-2 rounded-lg max-w-xs"
              class:bg-blue-500={!message.is_customer_care}
              class:text-white={!message.is_customer_care}
              class:self-end={!message.is_customer_care}
              class:bg-gray-300={message.is_customer_care}
              class:text-black={message.is_customer_care}
              class:self-start={message.is_customer_care}
          >
              {message.message}
              <small>{message.timestamp}</small>
          </div>
   
      </div>
      {/each}
  </div>

  <!-- Input Section -->
  <div class="p-4 bg-gray-100 flex">
      <input
          type="text"
          bind:value={newMessages}
          class="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
          onkeydown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onclick={sendMessage} class="ml-2 p-2 bg-blue-500 text-white rounded-lg">Send</button>
  </div>
</div>
