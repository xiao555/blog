import Category from '../../models/category.js'


export default (router) => {
  router
    .get('/categorys',
      async ctx => {
        
        ctx.body = await Category.find({})
      }
    )
    .post('/categorys', async ctx => {
      let req = ctx.request.body
      ctx.body = await Category.create({
        name: req.name,
      })
    })
    .get('/categorys/:id',
      async ctx => {
        const category = await Category.findById(ctx.params.id)
        if(category) ctx.body = category
      }
    )
    .put('/categorys/:id', async ctx => {
      const category = await Category.findByIdAndUpdate(ctx.params.id, {
        name: ctx.request.body.name,
      }, {
        new: true,
      })
      if( category ) ctx.body = category
    })
    .delete('/categorys/:id',
      async ctx => {
        const category = await Category.findByIdAndRemove(ctx.params.id)
        if(category) ctx.status = 204
      }
    )
}