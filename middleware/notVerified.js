export default function ({ app, redirect, route }) {
  if (app.$auth.user.verified) {
    return redirect({
      name: 'dashboard'
    })
  }
}
