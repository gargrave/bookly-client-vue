import { cloneDeep } from 'lodash'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
import UserLoginModel from '../../../models/userLogin'

export function validate (data) {
  let valid = true
  let testData = cloneDeep(data)
  let errors = UserLoginModel.empty()

  // validate email -> must be email address
  if (!validator.isEmail(testData.email)) {
    errors.email = valErrs.email
    valid = false
  }

  // validate password -> min. 6 characters
  const MIN_PASS_LEN = 6
  if (!validator.isLength(testData.password, { min: MIN_PASS_LEN })) {
    errors.password = valErrs.length(MIN_PASS_LEN)
    valid = false
  }

  return { valid, errors }
}
