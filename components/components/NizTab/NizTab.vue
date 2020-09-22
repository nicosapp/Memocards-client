<template>
  <div>
    <ul class="flex items-center justify-between border-b-2 border-gray-400">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{'text-blue-500 font-medium': isActive(index)}"
        class="cursor-pointer text-lg flex-grow text-center text-gray-600"
        @click="selectedIndex = index"
      >
        <div class="py-4 flex justify-center items-center">
          <slot :name="`tab-head-${tab}`" />
        </div>
        <div
          v-if="isActive(index)"
          class="h-1 bg-blue-500 w-10/12 mx-auto"
          style="margin-bottom:-0.20rem"
        />
      </li>
    </ul>
    <div class="p-4">
      <div
        v-for="(tab, index) in tabs"
        v-show="isActive(index)"
        :key="`content-${index}`"
      >
        <slot :name="`tab-content-${tab}`" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tabs: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      selectedIndex: 0 // the index of the selected tab,
    }
  },
  mounted () {
    this.selectedIndex = 0
  },
  methods: {
    isActive (index) {
      return this.selectedIndex === index
    }
  }
}
</script>
