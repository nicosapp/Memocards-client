<template>
  <!-- <NizUpload /> -->
  <div class="p-4 flex flex-col h-full">
    <div class="flex justify-start items-center mb-3">
      <input
        v-model="searchText"
        type="text"
        class="border border-gray-400 w-full rounded py-1 px-3 text-gray-700 outline-none"
      >
      <MediaUploadButton
        :media-types="mediaTypes"
        @uploaded="uploaded"
        @startupload="startupload"
      />
      <slot name="icon-right" />
    </div>
    <div class="font-header font-medium text-sm text-gray-600">
      Medias ({{ total }})
    </div>
    <div class="overflow-y-scroll flex-grow mb-4">
      <div
        class="flex justify-start w-full flex-wrap"
      >
        <MediaItem
          v-for="media in medias"
          :key="media.id"
          :media="media"
          @remove="remove"
        />
      </div>
      <div
        v-if="showLoadMore"
        class="flex justify-center mt-2"
      >
        <NizButtonSubmit
          type="button"
          value="Load more"
          @click="loadMore()"
        />
      </div>
    </div>
    <!-- LOADER -->
    <div
      v-if="loading"
      class="absolute top-0 left-0 bottom-0 w-full flex justify-center items-center
        bg-gray-200 opacity-50"
    >
      <LoaderPuff
        :length="100"
        class="stroke-current text-gray-500"
      />
    </div>
  </div>
</template>

<script>
import { debounce as _debounce } from 'lodash'

export default {
  data () {
    return {
      searchText: '',
      medias: [],
      loading: true,
      mediaTypes: [],
      total: 0,
      current_page: 1,
      last_page: 1
    }
  },

  computed: {
    urlWithPage () {
      return `me/medias?search=${this.searchText}&page=${this.current_page}`
    },
    showLoadMore () {
      return this.current_page < this.last_page
    }
  },

  watch: {
    searchText: {
      handler: _debounce(function () {
        this.current_page = 1
        this.loadMedias({ reset: true })
      }, 700)
    }
  },
  mounted () {
    this.getMediaTypes()

    this.loadMedias({ reset: false })
  },

  methods: {
    remove (id) {
      this.medias = this.medias.filter(media => media.id !== id)
      this.total--
    },

    startupload (count) {
      const skeletons = new Array(count).fill({}).map(
        (o, index) => ({ id: 'media' + index, skeleton: true })
      )
      this.medias = [...skeletons, ...this.medias]
    },

    uploaded (medias) {
      this.medias = [...medias, ...this.medias.filter(media => !media.skeleton)]
    },
    loadMore () {
      this.current_page++
      this.loadMedias({ reset: false })
    },
    async loadMedias ({ reset }) {
      this._loading(true)
      const response = await this.$axios.$get(this.urlWithPage)
      if (reset) {
        this.medias = []
      }
      this.medias = [...this.medias, ...response.data]
      this.last_page = response.meta.last_page
      this.total = response.meta.total

      this._loading(false)
    },

    async getMediaTypes () {
      const response = await this.$axios.$get('media/types')

      this.mediaTypes = response.data
    },

    _loading (step) {
      this.loading = step
    }

  }
}
</script>
