<template>
  <div class="card-content">
    <p v-if="apiError" class="alert alert-danger">Error: {{ apiError }}</p>

    <app-profile-form
      :working="working"
      :errors="errors"
      :profile="profile"
      :handleInput="handleInput"
      @submitted="onFormSubmitted"
      @cancelled="onFormCancelled">
    </app-profile-form>

  </div><!-- /card-content -->
</template>

<script>
import ProfileForm from './ProfileForm'

export default {
  components: {
    appProfileForm: ProfileForm
  },

  props: {
    // any error messages from the API
    apiError: { type: String, required: false, default: '' },
    // whether any operations are currently running
    working: { type: Boolean, required: true },
    // local validation errors
    errors: { type: Object, required: true },
    // the Profile object being edited
    profile: { type: Object, required: true },
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
