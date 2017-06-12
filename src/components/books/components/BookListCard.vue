<template>
  <div
    class="card cursor list-view-card"
    @click="$emit('click', { id: book.id })">

    <div class="card-content">
      <h6>{{ book.title }}</h6>
    </div><!-- /card-content -->

  </div><!-- /card -->
</template>

<script>
export default {
  props: {
    // the Book object for this instance
    book: { type: Object, required: true }
  }
}
</script>
