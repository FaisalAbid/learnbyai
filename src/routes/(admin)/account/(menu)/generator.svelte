<script>
  import { onMount, onDestroy } from "svelte"

  const API_ENDPOINT = "https://coeus-kujlb74jna-uc.a.run.app"
  export let user
  export let isActiveCustomer
  let topic = ""
  let songType = ""
  let isGenerating = false
  let error = ""
  let generatedSongs = []
  let taskIds = []
  let pollingInterval
  let currentStatus = ""
  let userId = user || "user_" + Math.random().toString(36).substr(2, 9) // Generate a random user ID

  const songTypes = ["Rap", "Reggae", "Pop", "Rock", "Country", "Classical"]

  onMount(async () => {
    await fetchUserSongs()
    await fetchUserTasks()
    startPolling()
  })

  async function fetchUserSongs() {
    try {
      const response = await fetch(`${API_ENDPOINT}/user_songs/${userId}`)
      if (response.ok) {
        const data = await response.json()
        generatedSongs = data.songs
      }
    } catch (e) {
      console.error("Error fetching user songs:", e)
    }
  }

  async function fetchUserTasks() {
    try {
      const response = await fetch(`${API_ENDPOINT}/user_tasks/${userId}`)
      if (response.ok) {
        const data = await response.json()
        taskIds = data.tasks
      }
    } catch (e) {
      console.error("Error fetching user tasks:", e)
    }
  }

  async function generateSong() {
    if (!topic || !songType) {
      error = "Please enter a topic and select a song type."
      return
    }

    isGenerating = true
    currentStatus = "Initiating song generation... This may take a few minutes."
    error = ""

    try {
      const response = await fetch(`${API_ENDPOINT}/learnbysong_generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, songType, userId }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      taskIds = [...taskIds, data.task_id]

      currentStatus = "Generating song..."
    } catch (e) {
      console.error("Error generating song:", e)
      error = "An error occurred while generating the song. Please try again."
      isGenerating = false
    }
  }

  function startPolling() {
    pollingInterval = setInterval(checkAllSongStatuses, 10000) // Poll every 10 seconds
  }

  async function checkAllSongStatuses() {
    for (let taskId of taskIds) {
      await checkSongStatus(taskId)
    }
    isGenerating = taskIds.length > 0
  }

  async function checkSongStatus(taskId) {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/learnbysong_status/${taskId}?user_id=${userId}`,
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === "complete") {
        taskIds = taskIds.filter((id) => id !== taskId)
        await fetchUserSongs() // Refresh the list of generated songs
        currentStatus = ""
      } else {
        currentStatus = "Still generating... This may take a few minutes."
      }
    } catch (e) {
      console.error("Error checking song status:", e)
      error =
        "An error occurred while checking the song status. Please try again."
      currentStatus = ""
    }
  }

  onDestroy(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }
  })
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 class="text-3xl font-bold text-center mb-8">Learn With Song Ai</h1>
  <div class="bg-white shadow-xl rounded-lg overflow-hidden p-6">
    <div class="mb-4">
      <label for="topic" class="block text-sm font-medium text-gray-700 mb-2"
        >What do you want to learn about?</label
      >
      <input
        type="text"
        id="topic"
        bind:value={topic}
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter a topic (e.g., Photosynthesis, French Revolution)"
      />
    </div>

    <div class="mb-4">
      <label for="songType" class="block text-sm font-medium text-gray-700 mb-2"
        >Select the type of song</label
      >
      <select
        id="songType"
        bind:value={songType}
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select a song type</option>
        {#each songTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
    </div>

    <button
      on:click={generateSong}
      class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      disabled={isGenerating}
    >
      {isGenerating ? "Generating..." : "Generate Tune"}
    </button>

    {#if error}
      <p class="mt-2 text-red-600">{error}</p>
    {/if}

    {#if isGenerating}
      <div class="mt-6">
        <div class="flex justify-center mb-4">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"
          ></div>
        </div>
        <p class="text-center text-gray-600">{currentStatus}</p>
      </div>
    {/if}

    {#if generatedSongs.length > 0}
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Generated Songs</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each generatedSongs as song}
            <div class=" p-4 rounded-md mb-4">
              <h3 class="font-bold">{song.topic}</h3>
              <p class="text-sm text-gray-600 mb-2">Type: {song.songType}</p>
              {#each song.audioUrls as audioUrl, index}
                <div class="mb-2 mt-4 bg-gray-100 p-4">
                  <p class="text-sm font-semibold">Version {index + 1}</p>
                  <audio controls src={audioUrl} class="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
