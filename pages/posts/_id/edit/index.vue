<template>
  <div>
    <div class="container m-10 p-10">
      <input
        v-model="post.post_title"
        type="text"
        class="text-4xl text-gray-700 font-medium font-header mb-4 w-full block p-2 border-0 rounded"
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
      <textarea
        id=""
        v-model="post.post_content"
        name=""
        cols="30"
        rows="10"
        class="w-full p-6 mb-6"
      >Some text</textarea>
    </div>
  </div>
</template>

<script>

import { debounce as _debounce } from 'lodash'
import moment from 'moment'

export default {
  async asyncData ({ app, params }) {
    const post = await app.$axios.$get(`posts/${params.id}`)

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
        await this.$axios.$patch(`posts/${this.post.uuid}`, {
          post_title: title
        })

        this.touchLastSaved()
      }, 500)
    },

    'post.post_content': {
      handler: _debounce(async function (content) {
        await this.$axios.$patch(`posts/${this.post.uuid}`, {
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
