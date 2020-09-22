<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Sign Up!
      </h1>
      <form
        action="#"
        class="bg-white p-8 rounded w-full mb-6 md:w-10/12 lg:w-8/12"
      >
        <div class="flex justify-between flex-wrap lg:flex-no-wrap">
          <!-- EMAIL -->
          <div class="mb-6 w-full">
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

          <!-- USERNAME -->
          <div class="mb-6 w-full lg:ml-4">
            <label
              for="email"
              class="block text-gray-600 font-medium mb-2"
              :class="{
                'text-red-500':validation.username
              }"
            >Username</label>

            <input
              id="email"
              v-model="form.username"
              type="text"
              name="email"
              class="border-2 border-gray-400 rounded block w-full p-3"
              :class="{
                'border-red-500':validation.username
              }"
            >
            <div
              v-if="validation.username"
              class="text-red-500 mb-4 text-sm mt-1"
            >
              {{ validation.username[0] }}
            </div>
          </div>
        </div>

        <div class="flex justify-between flex-wrap lg:flex-no-wrap">
          <!-- FIRSTNAME -->
          <div class="mb-6 w-full">
            <label
              for="name"
              class="block text-gray-600 font-medium mb-2"
              :class="{
                'text-red-500':validation.firstname
              }"
            >First name</label>

            <input
              id="name"
              v-model="form.firstname"
              type="text"
              name="name"
              class="border-2 border-gray-400 rounded block w-full p-3"
              :class="{
                'border-red-500':validation.firstname
              }"
            >
            <div
              v-if="validation.firstname"
              class="text-red-500 mb-4 text-sm mt-1"
            >
              {{ validation.firstname[0] }}
            </div>
          </div>
          <!-- NAME -->
          <div class="mb-6 w-full lg:ml-4">
            <label
              for="name"
              class="block text-gray-600 font-medium mb-2"
              :class="{
                'text-red-500':validation.name
              }"
            >Last name</label>

            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              class="border-2 border-gray-400 rounded block w-full p-3"
              :class="{
                'border-red-500':validation.name
              }"
            >
            <div
              v-if="validation.name"
              class="text-red-500 mb-4 text-sm mt-1"
            >
              {{ validation.name[0] }}
            </div>
          </div>
        </div>

        <div class="flex justify-between flex-wrap lg:flex-no-wrap">
          <!-- PASSWORD -->
          <div class="mb-6 w-full">
            <label
              for="password"
              class="block text-gray-600 font-medium mb-2"
              :class="{
                'text-red-500':validation.password
              }"
            >Password</label>

            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
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

          <!-- PASSWORD CONFIRMATION -->
          <div class="mb-6  w-full lg:ml-4">
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
              autocomplete="new-password"
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
        </div>
        {{ form }}
        <div>
          <button
            type="submit"
            class="bg-blue-500 text-white p-4 rounded text-center font-medium block w-full"
            @click.prevent="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div class="text-center text-gray-600">
        Already an account?
        <nuxt-link
          :to="{name: 'auth-signin'}"
        >
          Sign in here
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
        name: '',
        firstname: '',
        username: '',
        password: '',
        password_confirmation: ''
      },
      validation: {

      }
    }
  },
  methods: {
    async submit () {
      try {
        await this.$axios.$post('auth/signup', this.form)

        this.$router.push({
          name: 'auth-email'
        })
        // await this.$auth.loginWith('local', {
        //   data: {
        //     email: this.form.email,
        //     password: this.form.password
        //   }
        // })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
        }
      }
    }
  },
  head () {
    return {
      title: 'Sign up'
    }
  }
}
</script>
