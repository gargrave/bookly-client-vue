export default {
  findRecordById (records, id) {
    let record = records.filter(record => Number(record.id) === Number(id))
    if (record.length) {
      return record[0]
    }
    return null
  },

  /**
   * Builds a GET request for an AJAX call via axios.
   * Mostly just a shortcut to save writing everything out over and over
   */
  axGet (url, authToken = null) {
    let req = {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      },
      url
    }

    if (authToken) {
      req.headers['Authorization'] = `${authToken}`
    }

    return req
  },

  /**
   * Builds a POST request for an AJAX call via axios.
   */
  axPost (url, data, authToken = null) {
    let req = {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      },
      url,
      data
    }

    if (authToken) {
      req.headers['Authorization'] = `${authToken}`
    }

    return req
  },

  /**
   * Builds a PUT request for an AJAX call via axios.
   * Note that this simply uses the POST method build, and then changes the method.
   */
  axPut (url, data, authToken = null) {
    let req = this.axPost(url, data, authToken)
    req.method = 'put'
    return req
  },

  /**
   * Builds a DELETE request for an AJAX call via axios.
   * Note that this simply uses the POST method build, and then changes the method.
   */
  axDelete (url, data, authToken = null) {
    let req = this.axPost(url, data, authToken)
    req.method = 'delete'
    return req
  }
}
