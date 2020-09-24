<template>
  <div>
    <div class="flex flex-col items-center bg-white pt-10">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Hello. {{ $auth.user.firstname }} {{ $auth.user.name }}
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

        <div class="md:flex justify-between">
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
        </div>

        <div class="md:flex justify-between">
          <!-- PASSWORD -->
          <NizInputText
            v-model="form.password"
            label="Password"
            :error="validation.password"
            placeholder="Password"
            name="password"
            :password="true"
            class="w-full"
          >
            <div class="text-sm text-gray-500">
              Leave blank to keep the same
            </div>
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
            value="Update"
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
        username: this.$auth.user.username,
        firstname: this.$auth.user.firstname,
        password: '',
        password_confirmation: ''
      },
      validation: {},
      mediaTypes: {},
      progress: 0
    }
  },

  computed: {
    avatarUrl () {
      return this.$auth.user.avatar ? this.$auth.user.avatar.url : null
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
          title: 'Profil updated',
          text: 'Your profil is now updated!'
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
      title: this.$options.filters.capitalize(this.$auth.user.username)
    }
  }
}
</script>
