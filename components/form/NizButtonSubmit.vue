<template>
  <button
    :type="type"
    class="outline-none bg-btn-bg hover:bg-btn-hover text-btn-text px-4 py-2 rounded text-center font-medium inline-block
        flex justify-center items-center"
    :class="{'opacity-50':loading || disabled}"
    :disabled="disabled || loading"
    @click="click"
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
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>
