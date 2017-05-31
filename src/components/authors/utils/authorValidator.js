import { cloneDeep } from 'lodash'
import validator from 'validator'

import { valErrs } from '../../../globals/errors'
import AuthorModel from '../../../models/author'

export function validate (data) {
  let valid = true
  let testData = cloneDeep(data)
  let errors = AuthorModel.empty()

  // validate firstName -> required
  if (validator.isEmpty(testData.firstName)) {
    errors.firstName = valErrs.required
    valid = false
  }

  // validate lastName -> required
  if (validator.isEmpty(testData.lastName)) {
    errors.lastName = valErrs.required
    valid = false
  }

  return { valid, errors }
}

export function areEqual (a, b) {
  if (!a || !b) {
    return false
  }
  let match = true

  // compare 'id' prop
  if ((a.id && b.id) && (Number(a.id) !== Number(b.id))) {
    match = false
  }

  // compare 'firstName' prop
  if ((a.title.firstName() !== b.title.firstName())) {
    match = false
  }

  // compare 'lastName' prop
  if ((a.title.lastName() !== b.title.lastName())) {
    match = false
  }

  return match
}
