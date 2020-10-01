<template>
  <div class="lg:w-11/12 lg:mx-auto mx-3 mt-10 lg:flex">
    <div class="lg:w-8/12 xl:w-9/12 w-full mb-6">
      <input
        v-model="post.post_title"
        type="text"
        class="text-4xl text-text-primary bg-bg-light font-medium font-header mb-4 w-full block py-2 px-4 border-0 rounded"
        value="Page title"
        placeholder="Page title"
      >
      <div class="mb-6 flex items-center justify-between">
        <div class="text-text-primary text-sm ">
          <template v-if="lastSaved">
            Last saved at {{ lastSavedFormatted }}
          </template>
          <template v-else>
            {{ $t('No changes saved in this session yet') }}
          </template>
        </div>
        <div>
          <nuxt-link
            :to="{
              name:'posts-id',
              params:{
                id:post.uuid
              }
            }"
            class="mr-3 font-semibold text-sm"
          >
            View
          </nuxt-link>
        </div>
      </div>

      <transition name="slide">
        <div class="flex justify-center">
          <div
            v-show="!panelOpen"
            class="w-full"
          >
            <TinyEditor
              v-model="post.post_content"
              :body="post.post_content || ''"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- SLIDER LEFT  -->
    <transition name="slide-left">
      <div
        v-show="panelLeftOpen"
        class="fixed lg-w-5/12 md:w-8/12 z-50 w-full left-0 top-0 bottom-0 bg-gray-200 border-gray-400 md:border-r-2"
      >
        <div class="w-full h-full">
          <MediaManager>
            <template slot="icon-right">
              <div
                class="flex justify-end cursor-pointer"
                @click.prevent="panelLeftOpen = !panelLeftOpen"
              >
                <IconArrowNarrowLeft class="text-gray-600 stroke-2 h-5 w-5" />
              </div>
            </template>
          </MediaManager>
        </div>
      </div>
    </transition>
    <div
      class="fixed z-50 left-0 bg-gray-400 cursor-pointer rounded-r-lg flex items-center shadow-lg justify-center h-10 w-8"
      style="top:50%"
      :class="{'hidden':panelLeftOpen}"
      @click.prevent="panelLeftOpen = !panelLeftOpen"
    >
      <IconPhotograph class="text-gray-700 stroke-2 h-5 w-5" />
    </div>
    <!-- SLIDER RIGHT -->
    <transition name="slide">
      <div
        v-show="panelOpen || showSideNav"
        class="lg:w-4/12 xl:w-3/12 w-full fixed lg:static top-0 bottom-0 right-0 bg-gray-200 lg:bg-transparent"
      >
        <div
          class="m-4 lg:hidden cursor-pointer"
          @click.prevent="panelOpen = !panelOpen"
        >
          <IconArrowNarrowRight class="text-gray-600 stroke-2 h-5 w-5" />
        </div>
        <CategoryLinkWidget
          :post="post"
        />
        <TagLinkWidget
          :post="post"
        />
      </div>
    </transition>
    <div
      class="lg:hidden fixed z-50 right-0 bg-gray-400 cursor-pointer rounded-l-lg flex items-center shadow-lg justify-center h-10 w-8"
      style="top:50%"
      :class="{'hidden':panelOpen}"
      @click.prevent="panelOpen = !panelOpen"
    >
      <IconDotsVertical class="text-gray-700 stroke-2 h-5 w-4" />
    </div>
  </div>
</template>

<script>

import { debounce as _debounce } from 'lodash'
import moment from 'moment'
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
      panelOpen: false,
      panelLeftOpen: false
    }
  },

  computed: {
    lastSavedFormatted () {
      return moment(this.lastSaved).format('HH:mm:ss')
    },
    showSideNav () {
      return ['lg', 'xl'].includes(this.breakpoints.is)
    }
  },

  watch: {
    'post.post_title': {
      handler: _debounce(async function (title) {
        await this.$axios.$patch(`me/posts/${this.post.uuid}`, {
          post_title: title
        })

        this.touchLastSaved()
      }, 500)
    },

    'post.post_content': {
      handler: _debounce(async function (content) {
        await this.$axios.$patch(`me/posts/${this.post.uuid}`, {
          post_content: content
        })

        this.touchLastSaved()
      }, 500)
    }
  },

  methods: {
    touchLastSaved () {
      this.lastSaved = moment.now()
    }
  },

  head () {
    return {
      title: `Editing ${this.post.post_title || 'Untitled page'}`
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
.slide-left-enter-active{
  animation: slideInLeft 250ms linear;
}
.slide-left-leave-active{
  animation: slideOutLeft 250ms linear;
}
</style>
