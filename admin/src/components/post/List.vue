<template>
  <div class="list">
    <h1>Posts</h1>
    <router-link class='add-new' :to="{ name: 'createPost' }">Add New</router-link>
    <div class="data">
      <a :class="{ active: mode === 'all'}" @click="changeModel('all')">ALL({{ list.length }})</a>|
      <a :class="{ active: mode === 'publish' }" @click="changeModel('publish')">Published({{ publish.length }})</a>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-cell">Title</div>
        <div class="table-cell">visits</div>
        <div class="table-cell">createTime</div>
      </div>
      <div class="table-body">
        <div class="table-row"  v-for="post in (mode === 'all') ? list : publish">
          <div class="table-cell">
            <div class="title">{{ post.title }}</div>
            <div class="action">
              <router-link :to="{ name: 'editPost', params: { path: post.path} }">Edit</router-link>|
              <a class="trash" @click='deletePost(post)'>Trash</a>|
              <a :href="postUrl + post.path" target="_blank">View</a>
            </div>
            <ul class="mobile">
              <li><span>Visits: </span>{{ post.visits }}</li>
              <li><span>CreateTime: </span>{{ post.createTime }}</li>
            </ul>
          </div>
          <div class="table-cell">{{ post.visits }}</div>
          <div class="table-cell">{{ post.createTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../store/api'
  import { mapGetters } from 'vuex'

  export default {
    name: 'list',
    props: ['options'],
    data () {
      return {
        publish: [],
        list: [],
        mode: 'all',
        allClass: true,
        publishClass: false
      }
    },
    computed: {
      ...mapGetters([
        'siteInfo'
      ]),
      postUrl () {
        return this.siteInfo.postUrl
      }
    },
    methods: {
      changeModel (str) {
        this.mode = str
      },
      deletePost (post) {
        api.delete('article', post).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Delete Success')
          }
          this.$store.dispatch('FETCH_LIST', 'article').then((res) => {
            this.list = res
            this.publish = []
            this.list.map((post) => {
              if (post.status === 'Published') this.publish.push(post)
            })
          }).catch(err => console.error(err))
        }).catch(err => console.error(err))
      }
    },
    created () {
      this.$store.dispatch('FETCH_LIST', 'article').then((res) => {
        this.list = res
        this.list.map((post) => {
          if (post.status === 'Published') this.publish.push(post)
        })
      }).catch(err => console.error(err))
    }
  }
</script>

<style lang="stylus">
@import '../../assets/css/list.styl'
</style>
