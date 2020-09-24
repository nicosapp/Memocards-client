import { get as _get } from 'lodash'

export default function ({ $axios, redirect, app, store }) {
  $axios.onError((error) => {
    // console.log(error)
    if (_get(error, 'response.status', 500) === 500) {
      redirect('/sorry')
      // app.notifyError({ title: 'Server error', text: 'There is a server internal error' })
    }
  })
}
