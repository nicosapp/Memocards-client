<template>
  <div class="bg-gray-200 flex flex-wrap lg:flex-no-wrap items-center border-gray-400 border-b-2">
    <div class="container flex items-center ">
      <nuxt-link
        :to="{ name : 'index'}"
        class="mr-10 flex-shrink-0 logo"
      >
        <!-- <img src="~/assets/logo.png" alt="Logo" class="h-8">
         -->
        <img src="~/assets/logo-default.png" alt="Logo" class="h-20">
      </nuxt-link>
      <a
        href="#"
        class="lg:hidden ml-auto flex flex-col relative w-8 h-8"
        @click.prevent="mobileNavOpen =!mobileNavOpen"
      >
        <span class="bg-blue-500 h-1 w-8 rounded mb-1" />
        <span class="bg-blue-500 h-1 w-8 rounded mb-1" />
        <span class="bg-blue-500 h-1 w-8 rounded mb-1" />
      </a>
      <div
        class="w-full flex"
        :class="{
          'hidden lg:flex': !mobileNavOpen
        }"
      >
        <ul class="lg:h-24 lg:flex items-center w-full lg:w-auto">
          <li>
            <nuxt-link
              :to="{name:'search'}"
            >
              <IconSearch
                class="stroke-current inline-block mr-1 h-5 w-5 text-gray-600"
                style="stroke-width: 3;"
              />
              Search
            </nuxt-link>
          </li>
        </ul>
        <ul class="h-24 flex items-center ml-auto text-right">
          <li>
            <ThemeLanguagePicker
              class="text-left"
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
                class="flex justify-between items-center"
              >
                <div
                  :style="`background-image:url(${avatarUrl})`"
                  class="h-10 w-10 mr-4 rounded-full bg-cover bg-center"
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
      mobileNavOpen: false
    }
  },
  computed: {
    avatarUrl () {
      return _get(this.$auth.user, 'avatar.thumbnail_url', null)
        ? this.$auth.user.avatar.thumbnail_url : 'http://www.gravatar.com/avatar/?d=mp'
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
a:not(.logo){
  @apply  font-bold py-3 px-4 rounded-lg text-lg text-gray-700 py-3 px-5
}
a:not(.logo):hover{
  @apply bg-gray-300
}
</style>
