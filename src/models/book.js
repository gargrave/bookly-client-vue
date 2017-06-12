import { cloneDeep } from 'lodash'

export default {
  empty () {
    return {
      title: ''
    }
  },

  toAPI (data) {
    let payload = {
      title: data.title || ''
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
