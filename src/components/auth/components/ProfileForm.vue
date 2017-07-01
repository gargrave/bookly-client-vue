<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- firstName input -->
    <app-text-input
      name="firstName"
      label="First Name"
      maxlength="128"
      :value="profile.firstName"
      :error="errors.firstName"
      :handleInput="handleInput">
    </app-text-input>

    <!-- lastName input -->
    <app-text-input
      name="lastName"
      label="Last Name"
      maxlength="128"
      :value="profile.lastName"
      :error="errors.lastName"
      :handleInput="handleInput">
    </app-text-input>

    <!-- 'submit' button -->
    <button
      class="positive"
      type="submit">
      Submit
    </button>

    <!-- cancel/back button -->
    <button
      class="secondary pull-right"
      @click.prevent="$emit('cancelled')">
      Cancel
    </button>

  </form>
</template>

<script>
import TextInput from '../../common/forms/TextInput'

export default {
  components: {
    appTextInput: TextInput
  },

  props: {
    // whether any operations are currently running
    working: { type: Boolean, required: true },
    // local validation errors
    errors: { type: Object, required: true },
    // the profile (if any) being edited
    profile: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true }
  }
}
</script>
