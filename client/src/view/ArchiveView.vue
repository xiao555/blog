<template lang="html">
  <div class="archive">
    <div class="item" v-for="date in dates">
      <h2>{{ date }}</h2>
      <ul>
        <li v-for="article in articles[date]">
          <router-link :to="'/posts/' + article.path" >{{ article.title }}</router-link><span>  ({{ article.createTime }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '../../config'

export default {
  name: 'archive-view',

  title () {
    return 'Archive'
  },

  data () {
    return {
      articles: {},
      dates: []
    }
  },

  asyncData ({ store }) {
    return store.dispatch('FETCH_LISTS', {
      model: 'articles',
      query : {
        status: 'Published'
      }
    })
  },

  beforeMount() {
    const posts = this.$store.state.lists.articles;
    for (var i in posts) {
      if (posts.hasOwnProperty(i)) {
        let time = posts[i].createTime.slice(0, 7)
        if (!this.articles.hasOwnProperty(time) && posts[i].path !== 'about') {
          this.dates.push(time)
          this.articles[time] = []
          this.articles[time].push(posts[i])
        } else {
          this.articles[time].push(posts[i])
        }
      }
    }
    this.dates.sort(function(a, b) {
      const args = Array.prototype.slice.call(arguments);
      return args.reduce((pre, cur) => {
        let time = cur.split('-')
        return parseInt(time[0] + time[1]) - pre
      }, 0)
    })
    this.dates.forEach((key) => {
      this.articles[key].sort((a, b) => {
        let x = a.createTime.slice(8,10);
        let y = b.createTime.slice(8,10);
        return x - y
      })
    })
  }
}
</script>

<style lang="stylus">
#blog
  .archive
    .item
      ul
        padding-left 0
        a
          color indigo
          transition all .3s ease-out
          &:hover
            color link-green
</style>
