<template>
  <label class="mx-3">
    <NizIcon>
      <IconPhotograph class="h-6 w-6  stroke-2" />
    </NizIcon>
    <input
      type="file"
      class="hidden"
      multiple
      @change="handleMediaSelected($event.target.files)"
    >
  </label>
</template>

<script>
export default {
  props: {
    mediaTypes: {
      required: true,
      type: [Array, Object]
    },
    maxSize: {
      required: false,
      type: Number,
      default: 2000000
    }
  },
  data () {
    return {
      media: {
        images: [],
        video: null,
        pdf: null
      }
    }
  },
  computed: {
    readableMaxSize () {
      return Math.round(this.maxSize / 1000000).toString() + 'Mo'
    }
  },
  methods: {
    handleMediaSelected (files) {
      const _files = Array.from(files).slice(0, 4)
      for (let i = 0; i < _files.length; i++) {
        const file = _files[i]
        if (file.size > this.maxSize) {
          this.$notifyWarn({
            title: this.$t('Warn'),
            text: this.$t(`One of the file sizes is too big (max size: ${this.readableMaxSize})`)
          })
        }

        if (this.mediaTypes.image.includes(file.type)) {
          this.media.images.push(file)
        } else if (this.mediaTypes.video.includes(file.type)) {
          this.media.video = file
          this.media.images = []
          break
        } else if (this.mediaTypes.pdf.includes(file.type)) {
          this.media.pdf = file
          this.media.images = []
          break
        }
      }
      this.upload()
    },

    buildMediaForm () {
      const form = new FormData()
      if (this.media.images.length) {
        this.media.images.forEach((image, index) => form.append(`media[${index}]`, image))
      }
      if (this.media.video) {
        form.append('media[0]', this.media.video)
      }
      if (this.media.pdf) {
        form.append('media[0]', this.media.pdf)
      }
      this.$emit('startupload', this.media.images.length || 1)
      return form
    },

    async upload (file) {
      try {
        const response = await this.$axios.post('me/medias', this.buildMediaForm(), {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: this.handleUploadProgress
        })
        this.$emit('uploaded', response.data.data)
        this.$notifySuccess({
          text: this.$t('Medias uploaded')
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.$notify({
            title: 'Error',
            text: e.response.data.message
          })
        }
      }
    },

    handleUploadProgress (event) {
      this.progress = parseInt(Math.round(event.loaded / event.total) * 100)
    }
  }
}
</script>
