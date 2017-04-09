export default (model, router, permission, actions) => {
  router
    .get('/'+ model + 's', actions.find)
    .post('/'+ model + 's', permission, actions.create)
    .get('/'+ model + 's/:id', actions.findById)
    .put('/'+ model + 's/:id', permission, actions.updateById)
    .delete('/'+ model + 's/:id', permission, actions.deleteById)
}