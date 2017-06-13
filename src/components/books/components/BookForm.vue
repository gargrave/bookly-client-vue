<template>
  <form @submit.prevent="$emit('submitted')">

    <!-- title input -->
    <app-text-input
      name="title"
      label="Title"
      maxlength="128"
      :value="book.title"
      :error="errors.title"
      :handleInput="handleInput">
    </app-text-input>

    <!-- author selector -->
    <div class="form-group">
      <label for="authors">Author</label>
      <q-select
        placeholder="Select Author"
        class="form-control"
        :class="{ 'has-error': errors.author }"
        name="author"
        type="list"
        :value="book.author.id"
        :options="authorsForSelect"
        @input="handleSelect">
      </q-select>
      <p class="form-error">{{ errors.author }}</p>
    </div>

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
    // the book (if any) being edited
    book: { type: Object, required: true },
    // list of available authors
    authors: { type: Array, required: true },
    // callback for text input changing
    handleInput: { type: Function, required: true },
    // callback for text select changing
    handleSelect: { type: Function, required: true }
  },

  computed: {
    /* builds the authors list in the format required by q-select */
    authorsForSelect () {
      return this.authors.map((p) => {
        return {
          key: p.id,
          label: `${p.firstName} ${p.lastName}`,
          value: p.id
        }
      })
    }
  }
}
</script>
