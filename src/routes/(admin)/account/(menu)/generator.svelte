<script>
  import { onMount } from "svelte"

  let isInputAccordionOpen = false
  let isOutputAccordionOpen = [false, false, false, false, false]
  let writingSamples = ""
  let topic = ""
  let generatedTitle = ""
  let generatedSEOExcerpt = ""
  let generatedBlogPost = ""
  let generatedSEOAnalysis = ""
  let generatedSEOScore = ""
  let isLoading = false
  let showResults = false

  function toggleInputAccordion() {
    isInputAccordionOpen = !isInputAccordionOpen
  }

  function toggleOutputAccordion(index) {
    isOutputAccordionOpen[index] = !isOutputAccordionOpen[index]
  }

  async function generateContent() {
    isLoading = true
    showResults = false

    // Simulating API call with a 5-second delay
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // This is a placeholder function. In a real application, you would send the
    // writing samples (if provided) and topic to a backend API for processing.
    generatedTitle = `AI Generated Title for "${topic}"`
    generatedSEOExcerpt = `This is an AI-generated SEO excerpt for the topic "${topic}". It provides a brief summary of the blog post.`
    generatedBlogPost = `This is an AI-generated blog post about "${topic}"${writingSamples ? " based on the provided writing samples" : ""}. It would contain multiple paragraphs of relevant content.`
    generatedSEOAnalysis = `
      1. Keyword Usage: The primary keyword "${topic}" is used effectively in the title and throughout the content.
      2. Content Length: The blog post is approximately X words long, which is good for SEO.
      3. Readability: The content is easy to read and understand, with an appropriate mix of short and long sentences.
      4. Internal/External Links: Consider adding relevant internal and external links to improve SEO.
      5. Meta Description: The SEO excerpt serves as a good meta description, including the primary keyword.`
    generatedSEOScore = Math.floor(Math.random() * 41) + 60 // Random score between 60 and 100

    isLoading = false
    showResults = true
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
          on:click={toggleInputAccordion}
          class="flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <span class="text-lg font-medium"
            >Optional: Paste Writing Samples</span
          >
          <svg
            class="w-5 h-5 transform transition-transform duration-200 {isInputAccordionOpen
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
        {#if isInputAccordionOpen}
          <div class="mt-4 transition-all duration-200 ease-in-out">
            <textarea
              bind:value={writingSamples}
              class="w-full h-64 p-2 border border-gray-300 rounded-md"
              placeholder="Paste your writing samples here (optional)..."
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

      <button
        on:click={generateContent}
        class="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {#if isLoading}
          Generating...
        {:else}
          Generate Content
        {/if}
      </button>

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

          {#each ["Title", "SEO Excerpt", "Blog Post", "SEO Analysis", "The Signal Press SEO Score"] as section, index}
            <div class="mb-4">
              <button
                on:click={() => toggleOutputAccordion(index)}
                class="flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                <span class="text-md font-medium">{section}</span>
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
              </button>
              {#if isOutputAccordionOpen[index]}
                <div class="mt-2 p-4 bg-gray-50 rounded-md">
                  {#if index === 4}
                    <div class="flex items-center">
                      <div
                        class="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold"
                      >
                        {generatedSEOScore}
                      </div>
                      <p class="ml-4">
                        This is The Signal Press SEO Score for your generated
                        content.
                      </p>
                    </div>
                  {:else}
                    <p>
                      {index === 0
                        ? generatedTitle
                        : index === 1
                          ? generatedSEOExcerpt
                          : index === 2
                            ? generatedBlogPost
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
