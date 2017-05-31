<template>
  <div class="form-group">
    <label :for="name" v-if="label">{{ label }}</label>

    <!-- basic text input -->
    <input
      v-if="type === 'text'"
      type="text"
      class="form-control"
      :class="{ 'has-error': error }"
      :name="name"
      :placeholder="label"
      :maxlength="maxlength"
      :value="value"
      @input="handleInput">

      <!-- password input -->
      <input
        v-if="type === 'password'"
        type="password"
        class="form-control"
        :class="{ 'has-error': error }"
        :name="name"
        :placeholder="label"
        :maxlength="maxlength"
        :value="value"
        @input="handleInput">

    <p class="form-error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    // type 'type' for the input field (text/password)
    type: { type: String, required: false, default: 'text' },
    // the value to use for the 'name' property
    name: { type: String, required: true },
    // the (optional) label to place next to input
    label: { type: String, required: false },
    // the value to bind to
    value: { type: String, required: false },
    // error message (if any) pertaining to this field
    error: { type: String, required: true },
    // optional maxlength property
    maxlength: { type: String, required: false, default: '256' },
    // callback for text input changing
    handleInput: { type: Function, required: false }
  }
}
</script>
