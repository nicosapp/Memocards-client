<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Sign Up!
      </h1>
      <form
        action="#"
        class="bg-white p-8 rounded w-full mb-6 md:w-10/12 lg:w-8/12"
        @submit.prevent="submit"
      >
        <div class="flex justify-between flex-wrap lg:flex-no-wrap">
          <!-- EMAIL -->
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

          <!-- USERNAME -->
          <NizInputText
            v-model="form.username"
            label="Username"
            :error="validation.username"
            placeholder="Username"
            name="username"
            class="w-full md:ml-4"
          >
            <slot slot="before">
              <IconUserCircle class="stroke-2 text-gray-400 h-6 w-6 ml-2" />
            </slot>
          </NizInputText>
        </div>

        <!-- <div class="flex justify-between flex-wrap lg:flex-no-wrap">
          <NizInputText
            v-model="form.firstname"
            label="First name"
            :error="validation.firstname"
            placeholder="First name"
            name="firstname"
            class="w-full"
          />

          <NizInputText
            v-model="form.name"
            label="Last name"
            :error="validation.name"
            placeholder="Last name"
            name="name"
            class="w-full md:ml-4"
          />
        </div> -->

        <div class="flex justify-between flex-wrap lg:flex-no-wrap">
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
            class="w-full md:ml-4"
          />
        </div>

        <div>
          <NizButtonSubmit
            value="Sign up"
            class="w-full"
            :loading="loading"
            :disabled="submitDisabled"
          />
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
      loading: false,
      validation: {}
    }
  },
  computed: {
    submitDisabled () {
      return this.form.email.length === 0 || this.form.username.length === 0 ||
      this.form.password.length === 0 || this.form.password_confirmation.length === 0
    }
  },
  methods: {
    async submit () {
      try {
        this.loading = true
        this.form.name = this.form.username
        await this.$axios.$post('auth/signup', this.form)

        // await this.$auth.loginWith('local', {
        //   data: {
        //     email: this.form.email,
        //     password: this.form.password
        //   }
        // })
        this.$router.push({
          name: 'auth-email'
        })
        this.$notifySuccess({ title: 'Sign up!', text: 'Your successfully sign up!' })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
          this.loading = false
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
