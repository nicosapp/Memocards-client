<template>
  <div class="sticky top-0 bg-bg md:static py-4 lg:py-0 flex flex-wrap lg:flex-no-wrap items-center border-border border-b-3">
    <div class="container flex items-center flex-wrap lg:flex-no-wrap ">
      <nuxt-link
        :to="{ name : 'index'}"
        class="logo"
      >
        <div
          class="block bg-cover bg-center bg-contain bg-no-repeat h-16 lg:w-56 w-48"
          :style="`background-image:url(${logoUrl})`"
        />
      </nuxt-link>
      <a
        href="#"
        class="lg:hidden ml-auto flex flex-col relative justify-center w-8 h-8"
        @click.prevent="mobileNavOpen =!mobileNavOpen"
      >
        <span class="bg-text-secondary h-1 w-8 rounded mb-1" />
        <span class="bg-text-secondary h-1 w-8 rounded mb-1" />
        <span class="bg-text-secondary h-1 w-8 rounded mb-1" />
      </a>
      <div
        class="laptop-nav w-full lg:flex hidden"
      >
        <ul class="menu lg:h-24 lg:flex items-center w-full lg:w-auto">
          <li>
            <nuxt-link
              :to="{name:'browse'}"
            >
              {{ $t('Browse') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{name:'search'}"
            >
              <IconSearch
                class="stroke-current inline-block mr-1 h-5 w-5 text-text-secondary"
                style="stroke-width: 3;"
              />
              {{ $t('Search') }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="menu lg:h-24 lg:flex items-center ml-auto text-right  w-full lg:w-auto">
          <li class="">
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
                {{ $t('Dashboard') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{name:'account'}"
                class="lg:flex justify-between items-center"
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
                {{ $t('Sign out') }}
              </a>
            </li>
          </template>
          <template v-else>
            <li>
              <nuxt-link
                :to="{name:'auth-signin'}"
                class=""
              >
                {{ $t('Sign in') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{name:'auth-signup'}"
                class=""
              >
                {{ $t('Create an account') }}
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
      <transition name="slide">
        <div
          v-show="mobileNavOpen"
          class="mobile-nav lg:hidden w-full mt-4 overflow-hidden"
        >
          <ul>
            <li>
              <nuxt-link
                :to="{name:'browse'}"
              >
                {{ $t('Browse') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="{name:'search'}"
              >
                {{ $t('Search') }}
              </nuxt-link>
            </li>
            <template v-if="$auth.loggedIn">
              <li>
                <nuxt-link
                  :to="{name:'dashboard'}"
                  class=""
                >
                  {{ $t('Dashboard') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{name:'account'}"
                  class="lg:flex justify-between items-center"
                >
                  {{ $auth.user.username | capitalize }}
                </nuxt-link>
              </li>
              <li>
                <a
                  href="#"
                  class=""
                  @click.prevent="signOut"
                >
                  {{ $t('Sign out') }}
                </a>
              </li>
            </template>
            <template v-else>
              <li>
                <nuxt-link
                  :to="{name:'auth-signin'}"
                  class=""
                >
                  {{ $t('Sign in') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="{name:'auth-signup'}"
                  class=""
                >
                  {{ $t('Create an account') }}
                </nuxt-link>
              </li>
            </template>
          </ul>
        </div>
      </transition>
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
    },
    logoUrl () {
      return require('~/assets/logo-default.png')
    }
  },
  methods: {
    async signOut () {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped lang="scss">
.laptop-nav{
  ul.menu > li a{
    @apply  font-medium font-header rounded-lg text-lg text-text-primary py-4 px-3;
  }
  ul.menu > li a:hover{
    @apply bg-bg-light;
  }
}
.mobile-nav{
    @apply py-2;
  ul li {
    @apply text-center font-header font-medium  py-2;
    a {
      @apply text-lg text-text-primary;
    }
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.2s linear;
}
.slide-enter, .slide-leave-to{
  max-height:0px;
}
.slide-enter-to, .slide-leave{
  max-height:20rem;
}
</style>
