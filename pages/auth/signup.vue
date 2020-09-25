<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        {{ $t('Sign up') }}!
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
            :email-validator="true"
            placeholder="Email"
            name="email"
            class="w-full"
            @emailValid="(valid)=>{emailValid=valid}"
          >
            <slot slot="before">
              <IconAtSymbol class="stroke-2 text-gray-400 h-6 w-6 ml-2" />
            </slot>
          </NizInputText>

          <!-- USERNAME -->
          <NizInputText
            v-model="form.username"
            :label="$t('Username')"
            :error="validation.username"
            :placeholder="$t('Username')"
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
            :label="$t('Password')"
            :error="validation.password"
            :placeholder="$t('Password')"
            name="password"
            :password="true"
            :password-validator="true"
            class="w-full"
            @passwordValid="(valid)=>{ passwordValid=valid }"
          />

          <NizInputText
            v-model="form.password_confirmation"
            :label="$t('Password confirmation')"
            :error="validation.password_confirmation"
            placeholder="Confirmation"
            name="password"
            :password="true"
            class="w-full md:ml-4"
            :password-match="form.password"
            @passwordMatch="(match)=>{ passwordMatch=match }"
          />
        </div>

        <div>
          <NizButtonSubmit
            :value="$t('Sign up')"
            class="w-full"
            :loading="loading"
            :disabled="submitDisabled"
          />
        </div>
      </form>
      <div class="text-center text-gray-600">
        {{ $t('Already an account?') }}
        <nuxt-link
          :to="{name: 'auth-signin'}"
        >
          {{ $t('Sign in here') }}
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
      validation: {},
      passwordValid: false,
      passwordMatch: false,
      emailValid: false
    }
  },
  computed: {
    submitDisabled () {
      return this.form.email.length === 0 ||
      this.form.username.length === 0 ||
      this.form.password.length === 0 ||
      this.form.password_confirmation.length === 0 ||
      this.passwordValid === false ||
      this.passwordMatch === false ||
      this.emailValid === false
    }
  },
  methods: {
    async submit () {
      if (this.submitDisabled) {
        this.$notifyError({ title: 'Error', text: 'Some fields are invalid!' })
        return
      }
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
