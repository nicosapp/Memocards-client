<template>
  <div>
    <PageTitle
      :title="post.post_title"
    >
      <div class="flex justify-between">
        <div class="text-gray-500">
          <div class="flex items-center justify-start mb-3">
            <IconBookmark class="h-6 w-6 stroke-current  mr-2" />
            <template v-if="post.categories.length">
              <div
                v-for="(category, index) in post.categories"
                :key="category.id"
              >
                {{ category.name }}
                <span
                  v-if="(index !== post.categories.length-1)"
                  class="mx-2 font-bold"
                > / </span>
              </div>
            </template>
            <template v-else>
              No categories
            </template>
          </div>
          <div class="flex items-center justify-start">
            <IconTag class="h-6 w-6 stroke-current  mr-2" />
            <template v-if="post.tags.length">
              <NizChip
                v-for="tag in post.tags"
                :key="tag.id"
                class="opacity-75 transform scale-75 -m-2"
              >
                {{ tag.name }}
              </NizChip>
            </template>
            <template v-else>
              No tags
            </template>
          </div>
        </div>
        <div class="flex justify-end items-center">
          <div
            class="mr-2 cursor-pointer"
            @click.prevent="favorite"
          >
            <IconStar
              class="stroke-current h-8 w-8 text-gray-500"
              :class="{'fill-current':post.is_favorite}"
            />
          </div>
          <nuxt-link
            :to="{
              name:'posts-id-edit',
              params:{
                id: post.uuid
              }
            }"
            class="block flex items-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 niz-transition-default py-2 px-4"
          >
            <IconPencilAlt class="mr-2 stroke-current" />Edit
          </nuxt-link>
        </div>
      </div>
    </PageTitle>
    <div class="mx-3 lg:mx-8 xl:mx-16 flex">
      <div class="lg:w-8/12 xl:w-9/12 w-full min-h-screen bg-bg-light text-text-primary p-4 rounded-lg">
        <div v-html="post.post_content" />
      </div>
      <transition name="slide">
        <div
          v-show="panelOpen || showSideNav"
          class="lg:w-4/12 xl:3/12 lg:mx-5 px-3 w-full fixed lg:static top-0 bottom-0 right-0 bg-bg lg:bg-transparent"
        >
          <div
            class="m-4 lg:hidden"
            @click.prevent="panelOpen = !panelOpen"
          >
            <IconArrowNarrowRight class="text-gray-600 stroke-2 h-5 w-5" />
          </div>
          <TableOfContent
            :post-content="post.post_content"
          />
        </div>
      </transition>
    </div>
    <div
      class="lg:hidden fixed z-50 right-0 bg-gray-400  rounded-l-lg flex items-center shadow-lg justify-center h-10 w-8"
      style="top:50%"
      :class="{'hidden':panelOpen}"
      @click.prevent="panelOpen = !panelOpen"
    >
      <IconDotsVertical class="text-gray-700 stroke-2 h-5 w-4" />
    </div>
  </div>
</template>

<script>
import breakpoints from '@/plugins/breakpoints'

export default {
  async asyncData ({ app, params }) {
    const post = await app.$axios.$get(`me/posts/${params.id}`)

    return {
      post: post.data
    }
  },
  data () {
    return {
      post: null,
      lastSaved: null,
      breakpoints,
      panelOpen: false

    }
  },
  computed: {
    showSideNav () {
      return ['lg', 'xl'].includes(this.breakpoints.is)
    }
  },
  methods: {
    async favorite () {
      this.post.is_favorite = !this.post.is_favorite
      await this.$axios.$patch(`me/posts/${this.post.uuid}`, {
        is_favorite: this.post.is_favorite
      })
    }
  },
  head () {
    return {
      title: 'Post'
    }
  }
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
