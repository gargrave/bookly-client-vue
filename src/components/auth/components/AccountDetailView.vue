<template>
  <div class="card-content">
    <p><strong>Username:</strong> {{ userData.username }} </p>
    <p><strong>Real name:</strong> {{ profile.firstName }} {{ profile.lastName }} </p>
    <p><strong>Email:</strong> {{ userData.email }} </p>
    <p><strong>Member since:</strong> {{ userData.created }} </p>

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
export default {
  props: {
    userData: { type: Object, required: true },
    profile: { type: Object, required: true }
  }
}
</script>
