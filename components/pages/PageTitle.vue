<template>
  <div class="bg-white mb-10">
    <div class="container pt-10 pb-16">
      <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
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
