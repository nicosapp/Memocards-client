<template>
  <div>
    <PostCard
      :post="post"
    >
      <ul class="flex items-end text-gray-600 font-medium">
        <li class="mr-6">
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
        <li>
          <a href="#" @click.prevent="deletePost">Delete</a>
        </li>
      </ul>
    </PostCard>
  </div>
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
    }
  },

  methods: {
    async  deletePost () {
      if (!window.confirm('Are you sure you want to delete this snippet?')) {
        return
      }

      await this.$axios.$delete(`posts/${this.post.uuid}`)
      this.$emit('deleted', this.post)
    }
  }

}
</script>
