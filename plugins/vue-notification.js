import Vue from 'vue'
import Notifications from 'vue-notification'

Vue.use(Notifications)

export default ({ app }, inject) => {
  inject('notifyError', (params) => {
    const custom = {
      group: 'app',
      type: 'error',
      duration: -1
    }
    Vue.notify({ ...params, ...custom })
  })

  inject('notifySuccess', (params) => {
    const custom = {
      group: 'app',
      type: 'success',
      duration: 2000
    }
    Vue.notify({ ...params, ...custom })
  })

  inject('notifyWarn', (params) => {
    const custom = {
      group: 'app',
      type: 'warn',
      duration: -1
    }
    Vue.notify({ ...params, ...custom })
  })
}
