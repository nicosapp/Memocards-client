<template>
  <div>
    <NizDropdown>
      <template slot="trigger">
        <IconCog class="fill-current text-gray-600 w-5" />
      </template>
      <NizDropdownTitle>
        Theme
      </NizDropdownTitle>
      <NizDropdownItem
        v-for="color in colors"
        :key="color"
        @click="$colorMode.preference = color"
      >
        <div class="flex justify-start items-center">
          <component
            :is="`icon-${color}`"
            class="block w-6 h-6 mr-3"
          />
          <div :class="{'text-blue-500': color == activeColorMode}">
            {{ color | capitalize }}
          </div>
        </div>
      </NizDropdownItem>

      <NizDropdownTitle>
        Langue
      </NizDropdownTitle>
      <NizDropdownItem
        v-for="locale in this.$i18n.locales"
        :key="locale.code"
        @click.prevent="switchLanguage(locale.code)"
      >
        <div class="flex justify-start items-center">
          <component
            :is="`flag-${locale.code}`"
            class="block w-6 mr-3"
          />

          <div :class="{'text-blue-500': locale.code == activeLocale}">
            {{ locale.name }}
          </div>
        </div>
      </NizDropdownItem>
    </NizDropdown>
  </div>
</template>

<script>
import FlagFr from '~/components/icons/FlagFr'
import FlagEn from '~/components/icons/FlagEn'
import FlagDe from '~/components/icons/FlagDe'
import FlagEs from '~/components/icons/FlagEs'

import ColorSwatch from '~/components/icons/IconColorSwatch'
import Sun from '~/components/icons/IconSun'
import Moon from '~/components/icons/IconMoon'

export default {
  components: {
    FlagFr,
    FlagEn,
    FlagDe,
    FlagEs,
    'icon-rainbow': ColorSwatch,
    'icon-light': Sun,
    'icon-dark': Moon
  },
  data () {
    return {
      colors: ['light', 'dark', 'rainbow']
    }
  },
  computed: {
    activeLocale () {
      return this.$i18n.locale
    },
    activeColorMode () {
      return this.$colorMode.preference
    }
  },
  methods: {
    switchLanguage (code) {
      this.$i18n.setLocale(code)
    }
  }
}
// this.$i18n.locale
</script>
