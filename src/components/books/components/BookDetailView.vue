<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ book.title }}</p>

    <hr>
    <p><strong>Added on:</strong> {{ addedOnString }}</p>
    <p><strong>Updated on:</strong> {{ updatedOnString }}</p>

    <hr>
    <button
      class="primary"
      @click="$emit('editClicked')">
      Edit
    </button>

    <button
      class="secondary pull-right"
      @click="$emit('backClicked')">
      Back
    </button>
  </div><!-- /card-content -->
</template>

<script>
import dateHelper from '../../../utils/dateHelper'

export default {
  props: {
     // the Book object being viewed
    book: { type: Object, required: true }
  },

  computed: {
    addedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.book.created)
    },

    updatedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.book.modified)
    }
  }
}
</script>
