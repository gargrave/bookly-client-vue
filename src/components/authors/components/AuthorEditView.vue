<template>
  <div class="card-content">
    <p v-if="apiError" class="apiError">Error: {{ apiError }}</p>
    <app-author-form
      :working="working"
      :errors="errors"
      :author="author"
      :handleInput="handleInput"
      @submitted="onFormSubmitted"
      @cancelled="onFormCancelled">
    </app-author-form>
  </div><!-- /card-content -->
</template>

<script>
import AuthorForm from '../components/AuthorForm'

export default {
  components: {
    appAuthorForm: AuthorForm
  },

  props: {
    // any error messages from the API
    apiError: { type: String, required: false, default: '' },
    // whether any operations are currently running
    working: { type: Boolean, required: true },
    // local validation errors
    errors: { type: Object, required: true },
    // the Author object being edited
    author: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true }
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
