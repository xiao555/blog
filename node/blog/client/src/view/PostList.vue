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
