<template>
  <div class="text-blue-500 border border-border bg-bg-light rounded-lg p-4">
    <h2 class="font-medium text-2xl text-text">
      Table of Content
    </h2>
    <div ref="toc" class="toc-container text-sm" />
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
  mounted () {
    if (this.post.post_content) {
      this.tocGenerator()
    }
  },
  methods: {
    tocGenerator () {
      let toc = ''
      let level = 0
      // const maxLevel = 3

      const newPostContent =
          this.post.post_content.replace(
            /<h([\d])>([^<]+)<\/h([\d])>/gi,
            function (str, openLevel, titleText, closeLevel) {
              if (openLevel !== closeLevel) {
                return str + ' - ' + openLevel
              }

              if (openLevel > level) {
                toc += (new Array(openLevel - level + 1)).join('<ol>')
              } else if (openLevel < level) {
                toc += (new Array(level - openLevel + 1)).join('</ol>')
              }

              level = parseInt(openLevel)

              const anchor = titleText.replace(/ /g, '_')
              toc += '<li><a href="#' + anchor + '">' + titleText +
                      '</a></li>'

              return '<h' + openLevel + '><a name="' + anchor + '">' +
                      titleText + '</a></h' + closeLevel + '>'
            }
          )

      if (level) {
        toc += (new Array(level + 1)).join('</ol>')
      }
      this.$emit('tocCreated', newPostContent)

      this.$refs.toc.innerHTML = toc
    }
  }
}
</script>
