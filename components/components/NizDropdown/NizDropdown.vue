<template>
  <div v-click-outside="close" class="relative">
    <div
      class="niz-transition-default flex justify-center items-center py-3 px-4 rounded-lg hover:bg-bg-light"
      @click.prevent="open = !open"
    >
      <slot name="trigger" />
      <div class="text-text-primary">
        <IconChevronDown
          class="w-5 h-5 ml-3 stroke-current stroke-2"
          :class="{'hidden':!open}"
        />
        <IconChevronUp
          class="w-5 h-5 ml-3 stroke-current stroke-2"
          :class="{'hidden':open}"
        />
      </div>
    </div>
    <div
      v-show="open"
      class="absolute right-0 bg-bg z-50 rounded-lg w-56 overflow-hidden font-bold border border-bg-light"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    close () {
      this.open = false
    }
  }
}
</script>
