import { cloneDeep } from 'lodash'

export default {
  empty () {
    return {
      id: '',
      email: '',
      created_at: '',
      updated_at: ''
    }
  },

  fromAPI (data) {
    return Object.assign({},
      this.empty(),
      cloneDeep(data)
    )
  }
}
