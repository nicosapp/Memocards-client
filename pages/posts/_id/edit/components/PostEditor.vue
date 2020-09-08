<template>
  <div>
    <textarea ref="textarea" />
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      tinymce: null
    }
  },

  computed: {
    document () {
      //   return this codemirror.getDoc()
      return ''
    }
  },

  mounted () {
    // const TinyMCE = require('tinymce')

    // this.tinymce = TinyMCE.fromTextArea(this.$refs.textarea, {

    // })

    // this.document.setValue(this.post.post_content)
    // this.document.on('change', (document) => {
    //   this.$emit('input', document.getValue())
    // })
  }
}
</script>

<style scoped>

</style>
