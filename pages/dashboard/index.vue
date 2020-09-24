<template>
  <div>
    <PageTitle
      title="Dashboard"
      class="!mb-0"
    />
    <div class="flex">
      <transition name="slide">
        <div
          v-show="panelOpen || showSideNav"
          class="dashboard-nav w-8/12 xl:w-2/12 lg:w-3/12 fixed lg:static top-0 left-0 bottom-0"
        >
          <div
            class="m-3 lg:hidden text-right"
            @click.prevent="panelOpen = !panelOpen"
          >
            <IconArrowNarrowLeft
              class="text-gray-600 stroke-2 h-5 w-4 inline-block"
            />
          </div>
          <h2>Your dashboard</h2>
          <ul>
            <li>Overview</li>
          </ul>
          <h2>Customization</h2>
          <ul>
            <li>
              <nuxt-link
                :to="{ name:'categories'}"
                class="flex items-center"
              >
                <IconBookmark class="mr-2 stroke-current" />Categories
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{ name:'tags'}"
                class="flex items-center"
              >
                <IconTag class="mr-2 stroke-current" />Tags
              </nuxt-link>
            </li>
          </ul>
        </div>
      </transition>
      <div class="lg:flex-grow w-full mx-4 mt-10">
        <div class="flex flex-wrap">
          <div class="dashboard-box">
            <div class="box-container">
              <h2>
                Last created
              </h2>
              <ul>
                <li
                  v-for="index in new Array(5)"
                  :key="index"
                >
                  <a href="#">Random</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="box-container">
              <h2>
                Most viewed
              </h2>
              <ul>
                <li
                  v-for="index in new Array(5)"
                  :key="index"
                >
                  <a href="#">Random</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="box-container">
              <h2>
                Statistics
              </h2>
              <ul>
                <li
                  v-for="index in new Array(5)"
                  :key="index"
                >
                  <a href="#">Random</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="box-container">
              <h2>
                Favorites
              </h2>
              <ul>
                <li
                  v-for="index in new Array(5)"
                  :key="index"
                >
                  <a href="#">Random</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lg:hidden fixed left-0 bg-gray-400  rounded-r-lg flex items-center shadow-lg justify-center h-10 w-8"
      style="top:50%"
      :class="{'hidden':panelOpen}"
      @click.prevent="panelOpen = !panelOpen"
    >
      <IconDotsVertical class="text-gray-700 stroke-2 h-5 w-4" />
    </div>
    <div
      class="fixed bottom-0 right-0 m-4 bg-blue-500 rounded-full flex items-center justify-center h-16 w-16"
      @click.prevent="createPost"
    >
      <IconPlus class="text-blue-300 stroke-2 h-8 w-8" />
    </div>
  </div>
</template>

<script>
import breakpoints from '@/plugins/breakpoints'

export default {
  components: {

  },
  async asyncData ({ app }) {

  },
  data () {
    return {
      loading: true,
      panelOpen: false,
      breakpoints
    }
  },
  computed: {
    showSideNav () {
      return ['lg', 'xl'].includes(this.breakpoints.is)
    }
  },
  methods: {
    async createPost () {
      const post = await this.$axios.$post('me/posts')

      this.$router.push({
        name: 'posts-id-edit',
        params: {
          id: post.data.uuid
        }
      })
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },

  middleware: ['verified']
}
</script>

<style scoped lang="scss">
.dashboard-nav{
  @apply bg-gray-200 border-gray-300 border-r-2;
  h2{
    @apply font-medium text-gray-700 text-lg px-4 py-3;
  }
  ul{
    @apply text-gray-600 mb-2;
    li{
      @apply pl-8 py-3;
      &:hover{ @apply bg-gray-300; }
      a{ @apply text-gray-600; }
    }
  }
}
@screen lg{
  .dashboard-box{ @apply w-1/2 #{!important}; }
}
.dashboard-box{
  @apply w-full p-3;
  .box-container{
    @apply bg-white rounded-lg px-4 py-2;
    h2{
      @apply font-medium text-2xl text-gray-700;
    }
  }
}
.slide-enter-active{
  animation: slideInLeft 250ms linear;
}
.slide-leave-active{
  animation: slideOutLeft 250ms linear;
}
</style>
