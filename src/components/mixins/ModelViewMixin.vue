<script>
export default {
  data: () => ({
    // basic config for the route; this will need to be overridden by the child route as appropriate
    config: {
      listRoute: '/'
    },
    // the working copy of the instance
    model: undefined,
    // local validation errors
    errors: undefined
  }),

  methods: {
    getBaseModel: () => console.error('DetailViewMixin.getBaseModel() not implemented!'),

    /**
     * Callback for handling input events from input fields. Simply updates
     * the model with the value, assuming it has an associated key.
     *
     * Note that the input field's "name" param needs to match the prop key.
     */
    handleInput (e) {
      let key = e.target.name
      if (key in this.model) {
        this.model[key] = e.target.value
      }
    },

     /** Callback for clicking the 'back' button; simply return to list page. */
    onBackClick () {
      this.$router.push(this.config.listRoute)
    }
  },

  created () {
    // build the default models for the route
    const baseModel = this.getBaseModel()
    if (baseModel) {
      this.model = baseModel.empty()
      this.errors = baseModel.emptyErrors ? baseModel.emptyErrors() : baseModel.empty()
    } else {
      this.$router.push('/')
    }
  }
}
</script>
