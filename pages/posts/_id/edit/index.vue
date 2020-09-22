<template>
  <div class="lg:w-11/12 mx-auto mt-16 flex flex-wrap lg:flex-no-wrap">
    <div class="lg:w-9/12 w-12/12 mb-6">
      <input
        v-model="post.post_title"
        type="text"
        class="text-4xl text-gray-700 font-medium font-header mb-4 w-full block py-2 px-4 border-0 rounded"
        value="Page title"
        placeholder="Page title"
      >
      <div class="mb-6 text-gray-600">
        <template v-if="lastSaved">
          Last saved at {{ lastSavedFormatted }}
        </template>
        <template v-else>
          No changes saved in this session yet
        </template>
      </div>

      <div class="flex justify-center">
        <div class="w-full">
          <TinyEditor
            v-model="post.post_content"
            :body="post.post_content || ''"
          />
        </div>
      </div>
    </div>
    <div class="lg:w-3/12">
      <CategoryLinkWidget
        :post="post"
      />
      <TagLinkWidget
        :post="post"
      />
    </div>
  </div>
</template>

<script>

import { debounce as _debounce } from 'lodash'
import moment from 'moment'

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
      lastSaved: null
    }
  },

  computed: {
    lastSavedFormatted () {
      return moment(this.lastSaved).format('HH:mm:ss')
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
