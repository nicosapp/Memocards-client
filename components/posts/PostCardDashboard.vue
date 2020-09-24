<template>
  <PostCard
    :post="post"
    :loading="loading"
  >
    <template v-if="!loading">
      <ul class="flex items-center text-center lg:justify-end text-gray-600 font-semibold mt-3 lg:mt-0 lg:text-base text-sm">
        <li class="lg:mr-6 flex-grow lg:flex-grow-0">
          <nuxt-link
            :to="{
              name:'posts-id-edit',
              params:{
                id: post.uuid
              }
            }"
          >
            Edit
          </nuxt-link>
        </li>
        <li class="flex-grow lg:flex-grow-0">
          <a href="#" @click.prevent="deletePost">Delete</a>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="flex items-end font-medium">
        <li class="mr-6">
          <SkeletonBox class="rounded-full w-16">
            Edit
          </SkeletonBox>
        </li>
        <li>
          <SkeletonBox class="rounded-full w-16">
            Delete
          </SkeletonBox>
        </li>
      </ul>
    </template>
  </PostCard>
</template>

<script>
import PostCard from '@/components/posts/PostCard'
export default {
  components: {
    PostCard
  },

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
  },

  methods: {
    async  deletePost () {
      if (!window.confirm('Are you sure you want to delete this snippet?')) {
        return
      }

      await this.$axios.$delete(`me/posts/${this.post.uuid}`)
      this.$emit('deleted', this.post)
    }
  }

}
</script>
