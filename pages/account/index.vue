<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        {{ $auth.user.name }}
      </h1>
      <form
        action="#"
        class="bg-white p-8 rounded w-full mb-6 md:w-6/12 lg:w-4/12"
        @click.prevent="submit"
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

        <div>
          <button type="submit" class="bg-blue-500 text-white p-4 rounded text-center font-medium block w-full">
            Update
          </button>
        </div>
      </form>
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
      validation: {

      }
    }
  },
  methods: {
    async submit () {
      try {
        await this.$auth.loginWith('local', {
          data: this.form
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
        }
      }
    }
  },
  middleware: ['auth'],
  head () {
    return {
      title: 'Sign in'
    }
  }
}
</script>
