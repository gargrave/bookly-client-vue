<template>
  <div class="card-content">
    <p><strong>Name:</strong> {{ fullName }}</p>
    <p><strong>Email:</strong> {{ user.email }} </p>
    <hr>
    <p><strong>Member since:</strong> {{ createdDate }} </p>
    <p><strong>Last login:</strong> {{ lastLoginDate }} </p>

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
    user: { type: Object, required: true }
  },

  computed: {
    fullName () {
      return `${this.user.profile.firstName} ${this.user.profile.lastName}`
    },

    createdDate () {
      return dateHelper.cleanDate(this.user.createdAt)
    },

    lastLoginDate () {
      return dateHelper.cleanDateTime(this.user.lastLogin)
    }
  }
}
</script>
