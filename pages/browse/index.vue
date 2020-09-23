<template>
  <div class="lg:w-11/12 mx-auto mt-16 flex">
    <div class="w-9/12">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl text-gray-600 font-medium">
          Your pages (1)
        </h1>
        <div class="flex justify-center items-center font-medium">
          <nuxt-link
            :to="{ name:'categories'}"
            class="block flex items-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 niz-transition-default py-2 px-4"
          >
            <IconBookmark class="mr-2 stroke-current" />Category
          </nuxt-link>

          <nuxt-link
            :to="{ name:'tags'}"
            class="ml-4 block flex items-center rounded-lg py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 niz-transition-default"
          >
            <IconTag class="mr-2 stroke-current" />Tag
          </nuxt-link>
        </div>
        <a href="#" class="font-medium" @click.prevent="createPost">+ Create a page</a>
      </div>
      <div v-if="posts.length===0 && !loading" class="text-gray-500 font-medium">
        No results found for this request!
      </div>

      <PostCardDashboard
        v-for="post in posts"
        :key="post.uuid"
        :post="post"
        @deleted="removePost"
      />

      <template v-if="loading">
        <PostCardDashboard
          v-for="post in skeletons"
          :key="post.uuid"
          :post="post"
          :loading="true"
        />
      </template>

      <div
        v-if="posts.length && !loading"
        v-observe-visibility="handleScolledToBottomOfPosts"
      />
    </div>
    <!-- Panel Right -->
    <div class="w-3/12 ml-3">
      <CategoryFilterWidget
        ref="categoryFilter"
        @filter="filter"
      />
      <TagFilterWidget
        ref="tagFilter"
        @filter="filter"
      />
    </div>
  </div>
</template>

<script>
import { posts as skeletonPosts } from '@/mixins/skeletons'
import PostCardDashboard from '@/components/posts/PostCardDashboard'
import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  components: {
    PostCardDashboard
  },
  directives: {
    ObserveVisibility
  },
  async asyncData ({ app }) {
    const response = await app.$axios.$get('/me/posts')

    return {
      posts: response.data,
      loading: false,
      last_page: response.meta.last_page,
      total: response.meta.total
    }
  },
  data () {
    return {
      skeletons: skeletonPosts(3),
      posts: [],
      loading: true,
      total: 0,
      current_page: 1,
      last_page: 1,
      scope: {
        category: '',
        tag: ''
      }
    }
  },
  computed: {
    urlWithPage () {
      return `me/posts?category=${this.scope.category}&tag=${this.scope.tag}&page=${this.current_page}`
    }
  },
  methods: {
    async createPost () {
      const post = await this.$axios.$post('me/posts')

      this.$router.push({
        name: 'posts-id-edit',
        params: {
          id: post.data.uuid
        }
      })
    },
    removePost (post) {
      this.posts = this.posts.filter(p => p.uuid !== post.uuid)
    },

    filter () {
      this.scope.tag = this.$refs.tagFilter.ids.join(',')
      this.scope.category = this.$refs.categoryFilter.ids.join(',')

      this.current_page = 1
      this.posts = []
      this.loadPosts({ reset: true })
    },

    _loading (step) {
      this.loading = step
    },

    async loadPosts ({ reset }) {
      this._loading(true)

      const response = await this.$axios.$get(this.urlWithPage)
      if (reset) {
        this.posts = []
      }
      this.posts = [...this.posts, ...response.data]
      this.last_page = response.meta.last_page
      this.total = response.meta.total

      this._loading(false)
    },

    handleScolledToBottomOfPosts (isVisible) {
      if (!isVisible) { return }
      if (this.current_page === this.last_page) { return }

      this.current_page++

      this.loadPosts({ reset: false })
    }
  },
  head () {
    return {
      title: 'Browse'
    }
  },

  middleware: ['verified']
}
</script>
