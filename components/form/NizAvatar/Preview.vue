<template>
  <div
    :style="`background-image:url(${generateImagePreview(image)})`"
  />
</template>

<script>
export default {
  props: {
    image: {
      required: false,
      type: File,
      default: null
    }
  },
  methods: {
    generateImagePreview (image) {
      return URL.createObjectURL(image)
    }
  }
}
</script>
