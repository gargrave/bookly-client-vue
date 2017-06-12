<template>
  <div class="card-content">
    <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
    <app-book-form
      :working="working"
      :errors="errors"
      :book="book"
      :authors="authors"
      :handleInput="handleInput"
      :handleSelect="handleSelect"
      @submitted="onFormSubmitted"
      @cancelled="onFormCancelled">
    </app-book-form>
  </div><!-- /card-content -->
</template>

<script>
import { mapGetters } from 'vuex'

import BookForm from '../components/BookForm'

export default {
  components: {
    appBookForm: BookForm
  },

  props: {
    // any error messages from the API
    apiError: { type: String, required: false, default: '' },
    // whether any operations are currently running
    working: { type: Boolean, required: true },
    // local validation errors
    errors: { type: Object, required: true },
    // the Book object being edited
    book: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true },
    // callback for text select changing
    handleSelect: { type: Function, required: true }
  },

  computed: {
    ...mapGetters([
      'authors'
    ])
  },

  methods: {
    /** Callback for 'submit' button on form; simply emit the event upwards. */
    onFormSubmitted (value, event) {
      this.$emit('onFormSubmitted', value)
    },

    /** Callback for 'cancel' button on form; simply emit the event upwards. */
    onFormCancelled (value, event) {
      this.$emit('onFormCancelled', value)
    }
  }
}
</script>
