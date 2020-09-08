<template>
  <div>
    <PageTitle
      title="Browse"
    />
    <div class="container">
      <h1 class="text-xl text-gray-600 font-medium mb-6">
        All pages ({{ posts.length }})
      </h1>

      <div
        v-for="post in posts"
        :key="post.uuid"
        class="flex flex-wrap lg:flex-no-wrap justify-between items-center bg-white rounded-lg w-full"
      >
        {{ post.post_title }}
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/pages/PageTitle'

export default {
  components: {
    PageTitle
  },

  async asyncData ({ app }) {
    // const posts = await app.$axios.$get('posts')

    // return {
    //   posts: posts.data
    // }
  },

  data () {
    return {
      posts: []
    }
  },

  head () {
    return {
      title: 'Browse'
    }
  }
}
</script>
