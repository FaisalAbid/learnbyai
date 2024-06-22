<script>
  import { onMount } from "svelte"

  // Component props
  export let articlesLeft = 10
  export let isFreeUser = false
  export let subscribeUrl = "/subscribe"
  export let onArticlesUpdate = (newCount) => {}

  let isTopicInfoAccordionOpen = false
  let isWritingSamplesAccordionOpen = false
  let isOutputAccordionOpen = [false, false, false, false, false, false]
  let topicInfo = ""
  let writingSamples = ""
  let topic = ""
  let generatedTitle = ""
  let generatedSEOExcerpt = ""
  let generatedBlogPost = ""
  let generatedSEOAnalysis = ""
  let generatedSEOScore = ""
  let generatedImageHeaders = []
  let selectedImageIndex = 0
  let isLoading = false
  let showResults = false
  let error = ""

  $: canGenerate = articlesLeft > 0

  function toggleTopicInfoAccordion() {
    isTopicInfoAccordionOpen = !isTopicInfoAccordionOpen
  }

  function toggleWritingSamplesAccordion() {
    isWritingSamplesAccordionOpen = !isWritingSamplesAccordionOpen
  }

  function toggleOutputAccordion(index) {
    isOutputAccordionOpen[index] = !isOutputAccordionOpen[index]
  }

  function selectImage(index) {
    selectedImageIndex = index
  }

  async function generateContent() {
    if (!canGenerate) return

    isLoading = true
    showResults = false
    error = ""

    try {
      const response = await fetch(
        "https://coeus-kujlb74jna-uc.a.run.app/signalpress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic,
            topicInfo,
            writingSamples,
            articlesLeft,
            isFreeUser,
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Parse the response
      generatedTitle = data.title || ""
      generatedSEOExcerpt = data.seoExcerpt || ""
      generatedBlogPost = data.blogPost || ""
      generatedSEOAnalysis = data.seoAnalysis || ""
      generatedSEOScore = data.seoScore || 0
      generatedImageHeaders = data.imageHeaders || []
      selectedImageIndex = 0

      // Update articles left
      articlesLeft = data.articlesLeft
      onArticlesUpdate(articlesLeft) // Notify parent component

      showResults = true
    } catch (e) {
      console.error("Error generating content:", e)
      error = "An error occurred while generating content. Please try again."
    } finally {
      isLoading = false
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  onMount(() => {
    // Any initialization code can go here
  })
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 class="text-3xl font-bold text-center mb-8">
    The Signal Press AI Writer
  </h1>
  <div class="bg-white shadow-xl rounded-lg overflow-hidden">
    <div class="p-6">
      <div class="mb-6">
        <button
          on:click={toggleTopicInfoAccordion}
          class="flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <span class="text-lg font-medium"
            >Information about the topic (optional)</span
          >
          <svg
            class="w-5 h-5 transform transition-transform duration-200 {isTopicInfoAccordionOpen
              ? 'rotate-180'
              : ''}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {#if isTopicInfoAccordionOpen}
          <div class="mt-4 transition-all duration-200 ease-in-out">
            <textarea
              bind:value={topicInfo}
              class="w-full h-32 p-2 border border-gray-300 rounded-md"
              placeholder="Enter any additional information or context about the topic..."
            ></textarea>
          </div>
        {/if}
      </div>

      <div class="mb-6">
        <button
          on:click={toggleWritingSamplesAccordion}
          class="flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <span class="text-lg font-medium"
            >Writing Samples / Tone (optional)</span
          >
          <svg
            class="w-5 h-5 transform transition-transform duration-200 {isWritingSamplesAccordionOpen
              ? 'rotate-180'
              : ''}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {#if isWritingSamplesAccordionOpen}
          <div class="mt-4 transition-all duration-200 ease-in-out">
            <textarea
              bind:value={writingSamples}
              class="w-full h-64 p-2 border border-gray-300 rounded-md"
              placeholder="Paste your writing samples here..."
            ></textarea>
          </div>
        {/if}
      </div>

      <div class="mt-6">
        <label for="topic" class="block text-sm font-medium text-gray-700"
          >Blog Topic</label
        >
        <input
          type="text"
          id="topic"
          bind:value={topic}
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter the topic for your blog post"
        />
      </div>

      {#if canGenerate}
        <button
          on:click={generateContent}
          class="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {#if isLoading}
            Generating...
          {:else}
            Generate Content ({articlesLeft} left)
          {/if}
        </button>
      {:else if isFreeUser}
        <a
          href={subscribeUrl}
          class="mt-6 w-full bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Subscribe to Unlock More Articles
        </a>
      {/if}

      {#if error}
        <p class="mt-2 text-red-600">{error}</p>
      {/if}

      {#if isLoading}
        <div class="mt-6 flex justify-center">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"
          ></div>
        </div>
      {/if}

      {#if showResults}
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Generated Content
          </h3>

          {#each ["Image Headers", "Title", "SEO Excerpt", "Blog Post"] as section, index}
            <div class="mb-4">
              <button
                on:click={() => toggleOutputAccordion(index)}
                class="flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                <span class="text-md font-medium">{section}</span>
                <div class="flex items-center">
                  <button
                    on:click|stopPropagation={() =>
                      copyToClipboard(
                        index === 0
                          ? generatedImageHeaders[selectedImageIndex]
                          : index === 1
                            ? generatedTitle
                            : index === 2
                              ? generatedSEOExcerpt
                              : index === 3
                                ? generatedBlogPost
                                : index === 4
                                  ? generatedSEOAnalysis
                                  : `SEO Score: ${generatedSEOScore}`,
                      )}
                    class="mr-2 p-1 hover:bg-gray-200 rounded-full"
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <svg
                    class="w-5 h-5 transform transition-transform duration-200 {isOutputAccordionOpen[
                      index
                    ]
                      ? 'rotate-180'
                      : ''}"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </button>
              {#if isOutputAccordionOpen[index]}
                <div class="mt-2 p-4 bg-gray-50 rounded-md">
                  {#if index === 0}
                    <div class="grid grid-cols-2 gap-4">
                      {#each generatedImageHeaders as imageHeader, imgIndex}
                        <div class="relative">
                          <img
                            src={imageHeader}
                            alt={`Generated header image ${imgIndex + 1}`}
                            class="w-full h-auto rounded-md {selectedImageIndex ===
                            imgIndex
                              ? 'border-4 border-indigo-500'
                              : ''}"
                            on:click={() => selectImage(imgIndex)}
                          />
                          <div
                            class="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm font-bold"
                          >
                            {imgIndex + 1}
                          </div>
                        </div>
                      {/each}
                    </div>
                    <p class="mt-2 text-sm text-gray-600">
                      Click on an image to select it as the header image.
                    </p>
                  {:else if index === 3}
                    <div class="prose prose-xl">
                      {@html generatedBlogPost}
                    </div>
                  {:else}
                    <p>
                      {index === 1
                        ? generatedTitle
                        : index === 2
                          ? generatedSEOExcerpt
                          : generatedSEOAnalysis}
                    </p>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
