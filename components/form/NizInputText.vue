<template>
  <div class="mb-6">
    <label
      v-if="label"
      :for="name"
      class="block text-gray-600 font-medium mb-2"
      :class="{
        'text-red-500':error
      }"
    >{{ label }}</label>
    <div
      class="relative flex items-center border-2 border-gray-400 bg-white rounded"
      :class="{
        'border-red-500':error
      }"
    >
      <slot name="before" />
      <input
        :id="name"
        :value="value"
        :placeholder="placeholder"
        :type="type"
        :name="name"
        autocomplete="off"
        class="block w-full flex-grow p-3 outline-none text-gray-700"
        @input.prevent="change"
        @keypress="keypress"
      >
      <slot name="after" />
      <div
        v-if="password"
        class="mr-2"
        @click.prevent="showPassword = !showPassword"
      >
        <template v-if="!showPassword">
          <IconEye class="h-6 w-6 stroke-current text-gray-600" />
        </template>
        <template v-else>
          <IconEyeOff class="h-6 w-6 stroke-current text-gray-600" />
        </template>
      </div>
      <div v-if="loading" class="mr-2">
        <IconSpinner class="h-6 w-6 stroke-current text-gray-600" />
      </div>
    </div>
    <div
      v-if="error"
      class="text-red-500 mb-4 text-sm mt-1"
    >
      {{ errorMessage }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: false,
      type: String,
      default: ''
    },
    value: {
      required: false,
      type: String,
      default: ''
    },
    name: {
      required: true,
      type: String
    },
    placeholder: {
      required: false,
      type: String,
      default: ''
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    },
    error: {
      required: false,
      type: [Object, Array, Boolean],
      default: false
    },
    password: {
      required: false,
      type: Boolean,
      default: false
    },
    number: {
      required: false,
      type: Boolean,
      default: false
    },
    maxLength: {
      required: false,
      type: [Boolean, Number],
      default: null
    }
  },
  data () {
    return {
      showPassword: false
    }
  },
  computed: {
    errorMessage () {
      return this.error[0] || this.error
    },
    type () {
      if (this.number) { return 'number' }
      return this.password && !this.showPassword ? 'password' : 'text'
    }
  },
  methods: {
    change (e) {
      this.$emit('input', e.target.value)
    },
    keypress (e) {
      this.$emit('keypress', e)
    }
  }
}
</script>
