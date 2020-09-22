<template>
  <div>
    <div
      v-if="!loading"
      class="flex flex-wrap lg:flex-no-wrap justify-between items-center
    w-full bg-white rounded-lg mb-2 p-8"
    >
      <div class="lg:w-8/12">
        <h1>
          <nuxt-link
            class="text-gray-600 font-medium text-lg"
            :to="{
              name: 'posts-id',
              params:{
                id:post.uuid
              }
            }"
          >
            {{ post.post_title || 'Untitled page' }}
          </nuxt-link>
        </h1>
        <div class="text-gray-500 mb-2 text-sm">
          {{ post.post_excerpt | read-more }}
        </div>
        <div class="flex items-center justify-start text-gray-500 text-sm w-full">
          <div class="lg:w-4/12 flex items-center justify-start">
            <IconBookmark class="h-5 w-5 stroke-current  mr-2" />
            <template v-if="post.categories.length">
              <div
                v-for="(category, index) in post.categories"
                :key="category.id"
              >
                {{ category.name }}
                <span v-if="(index !== post.categories.length-1)" class="mx-2">/</span>
              </div>
            </template>
            <template v-else>
              No categories
            </template>
          </div>
          <div class="lg:ml-6 flex items-center justify-start">
            <IconTag class="h-5 w-5 stroke-current mr-2" />
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
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div
      v-else
      class="flex flex-wrap lg:flex-no-wrap justify-between items-center
    w-full bg-white rounded-lg mb-2 p-8 shadow-sm"
    >
      <div>
        <SkeletonBox class="rounded-full inline-block mb-3">
          Some long untitled text longer to be perfect
        </SkeletonBox>

        <SkeletonBox class="rounded-full mb-2 h-4">
          Some long untitled text longer to be perfect  text longer to be perfect
        </SkeletonBox>

        <SkeletonBox class="rounded-full mb-2 h-4">
          Some long untitled text longer to be perfect  text longer to be perfect
        </SkeletonBox>
      </div>
      <div><slot /></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
      type: Object
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>
