import { cloneDeep } from 'lodash'
import validator from 'validator'

import { validationErrs } from '../../../globals/errors'
import BookModel from '../../../models/book'

export function validate (data) {
  let valid = true
  let testData = cloneDeep(data)
  let errors = BookModel.emptyErrors()

  // validate title -> required
  if (validator.isEmpty(testData.title)) {
    errors.title = validationErrs.required
    valid = false
  }

  // validate authorId -> required
  if (validator.isEmpty(testData.authorId.toString()) ||
      testData.authorId < 0) {
    errors.author = validationErrs.required
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

  // compare 'title' prop
  if ((a.title.trim() !== b.title.trim())) {
    match = false
  }

  // compare 'authorId' prop
  if ((Number(a.authorId) !== Number(b.authorId))) {
    match = false
  }

  return match
}
