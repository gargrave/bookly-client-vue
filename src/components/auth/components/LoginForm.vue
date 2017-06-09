<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- email input -->
    <app-text-input
      ref="email"
      name="email"
      label="Email"
      :value="userData.email"
      :error="errors.email"
      :handleInput="handleInput">
    </app-text-input>

    <!-- password input -->
    <app-text-input
      ref="password"
      type="password"
      name="password"
      label="Password"
      :value="userData.password"
      :error="errors.password"
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
      Sign Up
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
    // the user data model
    userData: { type: Object, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true }
  }
}
</script>
