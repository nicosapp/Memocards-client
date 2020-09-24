<template>
  <div class="mx-3 rounded-lg bg-white px-6 py-4 mb-4">
    <h1 class="text-2xl font-medium text-gray-700 mb-4 flex items-center">
      <IconAdjustments class="stroke-current mr-2 stroke-2" />
      <div>Categories</div>
    </h1>
    <div>
      <CategoryFilterableContainer
        :categories="categories"
        :loading="loading"
        @filter="filter"
      />
    </div>
  </div>
</template>

<script>

import IconAdjustments from '@/components/icons/IconAdjustments'

export default {
  components: {
    IconAdjustments
  },
  data () {
    return {
      categories: [],
      selected: [],
      loading: true
    }
  },
  async mounted () {
    const response = await this.$axios.$get('me/categories')
    this.categories = response.data
    this.loading = false
  },

  methods: {
    filter (ids) {
      this.selected = ids
      this.$emit('filter', this.selected)
    }
  }
}
</script>
