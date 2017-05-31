<template>
  <div
    class="card cursor list-view-card"
    @click="$emit('click', { id: author.id })">

    <div class="card-content">
      <h6>{{ author.firstName }} {{ author.lastName }}</h6>
    </div><!-- /card-content -->

  </div><!-- /card -->
</template>

<script>
export default {
  props: {
    // the Author object for this instance
    author: { type: Object, required: true }
  }
}
</script>
