<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
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
      <form
        action="#"
        class="w-full mb-6 md:w-8/12 lg:w-7/12"
      >
        <div class="flex justify-between">
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

        <div class="flex justify-between">
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

        <!-- PASSWORD -->
        <div class="mb-6">
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
          <div class="text-sm text-gray-500">
            Leave blank to keep the same
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="bg-blue-500 text-white p-4 rounded text-center font-medium block w-full"
            @click.prevent="submit"
          >
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
        email: this.$auth.user.email,
        name: this.$auth.user.name,
        username: this.$auth.user.username,
        firstname: this.$auth.user.firstname,
        password: ''
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
