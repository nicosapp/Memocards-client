<template>
  <div>
    <div class="flex flex-col items-center bg-white pt-10">
      <h1 class="text-3xl text-gray-700 text-center font-medium mb-10">
        Hello. {{ $auth.user.name }}
      </h1>
      <div class="flex justify-content items-center mb-6">
        <NizAvatar
          id="avatar"
          :mimetypes="mediaTypes.image || []"
          :url="avatarUrl || null"
          @selected="handleAvatarSelected"
        />
      </div>
    </div>
    <div class="mt-8">
      <form
        action="#"
        class="mb-6 mx-5 lg:mx-auto lg:w-7/12"
        @submit.prevent="submit"
      >
        <div class="md:flex justify-between">
          <NizInputText
            v-model="form.email"
            :email-validator="true"
            label="Email"
            :error="validation.email"
            placeholder="Email"
            name="email"
            class="w-full"
            @emailValid="(valid)=>{emailValid=valid}"
          >
            <slot slot="before">
              <IconAtSymbol class="stroke-2 text-gray-400 h-6 w-6 ml-2" />
            </slot>
          </NizInputText>

          <NizInputText
            v-model="form.name"
            :label="$t('Name')"
            :error="validation.name"
            :placeholder="$t('Name')"
            name="name"
            class="w-full md:ml-4"
          >
            <slot slot="before">
              <IconUserCircle class="stroke-2 text-gray-400 h-6 w-6 ml-2" />
            </slot>
          </NizInputText>
        </div>

        <div class="md:flex justify-between">
          <NizInputText
            v-model="form.firstname"
            :label="$t('First name')"
            :error="validation.firstname"
            :placeholder="$t('First name')"
            name="firstname"
            class="w-full"
          />

          <NizInputText
            v-model="form.lastname"
            :label="$t('Last name')"
            :error="validation.lastname"
            :placeholder="$t('Last name')"
            name="lastname"
            class="w-full md:ml-4"
          />
        </div>

        <div class="md:flex justify-between">
          <!-- PASSWORD -->
          <NizInputText
            v-model="form.password"
            :label="$t('Password')"
            :error="validation.password"
            :password-validator="true"
            placeholder="Password"
            name="password"
            :password="true"
            class="w-full"
            @passwordValid="(valid)=>{ passwordValid=valid }"
          >
            <slot slot="label">
              <span class="text-sm text-gray-500">
                ({{ $t('Leave blank to keep the same') }})
              </span>
            </slot>
          </NizInputText>

          <!-- <NizInputText
            v-model="form.password_confirmation"
            label="Password confirmation"
            :error="validation.password_confirmation"
            placeholder="Confirmation"
            name="password"
            :password="true"
            class="w-full lg:ml-4"
          /> -->
        </div>

        <div>
          <NizButtonSubmit
            :disabled="submitDisabled"
            :value="$t('Update')"
            class="w-full"
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
      form: {
        email: this.$auth.user.email,
        name: this.$auth.user.name,
        lastname: this.$auth.user.lastname,
        firstname: this.$auth.user.firstname,
        password: '',
        password_confirmation: ''
      },
      validation: {},
      mediaTypes: {},
      progress: 0,
      emailValid: false,
      passwordValid: false
    }
  },

  computed: {
    avatarUrl () {
      return this.$auth.user.avatar ? this.$auth.user.avatar.url : null
    },
    submitDisabled () {
      return (this.form.password.length > 0 && this.passwordValid === false)
      // || this.emailValid === false
    }
  },

  mounted () {
    this.getMediaTypes()
  },

  methods: {
    async submit () {
      try {
        await this.$axios.$patch('auth/me', this.form)
        await this.$auth.fetchUser()

        this.form.password = ''
        this.validation = {}
        this.$notifySuccess({
          title: this.$i18n.t('Profil updated'),
          text: this.$i18n.t('Your profil is now updated!')
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
        }
      }
    },

    async getMediaTypes () {
      const response = await this.$axios.$get('media/types')

      this.mediaTypes = response.data
    },

    async handleAvatarSelected (file) {
      this.uploadAvatar(file)

      await this.$auth.fetchUser()
    },

    handleUploadProgress (event) {
      this.progress = parseInt(Math.round(event.loaded / event.total) * 100)
    },

    async uploadAvatar (file) {
      const form = new FormData()
      form.append('media', file)

      try {
        await this.$axios.post('auth/me/avatar', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: this.handleUploadProgress
        })
        this.$notifySuccess({
          title: 'Avatar uploaded',
          text: 'The avatar is now uploaded!'
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.$notify({
            title: 'Error',
            text: e.response.data.message
          })
        }
      }
    }

  },
  middleware: ['auth'],

  head () {
    return {
      title: this.$options.filters.capitalize(this.$auth.user.name)
    }
  }
}
</script>
