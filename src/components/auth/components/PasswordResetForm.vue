<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- password input -->
    <app-text-input
      type="password"
      name="password"
      label="Password"
      :error="errors.password"
      :value="model.password"
      :handleInput="handleInput">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      type="password"
      name="passwordConfirm"
      label="Re-enter Password"
      :error="errors.passwordConfirm"
      :value="model.passwordConfirm"
      :handleInput="handleInput">
    </app-text-input>

    <!-- submit button -->
    <button
      class="positive"
      type="submit"
      :disabled="working">
      Submit
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
    model: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true }
  }
}
</script>
