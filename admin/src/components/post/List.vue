<template>
  <div class="list">
    <h1>Posts</h1>
    <router-link class='add-new' :to="{ name: 'createPost' }">Add New</router-link>
    <div class="data">
      <a :class="{ active: mode === 'all'}" @click="changeModel('all')">ALL({{ list.length }})</a>|
      <a :class="{ active: mode === 'publish'}" @click="changeModel('publish')">Published({{ publish.length }})</a>
    </div>
    <div class="table">
      <thead class="table-header">
        <div class="table-cell">Title</div>
        <div class="table-cell">visits</div>
        <div class="table-cell">createTime</div>
      </thead>
      <div class="table-body">
        <div class="table-row" v-if="mode === 'all'" v-for="post in list">
          <div class="table-cell">
            <div class="title">{{ post.title }}</div>
            <div class="action">
              <a href="">Edit</a>|
              <a href="" class="trash">Trash</a>|
              <a href="">View</a>
            </div>
            <ul class="mobile">
              <li><span>Visits: </span>{{ post.visits }}</li>
              <li><span>CreateTime: </span>{{ post.createTime }}</li>
            </ul>
          </div>
          <div class="table-cell">{{ post.visits }}</div>
          <div class="table-cell">{{ post.createTime }}</div>
        </div>
        <div class="table-row" v-if="mode === 'publish'" v-for="post in publish">
          <div class="table-cell">
            <div class="title">{{ post.title }}</div>
            <div class="action">
              <a href="">Edit</a>
              <a href="">Trash</a>
              <a href="">View</a>
            </div>
            <ul class="mobile">
              <li><span>Visits: </span>{{ post.visits }}</li>
              <li><span>CreateTime: </span>{{ post.createTime }}</li>
            </ul>
          </div>
          <div class="table-cell">{{ post.visits }}</div>
          <div class="table-cell">{{ post.createTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list',
    props: ['options'],
    data () {
      return {
        publish: [],
        list: [],
        mode: 'all'
      }
    },
    methods: {
      changeModel: (str) => {
        this.mode = str
        console.log(this.mode)
      }
    },
    computed: {
    },
    beforeMount () {
      this.$store.dispatch('FETCH_LIST', { model: 'article' }).then((res) => {
        this.list = res
        this.list.map((post) => {
          if (post.isPublic === true) this.publish.push(post)
        })
      }).catch(err => console.error(err))
    }
  }
</script>

<style lang="stylus">
@import '../../assets/css/list.styl'
</style>
