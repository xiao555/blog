const markdownEditor = require('../components/markdown-editor.vue')

const VueSimplemde = {
  markdownEditor: markdownEditor,
  install: function (Vue) {
    Vue.component('markdown-editor', markdownEditor)
  }
}

module.exports = VueSimplemde
