<template>
  <div>
    <div class=" bg-gray-500 bg-opacity-50 absolute w-full h-full rounded-full" />
    <svg
      style="transform: rotate(-90deg)"
      :height="height"
      :width="height"
    >
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        class="stroke-current text-gray-200"
      />
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        class="stroke-current text-blue-500"
        :stroke-dasharray="dash"
        :stroke-dashoffset="offset"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      required: true,
      type: Number
    },
    progress: {
      required: true,
      type: Number
    }
  },

  computed: {
    center () {
      return this.height / 2
    },

    dash () {
      return 2 * Math.PI * this.radius
    },

    offset () {
      const circ = this.dash
      const progress = this.progress / 100

      return circ * (1 - progress)
    },
    radius () {
      return parseInt(this.center * 0.5)
    },
    strokeWidth () {
      return parseInt(this.center / 10)
    }
  }
}
</script>
