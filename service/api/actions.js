import Category from '../models/category.js'
import Tag from '../models/tag.js'

export default model => {
  return {
    find: async ctx => {
      try {
        const query = ctx.request.query
        let conditions = {}
        let select = {}
        ctx.body = await model.find(conditions)
      } catch(e) {
        console.log(e);
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
        console.log(e);
      }
    },
    findById: async ctx => {
      try {
        const result = await model.findById(ctx.params.id)
        if (result) ctx.body = result
      } catch(e) {
        // statements
        console.log(e);
      }
    },
    updateById: async ctx => {
      try {
        const result = await model.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true})
        if (result) ctx.body = result 
      } catch(e) {
        // statements
        console.log(e);
      }
    },
    deleteById: async ctx => {
      try {
        const result = await model.findByIdAndRemove(ctx.params.id)
        if (result) ctx.status = 204
      } catch(e) {
        // statements
        console.log(e);
      }
    }
  }
}

async function saveTags (tags) {
  const promise = tags.map( tag => {
    return new Promise( async resolve => {
      const _tag = await Tag.create({
        name: tag
      })
      resolve(_tag)
    })
  })

  return await Promise.all(promise).catch(e => {
    console.log(e)
  })
}

async function saveCategory (category) {
  return await Category.create({
    name: category
  }).catch(e => {
    console.log(e)
  })
}