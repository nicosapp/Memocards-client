<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Email verification
      </h1>
      <form
        class="bg-white rounded-lg p-12 text-lg text-center"
        @submit.prevent="verifyEmail"
      >
        <div class="m-auto mb-6 w-8/12">
          An email has been sent to you.
          Please confirm yourself by clicking on verify user button sent to you on your email!

          <a href="#" @click.prevent="sendEmail">
            Send me another email
          </a>
        </div>

        <div class="flex items-center justify-center mb-6">
          <div
            v-for="(value, index) in code"
            :key="index"
            class="mx-1 py-3 px-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            <input
              v-model="code[index]"
              :index="index"
              min="0"
              max="9"
              type="number"
              class="w-10 text-gray-700 font-medium bg-transparent
                outline-none text-center"
            >
          </div>
        </div>

        <div class="text-center">
          <NizButtonSubmit
            class="mx-auto"
            value="Verify"
            :loading="submitting"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: [...Array(6)],
      submitting: false
    }
  },
  computed: {
    secret () {
      return this.code.map(c => c.trim()).join('')
    }
  },
  methods: {
    async sendEmail () {
      try {
        const response = await this.$axios.$get('auth/email/resend')
        this.$notifySuccess({ title: 'Email resent!', text: response.message })
      } catch (e) {
        if (e.response.status === 422) {
          this.$notifyError({ title: 'Error', text: e.response.data.error })
        }
      }
    },
    async verifyEmail () {
      try {
        this.submitting = true
        if (this.checkSecret()) {
          const response = await this.$axios.$get(`auth/email/verify/${this.secret}/`)
          this.$notifySuccess({ title: response.message, text: 'Your email is now verified' })
          await this.$auth.fetchUser()
          this.$router.push({
            name: 'dashboard'
          })
        }
      } catch (e) {
        if (!e.response) {
          this.$notifyError({ text: 'Sorry, there is an error :(' })
        } else if (e.response.status === 422) {
          this.$notifyError({ title: 'Error', text: e.response.data.error })
        }
      }
      this.submitting = false
    },
    checkSecret () {
      if (this.code.filter(num => !num || parseInt(num) < 0 || parseInt(num) > 9).length) {
        this.$notifyError({
          title: 'Error',
          text: 'There is an error in your secret numbers'
        })
        return false
      }
      return true
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
