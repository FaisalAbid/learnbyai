<script>
  import Generator from "./generator.svelte"
  export let data
  let isActiveCustomer = data.isActiveCustomer
  let userId = data.userId
</script>

<Generator user={userId} {isActiveCustomer} />
