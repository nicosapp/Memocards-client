<template>
  <div>
    <PageTitle
      title="Sorry"
    />
    <div class="container">
      Sorry page!
    </div>
    <button type="button" value="notification" @click.prevent="click">
      Notification
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    click () {
      this.$notifyError({ title: 'Error', text: 'Custom message' })
      this.$notifySuccess({ title: 'Success', text: 'Custom message' })
      this.$notifyWarn({ title: 'Warn', text: 'Custom text' })
      this.$notifyInfo({ title: 'Info', text: 'Custom text' })
    }
  },
  head () {
    return {
      title: 'Sorry'
    }
  }
}
</script>
