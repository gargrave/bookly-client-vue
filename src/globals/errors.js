import { Toast } from 'quasar'

/* ============================================
 = Validation Errors
 ============================================= */

export const valErrs = {
  required: 'This field is required.',
  email: 'Must be a valid email address.',
  passwords: 'Passwords do not match',
  length: (min) => `Must be at least ${min} characters long.`
}

/* ============================================
 = API Errors
 ============================================= */
const apiErrorNames = {
  generalError: 'GeneralError',
  badRequest: 'BadRequest',
  NotAuthenticated: 'NotAuthenticated',
  invalidLogin: 'InvalidLogin'
}

  /*
  API Error Objects
  These pre-defined objects are built to match the 'name' and 'message' properties
  of various errors returned from the API, so we can easily match them.
  */
const apiErrorObjects = {
  INVALID_TOKEN: {
    name: apiErrorNames.NotAuthenticated,
    message: 'invalid token'
  },

  INVALID_LOGIN: {
    name: apiErrorNames.NotAuthenticated,
    message: 'Invalid login.'
  },

  EXPIRED_TOKEN: {
    name: apiErrorNames.NotAuthenticated,
    message: 'jwt expired'
  }
}

const cleanMessages = {
  EXPIRED_TOKEN: 'Auth token has expired. Please login again.',
  INVALID_TOKEN: 'Invalid token. Please login again.',
  INVALID_LOGIN: 'Incorrect username/password combination. Please try again.',
  UNKNOWN: 'An uknown error occurred.'
}

function isError (a, b) {
  return a.name === b.name &&
    a.message === b.message
}

export const cleanErrors = {
  EMPTY: { name: '', message: '' },
  EXPIRED_TOKEN: { message: cleanMessages.EXPIRED_TOKEN },
  INVALID_TOKEN: { message: cleanMessages.INVALID_TOKEN },
  INVALID_LOGIN: { message: cleanMessages.INVALID_LOGIN }
}

export function parseError (e) {
  const data = e.response.data || cleanErrors.EMPTY

  // invalid token error
  if (isError(data, apiErrorObjects.INVALID_TOKEN)) {
    Toast.create.info(cleanMessages.INVALID_TOKEN)
    return cleanErrors.INVALID_TOKEN
  }

  // expired token error
  if (isError(data, apiErrorObjects.EXPIRED_TOKEN)) {
    Toast.create.info(cleanMessages.EXPIRED_TOKEN)
    return cleanErrors.EXPIRED_TOKEN
  }

  // invalid login credentials
  if (isError(data, apiErrorObjects.INVALID_LOGIN)) {
    return cleanErrors.INVALID_LOGIN
  }

  return { message: `${cleanMessages.UNKNOWN} (${data.message})` }
}
