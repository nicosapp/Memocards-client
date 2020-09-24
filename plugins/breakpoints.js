import Vue from 'vue'

import { throttle as _throttle } from 'lodash'

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}

const sm = val => val >= screens.sm && val <= screens.md
const md = val => val >= screens.md && val <= screens.lg
const lg = val => val >= screens.lg && val <= screens.xl
const xl = val => val >= screens.xl

const getBreakpoint = (w) => {
  if (sm(w)) { return 'sm' } else if (md(w)) { return 'md' } else if (lg(w)) { return 'lg' } else if (xl(w)) { return 'xl' } else { return 'all' }
}

const breakpoints = Vue.observable({
  w: window.innerWidth,
  h: window.innerHeight,
  is: getBreakpoint(window.innerWidth)
})

window.addEventListener(
  'resize',
  _throttle(() => {
    breakpoints.w = window.innerWidth
    breakpoints.h = window.innerHeight
    breakpoints.is = getBreakpoint(window.innerWidth)
  }, 200, false, true),
  false
)

export default breakpoints
