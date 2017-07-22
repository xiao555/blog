import Article from '../server/models/article.js'
import log from '../server/utils/log'
import marked from '../server/node_modules/marked'
import uslug from '../server/node_modules/uslug'
import mongoose from '../server/node_modules/mongoose'
mongoose.Promise = global.Promise;

;(async () => {
  try {
    let results = await Article.find({}).exec()
    // 渲染旧文章，待删
    results.forEach( (post) => {
      if (post.toc === '') {
        post.markdown = post.content
        post.excerptMarkdown = post.excerpt
        markdownParse(post)
        Article.findByIdAndUpdate(post.id, post, {new: true})
      }
    })
  } catch(e) {
    log.error(e);
  }
})()

function markdownParse(post) {
  post.excerpt = marked(post.excerpt);
  const renderer = new marked.Renderer()
  let headings = []
  renderer.heading = (text, level) => {
    const escapedText = uslug(text)
    headings.push({
      id: escapedText,
      text: text,
      count: 0,
      level: level
    })
    return `<h${level} id="${escapedText}">${text}</h${level}>\n`
  }

  // Synchronous highlighting with highlight.js
  marked.setOptions({
    highlight: function (code) {
      return require('highlight.js').highlightAuto(code).value;
    }
  })

  let result =  marked(post.content, { renderer: renderer })
  let toc = "<ul id='toc'>\n"
  let currLevel = headings[0].level
  for (let i = 0; i < headings.length; i++) {
    if (headings[i].level == currLevel) {
      toc += `<li><a href="#${headings[i].id}">${headings[i].text}</a>\n`
    } else if (headings[i].level > currLevel) {
      toc += `<ul><li><a href="#${headings[i].id}">${headings[i].text}</a>\n`
    } else {
      toc += `</ul>\n<li><a href="#${headings[i].id}">${headings[i].text}</a>\n`
    }
    currLevel = headings[i].level
  }
  toc += "</ul>"
  post.content = result;
  post.toc = toc;
}