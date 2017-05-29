import { cloneDeep } from 'lodash'

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
    return Object.assign({},
      this.empty(),
      cloneDeep(data)
    )
  }
}
