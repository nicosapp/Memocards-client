<template>
  <div class="mx-3 rounded-lg bg-bg-light px-6 py-4 mb-4">
    <h1 class="text-2xl font-medium text-text-primary mb-4 flex items-center">
      <IconLink class="stroke-current mr-2" style="stroke-width:3" />
      <div>Categories Link</div>
    </h1>
    <div>
      <NizAutocomplete
        v-model="searchText"
        :items="searchItems"
        :loading="loading"
        @input="query"
      >
        <div
          v-for="(item, index) in searchItems"
          :key="item.id"
          class="border-b-2 border-gray-300 px-4 py-2 text-gray-600 flex items-center
            hover:bg-gray-200 cursor-pointer"
          :class="{'border-b-0':index === (searchItems.length-1)}"
          @click.prevent="click(item)"
        >
          <IconBookmark class="stroke-current mr-3" />{{ item.name }}
        </div>
      </NizAutocomplete>
    </div>
    <div class="flex justify-start flex-wrap">
      <NizChip
        v-for="category in post.categories"
        :id="category.id"
        :key="category.id"
        :remove-btn="true"
        @remove="remove(category)"
      >
        {{ category.name }}
      </NizChip>
    </div>
  </div>
</template>

<script>
import { debounce as _debounce } from 'lodash'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      searchItems: [],
      searchText: '',
      loading: false
    }
  },
  methods: {
    click (category) {
      if (!this.post.categories.filter(c => c.id === category.id).length) {
        this.post.categories.push(category)
        this.$notifySuccess({ title: 'Category linked!', text: 'Your category is now linked!' })
        try {
          this.$axios.post(`me/categories/${category.id}/link/${this.post.uuid}`)
        } catch (e) {
          this.$notifyError({ title: 'Error!', text: 'There is an error!' })
        }
      }
    },
    remove (category) {
      this.post.categories = this.post.categories.filter(c => c.id !== category.id)
      try {
        this.$axios.post(`me/categories/${category.id}/unlink/${this.post.uuid}`)
        this.$notifySuccess({ title: 'Category unlinked!', text: 'Your category is now unlinked!' })
      } catch (e) {
        this.$notifyError({ title: 'Error!', text: 'There is an error!' })
      }
    },
    query: _debounce(async function () {
      if (this.searchText) {
        this.loading = true
        const response = await this.$axios.$get(`me/categories/?search=${this.searchText}`)
        this.searchItems = response.data
        this.loading = false
      }
    }, 300)
  }
}
</script>
