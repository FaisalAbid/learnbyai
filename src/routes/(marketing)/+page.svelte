<script lang="ts">
  import { WebsiteName, WebsiteDescription } from "./../../config"

  const features = [
    {
      name: "Catchy Tunes",
      description:
        "Our AI composes memorable melodies that make learning effortless and enjoyable.",

      linkText: "Sample Songs",
      newPage: false,
      svgContent: `<path d="M12 8v5m0 3v-3m0 0l4-2m-4 2l-4-2m8-4V8m0 0V6a2 2 0 10-4 0v2m4 0H8" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Topic Maestro",
      description:
        "From algebra to zoology, our AI can create educational songs for any subject.",

      linkText: "Explore Topics",
      newPage: false,
      svgContent: `<path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Lyrical Genius",
      description:
        "Our AI writes clever, memorable lyrics that make complex concepts easy to understand.",

      linkText: "See Examples",
      newPage: false,
      svgContent: `<path d="M12 11.5v5m0 0l-3-3m3 3l3-3M12 5v1.5m0 0v1.5m0-1.5h3m-3 0H9" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Age Harmony",
      description:
        "Customized learning songs for all ages, from young children to lifelong learners.",

      linkText: "Find Your Level",
      newPage: false,
      svgContent: `<path d="M12 22v-9m0 0V3m0 10h5m-5 0H7" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Style Variety",
      description:
        "Choose from various musical styles to match your learning preferences.",

      linkText: "Choose Your Style",
      newPage: false,
      svgContent: `<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      name: "Memory Boost",
      description:
        "Our songs enhance retention, making it easier to remember and recall information.",

      linkText: "The Science",
      newPage: false,
      svgContent: `<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17l-5-3 5-3 5 3-5 3z" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
  ]
  const sampleSongs = [
    {
      title: "Jurassic Jams: A Prehistoric Timeline",
      topic: "Learn the prehistoric timeline",
      audio:
        "https://storage.googleapis.com/lws_storage/demo/prehistoric%20timeline.mp3",
    },
    {
      title: "Exponential Enigma: Unraveling the Constant E",
      topic: "Learning the constant E",
      audio: "https://storage.googleapis.com/lws_storage/demo/e.mp3",
    },
    {
      title: "Pythagoras' Rap: The Hypotenuse Groove",
      topic: "Learning the Pythagorean Theorem",
      audio: "https://storage.googleapis.com/lws_storage/demo/pytha.mp3",
    },
    {
      title: "Vive la Révolution: The French Uprising Rhapsody",
      topic: "Learning about the French Revolution",
      audio:
        "https://storage.googleapis.com/lws_storage/demo/436f64ee-b795-4173-9667-34850c4a041b.mp3",
    },
    {
      title: "Commander-in-Chief Chronicles: Remembering the Presidents",
      topic: "American History",
      audio:
        "https://storage.googleapis.com/lws_storage/demo/dc117dc5-1650-41d0-b5db-d50c1cc0b5f7_1.mp3",
    },
  ]
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
</svelte:head>

<!-- Hero Section -->
<div class="hero min-h-[70vh] bg-base-100">
  <div class="hero-content text-center py-12">
    <div class="max-w-2xl">
      <h1 class="text-5xl md:text-7xl font-bold mb-8 font-display text-primary">
        Learn By Song
      </h1>
      <p class="text-2xl md:text-3xl mb-8 text-[#FF6B6B]">
        <!-- Coral color for subheading -->
        Where Learning Meets Melody
      </p>
      <p class="text-xl mb-12 text-base-content">
        Experience a new way of learning with AI-generated educational songs
        that make knowledge stick.
      </p>
      <a href="/login" class="btn btn-primary btn-lg text-white"
        >Start Learning Today</a
      >
    </div>
  </div>
</div>

<!-- Features Section -->
<div class="py-16 bg-base-200">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12 font-display text-primary">
      Why Learn By Song?
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body items-center text-center">
            <div class="w-16 h-16 mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {@html feature.svgContent}
              </svg>
            </div>
            <h3 class="card-title text-2xl mb-2 font-display">
              {feature.name}
            </h3>
            <p class="mb-4">{feature.description}</p>
            {#if feature.link}
              <a
                href={feature.link}
                target={feature.newPage ? "_blank" : ""}
                class="btn btn-sm bg-[#FF6B6B] hover:bg-[#FF8C8C] border-none text-white"
              >
                <!-- Coral color for buttons -->
                {feature.linkText}
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Sample Songs Section -->
<div class="py-16 bg-base-100">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12 font-display text-primary">
      Sample Our Tunes
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each sampleSongs as song}
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-xl mb-2 font-display text-[#FF6B6B]">
              {song.title}
            </h3>
            <!-- Coral color for song titles -->
            <p class="mb-4 text-sm">{song.topic}</p>
            <audio controls class="w-full">
              <source src={song.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Pricing Section -->
<div class="bg-primary text-primary-content py-16">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-4xl font-bold mb-8 font-display">
      Ready to Transform Your Learning Experience?
    </h2>
    <p class="text-xl mb-12">
      For just $35 a month, unlock unlimited access to our AI-powered
      educational songs. Invest in knowledge that lasts a lifetime.
    </p>
    <a
      href="/login"
      class="btn btn-lg bg-[#FF6B6B] hover:bg-[#FF8C8C] border-none text-white"
      >Get Started Now</a
    >
    <!-- Coral color for CTA button -->
  </div>
</div>

<!-- Testimonials Section -->
<div class="py-16 bg-base-100">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-4xl font-bold mb-8 font-display text-primary">
      What Our Users Say
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <p class="italic">
            "Learn By Song has made studying history so much more enjoyable. I'm
            retaining information like never before!"
          </p>
          <p class="font-bold mt-4 text-[#FF6B6B]">- Sarah, 15</p>
          <!-- Coral color for names -->
        </div>
      </div>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <p class="italic">
            "As a parent, I'm amazed at how quickly my kids are learning complex
            topics. It's education and entertainment in one!"
          </p>
          <p class="font-bold mt-4 text-[#FF6B6B]">- John, Parent</p>
          <!-- Coral color for names -->
        </div>
      </div>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <p class="italic">
            "The songs helped me ace my biology exam. It's incredible how easily
            I can recall information now."
          </p>
          <p class="font-bold mt-4 text-[#FF6B6B]">- Alex, College Student</p>
          <!-- Coral color for names -->
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Final CTA Section -->
<div class="bg-secondary text-secondary-content py-16">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-4xl font-bold mb-8 font-display">
      Experience the Power of Musical Learning
    </h2>
    <p class="text-xl mb-12">
      Discover how we can enhance your learning journey.
    </p>
    <a
      href="/login"
      class="btn btn-lg bg-[#FF6B6B] hover:bg-[#FF8C8C] border-none text-white"
      >Start Learning Today</a
    >
    <!-- Coral color for CTA button -->
  </div>
</div>
