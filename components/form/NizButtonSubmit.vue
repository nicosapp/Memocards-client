<template>
  <button
    :type="type"
    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded text-center font-medium inline-block
        flex justify-center items-center"
    :class="{'opacity-50':loading || disabled}"
    :disabled="disabled || loading"
  >
    <div :class="{'mr-4':loading}">
      {{ value }}
    </div>
    <IconSpinner
      v-show="loading"
      class="h-5 w-5"
    />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      required: false,
      default: 'submit',
      type: String
    },
    value: {
      required: false,
      type: String,
      default: 'Submit'
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>
