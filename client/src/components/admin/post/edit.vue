<template>
  <div class="edit">
    <h1>{{ title }}</h1>
    <div class="fields post-content">
      <div class="title"><input type="text" v-model="post.title" placeholder="Title"></div>
      <div  class="path"
            v-if="input.path">
              Path:
              <a class="underline" :href="postUrl + post.path" target="_blank">{{ postUrl+post.path }}</a>
              <button @click='toggleInput("path")'>Edit</button></div>
      <div  class="path"
            v-else>
              Path: {{ postUrl }}
              <input type="text" v-model="post.path">
              <button @click='toggleInput("path")'>OK</button>
              <button class="text" @click='cancel("path")'>Cancel</button></div>
      Content:
      <textarea v-model="post.content"></textarea>
      Excerpt:
      <textarea class="excerpt" v-model="post.excerpt"></textarea>
    </div>
    <div class="fields postbox-container">
      <div class="postbox">
        <h4>Publish</h4>
        <div class="box-body">
          <div class="info">Status: {{post.status}}
            <button class="text" v-if="!input.status" @click='toggleInput("status")'>Edit</button>
            <div class="selector" v-if="input.status">
              <select v-model='post.status'>
                <option>Published</option>
                <option>Pending Review</option>
                <option>Draft</option>
              </select>
              <button @click='toggleInput("status")'>OK</button><button class="text" @click='cancel("status")'>Cancel</button>
            </div>
          </div>
          <div class="info">Visits: {{  post.visits }} <button class="text" @click='clearVisits()'>Clear</button></div>
          <div class="info">Published on: <date-picker :date="date" :option="option"></date-picker></div>
        </div>
        <div class="box-footer">
          <a href="" class="trash" @click='deletePost'>Move to Trash</a>
          <button class="update" @click="create" v-if='isNew'>Create</button>
          <button class="update" @click="udpate" v-else>Update</button>
        </div>
      </div>
      <div class="postbox">
        <h4>Page Attributes</h4>
        <div class="box-body">
          <div class="info">Category: {{post.category}}
            <button class="text" v-if="!input.category" @click='toggleInput("category")'>Edit</button>
            <div class="selector" v-if="input.category">
              <select v-model='post.category'>
                <option v-for="item in category">{{item.name}}</option>
              </select>
              <button @click='toggleInput("category")'>OK</button><button class="text" @click='cancel("category")'>Cancel</button>
            </div>
          </div>
        </div>
        <div class="box-footer"></div>
      </div>
    </div>


  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '@/store/api'
  import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'

  export default {
    name: 'edit',
    components: {
        'date-picker': myDatepicker
    },
    data () {
      const title = this.$route.path === '/admin/post/create' ? 'Create Page' : 'Edit Page'
      let nullPath = !(title === 'Create Page')
      return {
        option: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD',
        },
        date: {
          time: ''
        },
        limit: {
          type:'fromto',
          from:'',
          to:''
        },
        language: 'zh',
        isNew: title === 'Create Page',
        title: title,
        post: {},
        category: [],
        copy: {
          path: '',
          status: '',
          category: ''
        },
        input: {
          path: nullPath,
          status: false,
          category: false
        },
        configs: {
          renderingConfig: {
            codeSyntaxHighlighting: true,
            highlightingTheme: 'atom-one-dark'
          }
        },
        configs2: {
          toolbar: false,
          renderingConfig: {
            codeSyntaxHighlighting: true,
            highlightingTheme: 'atom-one-dark'
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'siteInfo'
      ]),
      postUrl () {
        return this.siteInfo.postUrl
      },
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    methods: {
      toggleInput (index) {
        this.copy[index] = this.post[index]
        this.input[index] = !this.input[index]
      },
      cancel (index) {
        console.log(this.copy[index])
        this.post[index] = this.copy[index]
        this.input[index] = !this.input[index]
      },
      udpate () {
        this.post.createTime = this.$children[0].date.time
        api.admin.update('article', this.post).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Update Success')
          }
          this.post = res
          this.date.time = res.createTime
        }).catch(err => console.error(err))
      },
      create () {
        const Expect = ['title', 'path', 'status']
        let valid = false
        Expect.map((item) => {
          if (!this.post.hasOwnProperty(item)) {
            valid = item
          }
        })
        if (valid) return this.$parent.$emit('message', 'error', `Required ${valid} field`)
        this.post.createTime = this.$children[0].date.time
        api.admin.create('article', this.post).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Create Success')
          }
          this.post = res
        }).catch(err => console.error(err))
      },
      deletePost () {
        api.admin.delete('article', this.post).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Delete Success')
          }
        }).catch(err => console.error(err))
      },
      clearVisits () {
        this.post.visits = 0
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path === '/admin/post/create') {
          this.post = {}
          this.input.path = false
          this.isNew = true
          this.simplemde.value('')
        } else {
          this.input.path = true
          this.isNew = false
          this.$route.params.path && this.$store.dispatch('FETCH_POST', { model: 'article', conditions: { path: this.$route.params.path } }).then(res => {
            this.post = res
            this.date.time = res.createTime
          }).catch(err => console.error(err))
        }
      }
    },
    beforeMount () {
      if (this.$route.path === '/admin/post/create') this.post = {}
      this.$store.dispatch('FETCH_LIST', 'category').then(res => {
        this.category = res
      }).catch(err => console.error(err))
      this.$route.params.path && this.$store.dispatch('FETCH_POST', { model: 'article', conditions: { path: this.$route.params.path } }).then(res => {
        this.post = res
        this.date.time = res.createTime
      }).catch(err => console.error(err))
    }
  }
</script>

<style lang="stylus">
#admin
  .edit
    clearfix()
    textarea
      width 100%
      overflow-y auto
      height 300px
      &.excerpt
        height 100px
    input
      padding 5px 10px
    a
      color bluepost
      &:hover
        opacity .7
      &.underline
        text-decoration underline
    select
      width 50px
      max-height 100px
      clearfix()
    option
      width 50px
      padding 5px 10px
      border-bottom 1px solid grey-bodybg
    button:not(.text)
      border 1px solid button-border
      box-shadow 0 1px 0 button-shadow
      border-radius 3px
      background-color button-bg
      padding 2px 10px
      cursor pointer
      margin 0 5px
      opacity .7
      &:hover
        opacity 1
    button.text
      color bluepost
      text-decoration underline
      cursor pointer
      border none
      background-color transparent
      opacity 1
      &:hover
        opacity .7
    .post-content
      width calc(100% - 300px)
      margin-right 20px
      float left
    .postbox-container
      float right
      width 280px
    .title
      border 1px solid grey-border
      input
        padding 6px 10px
        border none
        width 100%
        font-size 20px
    h1
      margin-bottom 10px
      display block
    .path
      margin 10px 0
    .postbox
      border 1px solid grey-border
      box-shadow 0 1px 1px rgba(0,0,0,.04)
      background-color white
      margin-bottom 20px
      h4
        padding 5px 10px
        margin 0
        border-bottom 1px solid grey-border
      .box-body
        padding 5px 10px
        .info
          margin 10px 0
      .box-footer
        background-color grey-bodybg
        padding 15px 10px
        clearfix()
        .trash
          color red
          text-decoration underline
          font-size 12px
          opacity .7
          &:hover
            opacity 1
        .update
          background-color bluepost
          border 1px solid blueborder
          padding 5px 10px
          color white
          font-weight 600
          float right
    @media mq-below-desktop
      .post-content
        width 100%
        float none
      .postbox-container
        float none
        width 100%
</style>
