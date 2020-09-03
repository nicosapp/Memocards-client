<template>
  <div class="bg-white flex items-center">
    <div class="container flex flex-wrap items-center lg:flex-no-wrap">
      <nuxt-link
        :to="{ name : 'home'}"
        class="mr-10 flex-shrink-0"
      >
        <img src="~/assets/logo.png" alt="Logo" class="h-8">
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
              to="/"
              class="text-lg text-gray-700 py-8 px-4"
            >
              Browse
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{name:'home'}"
              class="text-lg text-gray-700 py-8 px-4"
            >
              Search
            </nuxt-link>
          </li>
        </ul>
        <ul class="h-24 flex items-center ml-auto text-right">
          <template v-if="$auth.loggedIn">
            <li>
              <nuxt-link
                :to="{name:'home'}"
                class="text-lg text-gray-700 py-8 px-4"
              >
                Dashboard
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{name:'account'}"
                class="text-lg text-gray-700 py-8 px-4"
              >
                {{ $auth.user.name }}
              </nuxt-link>
            </li>
            <li>
              <a
                href="#"
                class="text-lg text-gray-700 py-8 px-4"
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
                class="text-lg text-gray-700 py-8 px-4"
              >
                Sign in
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{name:'auth-create'}"
                class="text-lg text-gray-700 py-8 px-4"
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
export default {
  data () {
    return {
      mobileNavOpen: false
    }
  },

  methods: {
    async signOut () {
      await this.$auth.logout()
    }
  }
}
</script>
