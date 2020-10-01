<template>
  <div>
    <PageTitle
      title="Search"
    >
      <div class="flex items-center border-2 border-gray-400 rounded-lg p-4 text-large mb-4">
        <div>
          <IconSearch class="h-8 w-8 stroke-current text-gray-600" />
        </div>
        <input
          v-model="searchText"
          type="text"
          class="w-full block outline-none text-xl text-gray-700 bg-transparent font-medium px-4"
          placehoder="Search Post"
          @input.prevent="search"
        >
        <div v-if="loading">
          <IconSpinner class="h-8 w-8 stroke-current text-gray-600" />
        </div>
      </div>
      <h1 class="text-xl text-gray-600 font-medium mb-6">
        <template v-if="total">
          All Posts ({{ total }})
        </template>
        <template v-else>
          No results found for this request!
        </template>
      </h1>
    </PageTitle>

    <div class="container">
      <template>
        <PostCardBrowse
          v-for="post in posts"
          :key="post.uuid"
          :post="post"
          :loading="false"
        />
      </template>

      <template v-if="loading">
        <PostCardBrowse
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
  </div>
</template>

<script>
import PageTitle from '@/components/pages/PageTitle'
import { posts as skeletonPosts } from '@/mixins/skeletons'
import { debounce as _debounce } from 'lodash'
import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  components: {
    PageTitle
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

  middleware: ['verified'],

  data () {
    return {
      searchText: '',
      skeletons: skeletonPosts(5),
      posts: [],
      loading: true,
      total: 0,
      current_page: 1,
      last_page: 1
    }
  },
  computed: {
    urlWithPage () {
      return `me/posts?search=${this.searchText}&page=${this.current_page}`
    }
  },
  methods: {
    search: _debounce(function () {
      this.current_page = 1
      this.loadPosts({ reset: true })
    }, 500),

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
      title: 'Search'
    }
  }
}
</script>
