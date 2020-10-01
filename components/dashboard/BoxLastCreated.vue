<template>
  <div>
    <h2 class="font-medium text-2xl text-text">
      Last created
    </h2>
    <div v-if="loading" class="flex justify-center items-center h-40">
      <LoaderPuff
        :length="100"
        class="stroke-current text-gray-500"
      />
    </div>

    <ul v-else class="list-disc pl-6">
      <li
        v-for="(post,index) in posts"
        :key="'lastcreated-'+index"
      >
        <nuxt-link
          :to="{
            name:'posts-id',
            params:{id:post.uuid}
          }"
        >
          {{ post.post_title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      loading: true
    }
  },
  async mounted () {
    const response = await this.$axios.$get('me/dashboard/lastCreated')
    this.posts = response.data
    this.loading = false
  }
}
</script>
