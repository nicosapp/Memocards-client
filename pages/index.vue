<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container flex py-16 lg:py-32">
        <div class="w-full lg:w-6/12">
          <h1 class="text-5xl font-medium text-gray-700 leading-tight mb-6">
            Browse and create note cards quickly and simply
          </h1>
          <p class="text-xl text-gray-600 mb-12">
            Make simple to memorize useful information by writing your own note cards on the go!
          </p>
          <nuxt-link
            class="inline-block text-lg py-3 px-5 bg-blue-500 text-white rounded-lg"
            :to="{
              name:'auth-signup',
            }"
          >
            Start writing &rarr;
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="container">
      Page view
      Edit page view
      Dashboard page view
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>

<style>

</style>
