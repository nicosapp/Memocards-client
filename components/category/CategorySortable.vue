<template>
  <div
    class="border border-gray-400 py-2 px-3 rounded-lg mb-1 shadow-xs bg-gray-200
  hover:bg-gray-300"
  >
    <div
      class="flex items-center"
      :class="{'mb-2':category.children.length}"
    >
      <IconMenu
        class="stroke-current text-gray-500 stroke-2 mr-2  cursor-pointer"
      />
      <div
        class="font-medium text-gray-700 flex-grow cursor-pointer"
        @click.stop.prevent="_click"
      >
        {{ category.name }}
      </div>
      <div
        class="bg-gray-500 rounded-full h-6 w-6 flex items-center justify-center ml-2 cursor-pointer"
        @click.stop.prevent="_remove"
      >
        <IconTimes class="fill-current text-gray-200 h-4 h-4" />
      </div>
    </div>
    <CategorySortable
      v-for="cat in category.children"
      :key="cat.id"
      :category="cat"
      :depth="depth + 1"
      :click="click"
      :remove="remove"
    />
  </div>
</template>

<script>
import CategorySortable from '@/components/category/CategorySortable'

export default {
  name: 'CategorySortable',
  components: {
    CategorySortable
  },
  props: {
    category: {
      required: true,
      type: Object
    },
    depth: {
      required: false,
      type: Number,
      default: 0
    },
    click: {
      required: false,
      type: Function,
      default: null
    },
    remove: {
      required: false,
      type: Function,
      default: null
    }
  },
  computed: {
    indent () {
      return this.depth * 50
    }
  },
  methods: {
    _remove (e) {
      this.remove(this.category)
    },
    _click (e) {
      this.click(this.category)
    }
  }
}
</script>
