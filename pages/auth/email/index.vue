<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Email verification
      </h1>
      <form
        action="#"
        class="bg-white p-8 rounded-lg w-full mb-6 md:w-8/12 lg:w-6/12"
        @submit.prevent="verifyEmail"
      >
        <div class="m-auto mb-6 px-4 md:w-10/12 text-center">
          An email has been sent to you.
          Please confirm yourself by clicking on verify user button sent to you on your email!

          <a href="#" @click.prevent="sendEmail">
            Send me another email
          </a>
        </div>

        <div>
          <NizInputText
            v-model="secret"
            class="w-40 mx-auto"
            name="secret"
            :number="true"
            :error="error"
            :error-message="error"
            @keypress="validator"
          />
        </div>

        <div class="text-center">
          <NizButtonSubmit
            class="mx-auto w-32"
            value="Verify"

            :loading="submitting"
          />
          <input type="number" maxlength="6">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      secret: '',
      submitting: false,
      error: null
    }
  },
  methods: {
    validator (e) {
      console.log(this.secret.length)
      if (this.secret.length > 5) { e.preventDefault() }
    },
    async sendEmail () {
      try {
        this.loading = true
        const response = await this.$axios.$get('auth/email/resend')
        this.$notifySuccess({ title: 'Email resent!', text: response.message })
      } catch (e) {
        if (e.response.status === 422) {
          this.$notifyError({ title: 'Error', text: e.response.data.error })
        }
      }
      this.loading = false
    },
    async verifyEmail () {
      try {
        this.submitting = true
        const response = await this.$axios.$get(`auth/email/verify/${this.secret}/`)
        this.$notifySuccess({ title: response.message, text: 'Your email is now verified' })
        await this.$auth.fetchUser()
        this.$router.push({
          name: 'dashboard'
        })
      } catch (e) {
        if (!e.response) {
          this.$notifyError({ text: 'Sorry, there is an error :(' })
        } else if (e.response.status === 422) {
          this.$notifyError({ title: 'Error', text: e.response.data.error })
        }
      }
      this.submitting = false
    }

  },
  head () {
    return {
      title: 'Verification'
    }
  },

  middleware: ['auth', 'notVerified']
}
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
