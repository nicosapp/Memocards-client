<template>
  <div>
    <div class="flex justify-center">
      <input
        :id="id"
        ref="fileupload"
        type="file"
        class="hidden"
        @change="change($event.target.files)"
      >
      <label :for="id" class="cursor-pointer mb-6">
        <div
          v-if="file"
          class="relative"
        >
          <!-- <UploadProgress
            v-if="progress!=100"
            class="absolute"
            :height="height"
          /> -->
          <Preview
            :image="file"
            class="h-40 w-40 rounded-full bg-cover bg-center"
          />
        </div>

        <template v-else-if="url">
          <div
            :style="`background-image:url(${url})`"
            class="h-40 w-40 rounded-full bg-cover bg-center"
          />
        </template>

        <template v-else>
          <img
            :height="height"
            :width="width"
            class="rounded-full"
            :src="`http://www.gravatar.com/avatar/?d=mp`"
          >
        </template>
      </label>
    </div>
    <div
      v-if="formatError"
      class="text-sm text-gray-600"
    >
      This image type is not accepted, please use the following ({{ imageTypes }})
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String
    },
    mimetypes: {
      required: true,
      type: Array
    },
    maxSize: {
      required: false,
      type: Number,
      default: 2000000
    },
    url: {
      required: false,
      type: String,
      default: null
    },
    height: {
      default: 150,
      type: Number
    },
    width: {
      default: 150,
      type: Number
    },
    progress: {
      required: false,
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      file: null,
      formatError: false
    }
  },
  computed: {
    imageTypes () {
      return this.mimetypes.map(type => type.split('/')[1]).join(', ')
    },
    readableMaxSize () {
      return Math.round(this.maxSize / 1000000).toString() + 'Mo'
    }
  },
  methods: {
    change (files) {
      if (!files[0]) {
        return
      }
      const file = files[0]
      if (file.size > this.maxSize) {
        this.$refs.fileupload.value = null
        this.$notifyWarn({
          title: 'File size',
          text: `The file size too large. The maximum is ${this.readableMaxSize}!`
        })
      } else if (this.mimetypes.includes(file.type)) {
        this.file = file
        this.$emit('selected', this.file)
        this.formatError = false
      } else {
        this.formatError = true
      }
    }
  }

}
</script>
