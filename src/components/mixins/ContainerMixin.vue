<script>
import { mapActions } from 'vuex'

import { Loading } from 'quasar'

export default {
  data: () => ({
    // whether the component is going through first initialization
    initializing: true,
    // whether any operations are currently running
    working: false,
    // error messages returned from API (e.g. invalid data)
    apiError: ''
  }),

  methods: {
    /**
     * Enters working state by setting the necessary vars.
     */
    enterWorkingState () {
      this.working = true
      this.initializing = true
      Loading.show({ message: 'Working...' })
    },

    /**
     * Exits 'working' state by resetting all associated vars.
     */
    exitWorkingState () {
      this.working = false
      this.initializing = false
      Loading.hide()
    },

    /** Gracefully handles any error messages from the API */
    onError (err) {
      this.apiError = err.message || ''
      this.working = false
      this.initializing = false
      Loading.hide()
    },

    ...mapActions([
      'checkForStoredLogin'
    ])
  }
}
</script>
