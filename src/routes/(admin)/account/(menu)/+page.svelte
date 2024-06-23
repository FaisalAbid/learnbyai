<script>
  import Generator from "./generator.svelte"
</script>

<Generator onArticlesUpdate={(data) => console.log(data)} />
