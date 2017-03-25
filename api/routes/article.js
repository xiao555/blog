import Article from '../../models/article'
import Category from '../../models/category.js'
import Tag from '../../models/tag.js'


export default (router) => {
  router
    .get('/articles', async ctx => {
      ctx.body = await Article.find({})
    })
    .post('/articles', async ctx => {
      let req = ctx.request.body
      try {
        // statements
      const tags = await getTags(req.tags),
            category = req.category;
      const resCategory = await Category.create({
        name: category
      })

      ctx.body = await Article.create({
        title: req.title,
        visits: req.visits,
        tags: tags,
        createTime: req.createTime || new Date(),
        lastEditTime: req.lastEditTime || new Date(),
        isPublish: req.isPublish || true,
        excerpt: req.excerpt,
        content: req.content,
        category: resCategory._id
      })
      } catch(e) {
        // statements
        console.log(e);
      }
    })
    .get('/articles/:id', async ctx => {
      const article = await Article.findById(ctx.params.id)
      if(article) ctx.body = article
    })
    .put('/articles/:id', async ctx => {
      const  article = await Article.findByIdAndUpdate(ctx.params.id, {
        title: ctx.request.body.title,
      }, {
        new: true
      })
      if(article) ctx.body = article
    })
    .delete('/articles/:id', async ctx => {
      const article = await Article.findByIdAndRemove(ctx.params.id)
      if(article) ctx.status = 204
    })
}

async function getTags(tags) {
  function getTag(tag) {
    return new Promise( async resolve => {
      const tag = await Tag.create({
        name: tag
      })
      resolve(tag)
    })
  }

  const promise = tags.map( tag => {
    return getTag(tag)
  })
  const tagsId = []
  await Promise.all(promise).then( val => {
    val.map( tag => {
      tagsId.push(tag._id)
    })
  }).catch(e => {
    console.log(e)
  })
  return tagsId
}