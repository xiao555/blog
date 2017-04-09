<template>
  <div class="tag">
    <h1>Tags</h1>
    <a class='add-new' @click='addNew'>Add New</a>
    <div id="edit" class="edit" v-if="edit.hasOwnProperty('name')">
      <input type="text" v-model='edit.name'>
      <button @click='submit(edit)'>Submit</button>
      <button class="cancel text" @click='cancel'>Cancel</button>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-cell">Tag</div>
        <div class="table-cell">Number</div>
      </div>
      <div class="table-body">
        <div class="table-row"  v-for="item in tag">
          <div class="table-cell">
            <div class="title">{{ item.name }}</div>
            <div class="action">
              <a @click='editCategory(item)'>Edit</a>|
              <a class="trash" @click='deleteCategory(item)'>Trash</a>
            </div>
          </div>
          <div class="table-cell">
            {{item.number}}
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import api from '../store/api'

  export default {
    name: 'tag',
    data () {
      return {
        tag: [],
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
        api.delete('tag', item).then(res => {
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
          api.update('tag', edit).then(res => {
            if (res.status === 'fail') {
              return this.$parent.$emit('message', 'error', res.message)
            } else {
              this.$parent.$emit('message', 'success', 'Update Success')
            }
            this.update()
          }).catch(err => console.error(err))
        } else {
          api.create('tag', edit).then(res => {
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
        this.$store.dispatch('FETCH_LIST', 'tag', true).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          }
          this.tag = res
        }).catch(err => console.error(err))
      }
    },
    beforeMount () {
      this.$store.dispatch('FETCH_LIST', 'tag', true).then(res => {
        if (res.status === 'fail') {
          return this.$parent.$emit('message', 'error', res.message)
        }
        this.tag = res
      }).catch(err => console.error(err))
    }
  }
</script>

<style lang="stylus">
</style>
