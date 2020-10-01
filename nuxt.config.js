const env = require('dotenv').config()

// console.log(env.parsed)

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - Memocards.tech',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/app.scss'],
  // purgeCSS: {
  //   whitelist: ['dark-mode']
  // },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/vue-notification',
    '~/plugins/axios'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/color-mode',
    '@nuxtjs/toast',
    [
      'nuxt-i18n',
      {
        // vueI18nLoader: true,
        defaultLocale: 'en',
        strategy: 'no_prefix',
        // parsePages: false,
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          },
          {
            name: 'Français',
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr-FR.js'
          }
          // {
          //   name: 'Deutsch',
          //   code: 'de',
          //   iso: 'de-DE',
          //   file: 'de-DE.js'
          // },
          // {
          //   name: 'Español',
          //   code: 'es',
          //   iso: 'es-ES',
          //   file: 'es-ES.js'
          // }
        ],
        lazy: true,
        langDir: 'locales/'
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: env.parsed.API_URL
  },

  auth: {
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      home: '/dashboard',
      callback: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/signin',
            method: 'post',
            propertyName: 'data.token'
          },
          user: {
            url: 'auth/me',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: 'auth/signout',
            method: 'post'
          }
        }
      }
    }
  },

  toast: {
    position: 'top-center'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },

    extend (config, ctx) {}
  }
}
