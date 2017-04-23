<template>
  <div class="categorys">
    <article class="categorys">
      <h1 class="title">{{ title }}</h1>
      <div class="entry-content">
        <router-link v-for="category in categorys" :key="category.name"
          :to="{ name: 'category', params:{ category: category.name }}">{{ category.name }} ({{ category.number }})
        </router-link>
      </div>
    </article>
  </div>
</template>

<script>

  export default {
    name: 'categorys',
    data () {
      return {
        title: 'Categorys',
        categorys: []
      }
    },
    beforeMount () {
      this.$store.dispatch('FETCH_VALUE', {
        model: 'categorys'
      }).then(res => {
        this.categorys = res
      }).catch(err => console.log(err))
    }
  }
</script>
