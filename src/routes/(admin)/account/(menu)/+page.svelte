<script lang="ts">
  import { writable } from "svelte/store"

  let currentTab = writable("seoArticle") // Initializes the default active tab
  let topic = writable("")
  let seoArticle = writable("")
  let seoExplainer = writable("")
  let writingSamples = writable("")
  let generationFrequency = writable("1 day")

  // Function to generate SEO Article
  function generateSEOArticle() {
    seoArticle.set(`Generated SEO article for the topic: ${$topic}`)
    seoExplainer.set(
      `This article is optimized by including relevant keywords, maintaining proper keyword density, using meta tags, and ensuring readability and engagement.`,
    )
  }

  // Function to switch tabs
  function switchTab(tab) {
    currentTab.set(tab)
    // Optionally reset outputs when switching tabs
    seoArticle.set("")
    seoExplainer.set("")
  }
</script>

<svelte:head>
  <title>Content Generator</title>
</svelte:head>

<div>
  <!-- Tab Buttons -->
  <div class=" bg-gray-100 p-4">
    <button
      class:active={$currentTab === "seoArticle"}
      on:click={() => switchTab("seoArticle")}
      class="mr-2 py-2 px-4 font-semibold rounded-lg"
    >
      SEO Article
    </button>
    <button
      class:active={$currentTab === "customInput"}
      on:click={() => switchTab("customInput")}
      class="mr-2 py-2 px-4 font-semibold rounded-lg"
    >
      Custom Input
    </button>
    <button
      class:active={$currentTab === "scheduledGeneration"}
      on:click={() => switchTab("scheduledGeneration")}
      class="py-2 px-4 font-semibold rounded-lg"
    >
      Scheduled Generation
    </button>
    <div class="">
      {#if $currentTab === "seoArticle"}
        <div>
          <label
            for="topic"
            class="block mb-2 text-lg font-medium text-gray-900">Topic:</label
          >
          <input
            type="text"
            class="mb-4 p-2 w-full border rounded"
            bind:value={$topic}
            placeholder="Enter topic for SEO article"
          />
          <button
            class="mb-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            on:click={generateSEOArticle}>Generate</button
          >
          {#if $seoArticle}
            <div class="output">
              <h2 class="font-bold">Generated Article:</h2>
              <p>{$seoArticle}</p>
              <h2 class="font-bold">Why it's SEO Optimized:</h2>
              <p>{$seoExplainer}</p>
            </div>
          {/if}
        </div>
      {/if}

      {#if $currentTab === "customInput"}
        <div>
          <label
            for="writingSamples"
            class="block mb-2 text-lg font-medium text-gray-900"
            >Your Writing Samples:</label
          >
          <textarea
            class="mb-4 p-2 w-full border rounded"
            rows="4"
            bind:value={$writingSamples}
            placeholder="Enter your writing samples..."
          ></textarea>
          <button
            class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            on:click={() => {}}>Use Samples</button
          >
        </div>
      {/if}

      {#if $currentTab === "scheduledGeneration"}
        <div>
          <label
            for="writingSamples"
            class="block mb-2 text-lg font-medium text-gray-900"
            >Your Writing Samples:</label
          >
          <textarea
            class="mb-4 p-2 w-full border rounded"
            rows="4"
            bind:value={$writingSamples}
            placeholder="Enter your writing samples..."
          ></textarea>
          <label
            for="topic"
            class="block mb-2 text-lg font-medium text-gray-900">Topic:</label
          >
          <input
            type="text"
            class="mb-4 p-2 w-full border rounded"
            bind:value={$topic}
            placeholder="Enter topic for periodic content"
          />
          <label
            for="frequency"
            class="block mb-2 text-lg font-medium text-gray-900"
            >Generation Frequency:</label
          >
          <select
            class="mb-4 p-2 w-full border rounded"
            bind:value={$generationFrequency}
          >
            <option value="1 day">Every Day</option>
            <option value="2 days">Every 2 Days</option>
            <option value="3 days">Every 3 Days</option>
            <option value="7 days">Every Week</option>
          </select>
          <button
            class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            on:click={() => {}}>Schedule</button
          >
        </div>
      {/if}
    </div>
  </div>

  <!-- Tab Contents -->
</div>

<style>
  button:active,
  button.active {
    background-color: #0056b3; /* Darker blue when active or clicked */
    color: white;
  }
</style>
