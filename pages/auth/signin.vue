<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Hello.
      </h1>
      <form
        action="#"
        class="bg-white p-8 rounded w-full mb-6 md:w-6/12 lg:w-4/12"
        @submit.prevent="submit"
      >
        <NizInputText
          v-model="form.email"
          label="Email"
          :error="validation.email"
          placeholder="Email"
          name="email"
          class="w-full"
        >
          <slot slot="before">
            <IconAtSymbol class="stroke-2 text-gray-400 h-6 w-6 ml-2" />
          </slot>
        </NizInputText>

        <NizInputText
          v-model="form.password"
          label="Password"
          :error="validation.password"
          placeholder="Password"
          name="password"
          :password="true"
          class="w-full"
        >
          <div class="text-sm text-gray-600 mb-6 flex justify-end">
            <nuxt-link
              :to="{
                name:'password-reset'
              }"
            >
              Forgot your password?
            </nuxt-link>
          </div>
        </NizInputText>

        <div>
          <NizButtonSubmit
            value="Signin"
            class="w-full"
            :loading="loading"
            :disabled="submitDisabled"
          />
        </div>
      </form>
      <div class="text-center text-gray-600">
        No account?
        <nuxt-link
          :to="{name: 'auth-signup'}"
        >
          Create one here
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      validation: {},
      loading: false
    }
  },
  computed: {
    submitDisabled () {
      return this.form.email.length === 0 || this.form.password.length === 0
    }
  },
  methods: {
    async submit () {
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: this.form
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
        }
      }
      this.loading = false
    }
  },
  head () {
    return {
      title: 'Sign in'
    }
  }
}
</script>
