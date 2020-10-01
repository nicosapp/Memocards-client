<template>
  <div>
    <h2 class="font-medium text-2xl text-text">
      Most viewed
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
        :key="'mostviewed-'+index"
      >
        <nuxt-link
          :to="{
            name:'posts-id',
            params:{id:post.uuid}
          }"
        >
          {{ post.post_title }} <span class="text-sm italic text-gray-500">{{ viewed(post) }}</span>
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
    const response = await this.$axios.$get('me/dashboard/mostViewed')
    this.posts = response.data
    this.loading = false
  },
  methods: {
    viewed (post) {
      return post.viewed ? `viewed ${post.viewed} times` : ''
    }
  }
}
</script>
