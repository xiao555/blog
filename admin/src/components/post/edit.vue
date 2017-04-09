<template>
  <div class="edit">
    <h1>{{ title }}</h1>
    <div class="fields post-content">
      <div class="title"><input type="text" v-model="post.title" placeholder="Title"></div>
      <div  class="path"
            v-if="input.path">
              Path: 
              <a class="underline" :href="postUrl + post.path" target="_blank">{{postUrl+post.path}}</a>
              <button @click='toggleInput("path")'>Edit</button></div>
      <div  class="path" 
            v-else>
              Path: {{ postUrl }}
              <input type="text" v-model="post.path">
              <button @click='toggleInput("path")'>OK</button>
              <button class="text" @click='cancel("path")'>Cancel</button></div>
      <markdown-editor v-model="post.content" :configs="configs" ref="markdownEditor"></markdown-editor>
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
          <div class="info">Visits: {{  post.visits }}</div>
          <div class="info">Published on: {{ post.createTime }}</div>
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
          <div class="info">Tags: 
            <button class="text" v-if="!input.tags" @click='toggleInput("tags")'>Edit</button>
            <div class="tag-box">
              <span class="tag" v-for="item in post.tags">{{item}}</span>
            </div>
            <div class="selector" v-if="input.tags">
              <select v-model='post.tags' multiple>
                <option v-for="item in tag" v-bind:value="item.name">{{item.name}}</option>
              </select>
              <button @click='toggleInput("tags")'>OK</button><button class="text" @click='cancel("tags")'>Cancel</button>
            </div>
          </div>
        </div>
        <div class="box-footer"></div>
      </div>
    </div>


  </div>
</template>

<script>
  import markdownEditor from '../../view/markdown'
  import { mapGetters } from 'vuex'
  import api from '../../store/api'

  export default {
    name: 'edit',
    components: {
      markdownEditor
    },
    data () {
      const title = this.$route.path === '/post/create' ? 'Create Page' : 'Edit Page'
      let nullPath = !(title === 'Create Page')
      return {
        isNew: title === 'Create Page',
        title: title,
        post: {},
        category: [],
        tag: [],
        copy: {
          path: '',
          status: '',
          category: '',
          tags: []
        },
        input: {
          path: nullPath,
          status: false,
          category: false,
          tags: false
        },
        configs: {
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
        api.update('article', this.post).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Update Success')
          }
          this.post = res
        }).catch(err => console.error(err))
      },
      create () {
        api.create('article', this.post).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Create Success')
          }
          this.post = res
        }).catch(err => console.error(err))
      },
      deletePost () {
        api.delete('article', this.post).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Delete Success')
          }
        }).catch(err => console.error(err))
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path === '/post/create') {
          this.post = {}
          this.input.path = false
          this.isNew = true
          this.simplemde.value('')
        } else {
          this.input.path = true
          this.isNew = false
          this.$route.params.path && this.$store.dispatch('FETCH_POST', { model: 'article', conditions: { path: this.$route.params.path } }).then(res => {
            this.post = res
          }).catch(err => console.error(err))
        }
      }
    },
    beforeMount () {
      if (this.$route.path === '/post/create') this.post = {}
      this.$store.dispatch('FETCH_LIST', 'category').then(res => {
        this.category = res
      }).catch(err => console.error(err))
      this.$store.dispatch('FETCH_LIST', 'tag').then(res => {
        this.tag = res
      }).catch(err => console.error(err))
      this.$route.params.path && this.$store.dispatch('FETCH_POST', { model: 'article', conditions: { path: this.$route.params.path } }).then(res => {
        this.post = res
      }).catch(err => console.error(err))
    }
  }
</script>

<style lang="stylus">
@import '../../assets/css/edit.styl'
</style>
