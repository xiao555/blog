import Tag from '../../models/tag.js'


export default (router) => {
  router
    .get('/tags',
      async ctx => {
        
        ctx.body = await Tag.find({})
      }
    )
    .post('/tags', async ctx => {
      let req = ctx.request.body
      ctx.body = await Tag.create({
        name: req.name,
      })
    })
    .get('/tags/:id',
      async ctx => {
        const tag = await Tag.findById(ctx.params.id)
        if(tag) ctx.body = tag
      }
    )
    .put('/tags/:id', async ctx => {
      const tag = await Tag.findByIdAndUpdate(ctx.params.id, {
        name: ctx.request.body.name,
      }, {
        new: true,
      })
      if( tag ) ctx.body = tag
    })
    .delete('/tags/:id',
      async ctx => {
        const tag = await Tag.findByIdAndRemove(ctx.params.id)
        if(tag) ctx.status = 204
      }
    )
}