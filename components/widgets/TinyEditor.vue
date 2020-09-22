<template>
  <div>
    <textarea :id="randomId" class="w-full" />
  </div>
</template>

<script>
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
// import 'tinymce/skins/content/default/content.css'

export default {
  props: {
    body: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      editor: null
    }
  },
  computed: {
    randomId () {
      return Math.random().toString(36).substr(2, 9)
    }
  },
  mounted () {
    // Import TinyMCE
    const tinymce = require('tinymce/tinymce')

    // Default icons are required for TinyMCE 5.3 or above
    require('tinymce/icons/default')

    // A theme is also required
    require('tinymce/themes/silver')

    // Any plugins you want to use has to be imported
    require('tinymce/plugins/paste')
    require('tinymce/plugins/autolink')
    require('tinymce/plugins/lists')
    require('tinymce/plugins/link')
    require('tinymce/plugins/advlist')
    require('tinymce/plugins/image')
    require('tinymce/plugins/charmap')
    require('tinymce/plugins/anchor')
    require('tinymce/plugins/searchreplace')
    require('tinymce/plugins/visualblocks')
    require('tinymce/plugins/fullscreen')
    require('tinymce/plugins/insertdatetime')
    require('tinymce/plugins/media')
    require('tinymce/plugins/table')
    require('tinymce/plugins/help')
    require('tinymce/plugins/wordcount')
    require('tinymce/plugins/print')
    require('tinymce/plugins/preview')
    require('tinymce/plugins/code')

    // require.context(
    //   'file-loader?name=[path][name].[ext]&context=node_modules/tinymce!tinymce/skins',
    //   true,
    //   /.*/
    // )

    // Initialize the app
    const self = this
    tinymce.init({
      selector: '#' + this.randomId,
      height: 500,
      skin: false,
      content_css: false,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
          'undo redo | formatselect | bold italic backcolor |' +
           'alignleft aligncenter alignright alignjustify | ' +
           'bullist numlist outdent indent | removeformat | help',
      setup (editor) {
        editor.on('keyup', () => {
          self.$emit('input', editor.getBody().innerHTML)
        })
      }
    })
    this.editor = tinymce.get(this.randomId)
    this.editor.setContent(this.body)
    //    external_plugins: {
    //     'myplugin': '/js/myplugin/plugin.min.js'
    //   }
  }
}
</script>
