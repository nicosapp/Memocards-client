<template>
  <div class="mx-3 rounded-lg bg-white px-6 py-4 w-full mb-4">
    <h1 class="text-2xl font-medium text-gray-700 mb-4 flex items-center">
      <IconAdjustments class="stroke-current mr-2 stroke-2" />
      <div>Tags</div>
    </h1>
    <div class="flex justify-start flex-wrap">
      <template v-if="!loading">
        <NizChip
          v-for="tag in tags"
          :id="tag.id"
          :key="tag.id"
          :loading="loading"
          :class="{'opacity-50': !isSelected(tag.id)}"
          @click="click"
        >
          {{ tag.name }}
        </NizChip>
      </template>
      <template v-else>
        <NizChip
          v-for="tag in skeletons"
          :key="tag.id"
          :loading="true"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { chips as chipsSkeleton } from '@/mixins/skeletons'
export default {
  data () {
    return {
      skeletons: chipsSkeleton(8),
      tags: [],
      selected: [],
      loading: true
    }
  },
  async mounted () {
    const response = await this.$axios.$get('me/tags')
    this.tags = response.data
    this.loading = false
  },

  methods: {
    click (id) {
      if (this.selected.includes(id)) { this.selected = this.selected.filter(_id => _id !== id) } else { this.selected.push(id) }
      this.$emit('filter', this.selected)
    },
    isSelected (id) {
      return this.selected.includes(id)
    }
  }
}
</script>
