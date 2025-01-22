<script>
  let messages = [];
  let input = '';

  function sendMessage() {
    if (input.trim() !== '') {
      messages = [...messages, { text: input, sender: 'customer' }];
      input = '';
      // Simulate a response from customer care
      setTimeout(() => {
        messages = [...messages, { text: 'Thank you for reaching out. How can we assist you?', sender: 'support' }];
      }, 2000);
    }
  }
</script>

<div class="flex flex-col h-screen text-black">
    <h1 class="tracking-wider text-center">Online Service <b class="text-green-300 text-5xl">.</b></h1>
  <div class="flex-1 overflow-y-auto p-5">
    {#each messages as message}
      <div class="mb-2">
        <div class="p-2 rounded-lg max-w-xs {message.sender === 'customer' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}">
          {message.text}
        </div>
      </div>
    {/each}
  </div>
  <div class="p-4 bg-gray-100 flex">
    <input
      type="text"
      bind:value={input}
      class="flex-1 p-2 border border-gray-300 rounded-lg"
      placeholder="Type your message..."
      on:keydown={(e) => e.key === 'Enter' && sendMessage()}
    />
    <button on:click={sendMessage} class="ml-2 p-2 bg-blue-500 text-white rounded-lg">Send</button>
  </div>
</div>
