import { cloneDeep } from 'lodash'

export default {
  empty () {
    return {
      title: '',
      author: {
        id: -1,
        name: ''
      }
    }
  },

  toAPI (data) {
    let payload = {
      title: data.title || '',
      authorId: data.author.id
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
