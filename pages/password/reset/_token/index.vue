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
        <div class="mb-6">
          <label
            for="email"
            class="block text-gray-600 font-medium mb-2"
            :class="{
              'text-red-500':validation.email
            }"
          >Email</label>

          <input
            id="email"
            v-model="form.email"
            type="text"
            name="email"
            class="border-2 border-gray-400 rounded block w-full p-3"
            :class="{
              'border-red-500':validation.email
            }"
          >
          <div
            v-if="validation.email"
            class="text-red-500 mb-4 text-sm mt-1"
          >
            {{ validation.email[0] }}
          </div>
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block text-gray-600 font-medium mb-2"
            :class="{
              'text-red-500':validation.password
            }"
          >Password</label>

          <input
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            class="border-2 border-gray-400 rounded block w-full p-3"
            :class="{
              'border-red-500':validation.password
            }"
          >

          <div
            v-if="validation.password"
            class="text-red-500 mb-4 text-sm mt-1"
          >
            {{ validation.password[0] }}
          </div>
        </div>

        <div class="mb-6">
          <label
            for="password_confirmation"
            class="block text-gray-600 font-medium mb-2"
            :class="{
              'text-red-500':validation.password_confirmation
            }"
          >Password confirmation</label>

          <input
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            name="password_confirmation"
            class="border-2 border-gray-400 rounded block w-full p-3"
            :class="{
              'border-red-500':validation.password_confirmation
            }"
          >

          <div
            v-if="validation.password_confirmation"
            class="text-red-500 mb-4 text-sm mt-1"
          >
            {{ validation.password_confirmation[0] }}
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="bg-blue-500 text-white p-4 rounded text-center font-medium block w-full"
          >
            Update
          </button>
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
        password: null,
        password_confirmation: null
      },
      validation: {}
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
  }
}
</script>
