<template>
  <Draggable
    tag="ul"
    :list="categories"
    class="dragArea"
    :animation="300"
    ghost-class="ghost"
    handle=".handle"
    :group="{ name: 'g1' }"
  >
    <CategorySortableItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :click="click"
      :remove="remove"
    >
      <CategorySortable
        :categories="category.children"
        :depth="depth + 1"
        :click="click"
        :remove="remove"
      />
    </CategorySortableItem>
  </Draggable>
</template>

<script>
// import CategorySortable from '@/components/category/CategorySortable'
import Draggable from 'vuedraggable'

export default {
  name: 'CategorySortable',
  components: {
    Draggable
  },
  props: {
    categories: {
      required: true,
      type: Array
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
  data () {
    return {
      edit: false
    }
  },
  computed: {
    indent () {
      return this.depth * 50
    }
  }
}
</script>

<style scoped>
.dragArea {
  min-height: 10px;
}
</style>
