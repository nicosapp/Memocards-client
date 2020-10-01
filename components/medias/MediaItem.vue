<template>
  <div class=" p-2 lg:w-4/12 md:w-6/12 w-12/12">
    <div class="bg-white relative rounded p-2">
      <NizIcon
        class="absolute top-0 left-0 m-2"
        @click="copyToClipboard"
      >
        <IconLink class="stroke-2 h-5 w-5" />
      </NizIcon>
      <NizIcon
        class="absolute top-0 right-0 m-2 bg-gray-600 hover:bg-gray-700 rounded-full"
        @click="remove"
      >
        <IconTimes class="text-white stroke-2 h-5 w-5" />
      </NizIcon>
      <div
        class="block bg-cover bg-center bg-contain bg-no-repeat h-32 w-32 mx-auto"
        :style="`background-image:url(${media.url})`"
      />
      <div class="text-sm text-gray-600 flex justify-start items-center mt-2 fileName">
        <div
          v-if="!edit"
          class="flex-grow py-1 px-2 truncate cursor-pointer"
        >
          {{ media.name || 'No name' }}
        </div>
        <div
          v-if="edit"
          class="flex-grow"
        >
          <input
            v-model="name"
            type="text"
            size="10"
            class="outline-none w-full bg-gray-300 rounded py-1 px-2 mr-1"
          >
        </div>
        <div @click.prevent="editName">
          <IconPencilAlt
            v-show="!edit"
            class="w-4 h-4 text-gray-500 cursor-pointer hidden edit"
          />
        </div>
        <div @click.prevent="editName">
          <IconTimes
            v-show="edit"
            class="w-4 h-4 text-gray-500 stroke-2 cursor-pointer mx-1"
          />
        </div>
        <div @click.prevent="updateName">
          <IconSave
            v-show="edit"
            class="w-4 h-4 text-gray-500 cursor-pointer"
          />
        </div>
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="absolute top-0 left-0 bottom-0 rounded w-full flex items-center justify-center bg-gray-700 opacity-75"
      >
        <LoaderPuff
          :length="100"
          class="stroke-current text-gray-500"
        />
      </div>
      <!-- SKELETON -->
      <div
        v-if="skeleton || media.skeleton"
        class="absolute flex flex-col top-0 left-0 bottom-0 rounded w-full bg-white p-5"
      >
        <SkeletonBox class="w-full rounded flex-grow" style="flex-grow:1" />
        <SkeletonBox class="w-full rounded h-8 mt-5" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    media: {
      required: true,
      type: Object
    },
    skeleton: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      edit: false,
      loading: false,
      name: ''
    }
  },
  methods: {
    async remove () {
      try {
        this.loading = true
        await this.$axios.$delete(`me/medias/${this.media.id}`)
        this.$emit('remove', this.media.id)
        this.$notifySuccess({ text: this.$t('Media deleted') })
      } catch (e) {
        this.$notifyError({ text: this.$t('Error happened') })
      }
    },
    copyToClipboard () {
      this.$clipboard(this.media.url)
      this.$notifyInfo({ text: this.$t('Copy to clipboard') })
    },
    editName () {
      this.name = this.media.name
      this.edit = !this.edit
    },
    async updateName () {
      try {
        await this.$axios.$patch(`me/medias/${this.media.id}`, {
          name: this.name
        })
        this.media.name = this.name
        this.$notifySuccess({ text: this.$t('Media updated') })
        this.edit = false
      } catch (e) {
        this.$notifyError({ text: this.$t('Error happened') })
      }
    }
  }
}
</script>

<style scoped>
.fileName:hover .edit { display:block }
</style>
