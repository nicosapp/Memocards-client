<template>
  <div>
    <PageTitle
      title="Categories"
    >
      <div class="text-lg text-gray-700">
        Edit your cateogries
      </div>
    </PageTitle>
    <div class="flex lg:flex-no-wrap flex-wrap">
      <div class="mx-4 w-full lg:w-5/12 pb-10 lg:pb-0">
        <NizTab
          ref="tabs"
          :tabs="['create','update']"
        >
          <template slot="tab-head-create">
            <IconPlusCircle class="stroke-current mr-3" /> Create
          </template>

          <template slot="tab-content-create">
            <form @submit.prevent="add">
              <NizInputText
                v-model="create.name"
                label="Category name"
                placeholder="Name"
                name="name"
              />

              <div class="flex justify-end mt-2">
                <NizButtonSubmit
                  value="Save"
                  :loading="loading"
                />
              </div>
            </form>
          </template>
          <template slot="tab-head-update">
            <IconPencilAlt class="stroke-current mr-3" /> Update
          </template>

          <template slot="tab-content-update">
            <form @submit.prevent="update">
              <NizInputText
                v-model="edit.name"
                label="Category name"
                placeholder="Name"
                name="name"
              />
              <div class="flex justify-end mt-2">
                <NizButtonSubmit
                  value="Update"
                  :loading="loading"
                />
              </div>
            </form>
          </template>
        </NizTab>
      </div>
      <div class="w-full lg:w-7/12 lg:bg-transparent bg-white py-10 lg:py-0">
        <div class="mx-3 rounded-lg bg-white px-4 py-3">
          <CategorySortable
            v-for="category in categories"
            :key="category.id"
            :category="category"
            :remove-btn="true"
            :remove="remove"
            :click="click"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { filter as _filter } from 'lodash'
import { filterDeep as _filterDeep } from 'deepdash-es/standalone'
export default {
  async asyncData ({ app }) {
    const response = await app.$axios.$get('me/categories')

    return {
      categories: response.data
    }
  },
  data () {
    return {
      categories: [],
      create: {
        name: ''
      },
      edit: {
        id: null,
        name: '',
        user_id: null
      },
      loading: false
    }
  },
  methods: {
    async add () {
      try {
        const response = await this.$axios.post('me/categories', this.create)
        this.categories.push(response.data.data)
        this.create = { name: '' }
        this.$notifySuccess({ title: 'Category created!', text: 'Your category is now created!' })
      } catch (e) {
        this.$notifyError({ title: 'Error', text: e.response.data.error })
      }
    },

    async update () {
      if (this.edit.id != null) {
        try {
          await this.$axios.$patch(`me/categories/${this.edit.id}`, this.edit)
          this.$notifySuccess({ title: 'Category updated!', text: 'Your category is now updated!' })
        } catch (e) {
          this.$notifyError({ title: 'Error', text: e.response.data.error })
        }
      }
    },

    async remove (category) {
      if (!window.confirm('Are you sure you want to delete this category?')) {
        return
      }
      try {
        await this.$axios.$delete(`me/categories/${category.id}`)
        this.categories = _filterDeep(this.categories, c => c.id !== category.id, {
          childrenPath: 'children'
        })
        this.$notifySuccess({ title: 'Category deleted!', text: 'Your category is now deleted!' })
      } catch (e) {
        this.$notifyError({ title: 'Error', text: e.response.data.error })
      }
    },
    click (category) {
      this.edit = category
      this.$refs.tabs.selectedIndex = 1
    }
  },
  head () {
    return {
      title: 'Categories'
    }
  }
}
</script>
