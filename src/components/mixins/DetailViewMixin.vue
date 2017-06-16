<script>
/*
Generic Mixin for a 'detail' route on a REST API.
Meant to be minimal, it only implements the basic data and routing methods.
Submitting a form for updating/deleting records needs to be implemnted by the child component.
*/
import { cloneDeep } from 'lodash'

export default {
  data: () => ({
    // basic config for the route; this will need to be overridden by the child route as appropriate
    config: {
      listRoute: '/'
    },
    // whether we are in editing or viewing mode
    editing: false,
    // the working copy of the instance
    model: undefined,
    // the untouched copy of the original instance
    originalModel: undefined,
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
    },

    /** Callback for clicking the 'edit' button; simply change to 'editing' state. */
    onEditClick () {
      this.model = cloneDeep(this.originalModel)
      this.editing = true
    },

    /**
     * Callback for 'cancel' button on form;
     * cancel the 'editing' state and revert the model.
     */
    onFormCancelled (value, event) {
      this.model = cloneDeep(this.originalModel)
      this.editing = false
    }
  },

  created () {
    // build the default models for the route
    const baseModel = this.getBaseModel()
    if (baseModel) {
      this.model = baseModel.empty()
      this.originalModel = baseModel.empty()
      this.errors = baseModel.emptyErrors ? baseModel.emptyErrors() : baseModel.empty()
    } else {
      this.$router.push('/')
    }
  }
}
</script>
