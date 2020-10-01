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
              class="text-text-primary stroke-2 h-5 w-4 inline-block"
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
              <BoxLastCreated />
            </div>
          </div>
          <div class="dashboard-box">
            <div class="box-container">
              <BoxMostViewed />
            </div>
          </div>
          <div class="dashboard-box">
            <div class="box-container">
              <BoxStatistics />
            </div>
          </div>
          <div class="dashboard-box">
            <div class="box-container">
              <BoxFavorites />
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
  </div>
</template>

<script>
import breakpoints from '@/plugins/breakpoints'

export default {
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
  @apply bg-bg border-border border-r-2;
  h2{
    @apply font-medium text-text text-lg px-4 py-3;
  }
  ul{
    @apply text-text-primary mb-2;
    li{
      @apply pl-8 py-3;
      &:hover{ @apply bg-bg-light; }
      a{ @apply text-text-primary; }
    }
  }
}
@screen lg{
  .dashboard-box{ @apply w-1/2 #{!important}; }
}
.dashboard-box{
  @apply w-full p-3;
  .box-container{
    @apply bg-bg-primary rounded-lg px-4 py-2;
  }
}
.slide-enter-active{
  animation: slideInLeft 250ms linear;
}
.slide-leave-active{
  animation: slideOutLeft 250ms linear;
}
</style>
