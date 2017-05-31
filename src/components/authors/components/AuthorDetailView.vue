<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ author.firstName }} {{ author.lastName }}</p>

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
     // the Author object being viewed
    author: { type: Object, required: true }
  },

  computed: {
    addedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.author.created)
    },

    updatedOnString () {
      return dateHelper.cleanDateWithTrailingDay(this.author.modified)
    }
  }
}
</script>
