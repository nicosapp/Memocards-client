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
                label="Tag name"
                placeholder="Name"
                name="name"
              />
              <NizInputText
                v-model="create.slug"
                label="Tag slug"
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
                label="Tag name"
                placeholder="Name"
                name="name"
              />
              <NizInputText
                v-model="edit.slug"
                label="Tag slug"
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
        this.loading = true
        const response = await this.$axios.$post('me/tags', this.create)
        this.tags.push(response.data.data)
        this.create = { name: '', slug: '' }
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },

    async update () {
      if (this.edit.id != null) {
        try {
          await this.$axios.$patch(`me/tags/${this.edit.id}`, this.edit)
        } catch (e) {
          console.log(e)
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
      } catch (e) {
        console.log(e)
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
