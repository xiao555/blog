<template>
  <main>
    <article class="tags">
      <h1 class="title">{{ title }}</h1>
      <div class="entry-content">
        <router-link v-for="tag in sortTags" :key="tag.name"
          :to="{ name: 'tag', params:{ tagName: tag.name }}"
          :data-tag="tag">{{ tag.name }} ({{ tag.number }})
        </router-link>
      </div>
    </article>
  </main>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'

  function fetchTags (store, { path, params, query }, callback) {
    return store.dispatch('FETCH_TAGS', {
      model: 'tags',
      query,
      callback
    })
  }

  export default {
    data () {
      return {
        title: 'Tags'
      }
    },
    computed: {
      ...mapGetters([
        'tags'
      ]),
      sortTags () {
        return this.tags.sort((a, b) => b.number - a.number)
      }
    },
    beforeMount () {
      fetchTags(this.$store, this.$route)
    }
  }
</script>
