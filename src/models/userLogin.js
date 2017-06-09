export default {
  empty () {
    return {
      email: '',
      password: ''
    }
  },

  toAPI (data) {
    let payload = {
      email: data.email,
      password: data.password
    }

    return payload
  }
}
