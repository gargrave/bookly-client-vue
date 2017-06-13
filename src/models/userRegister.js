export default {
  empty () {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },

  toAPI (data) {
    let payload = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm
    }

    return payload
  }
}
