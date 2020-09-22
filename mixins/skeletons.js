export function posts (number) {
  return new Array(number).fill({}).map((o, index) => ({ uuid: `post-${index}` }))
}

export function chips (number, prefixId) {
  prefixId = prefixId || 'chip-'
  return new Array(number).fill({}).map((o, index) => ({ id: prefixId + index }))
}

export function randomString (min, max) {
  const length = parseInt(Math.random() * min) + (max - min)
  return Math.random().toString(36).substring(length)
}
