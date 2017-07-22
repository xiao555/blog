import Category from '../models/category.js'
import Tag from '../models/tag.js'
import Article from '../models/article.js'
import log from '../utils/log'
import dateFormat from 'dateformat'

import marked from 'marked'
import uslug from 'uslug'

export default model => {
  return {
    find: async ctx => {
      try {
        const query = ctx.request.query
        let conditions = query ? query : {}
        let results = await model.find(conditions).exec()
        ctx.body = results;
      } catch(e) {
        log.error(e)
      }
    },
    create: async ctx => {
      try {
        const body = ctx.request.body
        if (model.modelName === 'article') {
          markdownParse(body);
          !!body.tags && await saveTags(body.tags)
          !!body.category && await saveCategory(body.category)
        }
        ctx.body = await model.create(body)
      } catch(e) {
        // statements
        log.error(e)
      }
    },
    findById: async ctx => {
      try {
        const result = await model.findById(ctx.params.id)
        if (result) ctx.body = result
      } catch(e) {
        // statements
        log.error(e)
      }
    },
    updateById: async ctx => {
      try {
        const body = ctx.request.body
        const id = ctx.params.id
        if (model.modelName === 'article') {
          markdownParse(body);
          await deletePost(ctx.params.id);
          !!body.tags && await saveTags(body.tags)
          !!body.category && await saveCategory(body.category)
          ctx.request.body.lastEditTime =  dateFormat(new Date(), 'yyyy-mm-dd')
        }
        const result = await model.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true})
        if (result) return ctx.body = result
      } catch(e) {
        log.error(e)
      }
    },
    deleteById: async ctx => {
      try {
        if (model.modelName === 'article') {
          await deletePost(ctx.params.id);
        }
        const result = await model.findByIdAndRemove(ctx.params.id)
        if (result) ctx.status = 204
      } catch(e) {
        log.error(e)
      }
    },
    login: async ctx => {
      try {
        const query = ctx.request.query
        let conditions = query ? query : {}
        const result = await model.findOne(conditions)
        ctx.body = {
          status: result ? 'success' : 'fail',
          user: result
        }
      } catch(e) {
        log.error(e)
      }
    }
  }
}

async function deletePost (id) {
  try {
    const post = await Article.findById(id)
    const tags = post.tags
    await tags.forEach( async (element, index) => {
      let tag = await Tag.findOne({name: element})
      const result = await Tag.findByIdAndUpdate(tag._id, { number: tag.number > 0 ? --tag.number : 0}, {new: true})
    });
    const category = post.category
    let _category = await Category.findOne({name: category})
    const result = await Category.findByIdAndUpdate(_category._id, { number: --_category.number}, {new: true})
  } catch(e) {
    log.error(e)
  }
}

function markdownParse(post) {
  post.excerpt = marked(post.excerptMarkdown);
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

  let result =  marked(post.markdown, { renderer: renderer })
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

async function saveTags (tags) {
  const promise = tags.map( tag => {
    return new Promise( async resolve => {
      try {
        // if has been saved
        let isSaved = false
        await Tag.findOne({ name: tag }).then( async doc => {
          if (doc) {
            const _doc = await Tag.findByIdAndUpdate(doc._id, { number: ++doc.number}, {new: true})
            if ( _doc && _doc.number === doc.number) isSaved = true
          }
        })
        // new tag
        if (!isSaved) {
          const _tag = await Tag.create({
            name: tag
          })
        }
        resolve()
      } catch(e) {
        log.error(e)
      }

    })
  })

  return await Promise.all(promise).catch(e => {
    log.error(e)
  })
}

async function saveCategory (category) {
  try {
    let isSaved = false
    await Category.findOne({ name: category }).then( async doc => {
      if (doc) {
        const _doc = await Category.findByIdAndUpdate(doc._id, { number: ++doc.number}, {new: true})
        if ( _doc && _doc.number === doc.number) isSaved = true
      }
    })
    if (!isSaved) {
      return await Category.create({
        name: category
      })
    }
  } catch(e) {
    log.error(e)
  }
}
