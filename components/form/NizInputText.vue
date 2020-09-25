<template>
  <div class="mb-6">
    <label
      v-if="label"
      :for="name"
      class="block text-text font-medium mb-2"
      :class="{
        'text-red-500':inputError,
        'text-green-400':inputValid
      }"
    >{{ label }}
      <slot name="label" />
    </label>
    <div
      class="relative flex items-center border-2 border-gray-400 bg-white rounded"
      :class="{
        'border-red-500':inputError,
        'border-green-400':inputValid
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
        @input="input"
      >
      <slot name="after" />
      <div
        v-if="passwordValidator"
        class="passwordValidatorLength"
        :class="{'valid':valid_password_length}"
      >
        {{ value.length }}
      </div>
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
      v-if="passwordValidator"
      class="passwordValidator flex items-center justify-between mt-2"
    >
      <div :class="{'valid':contains_lowercase}">
        Lowercase
      </div>
      <div :class="{'valid':contains_uppercase}">
        Uppercase
      </div>
      <div :class="{'valid':contains_number}">
        Number
      </div>
      <div :class="{'valid':contains_specials}">
        Specials
      </div>
    </div>
    <div
      v-if="inputError"
      class="text-red-500 text-sm mt-1"
    >
      {{ errorMessage }}
    </div>
    <slot />
  </div>
</template>

<script>
import { throttle as _throttle } from 'lodash'
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
      type: [Object, Array, Boolean, String],
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
    passwordValidator: {
      required: false,
      type: Boolean,
      default: false
    },
    passwordMatch: {
      required: false,
      type: [Boolean, String],
      default: false
    },
    emailValidator: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      error_: false,
      showPassword: false,

      contains_lowercase: false,
      contains_number: false,
      contains_uppercase: false,
      contains_specials: false,
      valid_password: false,
      valid_password_length: false,
      password_valid: false,
      password_match: false,

      email_valid: false

    }
  },
  computed: {
    inputError () {
      return this.error_ || this.error
    },
    errorMessage () {
      if (this.error_) { return this.error_ }
      if (!this.error) { return '' }
      return Array.isArray(this.error) ? this.error[0] : this.error
    },
    inputValid () {
      if (this.passwordValidator && this.password_valid) { return true } else if (this.passwordMatch && this.password_match) { return true } else if (this.emailValidator && this.email_valid) { return true } else { return false }
    },
    type () {
      if (this.number) { return 'number' }
      return this.password && !this.showPassword ? 'password' : 'text'
    }
  },
  watch: {
    passwordMatch: {
      handler: _throttle(function () {
        this._passwordMatch(this.value)
      }, 500, false, true)
    }
  },
  methods: {
    change (e) {
      this.$emit('input', e.target.value)
    },
    input (e) {
      if (this.passwordValidator) {
        this._passwordValidator(e.target.value)
      }
      if (this.passwordMatch) {
        this._passwordMatch(e.target.value)
      }
      if (this.emailValidator) {
        this._emailValidator(e.target.value)
      }
    },
    keypress (e) {
      this.$emit('keypress', e)
    },
    _passwordValidator (value) {
      this.contains_lowercase = /^(?=.*[a-z])/.test(value)
      this.contains_number = /^(?=.*[0-9])/.test(value)
      this.contains_uppercase = /^(?=.*[A-Z])/.test(value)
      this.contains_specials = /^(?=.*[!@#$%^&*])/.test(value)
      this.valid_password_length = /^(?=.{8,})/.test(value)

      // Check if the password is valid
      if (this.contains_lowercase === true &&
        this.contains_number === true &&
        this.contains_uppercase === true &&
        this.contains_specials === true &&
        this.valid_password_length === true) {
        this.password_valid = true
      } else {
        this.password_valid = false
      }
      this.$emit('passwordValid', this.password_valid)
    },
    _passwordMatch (value) {
      this.password_match = this.passwordMatch === value
      this.$emit('passwordMatch', this.password_match)
      this.error_ = this.password_match ? null : 'Password does not match'
    },
    _emailValidator (value) {
      this.email_valid = /\S+@\S+\.\S+/.test(value)
      this.$emit('emailValid', this.email_valid)
      this.error_ = this.email_valid ? null : 'Email is not valid'
    }
  }
}
</script>

<style scoped>
.passwordValidator > div {
  @apply w-3/12 bg-gray-200 rounded py-1 text-center ml-2 text-xs text-gray-500;
}
.passwordValidatorLength{
  @apply bg-gray-200 rounded py-1 px-4 mr-2 text-center ml-2 text-xs text-gray-500;
}
.passwordValidator > div.valid {
  @apply bg-green-200 text-green-600;
}
.passwordValidatorLength.valid{
  @apply bg-green-200 text-green-600;
}
.passwordValidator > div:first-child{ @apply ml-0; }
</style>
