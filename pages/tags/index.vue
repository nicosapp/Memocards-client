/* eslint-disable vue/v-on-style */
<template>
  <div>
    <PageTitle
      title="Tags"
    >
      <div class="text-lg text-gray-700">
        Edit your tags
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
                label="Tag name"
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
                label="Tag name"
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
          <div class="flex justify-start flex-wrap">
            <NizChip
              v-for="tag in tags"
              :id="tag.id"
              :key="tag.id"
              :remove-btn="true"
              @remove="remove"
              @click="click"
            >
              {{ tag.name }}
            </NizChip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  async asyncData ({ app }) {
    const response = await app.$axios.$get('me/tags')

    return {
      tags: response.data
    }
  },
  data () {
    return {
      tags: [],
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
        this.loading = true
        const response = await this.$axios.$post('me/tags', this.create)
        this.tags.push(response.data.data)
        this.create = { name: '', slug: '' }
        this.loading = false
        this.$notifySuccess({ title: 'Tag created!', text: 'Your tag is now created!' })
      } catch (e) {
        this.$notifyError({ title: 'Error', text: e.response.data.error })
      }
    },

    async update () {
      if (this.edit.id != null) {
        try {
          await this.$axios.$patch(`me/tags/${this.edit.id}`, this.edit)
          this.$notifySuccess({ title: 'Tag updated!', text: 'Your tag is now updated!' })
        } catch (e) {
          this.$notifyError({ title: 'Error', text: e.response.data.error })
        }
      }
    },

    async remove (id) {
      if (!window.confirm('Are you sure you want to delete this tag?')) {
        return
      }

      const tag = this.tags.find(t => t.id === id)
      try {
        await this.$axios.$delete(`me/tags/${tag.id}`, tag)
        this.tags = this.tags.filter(t => t.id !== tag.id)
        this.$notifySuccess({ title: 'Tag deleted!', text: 'Your tag is now deleted!' })
      } catch (e) {
        this.$notifyError({ title: 'Error', text: e.response.data.error })
      }
    },

    click (id) {
      this.edit = this.tags.find(t => t.id === id)
      this.$refs.tabs.selectedIndex = 1
    }
  },
  head () {
    return {
      title: 'Tags'
    }
  }
}
</script>
