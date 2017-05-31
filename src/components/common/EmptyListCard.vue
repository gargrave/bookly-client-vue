<template>
<div class="row justify-center">
  <div class="card">
    <div class="card-content text-center">
      <p>You have not created any {{ itemName }} yet.</p>
      <p class="no-margin">Click the button above to add your first one!</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    itemName: { type: String, required: false, default: 'Objects' }
  }
}
</script>

<style scoped>
.no-margin {
  margin: 0;
}
</style>
