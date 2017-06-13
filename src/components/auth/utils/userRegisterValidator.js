import { cloneDeep } from 'lodash'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
import UserRegisterModel from '../../../models/userRegister'

export function validate (data) {
  let valid = true
  let errors = UserRegisterModel.empty()
  let testData = cloneDeep(data)

  // validate username -> required
  if (!validator.isEmail(testData.email)) {
    errors.email = valErrs.email
    valid = false
  }

  // validate password -> min length 8
  if (!validator.isLength(testData.password, { min: 8 })) {
    errors.password = valErrs.length(8)
    valid = false
  }

  // validate passwordConfirm -> min length 8
  if (!validator.isLength(testData.passwordConfirm, { min: 8 })) {
    errors.passwordConfirm = valErrs.length(8)
    valid = false
  } else if (testData.password !== testData.passwordConfirm) {
    // validate passwordConfirm -> must match password
    errors.passwordConfirm = valErrs.passwords
    valid = false
  }

  return { errors, valid }
}
