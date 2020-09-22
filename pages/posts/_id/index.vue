<template>
  <div>
    <PageTitle
      :title="post.post_title"
    >
      <div class="flex justify-between">
        <div class="text-gray-500">
          <div class="flex items-center justify-start mb-3">
            <IconBookmark class="h-6 w-6 stroke-current  mr-2" />
            <template v-if="post.categories.length">
              <div
                v-for="(category, index) in post.categories"
                :key="category.id"
              >
                {{ category.name }}
                <span
                  v-if="(index !== post.categories.length-1)"
                  class="mx-2 font-bold"
                > / </span>
              </div>
            </template>
            <template v-else>
              No categories
            </template>
          </div>
          <div class="flex items-center justify-start">
            <IconTag class="h-6 w-6 stroke-current  mr-2" />
            <template v-if="post.tags.length">
              <NizChip
                v-for="tag in post.tags"
                :key="tag.id"
                class="opacity-75 transform scale-75 -m-2"
              >
                {{ tag.name }}
              </NizChip>
            </template>
            <template v-else>
              No tags
            </template>
          </div>
        </div>
        <div>
          <nuxt-link
            :to="{
              name:'posts-id-edit',
              params:{
                id: post.uuid
              }
            }"
            class="block flex items-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 niz-transition-default py-2 px-4"
          >
            <IconPencilAlt class="mr-2 stroke-current" />Edit
          </nuxt-link>
          </dvi>
        </div>
      </div>
    </PageTitle>
    <div class="mx-3 lg:mx-20 flex flex-wrap lg:flex-no-wrap">
      <div class="lg:w-9/12 bg-white p-8 rounded-lg">
        <div v-html="post.post_content" />
      </div>
      <div class="lg:w-3/12 lg:mx-5">
        <TableOfContent />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  async asyncData ({ app, params }) {
    const post = await app.$axios.$get(`me/posts/${params.id}`)

    return {
      post: post.data
    }
  },
  data () {
    return {
      post: null,
      lastSaved: null
    }
  }
}
</script>
