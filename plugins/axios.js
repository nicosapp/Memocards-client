export default function ({ $axios, redirect, app, store }) {
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/sorry')
      // app.notifyError({ title: 'Server error', text: 'There is a server internal error' })
    }
  })
}
