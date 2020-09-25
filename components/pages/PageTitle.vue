<template>
  <div class="bg-bg-light mb-10">
    <div class="container pt-10 pb-16">
      <h1 class="text-4xl text-text-primary font-medium leading-tight mb-4">
        {{ title }}
      </h1>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    }
  }
}
</script>
