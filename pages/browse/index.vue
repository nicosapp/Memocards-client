<template>
  <div>
    <PageTitle title="Browse" />
    <div class="lg:w-11/12 mx-3 lg:mx-auto mt-16 flex">
      <div class="lg:w-8/12 xl:w-9/12 w-full">
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
      <transition name="slide">
        <div
          v-show="panelOpen || showSideNav"
          class="fixed top-0 left-0 bottom-0 w-full bg-gray-300 lg:relative lg:w-4/12 xl:w-3/12 lg:ml-3"
        >
          <div
            class="m-4 lg:hidden"
            @click.prevent="panelOpen = !panelOpen"
          >
            <IconArrowNarrowRight class="text-gray-600 stroke-2 h-5 w-5" />
          </div>
          <CategoryFilterWidget
            ref="categoryFilter"
            @filter="filter"
          />
          <TagFilterWidget
            ref="tagFilter"
            @filter="filter"
          />
        </div>
      </transition>

      <div
        class="lg:hidden fixed right-0 bg-gray-400 rounded-l-lg flex items-center shadow-lg justify-center h-10 w-8"
        style="top:50%"
        :class="{'hidden':panelOpen}"
        @click.prevent="panelOpen = !panelOpen"
      >
        <IconDotsVertical class="text-gray-700 stroke-2 h-5 w-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { posts as skeletonPosts } from '@/mixins/skeletons'
import PostCardDashboard from '@/components/posts/PostCardDashboard'
import { ObserveVisibility } from 'vue-observe-visibility'
import breakpoints from '@/plugins/breakpoints'

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
      breakpoints,
      posts: [],
      loading: true,
      panelOpen: false,
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
    },
    showSideNav () {
      return ['lg', 'xl'].includes(this.breakpoints.is)
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

<style scoped>
.slide-enter-active{
  animation: slideInRight 250ms linear;
}
.slide-leave-active{
  animation: slideOutRight 250ms linear;
}
</style>
