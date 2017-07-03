<!--
Card content to display on Account Detail page for users who have not
yet verified their account.

Contains a notice of where to find the verify link, and a button to request
a new link.
-->
<template>
  <div class="card-content">

    <p>Your account has not been verified!</p>
    <p>
      When you registered, you should have received an email at
      <strong>{{ email }}</strong>, which you can use to verify your account.
    </p>
    <p>
      If you need to request a new verification email, click the button below.
    </p>

    <button
      class="outline negative"
      :disabled="newLinkRequested"
      @click.prevent="handleRequestNewVerifyLink">
      {{ newLinkButtonText }}
    </button>

  </div><!-- /card-content -->
</template>

<script>
export default {
  props: {
    email: { type: String, required: true },
    newLinkRequested: { type: Boolean, required: true },
    handleRequestNewVerifyLink: { type: Function, required: true }
  },

  computed: {
    newLinkButtonText () {
      return this.newLinkRequested ? 'A New Link Has Been Sent' : 'Send Me a New Link!'
    }
  }
}
</script>
