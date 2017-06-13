<template>
  <div class="card-content">
    <p><strong>Email:</strong> {{ userData.email }} </p>
    <p><strong>Member since:</strong> {{ createdDate }} </p>

    <hr>
    <button
      class="primary"
      @click="$emit('editClicked')">
      Edit
    </button>

    <button
      class="secondary pull-right"
      @click="$emit('logoutClicked')">
        Logout
    </button>
  </div><!-- /card-content -->
</template>

<script>
import dateHelper from '../../../utils/dateHelper'

export default {
  props: {
    userData: { type: Object, required: true },
    profile: { type: Object, required: true }
  },

  computed: {
    createdDate () {
      return dateHelper.cleanDate(this.userData.created)
    }
  }
}
</script>
