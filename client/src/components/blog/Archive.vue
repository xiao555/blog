<template lang="html">
  <div class="archive">
    <div class="item" v-for="date in dates">
      <h2>{{ date }}</h2>
      <ul>
        <li v-for="article in articles[date]">
          <router-link :to="{ name:'post', params:{ path: article.path } }" >{{ article.title }}</router-link><span>  ({{ article.createTime }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '../../../config'
export default {
  name: 'archive',
  metaInfo: {
    title: 'Archive',
    titleTemplate: config.titleTemplate
  },
  data () {
    return {
      articles: {},
      dates: []
    }
  },
  beforeMount() {
    const query = {
      status: 'Published'
    }
    this.$store.dispatch('FETCH_VALUE', {
      model: 'articles',
      query: query
    }).then(res => {
      for (var i in res) {
        if (res.hasOwnProperty(i)) {
          let time = res[i].createTime.slice(0, 7)
          if (!this.articles.hasOwnProperty(time)) {
            this.dates.push(time)
            this.articles[time] = []
            this.articles[time].push(res[i])
          } else {
            this.articles[time].push(res[i])
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
    }).catch(err => console.log(err))
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
