<template>
  <svg :width="length" :height="length" :viewBox="`0 0 ${length} ${length}`" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd" stroke-width="2">
      <circle :cx="half" :cy="half" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          :values="`1; ${half-5}`"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle :cx="half" :cy="half" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          :values="`1; ${half-5}`"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    length: {
      type: Number,
      required: false,
      default: 44
    }
  },
  computed: {
    half () {
      return this.length / 2
    }
  }
}
</script>
