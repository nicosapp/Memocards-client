<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        <template v-if="!sent">
          Send me a link!
        </template>
        <template v-else>
          Link sent!
        </template>
      </h1>
      <form
        action="#"
        class="bg-white p-8 rounded w-full mb-6 md:w-6/12 lg:w-4/12"
        @submit.prevent="requestResetPassword"
      >
        <NizInputText
          v-model="email"
          label="Email"
          :error="validation.email"
          placeholder="Email"
          name="email"
        >
          <slot slot="before">
            <IconAtSymbol class="stroke-2 text-gray-400 h-6 w-6 ml-2" />
          </slot>
        </NizInputText>
        <div>
          <NizButtonSubmit
            class="w-full"
            value="Send email"
            :disabled="submitDisabled"
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
      email: '',
      validation: {},
      sent: null
    }
  },
  computed: {
    submitDisabled () {
      return this.email.length === 0
    }
  },
  methods: {
    async requestResetPassword () {
      try {
        await this.$axios.post('/password/email',
          { email: this.email }
        )
        this.$notifySuccess({
          title: 'Email sent',
          text: 'The email sent successfully!'
        })
        this.sent = true
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
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
