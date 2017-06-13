<script>
export default {
  data: () => ({
    routeName: ''
  }),

  methods: {
    /**
     * Callback for 'add new instance' button click event
     */
    onAddClick () {
      const to = this.routeName
      if (to) {
        this.$router.push(`${to}/new`)
      } else {
        console.error('Oops! "routeName" has not been defined for this component.')
      }
    },

    /**
     * Callback for clicking on an instance card;
     * routes to that instance's details page.
     */
    onInstanceClick ({ id }, event) {
      if (Number.isInteger(id)) {
        const to = this.routeName
        if (to) {
          this.$router.push(`${to}/${id}`)
        } else {
          console.error('Oops! "routeName" has not been defined for this component.')
        }
      }
    }
  }
}
</script>
