<template>
  <label class="inline-block cursor-pointer flex items-center justify-start">
    <span
      class="flex items-center justify-center block mr-2 h-5 w-5
      bg-gray-200 border-gray-400 hover:bg-gray-400 border rounded"

      :class="{
        'bg-blue-500':shouldBeChecked,
        'border-blue-500':shouldBeChecked,
        'hover:bg-blue-600':shouldBeChecked
      }"
    >
      <IconCheck class="h-4 w-4 stroke-3 stroke-current text-white" />
    </span>
    <input
      :checked="shouldBeChecked"
      :value="value"
      class="hidden"
      type="checkbox"
      :name="name"
      @change="updateInput"
    >
    <div>
      <slot />
    </div>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    name: {
      required: true,
      type: String
    },
    value: {
      required: false,
      type: [Number, String],
      default: ''
    },
    trueValue: {
      type: Boolean,
      default: true
    },
    falseValue: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Boolean, Array],
      default: false
    }
  },

  computed: {
    shouldBeChecked () {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value)
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput (event) {
      const isChecked = event.target.checked

      if (Array.isArray(this.modelValue)) {
        const newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>
