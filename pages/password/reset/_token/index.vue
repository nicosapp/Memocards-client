<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Reset your password
      </h1>
      <form
        action="#"
        class="bg-white p-8 rounded w-full mb-6 md:w-6/12 lg:w-4/12"
        @submit.prevent="resetPassword"
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
        />

        <NizInputText
          v-model="form.password_confirmation"
          label="Password confirmation"
          :error="validation.password_confirmation"
          placeholder="Confirmation"
          name="password"
          :password="true"
          class="w-full"
        />
        <div>
          <NizButtonSubmit
            value="Reset"
            class="w-full"
            :disabled="submitDisabled"
          />
        </div>
      </form>
      <!-- {{ form }} -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        token: this.$route.params.token,
        email: this.$route.query.email,
        password: '',
        password_confirmation: ''
      },
      validation: {}
    }
  },
  computed: {
    submitDisabled () {
      return this.form.email.length === 0 || this.form.password.length === 0 ||
      this.form.password_confirmation.length === 0
    }
  },
  methods: {
    async resetPassword () {
      try {
        await this.$axios.post('/password/reset', {
          token: this.$route.params.token,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation
        })
        this.$notifySuccess({
          title: 'Password reset',
          text: 'Your password is reset!'
        })
        this.$router.push({
          name: 'auth-signin'
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.error
          this.$notifyError({ text: 'There is an error in the form' })
        }
      }
    }
  },
  head () {
    return {
      title: 'Reset'
    }
  }
}
</script>
