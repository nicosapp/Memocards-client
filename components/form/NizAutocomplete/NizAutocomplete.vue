<template>
  <div class="relative mb-4">
    <NizInputText
      v-model="searchText"
      v-click-outside="close"
      :label="label"
      class="!mb-0"
      placeholder="Search tags"
      value=""
      name="autocomplete"
      :loading="loading"
      @input="input"
    />
    <div
      v-show="open"
      class="absolute bg-white rounded-br-lg rounded-bl-lg w-full"
      style="box-shadow: 0px 4px 15px 0 #ababab"
    >
      <template v-if="!loading">
        <slot />
      </template>
      <template v-else>
        <div
          v-for="index in new Array(3)"
          :key="index"
          class="border-b-2 border-gray-300 px-4 py-3 text-gray-600 flex items-center"
          :class="{'border-b-0':index === 2}"
        >
          <SkeletonBox class="rounded-full w-10/12 text-xs">
            Random
          </SkeletonBox>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import SkeletonBox from '@/components/components/SkeletonBox'

export default {
  directives: {
    ClickOutside
  },
  components: {
    SkeletonBox
  },
  props: {
    placeholder: {
      required: false,
      type: String,
      default: 'Search'
    },
    label: {
      required: false,
      type: String,
      default: null
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    },
    items: {
      required: false,
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      searchText: '',
      open: false
    }
  },
  methods: {
    input (e) {
      this.open = this.searchText.length > 0
      this.$emit('input', this.searchText)
    },
    close () {
      this.open = false
    }
  }
}
</script>
