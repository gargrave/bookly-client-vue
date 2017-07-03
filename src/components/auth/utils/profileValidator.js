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
  if ((a.firstName.trim() !== b.firstName.trim())) {
    match = false
  }

  // compare 'lastName' prop
  if ((a.lastName.trim() !== b.lastName.trim())) {
    match = false
  }

  return match
}
