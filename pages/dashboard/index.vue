<template>
  <div class="container mt-16">
    <div class="flex justify-between">
      <h1 class="text-xl text-gray-600 font-medium mb-6">
        Your pages (1)
      </h1>

      <a href="#" class="font-medium" @click.prevent="createPost">+ Create a page</a>
    </div>

    <div v-if="posts.length===0" calss="text-gray-500 font-medium">
      There are no pages here. You know what to do.
    </div>

    <PostCardDashboard
      v-for="post in posts"
      :key="post.uuid"
      :post="post"
      @deleted="removePost"
    />
  </div>
</template>

<script>
import PostCardDashboard from '@/components/posts/PostCardDashboard'

export default {
  components: {
    PostCardDashboard
  },
  async asyncData ({ app }) {
    const posts = await app.$axios.$get('/me/posts')

    return {
      posts: posts.data
    }
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    async createPost () {
      const post = await this.$axios.$post('posts')

      this.$router.push({
        name: 'posts-id-edit',
        params: {
          id: post.data.uuid
        }
      })
    },
    removePost (post) {
      this.posts = this.posts.filter(p => p.uuid !== post.uuid)
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
