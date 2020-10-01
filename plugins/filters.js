import Vue from 'vue'

Vue.filter('capitalize', (val) => {
  if (!val) { return '' }
  return val.charAt(0).toUpperCase() + val.slice(1)
})

Vue.filter('read-more', (val) => {
  if (!val) { return '' }
  return val.substring(0, 120) + '...'
})
