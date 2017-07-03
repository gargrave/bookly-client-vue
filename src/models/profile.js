export default {
  empty () {
    return {
      firstName: '',
      lastName: ''
    }
  },

  toAPI (data) {
    let payload = {
      firstName: data.firstName || '',
      lastName: data.lastName || ''
    }

    if (data.id) {
      payload.id = data.id
    }

    return payload
  },

  fromAPI (data) {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }
}
