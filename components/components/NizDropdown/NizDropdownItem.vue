<template>
  <a
    href="#"
    class="block py-3 px-4 text-text-primary hover:bg-bg-light niz-transition-default"
    @click.prevent="handleClick"
  >
    <slot />
  </a>
</template>
<script>
export default {
  methods: {
    handleClick (e) {
      this.$emit('click', e)
      this.$parent.close()
    }
  }
}
</script>
