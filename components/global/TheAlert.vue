<template>
  <div
    v-show="alert"
    class="container relative mt-5 mb-10 px-6 py-3 rounded-lg border-b-4"
    :class="type"
  >
    <div>{{ alert }}</div>
    <div
      class="btn-close absolute top-0 right-0 mt-3 mr-3 h-5 w-5 flex items-center justify-center
rounded-full cursor-pointer"
      @click.prevent="clear"
    >
      <IconTimes class="fill-current stroke-2 h-4 w-4" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IconTimes from '@/components/icons/IconTimes'

export default {
  components: {
    IconTimes
  },
  computed: {
    ...mapGetters({
      alert: 'alert/message',
      type: 'alert/type'
    })
  },
  methods: {
    ...mapActions({
      clear: 'alert/clear'
    })
  }
}
</script>

<style scoped lang="scss">
.success{
    @apply bg-blue-200 text-blue-700 border-blue-700;
    .btn-close{
        @apply bg-blue-700 text-blue-200;
    }
}
.info{
    @apply bg-green-200 text-green-700 border-green-700;
    .btn-close{
        @apply bg-green-700 text-green-200;
    }
}
.error{
    @apply bg-red-200 text-red-700 border-red-700;
    .btn-close{
        @apply bg-red-700 text-red-200;
    }
}
.warning{
    @apply bg-yellow-200 text-yellow-700 border-yellow-700;
    .btn-close{
        @apply bg-yellow-700 text-yellow-200;
    }
}
.default{
    @apply bg-gray-200 text-gray-700 border-gray-700;
    .btn-close{
        @apply bg-gray-700 text-gray-200;
    }
}
</style>
