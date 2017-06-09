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
  import api from '@/store/api'
  import { mapGetters } from 'vuex'

  export default {
    name: 'list',
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
        api.admin.delete('article', post).then(res => {
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
    beforeMount() {
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
