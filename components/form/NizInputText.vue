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
      class="relative flex items-center border-2 border-gray-400 rounded"
      :class="{
        'border-red-500':error
      }"
    >
      <slot name="before" />
      <input
        :id="name"
        :value="value"
        :placeholder="placeholder"
        type="text"
        :name="name"
        autocomplete="off"
        class="block w-full flex-grow p-3 outline-none"
        @input.prevent="change"
      >
      <slot name="after" />
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
    }
  },
  computed: {
    errorMessage () {
      return this.error[0] || this.error
    }
  },
  methods: {
    change (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
