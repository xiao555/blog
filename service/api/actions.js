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
        let select = {}
        ctx.body = await model.find(query).exec()
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
        const result = await model.findByIdAndUpdate(ctx.params.id, ctx.request.body, {new: true})
        if (result) ctx.body = result 
      } catch(e) {
        // statements
        log.error(e)
      }
    },
    deleteById: async ctx => {
      try {
        const result = await model.findByIdAndRemove(ctx.params.id)
        if (result) ctx.status = 204
      } catch(e) {
        // statements
        log.error(e)
      }
    },
    login: async ctx => {
      try {
        const query = ctx.request.query
        let conditions = query ? query : {}
        const result = await model.findOne(conditions)
        ctx.body = {}
        ctx.body.status = result ? 'yes' : 'no'
        ctx.body.user = result
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
        // statements
        console.log(e);
      }
      
    })
  })

  return await Promise.all(promise).catch(e => {
    log.error(e)
  })
}

async function saveCategory (category) {
  return await Category.create({
    name: category
  }).catch(e => {
    log.error(e)
  })
}

( async () => {
  try {
    await Category.remove({}).then(() => {
      console.log('Delete all Category')
    })
  } catch(e) {
    console.log(e);
  }
  try {
    await Article.remove({}).then(() => {
      console.log('Delete all Article')
    })
  } catch(e) {
    console.log(e);
  }
  try {
    await Tag.remove({}).then(() => {
      console.log('Delete all Tag')
    })
  } catch(e) {
    console.log(e);
  }

const article1 = {
  title: 'test1',
  path: 'test1',
  tags: ['tag1', 'tag2'],
  excerpt: 'excerpt',
  content: 'content',
  category: 'test',
  createTime: new Date(),
};

const article2 = {
  title: 'test2',
  path: 'test2',
  tags: ['tag1', 'tag3'],
  excerpt: 'excerpt',
  content: 'content',
  category: 'test',
  createTime: new Date(),
};

const article3 = {
  title: 'test3',
  path: 'test3',
  tags: ['tag1', 'tag4'],
  excerpt: 'excerpt',
  content: 'content',
  category: 'test',
  createTime: new Date(),
  isPublic: false
};

  try {
    // statements
    await saveTags(article1.tags),
    await saveCategory(article1.category)
    const res = await Article.create(article1)
    if(res) {
      console.log(`Saved article1`)
    }
  } catch(e) {
    // statements
    console.log(e);
  }
  try {
    // statements
    await saveTags(article2.tags),
    await saveCategory(article2.category)
    const res = await Article.create(article2)
    if(res) {
      console.log(`Saved article2`)
    }
  } catch(e) {
    // statements
    console.log(e);
  }
  try {
    // statements
    await saveTags(article3.tags),
    await saveCategory(article3.category)
    const res = await Article.create(article3)
    if(res) {
      console.log(`Saved article3`)
    }
  } catch(e) {
    // statements
    console.log(e);
  }

  
})()







