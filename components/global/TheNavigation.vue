<template>
  <div class="bg-gray-200 py-4 lg:py-0 flex flex-wrap lg:flex-no-wrap items-center border-gray-400 border-b-2">
    <div class="container flex items-center flex-wrap lg:flex-no-wrap ">
      <nuxt-link
        :to="{ name : 'index'}"
        class="mr-10 flex-shrink-0 logo"
      >
        <div
          class="block bg-cover bg-center bg-contain bg-no-repeat h-16 w-56"
          :style="`background-image:url(${logoUrl})`"
        />
      </nuxt-link>
      <a
        href="#"
        class="lg:hidden ml-auto flex flex-col relative justify-center w-8 h-8"
        @click.prevent="mobileNavOpen =!mobileNavOpen"
      >
        <span class="bg-blue-500 h-1 w-8 rounded mb-1" />
        <span class="bg-blue-500 h-1 w-8 rounded mb-1" />
        <span class="bg-blue-500 h-1 w-8 rounded mb-1" />
      </a>
      <div
        class="w-full lg:flex lg:mt-0"
        :class="{
          'mt-4': mobileNavOpen,
          'hidden lg:flex': !mobileNavOpen
        }"
      >
        <ul class="lg:text-left text-center menu lg:h-24 lg:flex items-center w-full lg:w-auto">
          <li>
            <nuxt-link
              :to="{name:'browse'}"
            >
              Browse
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{name:'search'}"
            >
              <IconSearch
                class="stroke-current inline-block mr-1 h-5 w-5 text-gray-600 hidden lg:inline-block"
                style="stroke-width: 3;"
              />
              Search
            </nuxt-link>
          </li>
        </ul>
        <ul class="menu lg:h-24 lg:flex items-center ml-auto text-center lg:text-right  w-full lg:w-auto">
          <li>
            <ThemeLanguagePicker
              class="text-left hidden lg:block"
            />
          </li>
          <template v-if="$auth.loggedIn">
            <li>
              <nuxt-link
                :to="{name:'dashboard'}"
                class=""
              >
                Dashboard
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{name:'account'}"
                class="lg:flex justify-between items-center"
              >
                <div
                  :style="`background-image:url(${avatarUrl})`"
                  class="h-10 w-10 mr-4 rounded-full bg-cover bg-center hidden lg:block"
                />
                {{ $auth.user.username | capitalize }}
              </nuxt-link>
            </li>
            <li>
              <a
                href="#"
                class=""
                @click.prevent="signOut"
              >
                Sign out
              </a>
            </li>
          </template>
          <template v-else>
            <li>
              <nuxt-link
                :to="{name:'auth-signin'}"
                class=""
              >
                Sign in
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{name:'auth-signup'}"
                class=""
              >
                Create an account
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { get as _get } from 'lodash'

export default {
  data () {
    return {
      mobileNavOpen: true
    }
  },
  computed: {
    avatarUrl () {
      return _get(this.$auth.user, 'avatar.thumbnail_url', null)
        ? this.$auth.user.avatar.thumbnail_url : 'http://www.gravatar.com/avatar/?d=mp'
    },
    logoUrl () {
      return 'images/logo-default.png'
    }
  },
  methods: {
    async signOut () {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>
ul.menu > li a{
  @apply  font-bold rounded-lg text-lg text-gray-700 py-4 px-3
}
a:not(.logo):hover{
  @apply bg-gray-300
}
</style>
