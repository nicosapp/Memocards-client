<template>
  <div>
    <div
      v-if="!loading"
      class="flex justify-center items-center inline-block niz-transition-default cursor-pointer
        rounded-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mr-2 mb-2"
      :class="{'pr-2':removeBtn}"
      @click="click"
    >
      <div class="font-medium">
        <slot />
      </div>
      <div
        v-if="removeBtn"
        class="bg-blue-700 rounded-full h-6 w-6 flex items-center justify-center ml-2"
        @click.stop.prevent="remove"
      >
        <IconTimes class="fill-current text-blue-400 h-4 h-4" />
      </div>
    </div>
    <!-- SKELETON -->
    <SkeletonBox
      v-else
      class="flex justify-center items-center inline-block cursor-pointer
      rounded-full px-4 py-2 mr-2 mb-2"
    >
      {{ randomString }}
    </SkeletonBox>
  </div>
</template>

<script>
export default {
  props: {
    removeBtn: {
      required: false,
      default: null,
      type: Boolean
    },
    background: {
      required: false,
      type: String,
      default: 'bg-blue-500'
    },
    id: {
      required: false,
      type: Number,
      default: 0
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    randomString () {
      const length = parseInt(Math.random() * 7) + 4
      return Math.random().toString(36).substring(length)
    }
  },
  methods: {
    click () {
      this.$emit('click', this.id)
    },
    remove () {
      this.$emit('remove', this.id)
    }
  }
}
</script>
