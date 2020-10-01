<template>
  <div class="sticky top-0 bg-bg md:static py-2 lg:py-0 flex flex-wrap lg:flex-no-wrap items-center border-border border-b-3">
    <div class="container flex items-center flex-wrap lg:flex-no-wrap ">
      <a
        href="#"
        class="md:hidden flex flex-col relative justify-center w-8 h-8"
        @click.prevent="sliderLeft = true"
      >
        <span class="bg-text-secondary h-1 w-8 rounded mb-1" />
        <span class="bg-text-secondary h-1 w-8 rounded mb-1" />
        <span class="bg-text-secondary h-1 w-8 rounded mb-1" />
      </a>
      <nuxt-link
        :to="{ name : 'index'}"
        class="logo flex justify-center flex-grow md:block"
      >
        <div
          class="block bg-cover bg-center bg-contain bg-no-repeat h-12 lg:h-16 lg:w-56 w-48"
          :style="`background-image:url(${logoUrl})`"
        />
      </nuxt-link>
      <a
        href="#"
        class="lg:hidden hidden md:flex md:ml-auto flex-col relative justify-center w-8 h-8"
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
          <template v-if="$auth.loggedIn">
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
          </template>
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
                {{ $auth.user.name | capitalize }}
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
            <template v-if="$auth.loggedIn">
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
                  {{ $auth.user.name | capitalize }}
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

    <!-- SLIDER MOBILE -->
    <transition name="slider-left">
      <div
        v-show="sliderLeft"
        class="z-50 slider-left-nav md:hidden dashboard-nav w-9/12 fixed top-0 left-0 bottom-0"
      >
        <div
          class="m-3 lg:hidden text-right"
          @click.prevent="sliderLeft = false"
        >
          <IconArrowNarrowLeft
            class="text-text-primary stroke-2 h-5 w-4 inline-block"
          />
        </div>
        <h2>Your dashboard</h2>
        <ul>
          <li>
            <nuxt-link
              :to="{ name:'dashboard'}"
              class="flex items-center"
            >
              Overview
            </nuxt-link>
          </li>
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
  </div>
</template>

<script>
import { get as _get } from 'lodash'

export default {
  data () {
    return {
      mobileNavOpen: false,
      sliderLeft: false
    }
  },
  computed: {
    avatarUrl () {
      return _get(this.$auth.user, 'avatar.thumbnail_url', null)
        ? this.$auth.user.avatar.thumbnail_url : 'http://www.gravatar.com/avatar/?d=mp'
    },
    logoUrl () {
      return require('~/assets/memocards.tech.svg')
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
// SLIDER LEFT
.slider-left-nav{
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
.slider-left-enter-active{
  animation: slideInLeft 250ms linear;
}
.slider-left-leave-active{
  animation: slideOutLeft 250ms linear;
}
</style>
