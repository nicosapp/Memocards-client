<template>
  <div class="fixed bottom-0 left-0 w-full bg-bg" style="box-shadow:0px -1px 3px lightgray">
    <div class="flex items-center h-12 text-gray-600">
      <div class="button">
        <nuxt-link :to="{name:'search'}" class="text-gray-600">
          <IconSearch
            class="w-6 h-6"
          />
        </nuxt-link>
      </div>
      <div class="button" @click="createPost">
        <IconPlus
          class="w-8 h-8"
        />
      </div>
      <div class="button">
        <nuxt-link :to="{name:'browse'}" class="text-gray-600">
          <IconFilter class="w-8 h-8" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    async createPost () {
      const post = await this.$axios.$post('me/posts')

      this.$router.push({
        name: 'posts-id-edit',
        params: {
          id: post.data.uuid
        }
      })
    }
  }
}
</script>
<style scoped>
.button{
  @apply w-4/12 flex items-center justify-center;
}
</style>
