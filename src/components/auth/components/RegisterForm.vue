<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- email input -->
    <app-text-input
      name="email"
      label="Email (required for verification)"
      :error="errors.email"
      :value="user && user.email || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      type="password"
      name="password"
      label="Password"
      :error="errors.password"
      :value="user && user.password || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      type="password"
      name="passwordConfirm"
      label="Re-enter Password"
      :error="errors.passwordConfirm"
      :value="user && user.passwordConfirm || ''"
      :handleInput="handleInput">
    </app-text-input>

    <!-- submit button -->
    <button
      class="positive"
      type="submit">
      Submit
    </button>

    <!-- cancel/back button -->
    <button
      class="secondary pull-right"
      @click.prevent="$emit('cancelled')">
      Log In
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
    // collection of validation errors
    errors: { type: Object, required: true },
    // user data model
    user: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true }
  }
}
</script>
