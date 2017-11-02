<template>
  <div class="category">
    <h1>Categorys</h1>
    <a class='add-new' @click='addNew'>Add New</a>
    <div id="edit" class="edit" v-if="edit.hasOwnProperty('name')">
      <input type="text" v-model='edit.name'>
      <button @click='submit(edit)'>Submit</button>
      <button class="cancel text" @click='cancel'>Cancel</button>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-cell">Category</div>
      </div>
      <div class="table-body">
        <div class="table-row"  v-for="item in category">
          <div class="table-cell">
            <div class="title">{{ item.name }}</div>
            <div class="action">
              <a @click='editCategory(item)'>Edit</a>|
              <a class="trash" @click='deleteCategory(item)'>Trash</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import api from '@/api'

  export default {
    name: 'category',
    data () {
      return {
        category: [],
        edit: {}
      }
    },
    methods: {
      addNew () {
        this.edit = { name: '' }
      },
      cancel () {
        this.edit = {}
      },
      editCategory (item) {
        this.edit = item
      },
      deleteCategory (item) {
        api.admin.delete('category', item).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Delete Success')
          }
          this.update()
        }).catch(err => console.error(err))
      },
      submit (edit) {
        if (edit.hasOwnProperty('_id')) {
          api.admin.update('category', edit).then(res => {
            if (res.status === 'fail') {
              return this.$parent.$emit('message', 'error', res.message)
            } else {
              this.$parent.$emit('message', 'success', 'Update Success')
            }
            this.update()
          }).catch(err => console.error(err))
        } else {
          api.admin.create('category', edit).then(res => {
            if (res.status === 'fail') {
              return this.$parent.$emit('message', 'error', res.message)
            } else {
              this.$parent.$emit('message', 'success', 'Create Success')
            }
            this.update()
          }).catch(err => console.error(err))
        }
      },
      update () {
        this.edit = {}
        this.$store.dispatch('FETCH_LISTS', {
          model: 'categorys',
          force: true
        }).then(res => {
          this.category = this.$store.state.lists.categorys
        }).catch(err => console.error(err))
      }
    },
    beforeMount () {
      this.$store.dispatch('FETCH_LISTS', {
        model: 'categorys'
      }).then(res => {
        this.category = this.$store.state.lists.categorys
      }).catch(err => console.error(err))
    }
  }
</script>

<style lang="stylus">
#admin
  .table
    display table
    width 100%
    margin-top 10px
    border 1px solid #e5e5e5
    a
      cursor pointer
    .table-cell
      display table-cell
      padding 8px 10px
      @media mq-mobile
        display none
        &:first-child
          display block
      &:first-child
        width 60%
      .category .table-header &:last-child
        padding-left 20px
    .table-header
      display table-header-group
      background-color white
      border 1px solid black
      .table-cell:first-child
        padding-left 20px
    .table-body
      display table-row-group
    .table-row
      display table-row
      background-color #f9f9f9
      &:nth-of-type(2n)
        background-color white
      &:hover .action
        opacity 1
      .table-cell:not(:first-child)
        padding-left 12px
    .title
      font-weight 500
      margin-left 10px
    .action
      opacity 0
      font-size 13px
      a
        margin 10px
        color #0073aa
        &.trash
          color red
        &:hover
          opacity .7
      @media mq-below-desktop
        opacity 1
    .mobile
      display none
      margin-left 10px
      font-size 14px
      padding 0
      span
        display inline-block
        width 100px
      @media mq-mobile
        display block

  .list
    height 100%
    .data a
      margin 0 10px
      color #0073aa
      cursor pointer
      &:first-child
        margin-left 0
      &.active
        color black
        font-weight 600
</style>
