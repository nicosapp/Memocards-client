<template>
  <div>
    <PageTitle
      title="Search"
    >
      <input
        type="text"
        class="w-full border-2 border-gray-400 rounded-lg block p-4 text-large"
        placehoder="Search Post"
      >
    </PageTitle>
  </div>
</template>

<script>
import PageTitle from '@/components/pages/PageTitle'
export default {
  components: {
    PageTitle
  }
}
</script>
