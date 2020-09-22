<template>
  <div>
    <PageTitle
      title="Categories"
    >
      <div class="text-lg text-gray-700">
        Edit your cateogries
      </div>
    </PageTitle>
    <div class="mx-4 flex">
      <div class="w-5/12">
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
              <NizInputText
                v-model="create.slug"
                label="Category slug"
                placeholder="Slug"
                name="sllug"
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
              <NizInputText
                v-model="edit.slug"
                label="Category slug"
                placeholder="Slug"
                name="sllug"
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
      <div class="w-7/12">
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
        name: '',
        slug: ''
      },
      edit: {
        id: null,
        name: '',
        slug: '',
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
        this.create = { name: '', slug: '' }
      } catch (e) {

      }
    },

    async update () {
      if (this.edit.id != null) {
        try {
          await this.$axios.$patch(`me/categories/${this.edit.id}`, this.edit)
        } catch (e) {
          console.log(e)
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
      } catch (e) {
        console.log(e)
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
