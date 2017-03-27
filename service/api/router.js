export default (model, router, actions) => {
  router
    .get('/'+ model + 's', actions.find)
    .post('/'+ model + 's',actions.create)
    .get('/'+ model + 's/:id', actions.findById)
    .put('/'+ model + 's/:id', actions.updateById)
    .delete('/'+ model + 's/:id', actions.deleteById)
}