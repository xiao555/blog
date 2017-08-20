<template>
  <div class="posts-view">
    <transition :name="transition">
      <div class="posts-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group name="post">
          <item v-for="post in displayedPosts" :key="post.path" :post="post">
          </item>
        </transition-group>
      </div>
    </transition>
    <div class="posts-list-nav">
      <router-link v-if="page > 1" :to="'/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
  </div>
</template>

<script>
  import Item from '../components/blog/ListItem.vue'

  export default {
    name: 'post-list',

    components: {
      Item
    },

    props: {
      model: String,
      query: Object
    },

    data () {
      return {
        transition: 'slide-right',
        displayedPage: Number(this.$store.state.route.params.page) || 1,
        displayedPosts: this.$store.getters.activePosts
      }
    },

    computed: {
      page () {
        return Number(this.$store.state.route.params.page) || 1
      },
      maxPage () {
        const { postsPerPage, lists } = this.$store.state
        return Math.ceil(lists.articles.length / postsPerPage)
      },
      hasMore () {
        return this.page < this.maxPage
      }
    },

    beforeMount () {
      if (this.$root.__isMounted) {
        console.log(this);
        this.loadPosts(this.page)
      }
    },

    watch: {
      page (to, from) {
        this.loadPosts(to. from)
      }
    },

    methods: {
      loadPosts (to = this.page, from = -1) {
        this.$bar.start()
        this.$store.dispatch('FETCH_LISTS', {
          model: this.model,
          query: this.query
        }).then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/1`)
            return
          }
          this.transition = from === -1
            ? null
            : to > from ? 'slide-left' : 'slide-right'
          this.displayedPage = to
          this.displayedPosts = this.$store.getters.activePosts
          this.$bar.finish()
        })
      }
    }
  }
</script>

<style lang="stylus">
article
  border-bottom 1px dotted #aaa
  padding-top 40px
  padding-bottom 20px
  .header, .footer
    margin-bottom 10px
  h2
    margin 0
    font-size 30px
    font-weight bolder
    color title
    a
      font-size 30px
      color title
      transition all .3s ease-out
      &:hover
        color blue
    @media mq-mobile
      font-size 26px
      a
        font-size 26px
  .date
    display inline-block
    margin 0
    font-family Meta
    font-size 12px
    font-weight 300
    position relative
  .readmore
    padding 8px 15px
    color white
    font-family 'Hiragino Sans GB'
    font-weight 600
    &:after
      content " »"
      display inline-block
      width 0
      height 100%
      line-height 15px
      vertical-align middle
      overflow hidden
      transition all .15s ease-in
    &:nth-child(2n+1)
      background-color violet
    &:nth-child(2n)
      background-color indigo
    &:hover
      background-color blue
      &:after
        width 16px
        padding-left 5px
</style>
