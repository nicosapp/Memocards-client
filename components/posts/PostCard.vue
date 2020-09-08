<template>
  <div
    class="flex flex-wrap lg:flex-no-wrap justify-between items-center
    w-full bg-white rounded-lg mb-2 p-8"
  >
    <div>
      <h1>
        <nuxt-link
          class="text-gray-600"
          :to="{
            name: 'posts-id',
            params:{
              id:post.uuid
            }
          }"
        >
          {{ post.post_title || 'Untitled page' }}
        </nuxt-link>
      </h1>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  }
}
</script>
