import Category from '../models/category.js'
import Tag from '../models/tag.js'
import Article from '../models/article.js'
import log from '../utils/log'

export default model => {
  return {
    find: async ctx => {
      try {
        const query = ctx.request.query
        let conditions = query ? query : {}
        console.log(conditions)
        ctx.body = await model.find(conditions).exec()
      } catch(e) {
        log.error(e)
      }
    },
    create: async ctx => {
      try {
        const body = ctx.request.body
        if (model.modelName === 'article') {
          await saveTags(body.tags)
          await saveCategory(body.category)
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
        console.log(ctx.params.id)
        console.log(ctx.request.body)
        console.log(model.modelName)
        const body = ctx.request.body
        const id = ctx.params.id
        if (model.modelName === 'article') {
          await deletePost(ctx.params.id);
          await saveTags(body.tags)
          await saveCategory(body.category)
        }
        const result = await model.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true})
        console.log(result)
        if (result) return ctx.body = result 
      } catch(e) {
        log.error(e)
      }
    },
    deleteById: async ctx => {
      try {
        console.log(ctx.url)
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

async function saveTags (tags) {
  const promise = tags.map( tag => {
    return new Promise( async resolve => {
      try {
        // if has been saved
        let isSaved = false
        await Tag.findOne({ name: tag }).then( async doc => {
          console.log(tag, doc)
          if (doc) {
            const _doc = await Tag.findByIdAndUpdate(doc._id, { number: ++doc.number}, {new: true})
            if ( _doc && _doc.number === doc.number) isSaved = true
          }
        })
        console.log(isSaved)
        // new tag
        if (!isSaved) {
          const _tag = await Tag.create({
            name: tag
          })
          console.log('new tag')
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
      console.log(category, doc)
      if (doc) {
        const _doc = await Category.findByIdAndUpdate(doc._id, { number: ++doc.number}, {new: true})
        if ( _doc && _doc.number === doc.number) isSaved = true
      }
    })
    console.log(isSaved)
    if (!isSaved) {
      return await Category.create({
        name: category
      })
      console.log('new Category')
    }
  } catch(e) {
    log.error(e)
  }
}

