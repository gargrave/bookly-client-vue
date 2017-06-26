export default {
  empty () {
    return {
      id: '',
      email: '',
      createdAt: '',
      updatedAt: '',
      lastLogin: '',
      verified: undefined
    }
  },

  fromAPI (data) {
    return {
      id: data.id,
      email: data.email,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      lastLogin: data.last_login,
      verified: data.verified
    }
  }
}
