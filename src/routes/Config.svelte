<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let endpoint = "";

  export let modelName = "";

  export let apiKey = "";

  let config = {
    endpoint: endpoint,
    modelName: modelName,
    apiKey: apiKey,
  };

  export async function setConfig() {
    dispatch("result", JSON.stringify(config));
  }
</script>

<div class="main">
  <div class="config_field">
    <h1 class="title">AOAI Settings</h1>
    <div class="item_name">Endpoint</div>
    <input
      type="text"
      class="input_field"
      bind:value={config.endpoint}
      placeholder="Enter your endpoint here"
    />
    <div class="item_name">Model Name</div>
    <input
      type="text"
      class="input_field"
      bind:value={config.modelName}
      placeholder="Enter your model name here"
    />
    <div class="item_name">API Key</div>
    <input
      type="text"
      class="input_field"
      bind:value={config.apiKey}
      placeholder="Enter your API key here"
    />
    <div class="button_field">
      <button class="submit_button" on:click={setConfig}>Done</button>
    </div>
  </div>
</div>

<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;
  }

  .config_field {
    width: 500px;
    height: 500px;
    border: 1px solid #ccc;
    color: #000;
    background-color: #bbd;
    padding: 5px 5px 5px 5px;
    border-radius: 20px;
    box-shadow: 5px 10px 10px 0px #ccc;
  }

  .title {
    text-align: center;
  }

  .item_name {
    font-size: 1.4em;
    font-weight: bold;
    margin-left:50px;
    margin-top:30px;
    margin-bottom: 10px;
  }

  .input_field{
    font-size: 1.2em;
    width:400px;
    margin-left:50px;
    font-family: 'Noto Sans JP', sans-serif;
    border: none;
    border-radius: 10px;
  }

  .button_field {
    margin-top:50px;
    width:100%;
    text-align: right;
  }

  .submit_button {
    font-size: 1.5em;
    padding: 10 20px;
    margin-right:50px;
    width: 150px;
    height: 50px;
    background-color: #66c;
    color: #fff;
    font-family: "Noto Sans JP", sans-serif;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .submit_button:hover {
    background-color: #88e;
  }

  .submit_button:active {
    background-color: #44a;
  }
</style>
