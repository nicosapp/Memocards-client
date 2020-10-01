<template>
  <div
    class="cursor-pointer text-gray-600 hover:text-gray-700"
    @click="click"
  >
    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>
