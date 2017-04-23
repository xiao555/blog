<template>
  <div class="tags">
    <article class="tags">
      <h1 class="title">{{ title }}</h1>
      <div class="entry-content">
        <router-link v-for="tag in sortTags" :key="tag.name"
          :to="{ name: 'tag', params:{ tagName: tag.name }}"
          :data-tag="tag">{{ tag.name }} ({{ tag.number }})
        </router-link>
      </div>
    </article>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'tags',
    data () {
      return {
        title: 'Tags',
        tags: []
      }
    },
    computed: {
      sortTags () {
        return this.tags.sort((a, b) => b.number - a.number)
      }
    },
    beforeMount () {
      this.$store.dispatch('FETCH_VALUE', { model: 'tags' }).then(res => {
        this.tags = res
      }).catch(err => console.log(err))
    }
  }
</script>
