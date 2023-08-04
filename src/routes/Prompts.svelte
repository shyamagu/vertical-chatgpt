<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let userPrompt = "";

  export let systemPrompt = "";

  export let endpoint = "";

  export let modelName = "";

  export let apiKey = "";

  export let title = "";

  let timeout = 300;

  let error = "";

  let editable = false;

  let loading = false;

  let token = 0;

  export async function callChatGPT() {
    loading = true;
    error = "";

    if (systemPrompt) {
      const chats = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];

      const sendData = {
        chats: chats,
        endpoint: endpoint,
        modelName: modelName,
        apiKey: apiKey,
        timeout:timeout,
      };

      try {
        const response = await fetch("/api/chatgpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        });

        //HTTPコードを取得する
        const status = response.status;

        const data = await response.json();

        if(status ==200){
          const result = data.message;
          token = data.input_token;
          dispatch("result", result);
        }else if(status == 500){
          error = data.message
        }else{
          throw new Error();
        }

      } catch (error) {
        dispatch("result", "Something went wrong during the ChatGPT request.");
      }
    } else {
      dispatch("result", "");
    }

    loading = false;
  }

  export let ended = false;

  function handleTitleBlur() {
    editable = !editable;
  }
</script>

<div class="main">
  <div class="prompt_filed">
    {#if editable}
      <input
        class="title titleinput"
        type="text"
        bind:value={title}
        placeholder="Enter your title here"
        on:blur={handleTitleBlur}
      />
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="title" on:click={handleTitleBlur}>
        {title}
      </div>
    {/if}
    <textarea
      class="system_textarea"
      class:active={ended}
      readonly={!ended}
      bind:value={systemPrompt}
      placeholder="Enter your system prompt here"
    />
    <textarea
      class="user_textarea"
      class:active={ended}
      readonly={!ended}
      bind:value={userPrompt}
      placeholder="Enter your user prompt here"
    />
    <div class="footer_field">
      <div class="timeout_field">
        Timeout:
        <input
          type="number"
          id="timeout"
          name="timeout"
          class="timeout_input"
          class:active={ended}
          readonly={!ended}
          min="0"
          max="300"
          bind:value={timeout}
        />
        (Sec)
      </div>
      <div class="token_display">
        {#if token > 0}
          {token}
        {:else}
          NaN
        {/if}
      </div>
    </div>
  </div>

  {#if loading}
    <div class="loader" />
  {:else}
    <div class="button_field">
      {#if ended}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="submit_button" on:click={callChatGPT} />
      {:else}
        <div class="submit_button_disable" />
      {/if}
      {#if error}
        <div class="error">{error}</div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .title {
    width: 100%;
    font-size: 1.2em;
    margin: 10px;
    margin-left: 20px;
    font-weight: bold;
    height: 30px;
  }

  .prompt_filed {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
  }

  .footer_field {
    display: flex;
    width: 100%;
  }

  .timeout_field {
    width: 50%;
    font-size:0.8em
  }

  .timeout_input {
    text-align: right;
    background-color: #eee;
    border: 1px solid #ccc;
  }
  .token_display {
    width: 50%;
    font-size: 1em;
    color: #444;
    text-align: right;
    margin-bottom: 5px;
    margin-right: 10px;
  }

  .button_field {
    margin-left: 20px;
    width:50px;
  }

  .submit_button {
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-left: 50px solid #666;
    cursor: pointer;
  }

  .submit_button_disable {
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-left: 50px solid #ccc;
  }

  .submit_button:hover {
    border-left: 50px solid #333;
  }

  .system_textarea {
    width: 100%;
    height: 150px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-family: "Noto Sans JP", sans-serif;
    background-color: #eee;
  }

  .user_textarea {
    width: 100%;
    height: calc(100vh - 330px);
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-family: "Noto Sans JP", sans-serif;
    background-color: #eee;
  }

  .active {
    background-color: #fff;
  }

  .loader {
    margin: auto 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 5px solid #ccc;
    border-top-color: #333;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .error {
    color: red;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
